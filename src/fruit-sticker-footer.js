/**
 * SkillFE: Fruit Sticker Footer (/skillfe-fruit-footer)
 * Vector Cursive Handwriting Engine + Draggable Fruit Stickers with Spring Physics
 * 
 * Features:
 * - Animated monoline cursive script with stroke-dashoffset reveal & erase cycle
 * - Vector fruit stickers (Strawberry, Banana, Chili, Orange, Cherry, Lemon, Watermelon, Pear)
 * - Draggable pointer spring & inertia physics (k=0.42/0.16, damp=0.55/0.66) with velocity-coupled tilt
 * - 3D Flip swap on click (perspective rotateY)
 * - Double-click stage to tidy all stickers back to resting positions
 * - Interactive email copy with spring bounce & feedback toast
 * - Wavy SVG underline hover on social links & hopping back-to-top button
 */

// #region Script Engine
export const SCRIPT_STROKE = 34;
export const SCRIPT_TOP = -230;
export const SCRIPT_BOTTOM = 125;

const IN = "M0,-14C6,-20 ";
const out = (w) => " " + (w - 7) + ",-7 " + w + ",-14";
const outFlat = (w) => " " + (w - 6) + ",-12 " + w + ",-14";

const bowl = (l, r) => {
  const m = (l + r) / 2;
  return "C" + (m + 6) + ",-104 " + (l + 2) + ",-92 " + l + ",-52C" + (l - 1) + ",-18 " + (l + 12) + ",-3 " + (m - 2) + ",-3C" + (r - 8) + ",-3 " + (r + 2) + ",-30 " + (r + 2) + ",-62";
};

const over = (l, r) => IN + (l - 2) + ",-50 " + (l + 14) + ",-88C" + (l + 26) + ",-104 " + (r - 10) + ",-104 " + r + ",-94";
const down = (x, w) => "C" + (x - 1) + ",-60 " + (x - 4) + ",-24 " + (x - 2) + ",-12C" + x + ",-2 " + (x + 8) + ",-1 " + (x + 14) + ",-4C" + (w - 12) + ",-6" + out(w);
const stem = (x, top, w) => "M" + x + "," + top + down(x, w);
const arch = (x0, x1) => "C" + (x0 + 4) + ",-60 " + (x0 + 14) + ",-98 " + ((x0 + x1) / 2 + 2) + ",-98C" + (x1 + 6) + ",-98 " + (x1 + 4) + ",-70 " + (x1 + 1) + ",-44";
const loopUp = (x) => IN + (x + 18) + ",-40 " + (x + 38) + ",-108C" + (x + 52) + ",-152 " + (x + 48) + ",-200 " + (x + 26) + ",-198C" + (x + 4) + ",-196 " + (x - 2) + ",-150 " + x + ",-110";
const loopDown = (x, w) => "C" + x + ",-30 " + (x - 1) + ",30 " + (x - 6) + ",62C" + (x - 12) + ",94 " + (x - 42) + ",104 " + (x - 48) + ",82C" + (x - 54) + ",58 " + (x - 14) + ",8 " + (x + 12) + ",-6C" + (w - 12) + ",-12" + outFlat(w);
const entry = (x) => IN + (x - 4) + ",-50 " + x + ",-96";

export const GLYPHS = {
  a: [100, over(18, 70) + bowl(16, 70) + stem(74, -98, 100)],
  b: [92, loopUp(16) + "C16,-60 15,-30 14,-8C24,-60 40,-98 58,-96C76,-94 76,-60 66,-30C58,-6 38,0 30,-12C40,-14 60,-14 74,-12C80,-12 86,-13 92,-14"],
  c: [80, IN + "16,-50 30,-82C42,-104 70,-104 66,-84C64,-76 58,-80 56,-84C50,-98 22,-96 16,-56C12,-24 26,-3 42,-3C58,-3" + out(80)],
  d: [100, over(18, 70) + bowl(16, 70) + stem(78, -192, 100)],
  e: [80, IN + "36,-40 52,-56C66,-72 66,-100 46,-100C24,-100 14,-74 14,-50C14,-20 28,-3 44,-3C58,-3" + out(80)],
  f: [74, loopUp(16) + "C16,-40 18,30 14,70C12,94 -6,96 -4,74C-2,50 30,-2 46,-8C62,-12" + outFlat(74)],
  g: [96, over(18, 70) + bowl(16, 70) + "M72,-98" + loopDown(72, 96)],
  h: [100, loopUp(16) + "C16,-60 15,-30 14,-2" + arch(14, 70) + down(71, 100)],
  i: [52, entry(26) + down(26, 52) + "M30,-146L30,-146"],
  j: [62, entry(26) + loopDown(26, 62) + "M32,-146L32,-146"],
  k: [96, loopUp(16) + "C16,-60 15,-30 14,-2C22,-56 40,-100 60,-98C80,-96 72,-56 30,-50C48,-44 56,-12 66,-6C72,-2 78,-3 84,-6C88,-8" + out(96)],
  l: [60, loopUp(16) + "C16,-60 14,-30 16,-14C18,-2 26,-1 32,-3C48,-6" + out(60)],
  m: [138, entry(18) + "C18,-60 16,-30 14,-2" + arch(14, 56) + "C56,-30 56,-14 56,-2" + arch(56, 108) + down(109, 138)],
  n: [102, entry(18) + "C18,-60 16,-30 14,-2" + arch(14, 72) + down(73, 102)],
  o: [92, IN + "16,-50 32,-88C30,-104 14,-84 14,-54C14,-22 28,-3 44,-3C62,-3 72,-30 70,-60C68,-90 52,-104 44,-94C38,-86 54,-74 66,-60C72,-52 80,-30 92,-14"],
  p: [96, entry(20) + "L14,92M14,-36C18,-60 28,-98 44,-98C76,-98 78,-60 68,-30C60,-6 40,0 30,-12C42,-14 62,-14 76,-13C82,-13 88,-13 96,-14"],
  q: [100, over(18, 70) + bowl(16, 70) + "M74,-98C73,-40 72,40 70,80C69,96 58,92 62,74C68,40 80,-6 100,-14"],
  r: [80, entry(18) + "C18,-60 16,-30 14,-2C20,-50 34,-90 50,-96C60,-100 64,-90 58,-82C54,-78 50,-82 52,-76C56,-50 56,-16 62,-8C66,-3" + out(80)],
  s: [76, IN + "20,-60 34,-100C40,-76 66,-54 58,-26C52,-2 22,0 10,-18C24,-6 50,-6 62,-10C66,-11" + out(76)],
  t: [72, IN + "20,-80 30,-170" + down(30, 72) + "M8,-104C24,-106 44,-108 62,-110"],
  u: [100, entry(18) + "C16,-60 12,-30 14,-16C16,-2 30,-2 42,-6C56,-12 66,-50 70,-96" + down(70, 100)],
  v: [84, entry(18) + "C18,-60 22,-10 38,-4C56,2 66,-40 64,-96C66,-60 70,-24 78,-18C80,-16 82,-15 84,-14"],
  w: [124, entry(18) + "C16,-60 14,-4 34,-4C50,-4 56,-50 58,-80C58,-50 62,-4 82,-4C98,-4 106,-50 104,-96C106,-60 110,-24 118,-18C120,-16 122,-15 124,-14"],
  x: [92, IN + "18,-60 28,-80C38,-100 54,-100 54,-80C54,-50 50,-20 60,-8C66,-2 72,-4 80,-8C84,-10" + out(92) + "M20,-10C38,-40 58,-74 78,-98"],
  y: [96, entry(18) + "C16,-60 12,-30 14,-16C16,-2 30,-2 42,-6C56,-12 66,-50 70,-96" + loopDown(70, 96)],
  z: [88, IN + "20,-60 36,-90C46,-104 70,-104 64,-80C58,-60 34,-34 18,-10C34,-30 64,-24 60,10C56,60 20,96 12,72C6,52 40,-6 70,-12C76,-13 82,-13 88,-14"],
  "!": [56, "M42,-194C38,-150 32,-96 28,-52M22,-8L22,-8"],
  "?": [72, "M10,-160C14,-196 66,-200 62,-160C60,-128 30,-112 30,-60M26,-8L26,-8"],
  ".": [36, "M16,-8L16,-8"],
  ",": [36, "M20,-8C18,10 12,22 4,30"],
  "'": [30, "M22,-192L16,-140"],
  " ": [44, ""],
};

export const normalise = (word) =>
  word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[‘’]/g, "'").toLowerCase();

export const pathLength = (d) => {
  const nums = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
  const cmds = d.match(/[MLC]/g) || [];
  let i = 0, x = 0, y = 0, len = 0;
  for (const c of cmds) {
    if (c === "M") {
      x = nums[i++];
      y = nums[i++];
    } else if (c === "L") {
      const nx = nums[i++];
      const ny = nums[i++];
      len += Math.hypot(nx - x, ny - y);
      x = nx;
      y = ny;
    } else {
      const p = nums.slice(i, i + 6);
      i += 6;
      let px = x, py = y;
      for (let k = 1; k <= 16; k++) {
        const t = k / 16;
        const u = 1 - t;
        const qx = u * u * u * x + 3 * u * u * t * p[0] + 3 * u * t * t * p[2] + t * t * t * p[4];
        const qy = u * u * u * y + 3 * u * u * t * p[1] + 3 * u * t * t * p[3] + t * t * t * p[5];
        len += Math.hypot(qx - px, qy - py);
        px = qx;
        py = qy;
      }
      x = p[4];
      y = p[5];
    }
  }
  return len;
};

export const layoutWord = (word) => {
  const glyphs = [];
  let x = 0;
  for (const ch of normalise(word)) {
    const g = GLYPHS[ch] || GLYPHS[" "];
    const strokes = [];
    const dots = [];
    for (const sub of g[1].split(/(?=M)/)) {
      if (!sub) continue;
      const dot = sub.match(/^M(-?[\d.]+),(-?[\d.]+)L\1,\2$/);
      if (dot) dots.push([+dot[1], +dot[2]]);
      else strokes.push({ d: sub, len: pathLength(sub) });
    }
    glyphs.push({ ch, x, strokes, dots });
    x += g[0];
  }
  return { glyphs, width: x };
};

export const PEN_SPEED = 1700;
export const PEN_LIFT = 0.05;

export const timeWord = (glyphs) => {
  let t = 0;
  return {
    glyphs: glyphs.map((g) => {
      const strokes = g.strokes.map((s) => {
        const at = { ...s, delay: t, dur: Math.max(0.08, s.len / PEN_SPEED) };
        t += at.dur + PEN_LIFT;
        return at;
      });
      const dots = g.dots.map((p) => {
        const at = { x: p[0], y: p[1], delay: t };
        t += 0.08;
        return at;
      });
      return { ...g, strokes, dots };
    }),
    total: t,
  };
};

export const clampOffset = (v, min, max) =>
  min > max ? (min + max) / 2 : Math.min(max, Math.max(min, v));

export const spring = (x, v, target, k, damp) => {
  const nv = (v + (target - x) * k) * damp;
  return [x + nv, nv];
};
// #endregion

// #region IT Element Stickers Data & SVG Artwork
export const IT_STICKERS = ["chip", "code", "network", "database", "ai", "satellite", "cyber", "terminal"];
export const FRUITS = IT_STICKERS; // alias for compatibility

export const PAPER = {
  chip: "#38bdf8",
  code: "#eab308",
  network: "#06b6d4",
  database: "#f97316",
  ai: "#a855f7",
  satellite: "#10b981",
  cyber: "#ef4444",
  terminal: "#22c55e",
};

export const NAMES = {
  chip: "Microchip CPU",
  code: "Clean Code",
  network: "Cloud Network",
  database: "Database Server",
  ai: "Neural AI Brain",
  satellite: "Geo Satellite",
  cyber: "Cyber Defense Shield",
  terminal: "Hacker Terminal",
};

export const ART = {
  chip: `
    <g transform="scale(1.1)">
      <!-- Outer PCB Gold Pins -->
      <line x1="-22" y1="-38" x2="-22" y2="-28" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-11" y1="-38" x2="-11" y2="-28" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="0" y1="-38" x2="0" y2="-28" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="11" y1="-38" x2="11" y2="-28" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="22" y1="-38" x2="22" y2="-28" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-22" y1="28" x2="-22" y2="38" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-11" y1="28" x2="-11" y2="38" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="0" y1="28" x2="0" y2="38" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="11" y1="28" x2="11" y2="38" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="22" y1="28" x2="22" y2="38" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-38" y1="-22" x2="-28" y2="-22" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-38" y1="-11" x2="-28" y2="-11" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-38" y1="0" x2="-28" y2="0" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-38" y1="11" x2="-28" y2="11" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-38" y1="22" x2="-28" y2="22" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="-22" x2="38" y2="-22" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="-11" x2="38" y2="-11" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="0" x2="38" y2="0" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="11" x2="38" y2="11" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="22" x2="38" y2="22" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
      <!-- Silicon Package Body -->
      <rect x="-28" y="-28" width="56" height="56" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />
      <!-- Center Heatspreader / Die -->
      <rect x="-18" y="-18" width="36" height="36" rx="4" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.8" />
      <!-- Core Circuit Traces -->
      <path d="M-10,-10 L-4,-4 L4,-4 L10,-10 M-10,10 L-4,4 L4,4 L10,10" stroke="#38bdf8" stroke-width="1.8" fill="none" stroke-linecap="round" />
      <circle cx="0" cy="0" r="3.5" fill="#38bdf8" />
      <!-- Glossy Reflection -->
      <path d="M-24,-24 L-12,-24 L-24,-12 Z" fill="#ffffff" opacity="0.3" />
    </g>
  `,
  code: `
    <g transform="scale(1.12) rotate(-5)">
      <!-- Outer Rounded Badge -->
      <rect x="-34" y="-30" width="68" height="60" rx="14" fill="#0f172a" stroke="#ca8a04" stroke-width="2.5" />
      <!-- Left Bracket < -->
      <path d="M-12,-16 L-24,0 L-12,16" fill="none" stroke="#eab308" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Slash / -->
      <line x1="-3" y1="18" x2="3" y2="-18" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" />
      <!-- Right Bracket > -->
      <path d="M12,-16 L24,0 L12,16" fill="none" stroke="#eab308" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Window Controls -->
      <circle cx="-25" cy="-22" r="2" fill="#ef4444" />
      <circle cx="-19" cy="-22" r="2" fill="#eab308" />
      <circle cx="-13" cy="-22" r="2" fill="#22c55e" />
      <!-- Glossy Reflection -->
      <ellipse cx="-18" cy="-14" rx="7" ry="3.5" fill="#ffffff" opacity="0.25" transform="rotate(-30 -18 -14)" />
    </g>
  `,
  network: `
    <g transform="scale(1.15)">
      <!-- Cloud Body -->
      <path d="M-26,4 C-32,4 -36,-1 -36,-7 C-36,-13 -30,-18 -24,-18 C-22,-26 -14,-31 -4,-31 C6,-31 14,-25 17,-17 C23,-17 28,-12 28,-6 C28,0 23,4 17,4 Z" fill="#0284c7" stroke="#0369a1" stroke-width="2" />
      <!-- Inner Cloud Highlight -->
      <path d="M-24,-1 C-20,0 15,-1 17,0 C21,0 24,-3 24,-6 C24,-10 20,-14 15,-14" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.7" />
      <!-- Network Nodes & Connecting Lines underneath -->
      <line x1="-18" y1="4" x2="-18" y2="18" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="0" y1="4" x2="0" y2="24" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="18" y1="4" x2="18" y2="18" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-18" y1="18" x2="18" y2="18" stroke="#0284c7" stroke-width="2" />
      <!-- Nodes -->
      <circle cx="-18" cy="18" r="4.5" fill="#38bdf8" stroke="#0369a1" stroke-width="1.8" />
      <circle cx="0" cy="24" r="5" fill="#67e8f9" stroke="#0369a1" stroke-width="2" />
      <circle cx="18" cy="18" r="4.5" fill="#38bdf8" stroke="#0369a1" stroke-width="1.8" />
      <!-- Glossy Shine -->
      <ellipse cx="-12" cy="-22" rx="7" ry="3.5" fill="#fff" opacity="0.38" transform="rotate(-30 -12 -22)" />
    </g>
  `,
  database: `
    <g transform="scale(1.08) rotate(4)">
      <!-- Bottom Cylinder -->
      <path d="M-26,12 C-26,6 26,6 26,12 L26,24 C26,30 -26,30 -26,24 Z" fill="#ea580c" stroke="#9a3412" stroke-width="2" />
      <ellipse cx="0" cy="12" rx="26" ry="6.5" fill="#f97316" stroke="#9a3412" stroke-width="1.8" />
      <circle cx="16" cy="21" r="2.2" fill="#22c55e" />
      <circle cx="9" cy="21" r="2.2" fill="#eab308" />

      <!-- Middle Cylinder -->
      <path d="M-26,-2 C-26,-8 26,-8 26,-2 L26,10 C26,16 -26,16 -26,10 Z" fill="#ea580c" stroke="#9a3412" stroke-width="2" />
      <ellipse cx="0" cy="-2" rx="26" ry="6.5" fill="#f97316" stroke="#9a3412" stroke-width="1.8" />
      <circle cx="16" cy="7" r="2.2" fill="#22c55e" />
      <circle cx="9" cy="7" r="2.2" fill="#38bdf8" />

      <!-- Top Cylinder -->
      <path d="M-26,-16 C-26,-22 26,-22 26,-16 L26,-4 C26,2 -26,2 -26,-4 Z" fill="#ea580c" stroke="#9a3412" stroke-width="2" />
      <ellipse cx="0" cy="-16" rx="26" ry="6.5" fill="#fb923c" stroke="#9a3412" stroke-width="2" />
      <circle cx="16" cy="-7" r="2.2" fill="#22c55e" />
      <circle cx="9" cy="-7" r="2.2" fill="#ef4444" />

      <!-- Glossy Reflection -->
      <ellipse cx="-10" cy="-17" rx="10" ry="3.5" fill="#fff" opacity="0.4" />
    </g>
  `,
  ai: `
    <g transform="scale(1.15)">
      <!-- Brain Contour Silhouette -->
      <path d="M-4,-24 C-16,-26 -28,-18 -28,-6 C-34,-3 -34,9 -28,15 C-26,24 -16,28 -4,28 C-3,22 -3,16 -4,10 C-4,-2 -4,-14 -4,-24 Z" fill="#7e22ce" stroke="#581c87" stroke-width="2" />
      <path d="M4,-24 C16,-26 28,-18 28,-6 C34,-3 34,9 28,15 C26,24 16,28 4,28 C3,22 3,16 4,10 C4,-2 4,-14 4,-24 Z" fill="#9333ea" stroke="#581c87" stroke-width="2" />
      <!-- Neural Network Connections -->
      <line x1="-16" y1="-12" x2="-6" y2="-2" stroke="#e9d5ff" stroke-width="2" />
      <line x1="-6" y1="-2" x2="-18" y2="10" stroke="#e9d5ff" stroke-width="2" />
      <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#e9d5ff" stroke-width="2.5" />
      <line x1="6" y1="-2" x2="16" y2="-12" stroke="#e9d5ff" stroke-width="2" />
      <line x1="6" y1="-2" x2="18" y2="10" stroke="#e9d5ff" stroke-width="2" />
      <line x1="16" y1="-12" x2="8" y2="-18" stroke="#e9d5ff" stroke-width="2" />
      <line x1="-16" y1="-12" x2="-8" y2="-18" stroke="#e9d5ff" stroke-width="2" />
      <!-- Glowing Synapse Nodes -->
      <circle cx="-16" cy="-12" r="3.5" fill="#f3e8ff" stroke="#a855f7" stroke-width="1.8" />
      <circle cx="16" cy="-12" r="3.5" fill="#f3e8ff" stroke="#a855f7" stroke-width="1.8" />
      <circle cx="-6" cy="-2" r="4.2" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2" />
      <circle cx="6" cy="-2" r="4.2" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2" />
      <circle cx="-18" cy="10" r="3.5" fill="#f3e8ff" stroke="#a855f7" stroke-width="1.8" />
      <circle cx="18" cy="10" r="3.5" fill="#f3e8ff" stroke="#a855f7" stroke-width="1.8" />
      <!-- Glossy Reflection -->
      <ellipse cx="-16" cy="-18" rx="6" ry="3" fill="#fff" opacity="0.38" transform="rotate(-30 -16 -18)" />
    </g>
  `,
  satellite: `
    <g transform="scale(1.1) rotate(15)">
      <!-- Central Satellite Body -->
      <rect x="-10" y="-10" width="20" height="20" rx="3" fill="#0f172a" stroke="#059669" stroke-width="2" />
      <circle cx="0" cy="0" r="4" fill="#34d399" />
      <!-- Solar Panels Left & Right -->
      <line x1="-10" y1="0" x2="-18" y2="0" stroke="#334155" stroke-width="3" />
      <rect x="-36" y="-8" width="18" height="16" rx="2" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" />
      <line x1="-27" y1="-8" x2="-27" y2="8" stroke="#38bdf8" stroke-width="1" />
      <line x1="-36" y1="0" x2="-18" y2="0" stroke="#38bdf8" stroke-width="1" />

      <line x1="10" y1="0" x2="18" y2="0" stroke="#334155" stroke-width="3" />
      <rect x="18" y="-8" width="18" height="16" rx="2" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" />
      <line x1="27" y1="-8" x2="27" y2="8" stroke="#38bdf8" stroke-width="1" />
      <line x1="18" y1="0" x2="36" y2="0" stroke="#38bdf8" stroke-width="1" />

      <!-- Radio Dish Antenna -->
      <path d="M0,10 L0,18 M-8,24 C-8,19 8,19 8,24" stroke="#10b981" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Orbit Radio Waves -->
      <path d="M-14,29 C-14,23 14,23 14,29" stroke="#6ee7b7" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.8" />
      <path d="M-20,34 C-20,26 20,26 20,34" stroke="#a7f3d0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6" />
    </g>
  `,
  cyber: `
    <g transform="scale(1.18)">
      <!-- Shield Outline -->
      <path d="M0,-30 L24,-20 C24,2 18,18 0,30 C-18,18 -24,2 -24,-20 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2.5" stroke-linejoin="round" />
      <!-- Inner Shield Contrast Half -->
      <path d="M0,-28 L20,-19 C20,1 15,15 0,26 Z" fill="#ef4444" />
      <path d="M0,-28 L-20,-19 C-20,1 -15,15 0,26 Z" fill="#b91c1c" />
      <!-- Security Padlock / Keyhole inside -->
      <path d="M-8,-4 L-8,-12 C-8,-17 8,-17 8,-12 L8,-4" fill="none" stroke="#fef08a" stroke-width="3" stroke-linecap="round" />
      <rect x="-12" y="-4" width="24" height="18" rx="4" fill="#facc15" stroke="#ca8a04" stroke-width="1.8" />
      <circle cx="0" cy="3" r="2.5" fill="#78350f" />
      <polygon points="-1.5,3 1.5,3 1,8 -1,8" fill="#78350f" />
      <!-- Glossy Reflection -->
      <ellipse cx="-10" cy="-16" rx="6" ry="3" fill="#fff" opacity="0.38" transform="rotate(-30 -10 -16)" />
    </g>
  `,
  terminal: `
    <g transform="scale(1.15) rotate(-6)">
      <!-- CRT Monitor Frame -->
      <rect x="-30" y="-25" width="60" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2.5" />
      <!-- Screen Area -->
      <rect x="-24" y="-19" width="48" height="38" rx="4" fill="#052e16" stroke="#15803d" stroke-width="1.5" />
      <!-- Command Prompt >_ -->
      <path d="M-18,-7 L-12,-1 L-18,5" fill="none" stroke="#22c55e" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="-8" y1="5" x2="-2" y2="5" stroke="#4ade80" stroke-width="2.8" stroke-linecap="round" />
      <!-- Binary Data Lines -->
      <line x1="-18" y1="-12" x2="16" y2="-12" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="3 2" />
      <line x1="2" y1="-1" x2="16" y2="-1" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 2" />
      <!-- Glossy Scanline Reflection -->
      <path d="M-22,-17 L8,-17 L-22,0 Z" fill="#ffffff" opacity="0.15" />
    </g>
  `,
};
// #endregion

const SCRIPT_UNIT = 0.0052;
const SCRIPT_PAD_L = 70;
const SCRIPT_PAD_R = 90;
const fmt = (n) => +n.toFixed(4) + "em";

export class FruitStickerFooterEngine {
  constructor(containerEl, options = {}) {
    this.container = typeof containerEl === "string" ? document.querySelector(containerEl) : containerEl;
    if (!this.container) return;

    this.options = {
      headline: "Informatika,",
      farewells: ["berkarya!", "terdepan!", "solutif!", "inovatif!", "uika!"],
      lines: [
        "Fakultas Teknik & Sains, Universitas Ibn Khaldun Bogor",
        "Mencetak Talenta Digital Berakhlak Mulia & Berdaya Saing Global."
      ],
      email: "ft@uika-bogor.ac.id",
      links: [
        { label: "Instagram", href: "https://www.instagram.com/himatekinfo.uikabogor/" },
        { label: "YouTube", href: "https://www.youtube.com/@UIKA-TV" },
        { label: "WhatsApp", href: "https://wa.me/62816731857" },
      ],
      name: "Teknik Informatika UIKA Bogor",
      year: 2026,
      address: "Jl. KH. Sholeh Iskandar KM. 2, Kedung Badak, Tanah Sareal, Kota Bogor 16162",
      addressMapsUrl: "https://maps.google.com/?q=Universitas+Ibn+Khaldun+Bogor",
      accent: "#eab308",
      ink: "#0a0a0c",
      muted: "rgba(10, 10, 12, 0.6)",
      background: "#f8fafc",
      stickers: [
        { fruit: "chip", x: 2, y: 66, size: 0.92, rotate: -8 },
        { fruit: "code", x: 11, y: 98, size: 0.72, rotate: 10 },
        { fruit: "cyber", x: 63, y: -28, size: 0.64, rotate: -10, shape: "oval", behind: true },
        { fruit: "ai", x: 99, y: 84, size: 0.58, rotate: 6, shape: "oval" },
        { fruit: "satellite", x: 88, y: -26, size: 0.68, rotate: 12, behind: true },
      ],
      ...options,
    };

    this.words = this.options.farewells.length ? this.options.farewells : ["berkarya!"];
    this.wordIndex = 0;
    this.erasing = false;
    this.redraw = false;
    this.fruits = this.options.stickers.map((s) => s.fruit);
    this.topSticker = -1;
    this.dragging = -1;
    this.copied = false;
    this.inView = false;
    this.eraseTimer = null;

    this.anim = {
      raf: 0,
      reduced: false,
      px: 0,
      py: 0,
      tpx: 0,
      tpy: 0,
      s: this.options.stickers.map(() => ({
        ox: 0, oy: 0, x: 0, y: 0, vx: 0, vy: 0, tilt: 0, lift: 0, liftT: 0,
        drag: false, moved: false, sx: 0, sy: 0, ox0: 0, oy0: 0, min: [-1, -1], max: [1, 1],
      })),
    };

    this.init();
  }

  init() {
    this.render();
    this.cacheRefs();
    this.bindEvents();
    this.setupIntersection();
    this.step();
  }

  getScriptData() {
    const word = this.words[this.wordIndex % this.words.length];
    const laid = layoutWord(word);
    return { ...timeWord(laid.glyphs), width: laid.width, word };
  }

  render() {
    const { headline, lines, email, links, name, year, accent, ink, muted, background, address, addressMapsUrl } = this.options;
    const script = this.getScriptData();
    const slotW = script.width * SCRIPT_UNIT;
    const vbW = script.width + SCRIPT_PAD_L + SCRIPT_PAD_R;
    const vbH = SCRIPT_BOTTOM - SCRIPT_TOP;

    this.container.classList.add("fsf");
    this.container.style.setProperty("--fsf-accent", accent);
    this.container.style.setProperty("--fsf-shade", "color-mix(in oklab, " + accent + " 66%, #3b0b02)");
    this.container.style.setProperty("--fsf-ink", ink);
    this.container.style.setProperty("--fsf-muted", muted);
    this.container.style.setProperty("--fsf-bg", background);
    this.container.style.setProperty("--fsf-font", "'Inter', sans-serif");

    // Headline individual chars for bounce effect
    let ci = 0;
    const charsHtml = [...headline].map((ch) => {
      const idx = ch === " " ? ci : ci++;
      return `<span class="fsf-ch" style="--i: ${idx}">${ch === " " ? "&nbsp;" : ch}</span>`;
    }).join("");

    this.container.innerHTML = `
      <div class="fsf-stage" id="fsfStage">
        <div class="fsf-cluster" id="fsfCluster">
          <!-- Behind Stickers -->
          <div class="fsf-stickers-behind">
            ${this.renderStickers(true)}
          </div>

          <h2 class="fsf-head">
            <span class="fsf-sr">${headline} ${script.word}</span>
            <span class="fsf-line" aria-hidden="true">${charsHtml}</span>
            <button type="button" class="fsf-script" id="fsfScriptBtn" style="width: ${fmt(slotW)}" aria-label="Ganti kata sambung penutup (saat ini: ${script.word})">
              <svg viewBox="${-SCRIPT_PAD_L} ${SCRIPT_TOP} ${vbW} ${vbH}" style="left: ${fmt(-SCRIPT_PAD_L * SCRIPT_UNIT)}; top: ${fmt(0.8 + SCRIPT_TOP * SCRIPT_UNIT)}; width: ${fmt(vbW * SCRIPT_UNIT)}; height: ${fmt(vbH * SCRIPT_UNIT)}; --base: ${this.redraw ? '0s' : '0.45s'}; --total: ${script.total.toFixed(3)}s;" aria-hidden="true">
                <g transform="rotate(-6 0 0) skewX(-10)">
                  ${this.renderScriptLayer("s", script)}
                  ${this.renderScriptLayer("m", script)}
                  ${this.renderScriptLayer("h", script)}
                </g>
              </svg>
            </button>
          </h2>

          <p class="fsf-sub" data-home-reveal>
            ${lines.map((l, i) => `<span style="--i: ${i}">${l}</span>`).join("")}
          </p>

          <!-- Front Stickers -->
          <div class="fsf-stickers-front">
            ${this.renderStickers(false)}
          </div>
        </div>
      </div>

      <!-- Contact Bar -->
      <div class="fsf-contact">
        <button type="button" class="fsf-mail fsf-rise" id="fsfCopyBtn" style="--i: 0" aria-label="Salin alamat email">
          <span class="fsf-mail-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3.5 7.5C3.5 6.4 4.4 5.5 5.5 5.5H18.5C19.6 5.5 20.5 6.4 20.5 7.5V16.5C20.5 17.6 19.6 18.5 18.5 18.5H5.5C4.4 18.5 3.5 17.6 3.5 16.5Z" />
              <path d="M4.5 7L12 12.5L19.5 7" />
            </svg>
          </span>
          <span class="fsf-mail-text">${email}</span>
          <span class="fsf-mail-tag" aria-hidden="true">
            <span class="is-idle">salin</span>
            <span class="is-done">tersalin!</span>
          </span>
        </button>

        <ul class="fsf-links fsf-rise" style="--i: 1">
          ${links.map((l) => `
            <li>
              <a class="fsf-link" href="${l.href || '#'}" target="_blank" rel="noopener noreferrer">
                ${l.label}
                <svg viewBox="0 0 40 6" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength="1" d="M1,3C4,0.5 6,0.5 9,3S14,5.5 17,3S22,0.5 25,3S30,5.5 33,3S37,0.5 39,2.5" />
                </svg>
              </a>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- Bottom Bar -->
      <div class="fsf-bar fsf-rise" style="--i: 2">
        <p>&copy; ${year} ${name}. All rights reserved.</p>
        <a href="${addressMapsUrl || 'https://maps.google.com/?q=Universitas+Ibn+Khaldun+Bogor'}" target="_blank" rel="noopener noreferrer" class="fsf-address" aria-label="Alamat Kampus: ${address}">
          <svg class="fsf-address-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M20 10c0 5-8 11-8 11s-8-6-8-11a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span class="fsf-address-text">${address}</span>
        </a>
      </div>
    `;
  }

  renderScriptLayer(kind, script) {
    const off = kind === "s" ? "translate(6,8)" : kind === "h" ? "translate(-5,-6)" : "";
    const w = kind === "h" ? 7 : SCRIPT_STROKE;
    return `
      <g class="fsf-${kind}" transform="${off}">
        ${script.glyphs.map((g, gi) => `
          <g transform="translate(${g.x},0)">
            <g class="fsf-g" style="--gi: ${gi}">
              ${g.strokes.map((s) => `
                <path
                  class="fsf-p"
                  d="${s.d}"
                  pathLength="1"
                  stroke-width="${w}"
                  style="--d: ${(s.delay + (kind === 's' ? 0.06 : kind === 'h' ? 0.1 : 0)).toFixed(3)}s; --dur: ${s.dur.toFixed(3)}s;"
                />
              `).join("")}
              ${g.dots.map((p) => `
                <circle
                  class="fsf-dot"
                  cx="${p.x}"
                  cy="${p.y}"
                  r="${kind === 'h' ? 4 : SCRIPT_STROKE / 2}"
                  style="--d: ${p.delay.toFixed(3)}s;"
                />
              `).join("")}
            </g>
          </g>
        `).join("")}
      </g>
    `;
  }

  renderStickers(behindOnly) {
    return this.options.stickers.map((spec, i) => {
      const isBehind = !!spec.behind;
      if (isBehind !== behindOnly) return "";
      const fruit = this.fruits[i] || spec.fruit;
      const h = spec.size || 0.8;
      const w = spec.shape === "oval" ? h * 1.3 : h;
      const paper = fruit === spec.fruit && spec.color ? spec.color : PAPER[fruit];
      const cls = "fsf-stk" + (spec.behind ? " is-behind" : "");

      return `
        <div class="${cls}" data-stk-idx="${i}" style="--x: ${spec.x}%; --y: ${spec.y}%; --w: ${w}em; --h: ${h}em;">
          <div class="fsf-stk-in" style="--sd: ${(0.7 + i * 0.13).toFixed(2)}s; --spin: ${i % 2 ? 24 : -24}deg;">
            <div class="fsf-stk-bob" style="--bd: ${-i * 1.7}s;">
              <button
                type="button"
                class="fsf-stk-body"
                data-stk-btn="${i}"
                style="--c: ${paper}; --r: ${spec.rotate || 0}deg; --f: ${h * 0.86}em;"
                aria-label="Stiker ${NAMES[fruit]}. Klik untuk membalik stiker, geser untuk melempar."
              >
                <svg class="fsf-fruit" viewBox="-50 -50 100 100" aria-hidden="true">
                  ${ART[fruit]}
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  cacheRefs() {
    this.stageEl = this.container.querySelector("#fsfStage");
    this.clusterEl = this.container.querySelector("#fsfCluster");
    this.scriptBtn = this.container.querySelector("#fsfScriptBtn");
    this.copyBtn = this.container.querySelector("#fsfCopyBtn");
    this.backToTopBtn = this.container.querySelector("#fsfBackToTop");
    this.stickerEls = Array.from(this.container.querySelectorAll(".fsf-stk"));
    this.bodyEls = Array.from(this.container.querySelectorAll(".fsf-stk-body"));
  }

  setupIntersection() {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.anim.reduced = mq.matches;

    // Immediately grant data-in attribute so all footer content is visible and rendered without delay
    this.container.setAttribute("data-in", "");
    this.inView = true;

    if (!this.anim.reduced && typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.inView = true;
          this.kick();
        }
      }, { threshold: 0.01 });
      io.observe(this.container);
    }
  }

  step = () => {
    const a = this.anim;
    const cluster = this.clusterEl;
    if (!cluster) return;

    const W = cluster.offsetWidth || 1;
    let busy = false;

    if (!a.reduced) {
      a.px += (a.tpx - a.px) * 0.07;
      a.py += (a.tpy - a.py) * 0.07;
      if (Math.abs(a.tpx - a.px) > 0.001 || Math.abs(a.tpy - a.py) > 0.001) busy = true;
    }

    this.options.stickers.forEach((spec, i) => {
      const s = a.s[i];
      const el = this.stickerEls[i];
      if (!s || !el) return;

      const depth = 0.6 + ((i * 37) % 10) / 12;
      const tx = s.ox * W + (s.drag ? 0 : a.px * 10 * depth);
      const ty = s.oy * W + (s.drag ? 0 : a.py * 7 * depth);

      if (a.reduced) {
        s.x = tx;
        s.y = ty;
        s.vx = s.vy = 0;
        s.tilt = 0;
        s.lift = s.liftT;
      } else {
        const k = s.drag ? 0.42 : 0.16;
        const damp = s.drag ? 0.55 : 0.66;
        const [nx, nvx] = spring(s.x, s.vx, tx, k, damp);
        const [ny, nvy] = spring(s.y, s.vy, ty, k, damp);
        s.x = nx;
        s.vx = nvx;
        s.y = ny;
        s.vy = nvy;

        const tiltT = Math.max(-16, Math.min(16, s.vx * 1.1));
        s.tilt += (tiltT - s.tilt) * 0.2;
        s.lift += (s.liftT - s.lift) * 0.2;

        if (
          Math.abs(tx - s.x) > 0.05 ||
          Math.abs(ty - s.y) > 0.05 ||
          Math.abs(s.vx) > 0.02 ||
          Math.abs(s.vy) > 0.02 ||
          Math.abs(s.tilt) > 0.02 ||
          Math.abs(s.liftT - s.lift) > 0.002
        ) {
          busy = true;
        }
      }

      el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) rotate(${s.tilt.toFixed(2)}deg) scale(${(1 + s.lift * 0.08).toFixed(4)})`;
      el.style.setProperty("--lift", s.lift.toFixed(3));
    });

    if (busy) {
      a.raf = requestAnimationFrame(this.step);
    } else {
      a.raf = 0;
    }
  };

  kick() {
    if (!this.anim.raf) {
      this.anim.raf = requestAnimationFrame(this.step);
    }
  }

  nextFarewell() {
    if (this.erasing) return;
    const n = (this.wordIndex + 1) % this.words.length;

    const go = () => {
      this.wordIndex = n;
      this.erasing = false;
      this.redraw = true;
      this.updateScriptSvg();
    };

    if (this.anim.reduced || !this.inView) {
      go();
    } else {
      this.erasing = true;
      if (this.scriptBtn) this.scriptBtn.setAttribute("data-out", "");
      clearTimeout(this.eraseTimer);
      this.eraseTimer = setTimeout(() => {
        if (this.scriptBtn) this.scriptBtn.removeAttribute("data-out");
        go();
      }, 420);
    }
  }

  updateScriptSvg() {
    if (!this.scriptBtn) return;
    const script = this.getScriptData();
    const slotW = script.width * SCRIPT_UNIT;
    const vbW = script.width + SCRIPT_PAD_L + SCRIPT_PAD_R;
    const vbH = SCRIPT_BOTTOM - SCRIPT_TOP;

    this.scriptBtn.style.width = fmt(slotW);
    this.scriptBtn.setAttribute("aria-label", `Ganti kata sambung penutup (saat ini: ${script.word})`);

    this.scriptBtn.innerHTML = `
      <svg viewBox="${-SCRIPT_PAD_L} ${SCRIPT_TOP} ${vbW} ${vbH}" style="left: ${fmt(-SCRIPT_PAD_L * SCRIPT_UNIT)}; top: ${fmt(0.8 + SCRIPT_TOP * SCRIPT_UNIT)}; width: ${fmt(vbW * SCRIPT_UNIT)}; height: ${fmt(vbH * SCRIPT_UNIT)}; --base: ${this.redraw ? '0s' : '0.45s'}; --total: ${script.total.toFixed(3)}s;" aria-hidden="true">
        <g transform="rotate(-6 0 0) skewX(-10)">
          ${this.renderScriptLayer("s", script)}
          ${this.renderScriptLayer("m", script)}
          ${this.renderScriptLayer("h", script)}
        </g>
      </svg>
    `;
  }

  swapFruit(idx) {
    const current = this.fruits[idx];
    let next = current;
    for (let k = 1; k <= FRUITS.length; k++) {
      const f = FRUITS[(FRUITS.indexOf(current) + k) % FRUITS.length];
      if (!this.fruits.includes(f)) {
        next = f;
        break;
      }
    }

    const apply = () => {
      this.fruits[idx] = next;
      const body = this.bodyEls[idx];
      if (!body) return;
      body.style.setProperty("--c", PAPER[next]);
      body.setAttribute("aria-label", `Stiker ${NAMES[next]}. Klik untuk membalik stiker, geser untuk melempar.`);
      const svg = body.querySelector(".fsf-fruit");
      if (svg) svg.innerHTML = ART[next];
    };

    const body = this.bodyEls[idx];
    if (this.anim.reduced || !body || !body.animate) {
      apply();
      return;
    }

    const half = body.animate(
      [
        { transform: "perspective(30em) rotateY(0deg)" },
        { transform: "perspective(30em) rotateY(90deg) scale(1.06)" }
      ],
      { duration: 170, easing: "cubic-bezier(.5,0,.9,.6)", fill: "forwards" }
    );

    half.onfinish = () => {
      apply();
      half.cancel();
      body.animate(
        [
          { transform: "perspective(30em) rotateY(-90deg) scale(1.06)" },
          { transform: "perspective(30em) rotateY(14deg)", offset: 0.65 },
          { transform: "perspective(30em) rotateY(0deg)" }
        ],
        { duration: 480, easing: "cubic-bezier(.2,.8,.3,1)" }
      );
    };
  }

  slap(idx) {
    const body = this.bodyEls[idx];
    if (this.anim.reduced || !body || !body.animate) return;
    body.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(.9,.86)", offset: 0.3 },
        { transform: "scale(1.04)", offset: 0.65 },
        { transform: "scale(1)" }
      ],
      { duration: 460, easing: "cubic-bezier(.3,.7,.4,1)" }
    );
  }

  calculateBounds(idx) {
    const s = this.anim.s[idx];
    if (!this.container || !this.clusterEl || !s) return;
    const r = this.container.getBoundingClientRect();
    const c = this.clusterEl.getBoundingClientRect();
    const W = c.width || 1;
    const spec = this.options.stickers[idx];
    const mobilePosition = matchMedia("(max-width: 680px)").matches
      ? getComputedStyle(this.stickerEls[idx])
      : null;
    const hx = c.left + (mobilePosition ? parseFloat(mobilePosition.left) : (spec.x / 100) * c.width);
    const hy = c.top + (mobilePosition ? parseFloat(mobilePosition.top) : (spec.y / 100) * c.height);
    const pad = 24;
    s.min = [(r.left + pad - hx) / W, (r.top + pad - hy) / W];
    s.max = [(r.right - pad - hx) / W, (r.bottom - pad - hy) / W];
  }

  bindEvents() {
    // Click on script word cycles farewell
    if (this.scriptBtn) {
      this.scriptBtn.addEventListener("click", () => this.nextFarewell());
    }

    // Parallax mouse movements
    this.container.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = this.container.getBoundingClientRect();
      this.anim.tpx = ((e.clientX - r.left) / r.width) * 2 - 1;
      this.anim.tpy = ((e.clientY - r.top) / r.height) * 2 - 1;
      this.kick();
    });

    this.container.addEventListener("pointerleave", () => {
      this.anim.tpx = 0;
      this.anim.tpy = 0;
      this.kick();
    });

    // Double click stage tidies stickers home
    if (this.stageEl) {
      this.stageEl.addEventListener("dblclick", (e) => {
        if (e.target.closest("button, a")) return;
        this.anim.s.forEach((s) => {
          s.ox = 0;
          s.oy = 0;
        });
        this.kick();
      });
    }

    // Copy Email button with toast
    if (this.copyBtn) {
      this.copyBtn.addEventListener("click", () => {
        const email = this.options.email;
        const onDone = () => {
          this.copyBtn.classList.add("is-copied");
          clearTimeout(this.copyToastTimer);
          this.copyToastTimer = setTimeout(() => {
            this.copyBtn.classList.remove("is-copied");
          }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(onDone, () => {
            window.location.href = "mailto:" + email;
          });
        } else {
          window.location.href = "mailto:" + email;
        }
      });
    }

    // Back to Top button
    if (this.backToTopBtn) {
      this.backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: this.anim.reduced ? "auto" : "smooth" });
      });
    }

    // Draggable sticker pointer bindings
    this.bodyEls.forEach((bodyBtn, idx) => {
      const s = this.anim.s[idx];
      const el = this.stickerEls[idx];

      bodyBtn.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        try { bodyBtn.setPointerCapture(e.pointerId); } catch (_) {}
        this.calculateBounds(idx);
        s.drag = true;
        s.moved = false;
        s.sx = e.clientX;
        s.sy = e.clientY;
        s.ox0 = s.ox;
        s.oy0 = s.oy;
        s.liftT = 1;
        el.classList.add("is-drag", "is-top");
        this.kick();
      });

      bodyBtn.addEventListener("pointermove", (e) => {
        if (!s.drag) return;
        const W = this.clusterEl?.offsetWidth || 1;
        const dx = e.clientX - s.sx;
        const dy = e.clientY - s.sy;
        if (!s.moved && Math.hypot(dx, dy) > 5) s.moved = true;
        if (!s.moved) return;
        s.ox = clampOffset(s.ox0 + dx / W, s.min[0], s.max[0]);
        s.oy = clampOffset(s.oy0 + dy / W, s.min[1], s.max[1]);
        this.kick();
      });

      const onPointerEnd = () => {
        if (!s.drag) return;
        s.drag = false;
        s.liftT = 0;
        el.classList.remove("is-drag");
        setTimeout(() => el.classList.remove("is-top"), 250);

        if (s.moved) {
          this.slap(idx);
        } else {
          this.swapFruit(idx);
        }
        this.kick();
      };

      bodyBtn.addEventListener("pointerup", onPointerEnd);
      bodyBtn.addEventListener("pointercancel", onPointerEnd);
    });

    // Resize observer
    if (typeof ResizeObserver !== "undefined" && this.clusterEl) {
      const ro = new ResizeObserver(() => this.kick());
      ro.observe(this.clusterEl);
    }
  }
}

