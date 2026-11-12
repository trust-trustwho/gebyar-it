import { siteUrl } from './site-url.js';
/**
 * SkillFE: Liquid Glass Navbar ("Waterline")
 * /skillfe-liquid-navbar
 * 
 * A tactile floating glass pill enclosing living liquid water:
 * - Realtime WebGL metabolic SDF droplet blending and caustic lighting
 * - Dual-spring droplet physics (Lead k=210, Lag k=72) with elastic stretching
 * - Neck-break rupture on long jumps spawning 3 satellite droplets
 * - Surface meniscus elevation responding to cursor proximity
 * - Expanding acoustic tap ripples
 * - SVG feDisplacementMap refraction filter
 * - Kinetic micro-animations for icons
 */

const PAD = 14; // canvas bleed around the pill, for shadows and ripples

export const NIMBUS_ICONS = {
  home: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 11.2 12 4l8.5 7.2" /><path d="M6 9.6V20h12V9.6" /><path class="nv-door" d="M10 20v-5h4v5Z" /></svg>`,
  code: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  server: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
  globe: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" /></svg>`,
  brain: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>`,
  user: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8" /><path d="M4.8 20c1.2-3.4 4-5 7.2-5s6 1.6 7.2 5" /></svg>`,
  trophy: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  quiz: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.4 2.4 0 1 1 3.8 2c-1 .7-1.4 1.2-1.4 2.2M12 16.5h.01" /></svg>`,
  grid: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>`,
  tree: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="4" rx="1"></rect><rect x="3" y="17" width="6" height="4" rx="1"></rect><rect x="15" y="17" width="6" height="4" rx="1"></rect><path d="M12 7v4M6 17v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M12 11h.01"></path></svg>`,
  users: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
};

export const DEFAULT_NAV_ITEMS = [
  // Beranda & In-page Beranda Sections (Left Group, in order of page flow)
  { id: "hero", label: "BERANDA", href: "/", icon: NIMBUS_ICONS.home, fx: "glow" },
  { id: "dosen", label: "DOSEN", href: "#dosen", icon: NIMBUS_ICONS.user, fx: "wave" },
  { id: "prestasi", label: "PRESTASI", href: "#prestasi", icon: NIMBUS_ICONS.trophy, fx: "pop" },
  { id: "karir", label: "KARIR", href: "#karir", icon: NIMBUS_ICONS.briefcase, fx: "plane" },
  { id: "quiz", label: "QUIZ", href: "/#quiz", icon: NIMBUS_ICONS.quiz, fx: "drop" },

  // Laboratory Detail Sections (Right Group)
  { id: "se", label: "SE", href: siteUrl("/se"), icon: NIMBUS_ICONS.code, fx: "pop" },
  { id: "csn", label: "CSN", href: siteUrl("/csn"), icon: NIMBUS_ICONS.server, fx: "spin" },
  { id: "git", label: "GIT", href: siteUrl("/git"), icon: NIMBUS_ICONS.globe, fx: "plane" },
  { id: "keris", label: "KERIS", href: siteUrl("/keris"), icon: NIMBUS_ICONS.brain, fx: "drop" }
];

/* ---------- Shader Formulations ---------- */
const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uDpr;uniform float uTime;uniform vec4 uPill;
uniform vec4 uBlob[6];uniform float uSy[6];uniform vec4 uRip[6];uniform vec3 uMouse;uniform float uDark;uniform float uAmb;
float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float sdCap(vec2 p,vec4 B,float sy){p-=B.xy;p.y/=sy;p.x=max(abs(p.x)-B.z,0.);return(length(p)-B.w)*min(1.,sy);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float dropD(vec2 p){float d=1e4;for(int i=0;i<6;i++){if(uBlob[i].w>.5){d=smin(d,sdCap(p,uBlob[i],uSy[i]),13.);}}return d;}
float pillD(vec2 p){vec2 h=uPill.zw*.5;return sdRB(p-uPill.xy-h,h,h.y);}
float lens(float d,float w){float t=clamp(-d/w,0.,1.);return sqrt(1.-(1.-t)*(1.-t));}
float waves(vec2 p){float w=0.;
 for(int i=0;i<6;i++){vec4 R=uRip[i];if(R.w>0.){float x=length(p-R.xy)-R.z*240.;w+=R.w*exp(-R.z*1.7)*sin(x*.3)*exp(-x*x/700.);}}
 vec2 m=p-uMouse.xy;w+=uMouse.z*3.6*exp(-dot(m,m)/1000.);
 w+=uAmb*(sin(p.x*.05+uTime*1.2)*.45+sin(p.x*.13-uTime*.85+p.y*.2)*.25);return w;}
float H(vec2 p){float dp=pillD(p);return lens(dp,uPill.w*.36)*2.4+lens(dropD(p),11.)*7.5+waves(p)*smoothstep(0.,7.,-dp);}
float caus(vec2 p,float t){vec2 q=p;float c=0.;for(int i=0;i<3;i++){q+=vec2(sin(q.y*1.1+t),cos(q.x*1.3-t*.7))*.6;c+=1./(1.+16.*abs(sin(q.x)*sin(q.y)));}return c/3.;}
void main(){
 vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;
 float dp=pillD(p);float dd=dropD(p);
 float h0=H(p);vec3 n=normalize(vec3(h0-H(p+vec2(1.,0.)),h0-H(p+vec2(0.,1.)),1.));
 vec3 V=vec3(0.,0.,1.);
 float spec=pow(max(dot(reflect(-normalize(vec3(-.45,-.8,.85)),n),V),0.),70.);
 float spec2=pow(max(dot(reflect(-normalize(vec3(.6,.75,.7)),n),V),0.),22.)*.3;
 float fres=clamp((1.-n.z)*4.,0.,1.);
 vec3 irid=.5+.5*cos(6.2831*(vec3(0.,.33,.67)+fres*.85+p.x*.0028+uTime*.035));
 float pm=smoothstep(1.,-1.,dp);float dm=smoothstep(1.,-1.,dd)*smoothstep(1.,-2.,dp);
 float sh=smoothstep(9.,-9.,dropD(p-vec2(0.,5.)))*(1.-dm)*pm*(.11+.07*uDark);
 vec3 c=vec3(0.,.14,.36)*sh;float a=sh;
 float pa=clamp(pm*(fres*.5+spec*.9+spec2),0.,1.);
 c=mix(vec3(1.),irid,.5*fres)*pa+c*(1.-pa);a=pa+a*(1.-pa);
 float th=lens(dd,11.);
 float cs=caus((p+n.xy*th*18.)*.085,uTime*.9);
 vec3 tint=mix(vec3(.80,.95,1.),vec3(.55,.82,1.),uDark);
 float rim=dm*(1.-smoothstep(0.,8.,-dd));
 float cres=dm*smoothstep(.12,.55,dot(n.xy,normalize(vec2(.55,.85))))*smoothstep(0.,3.,-dd);
 float body=.5+.5*clamp(-n.y*3.,-1.,1.);
 float da=dm*(.26+.14*body)*(1.-.35*uDark);vec3 dc=mix(tint,vec3(1.),body*.6);
 float la=rim*.22;vec3 lc=mix(vec3(0.,.42,.78),vec3(.1,.55,.95),uDark);dc=lc*la+dc*da*(1.-la);da=la+da*(1.-la);
 la=clamp(cres*.7+smoothstep(.6,1.,cs)*.28*th*dm,0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=clamp(dm*(spec*1.2+spec2*.5),0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=dm*smoothstep(-2.,0.,dd)*.4;dc=mix(vec3(1.),irid,.35)*la+dc*(1.-la);da=la+da*(1.-la);
 c=dc+c*(1.-da);a=da+a*(1.-da);
 gl_FragColor=vec4(c,a);
}`;

function makeState() {
  return {
    a: { x: 0, v: 0 },
    b: { x: 0, v: 0 },
    sy: { s: 1, v: 0 },
    lead: 0,
    lagFrom: 0,
    sats: [],
    rips: [],
    t: { x: 0, cy: 0, q: 0, r: 21 },
    q: 0,
    mouse: { x: 0, y: 0, s: 0, on: false },
    moving: false,
    split: false,
    ready: false,
    w: 0,
    h: 0,
    visible: true,
    reduce: false,
    raf: 0,
    last: 0,
    time: 0,
    glc: null
  };
}

function initGL(canvas) {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  const sh = (type, src) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = sh(gl.VERTEX_SHADER, VERT);
  const fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
  gl.useProgram(p);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(p, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = {};
  for (const n of ["uRes", "uDpr", "uTime", "uPill", "uBlob", "uSy", "uRip", "uMouse", "uDark", "uAmb"]) {
    u[n] = gl.getUniformLocation(p, n);
  }
  return { gl, u };
}

function supportsRefraction() {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false;
  const ua = navigator.userAgent;
  return /Chrome\/|Chromium\/|Edg\//.test(ua) && !/Firefox\//.test(ua) && Boolean(CSS.supports && CSS.supports("backdrop-filter", "url(#a)"));
}

/**
 * Initialize Liquid Glass Navbar ("Waterline")
 */
export function initLiquidNavbar({
  container,
  items = DEFAULT_NAV_ITEMS,
  defaultActive = 0,
  tone = "light",
  syncMobileLayout = false,
  onChange = null
}) {
  if (!container) return null;

  // Inject SVG refraction filter if not present in DOM
  if (!document.getElementById("nimbus-refract-filter")) {
    const svgWrap = document.createElement("div");
    svgWrap.id = "nimbus-refract-filter";
    svgWrap.setAttribute("aria-hidden", "true");
    svgWrap.style.cssText = "position:absolute; width:0; height:0; pointer-events:none; overflow:hidden;";
    svgWrap.innerHTML = `
      <svg width="0" height="0">
        <filter id="nimbus-refract" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="60" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    `;
    document.body.appendChild(svgWrap);
  }

  // Create Nav Element
  const isRefract = supportsRefraction();
  const navEl = document.createElement("nav");
  navEl.className = "nimbus-nav";
  navEl.setAttribute("data-tone", tone);
  navEl.setAttribute("data-gl", "on");
  navEl.setAttribute("data-refract", isRefract ? "on" : "off");
  navEl.setAttribute("aria-label", "Main Navigation");

  let currentActive = defaultActive;
  const st = makeState();
  let darkVal = tone === "dark" ? 1 : 0;

  // Build items HTML
  const itemsHtml = items.map((it, idx) => {
    const isCur = idx === currentActive;
    return `
      <a 
        href="${it.href || '#'}" 
        class="nimbus-item" 
        data-index="${idx}"
        data-id="${it.id || ''}"
        ${isCur ? 'aria-current="page"' : ''}
        aria-label="${it.label}"
      >
        <span class="nv-ico" data-idx="${idx}">${it.icon || ''}</span>
        <span class="nimbus-label">${it.label}</span>
      </a>
    `;
  }).join("");

  navEl.innerHTML = `
    <span class="nimbus-glass" aria-hidden="true"></span>
    <canvas class="nimbus-water" aria-hidden="true"></canvas>
    <span class="nimbus-drop" aria-hidden="true"></span>
    ${itemsHtml}
  `;

  container.innerHTML = "";
  container.appendChild(navEl);

  const canvasEl = navEl.querySelector(".nimbus-water");
  const dropEl = navEl.querySelector(".nimbus-drop");
  const itemEls = Array.from(navEl.querySelectorAll(".nimbus-item"));
  const iconEls = Array.from(navEl.querySelectorAll(".nv-ico"));

  const local = (clientX, clientY) => {
    const r = navEl.getBoundingClientRect();
    return { x: clientX - r.left + PAD, y: clientY - r.top + PAD };
  };

  const ripple = (x, y, amp) => {
    if (st.reduce) return;
    st.rips.push({ x, y, age: 0, amp });
    loop();
  };

  const iconCenter = (i) => {
    const el = iconEls[i];
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return local(b.left + b.width / 2, b.top + b.height / 2);
  };

  const blobs = new Float32Array(24);
  const sy = new Float32Array(6).fill(1);
  const rips = new Float32Array(24);

  // WebGL Render Loop
  const draw = () => {
    const T = st.t;
    const sep = Math.abs(st.a.x - st.b.x);
    const thin = Math.min(sep / (2 * (st.q + T.r) || 1), 1);
    const r = T.r * (1 - 0.3 * thin);
    if (st.glc) {
      const { gl: g, u } = st.glc;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      g.viewport(0, 0, g.drawingBufferWidth, g.drawingBufferHeight);
      g.uniform2f(u.uRes, st.w + PAD * 2, st.h + PAD * 2);
      g.uniform1f(u.uDpr, dpr);
      g.uniform1f(u.uTime, st.time);
      g.uniform4f(u.uPill, PAD, PAD, st.w, st.h);
      blobs.fill(0, 8);
      const head = st.lead === 0 ? st.a : st.b;
      const tail = st.lead === 0 ? st.b : st.a;
      blobs.set([
        head.x, T.cy, st.q * (1 - 0.25 * thin), T.r * (1 - 0.12 * thin),
        tail.x, T.cy, st.q * (1 - 0.8 * thin), T.r * (1 - 0.5 * thin)
      ], 0);
      sy[0] = sy[1] = st.sy.s;
      st.sats.slice(0, 4).forEach((d, i) => blobs.set([d.x, d.y, 0, d.r], 8 + i * 4));
      g.uniform4fv(u.uBlob, blobs);
      g.uniform1fv(u.uSy, sy);
      rips.fill(0);
      st.rips.slice(-6).forEach((p, i) => rips.set([p.x, p.y, p.age, p.amp], i * 4));
      g.uniform4fv(u.uRip, rips);
      g.uniform3f(u.uMouse, st.mouse.x, st.mouse.y, st.mouse.s);
      g.uniform1f(u.uDark, darkVal);
      g.uniform1f(u.uAmb, st.reduce ? 0 : 1);
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT);
      g.drawArrays(g.TRIANGLES, 0, 3);
    } else if (dropEl) {
      const left = Math.min(st.a.x, st.b.x) - st.q - r - PAD;
      const width = sep + 2 * (st.q + r);
      dropEl.style.width = `${width}px`;
      dropEl.style.transform = `translateX(${left}px) scaleY(${st.sy.s})`;
    }
  };

  const mobileMotion = window.matchMedia("(max-width: 680px)");
  const header = navEl.closest('.neural-header');
  const isMobileHeader = () => Boolean(header && mobileMotion.matches);
  const usesSoftMotion = () => isMobileHeader() && !navEl.hasAttribute("data-scroll-motion");

  // Physical Step
  const step = (dt, now, mobile) => {
    const T = st.t;
    st.time += dt;
    st.q += (T.q - st.q) * Math.min(1, dt * 12);
    const bodies = [st.a, st.b];
    let still = true;

    if (st.reduce) {
      st.a.x = st.b.x = T.x;
      st.a.v = st.b.v = 0;
      st.sy.s = 1;
      st.sats = [];
    } else {
      bodies.forEach((B, i) => {
        const lead = i === st.lead;
        const k = lead ? (mobile ? 196 : 210) : (mobile ? 108 : 72);
        const c = lead ? (mobile ? 28 : 25) : (mobile ? 21 : 13);
        const f = !lead && now < st.lagFrom ? 0.08 : 1;
        B.v += (k * (T.x - B.x) - c * B.v) * dt * f;
        B.x += B.v * dt;
        const lo = PAD + 6 + st.q + T.r - 3;
        const hi = PAD + st.w - 6 - st.q - T.r + 3;
        if (B.x < lo || B.x > hi) {
          st.sy.v -= Math.min(Math.abs(B.v), 900) * 0.0016;
          B.x = Math.max(lo, Math.min(hi, B.x));
          B.v *= -0.25;
        }
        if (Math.abs(T.x - B.x) > 0.3 || Math.abs(B.v) > 3) still = false;
      });

      const L = bodies[st.lead];
      const syT = 1 - (mobile ? 0.12 : 0.2) * Math.min(Math.abs(L.v) / 1500, 1);
      st.sy.v += (280 * (syT - st.sy.s) - (mobile ? 16 : 9) * st.sy.v) * dt;
      st.sy.s += st.sy.v * dt;
      if (Math.abs(st.sy.s - 1) > 0.002 || Math.abs(st.sy.v) > 0.02) still = false;

      // Break the neck on long jumps: spawn 3 satellite droplets
      const sep = Math.abs(st.a.x - st.b.x);
      const r = T.r * (1 - 0.3 * Math.min(sep / (2 * (T.q + T.r) || 1), 1));
      if (!st.split && st.moving && sep - 2 * T.q - 2 * r > -6) {
        st.split = true;
        const lo = bodies[1 - st.lead];
        const hi = bodies[st.lead];
        [0.3, 0.5, 0.72].forEach((t, j) => {
          st.sats.push({
            x: lo.x + (hi.x - lo.x) * t + (Math.random() - 0.5) * 6,
            y: T.cy + (Math.random() - 0.5) * 10,
            vx: (lo.v + hi.v) * 0.45,
            vy: (Math.random() - 0.5) * 60,
            r: 5 + Math.random() * 3 - j * 0.5,
            k: 70 + Math.random() * 90
          });
        });
      }

      st.sats = st.sats.filter((d) => {
        d.vx += (d.k * (T.x - d.x) - 9 * d.vx) * dt;
        d.vy += (90 * (T.cy - d.y) - 7 * d.vy) * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.x = Math.max(PAD + 8 + d.r, Math.min(PAD + st.w - 8 - d.r, d.x));
        d.y = Math.max(T.cy - T.r + d.r, Math.min(T.cy + T.r - d.r, d.y));
        if (Math.abs(T.x - d.x) < T.q + T.r * 0.5) d.r -= dt * 26;
        return d.r > 0.6;
      });
      if (st.sats.length) still = false;
    }

    if (st.moving && still) {
      st.moving = false;
      if (st.split || !st.reduce) st.rips.push({ x: T.x, y: T.cy, age: 0, amp: st.split ? 1.2 : 0.7 });
    }

    st.rips.forEach((p) => (p.age += dt));
    st.rips = st.rips.filter((p) => p.age < 2.4);
    const target = st.mouse.on ? 1 : 0;
    st.mouse.s += (target - st.mouse.s) * Math.min(1, dt * 7);
  };

  const canDraw = () => st.visible && !document.hidden && !header?.classList.contains('is-hidden');

  const loop = () => {
    if (st.raf || !canDraw()) return;
    st.last = performance.now();
    const tick = (now) => {
      if (!canDraw()) {
        st.raf = 0;
        return;
      }
      const mobile = usesSoftMotion();
      const dt = Math.min((now - st.last) / 1000, mobile ? 1 / 20 : 1 / 30);
      st.last = now;
      const steps = mobile ? Math.max(1, Math.ceil(dt * 120)) : 1;
      for (let i = 1; i <= steps; i++) {
        step(dt / steps, now - dt * 1000 * (1 - i / steps), mobile);
      }
      draw();
      const busy = st.moving || st.rips.length || st.sats.length || st.mouse.s > 0.01;
      if (st.visible && (!st.reduce || busy)) {
        st.raf = requestAnimationFrame(tick);
      } else {
        st.raf = 0;
      }
    };
    st.raf = requestAnimationFrame(tick);
  };

  // Layout Measurement
  const measure = ({ snap = false } = {}) => {
    const el = itemEls[currentActive];
    if (!navEl || !el) return;
    if (syncMobileLayout && mobileMotion.matches && !el.offsetWidth) return;
    st.w = navEl.offsetWidth;
    st.h = navEl.offsetHeight;
    const T = st.t;
    T.r = el.offsetHeight / 2;
    T.q = Math.max(0, el.offsetWidth / 2 - T.r);
    T.cy = PAD + el.offsetTop + el.offsetHeight / 2;
    const nx = PAD + el.offsetLeft + el.offsetWidth / 2;

    if (!st.ready || snap) {
      st.a.x = st.b.x = nx;
      st.q = T.q;
      st.ready = true;
      st.a.v = st.b.v = 0;
      st.sy.s = 1;
      st.sy.v = 0;
      st.moving = st.split = false;
      st.rips = [];
      st.sats = [];
    } else if (Math.abs(nx - T.x) > 0.5) {
      st.lead = Math.abs(nx - st.a.x) <= Math.abs(nx - st.b.x) ? 0 : 1;
      st.lagFrom = performance.now() + (usesSoftMotion() ? 28 : 70);
      st.moving = true;
      st.split = false;
    }
    T.x = nx;

    if (canvasEl) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = st.w + PAD * 2;
      const Hh = st.h + PAD * 2;
      if (canvasEl.width !== Math.round(W * dpr) || canvasEl.height !== Math.round(Hh * dpr)) {
        canvasEl.width = Math.round(W * dpr);
        canvasEl.height = Math.round(Hh * dpr);
        canvasEl.style.width = `${W}px`;
        canvasEl.style.height = `${Hh}px`;
      }
    }
    loop();
  };

  // Select Item & Trigger Physics
  const select = (idx, triggerChange = true, fromScroll = false) => {
    if (idx < 0 || idx >= items.length) return;
    if (isMobileHeader()) {
      if (fromScroll && idx === currentActive) return;
      iconEls[currentActive]?.removeAttribute("data-fx");
      navEl.toggleAttribute("data-scroll-motion", fromScroll);
    }
    const it = items[idx];
    const kind = it?.fx || (it?.icon ? "pop" : "none");

    // Play micro-animation on icon
    const iconEl = iconEls[idx];
    if (!usesSoftMotion() && iconEl && kind !== "none") {
      iconEl.removeAttribute("data-fx");
      void iconEl.offsetWidth; // reflow
      iconEl.setAttribute("data-fx", kind);
    }


    if (!usesSoftMotion()) {
      const c = iconCenter(idx);
      if (c && kind === "drop") setTimeout(() => ripple(c.x, st.t.cy, 1.4), 430);
      if (c && kind === "plane") ripple(c.x, c.y, 0.6);
    }

    currentActive = idx;
    itemEls.forEach((el, i) => {
      if (i === idx) {
        el.setAttribute("aria-current", "page");
      } else {
        el.removeAttribute("aria-current");
      }
    });

    measure();

    if (triggerChange && typeof onChange === 'function') {
      onChange(idx, it);
    }
  };

  // Wire Interaction Listeners
  itemEls.forEach((el, idx) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      select(idx, true);
    });
  });

  navEl.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (currentActive + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    select(next, true);
    itemEls[next]?.focus();
  });

  navEl.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const p = local(e.clientX, e.clientY);
    st.mouse.x = p.x;
    st.mouse.y = p.y;
    st.mouse.on = true;
    loop();
  });

  navEl.addEventListener("pointerleave", () => {
    st.mouse.on = false;
    loop();
  });

  navEl.addEventListener("pointerdown", (e) => {
    const p = local(e.clientX, e.clientY);
    ripple(p.x, p.y, 0.8);
  });

  // WebGL & Lifecycle Init
  st.reduce = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  st.glc = canvasEl ? initGL(canvasEl) : null;
  if (!st.glc) navEl.setAttribute("data-gl", "off");

  const onContextLost = (e) => {
    e.preventDefault();
    st.glc = null;
    navEl.setAttribute("data-gl", "off");
  };
  canvasEl?.addEventListener("webglcontextlost", onContextLost);

  const syncVisibility = () => {
    if (canDraw()) {
      loop();
    } else {
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    }
  };
  const io = new IntersectionObserver(([entry]) => {
    st.visible = entry.isIntersecting;
    syncVisibility();
  });
  io.observe(navEl);

  const headerObserver = header ? new MutationObserver(syncVisibility) : null;
  headerObserver?.observe(header, { attributes: true, attributeFilter: ['class'] });
  document.addEventListener("visibilitychange", syncVisibility);

  let lastWidth = -1;
  let lastHeight = -1;
  const ro = new ResizeObserver(() => {
    const width = navEl.offsetWidth;
    const height = navEl.offsetHeight;
    if (width === lastWidth && height === lastHeight) return;
    lastWidth = width;
    lastHeight = height;
    // Preserve the moving bodies when layout changes; resetting ready teleports
    // both springs to the destination and cuts off the liquid transition.
    measure();
  });
  ro.observe(navEl);

  // Device emulation can change the canvas DPR without resizing the nav box.
  let mobileResizeFrame = 0;
  const syncMobileSize = () => {
    if (!mobileMotion.matches || mobileResizeFrame) return;
    mobileResizeFrame = requestAnimationFrame(() => {
      mobileResizeFrame = 0;
      if (mobileMotion.matches) measure({ snap: true });
    });
  };
  if (syncMobileLayout) {
    window.addEventListener("resize", syncMobileSize);
    mobileMotion.addEventListener("change", syncMobileSize);
  }

  // Initial Measurement
  requestAnimationFrame(() => {
    measure();
  });

  return {
    navEl,
    select,
    measure,
    setActiveIndex(idx, { fromScroll = false } = {}) {
      select(idx, false, fromScroll);
    },
    setTone(newTone) {
      tone = newTone;
      darkVal = tone === "dark" ? 1 : 0;
      navEl.setAttribute("data-tone", tone);
      loop();
    },
    destroy() {
      canvasEl?.removeEventListener("webglcontextlost", onContextLost);
      io.disconnect();
      ro.disconnect();
      if (syncMobileLayout) {
        window.removeEventListener("resize", syncMobileSize);
        mobileMotion.removeEventListener("change", syncMobileSize);
        cancelAnimationFrame(mobileResizeFrame);
      }
      headerObserver?.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      cancelAnimationFrame(st.raf);
      navEl.remove();
    }
  };
}
