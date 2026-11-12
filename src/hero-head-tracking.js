import { siteUrl } from './site-url.js';

// Sprites are sampled from videohero.mp4, source frames 68..170 at 24 fps,
// every source frame. Eight 960x540 poses per 4x2 WebP sheet.
const START_TIME = 68 / 24;
const POSE_FPS = 24;
const POSE_COUNT = 103;

export function getHeadTargetTime(x, y) {
  const nx = Math.max(-1, Math.min(1, (x - 0.5) * 2.7));
  const ny = Math.max(-1, Math.min(1, (y - 0.5) * 2.7));
  const edge = nx < 0
    ? (ny < 0 ? 3.15 - ny * 0.20 : 3.15 - ny * 0.30)
    : (ny < 0 ? 6.80 + ny * 0.30 : 6.80 + ny * 0.25);
  return 5.20 + Math.abs(nx) * (edge - 5.20);
}

export function getPoseBlend(time) {
  const pose = Math.max(0, Math.min(POSE_COUNT - 1, (time - START_TIME) * POSE_FPS));
  const first = Math.floor(pose);
  return { first, second: Math.min(first + 1, POSE_COUNT - 1), mix: pose - first };
}

export async function initHeroHeadTracking(video) {
  if (!video) return;
  video.pause();
  video.addEventListener('play', () => video.pause());
  // Keep the existing video as a still fallback until all pose sheets decode.
  const neutral = () => { video.currentTime = 125 / 24; };
  if (video.readyState >= 1) neutral();
  else video.addEventListener('loadedmetadata', neutral, { once: true });

  const cursor = { x: 0.5, y: 0.5 };
  const tracking = { x: 0.5, y: 0.5 };
  let wake = null;
  function followPointer(event) {
    cursor.x = Math.max(0, Math.min(1, event.clientX / window.innerWidth));
    cursor.y = Math.max(0, Math.min(1, event.clientY / window.innerHeight));
    wake?.();
  }
  window.addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch') followPointer(event);
  }, { passive: true });
  const mobile = matchMedia('(max-width: 680px)');
  const hero = video.closest('.neural-hero');
  const followTouch = event => {
    if (mobile.matches && event.pointerType === 'touch' && event.isPrimary) followPointer(event);
  };
  hero?.addEventListener('pointerdown', followTouch, { passive: true });
  hero?.addEventListener('pointermove', followTouch, { passive: true });

  let sheets;
  try {
    sheets = await Promise.all(Array.from({ length: Math.ceil(POSE_COUNT / 8) }, async (_, index) => {
      const image = new Image();
      image.src = siteUrl(`/assets/hero-poses/pose24-${String(index + 1).padStart(2, '0')}.webp`);
      await image.decode();
      return image;
    }));
  } catch {
    // A missing sheet must leave the original character visible.
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'hero-video-bg hero-head-canvas';
  canvas.width = 960;
  canvas.height = 540;
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return;

  function drawPose(index, alpha) {
    const cell = index % 8;
    context.globalAlpha = alpha;
    context.drawImage(sheets[Math.floor(index / 8)],
      (cell % 4) * 960, Math.floor(cell / 4) * 540, 960, 540,
      0, 0, 960, 540);
  }

  let time = 5.20;
  let velocity = 0;
  let previous = null;
  let lastDrawn = NaN;
  let frameId = 0;
  let inView = false;
  function paint() {
    const { first, second, mix } = getPoseBlend(time);
    drawPose(first, 1);
    if (mix > 0) drawPose(second, mix);
    context.globalAlpha = 1;
    lastDrawn = time;
  }
  paint();
  video.after(canvas);
  video.style.visibility = 'hidden';

  function schedule() {
    if (frameId || !inView || document.hidden) return;
    previous ??= performance.now();
    frameId = requestAnimationFrame(animate);
  }

  function syncVisibility() {
    if (inView && !document.hidden) {
      schedule();
    } else {
      cancelAnimationFrame(frameId);
      frameId = 0;
      previous = null;
    }
  }

  function animate(now) {
    frameId = 0;
    if (!inView || document.hidden) {
      previous = null;
      return;
    }
    const dt = Math.max(0, Math.min((now - previous) / 1000, 0.05));
    previous = now;
    // Absorb abrupt pointer direction changes before they reach the head.
    // Time-based filtering keeps the same feel at different refresh rates.
    const follow = 1 - Math.exp(-dt / 0.045);
    tracking.x += (cursor.x - tracking.x) * follow;
    tracking.y += (cursor.y - tracking.y) * follow;
    const target = getHeadTargetTime(tracking.x, tracking.y);
    const frequency = 9;
    const offset = time - target;
    const impulse = velocity + frequency * offset;
    const decay = Math.exp(-frequency * dt);
    time = target + (offset + impulse * dt) * decay;
    velocity = (velocity - frequency * impulse * dt) * decay;
    if (Math.abs(time - target) < 0.0001 && Math.abs(velocity) < 0.001) {
      time = target;
      velocity = 0;
    }
    // Blend neighboring poses every display frame: no seek latency, skipped
    // decoded frames, or quantization jitter at the final cursor position.
    if (time !== lastDrawn) paint();
    if (velocity !== 0 || Math.abs(cursor.x - tracking.x) > 0.00001 || Math.abs(cursor.y - tracking.y) > 0.00001) {
      schedule();
    } else {
      previous = null;
    }
  }
  wake = schedule;
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncVisibility();
  }, { rootMargin: '100px' }).observe(canvas);
  document.addEventListener('visibilitychange', syncVisibility);
}

