import './se-bowl-glow.css';

const keys = [
  [0, .30, .34, .22], [.03, .45, .38, .26], [.08, .65, .38, .22],
  [.18, .80, .38, .22], [.40, .95, .38, .19], [.66, 1.05, .46, .16],
  [.87, 1.05, .66, .13], [1.15, 1.10, .90, .10],
  [1.43, 1.30, 1.60, .10], [1.8, 2.40, 3, .10],
];
const rest = keys[0].slice(1);
const entrance = [-.30, .30, .10];
const previewAspect = 1280 / 720;
const clamp = value => Math.max(0, Math.min(1, value));
const mix = (a, b, progress) => a + (b - a) * progress;
const smooth = value => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

// Pastel tints of each lab's aurora, shared by the hero and quiz preview.
const themes = {
  home: { rim: [244, 246, 249], core: [225, 230, 237], rimAlpha: 120, coreAlpha: 165 },
  se: { rim: [218, 245, 209], core: [158, 222, 193] },
  csn: { rim: [197, 236, 248], core: [155, 192, 249] },
  git: { rim: [255, 216, 220], core: [255, 207, 143] },
  keris: { rim: [245, 214, 250], core: [200, 179, 248] },
};

function createPainter(canvas) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const { width, height } = canvas;
  const pixels = context.createImageData(width, height);
  const { rim, core, rimAlpha = 150, coreAlpha = 218 } = themes[canvas.dataset.bowlTheme];
  const outside = [...rim, 0];
  const edgeColor = [...rim, rimAlpha];
  const centerColor = [...core, coreAlpha];
  const palette = Array.from({ length: 256 }, (_, index) => {
    const glow = index / 255;
    const from = glow < .38 ? outside : edgeColor;
    const to = glow < .38 ? edgeColor : centerColor;
    const progress = glow < .38 ? glow / .38 : (glow - .38) / .62;
    return from.map((channel, i) => Math.round(mix(channel, to[i], smooth(progress))));
  });

  return function paint([tip, half, soft], aspect) {
    const denominator = Math.max(.025, tip);
    const edgeX = y => half * aspect * (Math.max(0, tip - y) / denominator) ** .72;
    const edge = Array.from({ length: 48 }, (_, index) => {
      const y = mix(-.30, tip, index / 47);
      return { x: edgeX(y), y };
    });
    const segments = edge.slice(1).map((end, index) => {
      const { x, y } = edge[index];
      const dx = end.x - x;
      const dy = end.y - y;
      return { x, y, dx, dy, inverse: 1 / (dx * dx + dy * dy || 1) };
    });

    // The bowl is symmetric. Sample one half and mirror the result.
    for (let row = 0; row < height; row++) {
      const py = (row + .5) / height;
      const insideX = py < tip ? edgeX(py) : 0;
      for (let col = 0; col < width / 2; col++) {
        const px = (.5 - (col + .5) / width) * aspect;
        let nearest = Infinity;
        for (const { x, y, dx, dy, inverse } of segments) {
          const ox = px - x;
          const oy = py - y;
          const projection = clamp((ox * dx + oy * dy) * inverse);
          nearest = Math.min(nearest, (ox - dx * projection) ** 2 + (oy - dy * projection) ** 2);
        }
        const distance = (px < insideX ? -1 : 1) * Math.sqrt(nearest) - .25;
        const glow = 1 - smooth((distance + soft) / (2 * soft));
        const color = palette[Math.round(glow * 255)];
        pixels.data.set(color, (row * width + col) * 4);
        pixels.data.set(color, (row * width + width - 1 - col) * 4);
      }
    }
    context.putImageData(pixels, 0, 0);
  };
}

function targetAt(progress) {
  const upper = keys.findIndex(key => key[0] > progress);
  if (upper < 0) return keys.at(-1).slice(1);
  const before = keys[upper - 1];
  const after = keys[upper];
  const fraction = (progress - before[0]) / (after[0] - before[0]);
  return before.slice(1).map((value, index) => mix(value, after[index + 1], fraction));
}

export function paintSEBowlPreview(canvas) {
  if (canvas) createPainter(canvas)?.(rest, previewAspect);
}

export function initMobileHomeBowl(hero, mobile) {
  const canvas = hero.querySelector('.home-bowl-glow');
  if (!canvas) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paint;
  let visible = false;
  let frameId = 0;
  let began;
  let lastPaint = -Infinity;
  let scroll = 0;

  const draw = (shape) => paint(shape, canvas.clientWidth / Math.max(1, canvas.clientHeight));

  function frame(now) {
    began ??= now;
    if (now - lastPaint >= 32) {
      const elapsed = now - began;
      const intro = smooth((elapsed - 250) / 1050);
      const progress = clamp(-hero.getBoundingClientRect().top / Math.max(1, hero.clientHeight));
      const follow = 1 - Math.exp(-Math.min(now - lastPaint, 80) / 130);
      scroll = mix(scroll, progress, follow);
      const [tip, half, soft] = targetAt(scroll * .18);
      draw([
        mix(entrance[0], tip + Math.sin(elapsed * .00033 + 1.3) * .02, intro),
        mix(entrance[1], half + Math.sin(elapsed * .0005) * .015, intro),
        mix(entrance[2], soft, intro),
      ]);
      lastPaint = now;
    }
    frameId = requestAnimationFrame(frame);
  }

  function sync() {
    cancelAnimationFrame(frameId);
    if (!mobile.matches || !visible || document.hidden) return;
    paint ??= createPainter(canvas);
    if (!paint) return;
    if (reduced.matches) draw(rest);
    else frameId = requestAnimationFrame(frame);
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(hero);
  mobile.addEventListener('change', sync);
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
}

const resetters = new WeakMap();

export function resetSEBowlGlow(root) {
  resetters.get(root)?.();
}

export function initSEBowlGlow(root) {
  const hero = root.querySelector('.se-hero-wrapper');
  const canvas = hero?.querySelector('.se-bowl-glow canvas');
  if (!canvas) return;
  const paint = createPainter(canvas);
  if (!paint) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let frameId = 0;
  let began = null;
  let zoomStartedAt = null;
  let lastPaint = null;
  let current = rest;

  const aspect = () => (canvas.clientWidth || innerWidth) / (canvas.clientHeight || innerHeight);
  function reset() {
    current = rest;
    canvas.style.transform = '';
    const entering = root.dataset.seEntryTransition === 'zoom-in' && !motion.matches;
    zoomStartedAt = entering ? performance.now() : null;
    if (entering) began = zoomStartedAt - 1300;
    paint(rest, entering ? previewAspect : aspect());
  }
  resetters.set(root, reset);
  if (motion.matches) reset();

  function frame(now) {
    frameId = 0;
    const transition = root.dataset.seEntryTransition;
    if (!visible || document.hidden || motion.matches || transition === 'zoom-out') return;

    began ??= now;
    const elapsed = now - began;
    // While the iris is fixed, the document still has the quiz's scroll offset.
    const scroll = transition === 'zoom-in' ? 0 : Math.max(0, -hero.getBoundingClientRect().top);
    canvas.style.transform = `translateY(${scroll}px)`;
    if (elapsed >= 250 && (lastPaint === null || now - lastPaint >= 32)) {
      const target = targetAt(scroll / Math.max(1, hero.clientHeight));
      if (elapsed < 1300 && scroll === 0) {
        const intro = smooth((elapsed - 250) / 1050);
        current = entrance.map((value, i) => mix(value, target[i], intro));
      } else {
        const follow = 1 - Math.exp(-Math.min(now - (lastPaint ?? now - 32), 80) / 130);
        current = current.map((value, i) => mix(value, target[i], follow));
      }
      const [tip, half, soft] = current;
      const blend = zoomStartedAt === null ? 1 : smooth((now - zoomStartedAt) / 650);
      const drawAspect = mix(previewAspect, aspect(), blend);
      paint([
        tip + Math.sin(elapsed * .00033 + 1.3) * .02 * blend,
        half + Math.sin(elapsed * .0005) * .015 * blend,
        soft,
      ], drawAspect);
      lastPaint = now;
    }
    frameId = requestAnimationFrame(frame);
  }

  function sync() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    if (!visible || document.hidden) return;
    if (motion.matches) reset();
    else if (root.dataset.seEntryTransition !== 'zoom-out') frameId = requestAnimationFrame(frame);
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(hero);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-se-entry-transition'] });
  motion.addEventListener('change', sync);
  window.addEventListener('resize', () => { if (visible && motion.matches) reset(); });
  document.addEventListener('visibilitychange', sync);
}
