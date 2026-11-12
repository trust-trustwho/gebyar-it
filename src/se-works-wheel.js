import { siteUrl } from './site-url.js';
import './se-works-wheel.css';
import { scrollSETo } from './se-parallax.js';

// SkillFE works-wheel, adapted to the existing vanilla JS application.
// A single eased `turn` drives the original ring -> bowed vertical drum geometry.
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const rad = degrees => degrees * Math.PI / 180;
const smoothstep = (start, end, value) => {
  const t = clamp((value-start)/(end-start),0,1);
  return t*t*(3-2*t);
};
const smootherstep = (start, end, value) => {
  const t = clamp((value-start)/(end-start),0,1);
  return t*t*t*(t*(t*6-15)+10);
};
function inverseSmootherstep(value) {
  if (value<=0 || value>=1) return clamp(value,0,1);
  let low=0, high=1;
  for (let i=0;i<18;i++) {
    const middle=(low+high)/2;
    if (smootherstep(0,1,middle)<value) low=middle; else high=middle;
  }
  return (low+high)/2;
}
function turnFromChapter(chapter, count) {
  // Opening/closing already ease their geometry in wheelPose. Keep their
  // scroll progress linear so easing is not stacked into a long dead zone.
  if (chapter<1) return clamp(chapter,0,1);
  if (chapter<count) {
    const item=Math.floor(chapter);
    return item+smootherstep(.24,1,chapter-item);
  }
  return count+clamp((chapter-count-.35)/1.3,0,1);
}

// The lead moves continuously through the entire opening/closing. Companions
// travel separately while hidden, preserving a clean path without rigid beats.
function wheelPose(turn, count) {
  const opening = turn < 1;
  const closing = turn > count;
  const phase = opening ? turn : closing ? turn-count : 1;
  const travel = smoothstep(0,1,phase);
  const companionTravel = smootherstep(.18,.82,phase);
  return {
    opening,
    closing,
    morph: opening ? travel : closing ? 1-travel : 1,
    companionMorph: opening ? companionTravel : closing ? 1-companionTravel : 1,
    float: opening || closing ? Math.sin(Math.PI*phase)**2 : 0,
    // Never rewind the drum during the closing morph.
    position: clamp(turn-1,0,count-1),
    lead: closing ? count-1 : 0,
    depart: 1-smoothstep(0,.16,phase),
    arrive: smoothstep(.84,1,phase),
    labelOpacity: opening ? 1-smoothstep(.02,.25,phase) : closing ? smoothstep(.84,1,phase) : 0,
    titleOpacity: opening ? smoothstep(.72,1,phase) : closing ? 1-smoothstep(0,.2,phase) : 1,
  };
}

// Critically damped, time-based following: retain momentum when input changes,
// while keeping long index jumps from rushing through the ring-to-drum opening.
function followTurn(value, velocity, target, dt, dragging) {
  const frequency = dragging ? 18 : 10;
  // Softly limit the pursuit distance instead of cutting velocity at a hard
  // threshold. Input reversals retain momentum without a sudden speed change.
  const destination = value+.85*Math.tanh((target-value)/.85);
  const offset = value-destination;
  const decay = Math.exp(-frequency*dt);
  const term = (velocity+frequency*offset)*dt;
  return {
    value: destination+(offset+term)*decay,
    velocity: (velocity-frequency*term)*decay,
  };
}

export function renderSEWorksWheel(products, { code = 'SE', label = 'PRODUK LAB SE', subtitle = 'Dibangun', accent = 'bersama.' } = {}) {
  return `<div class="se-works-wheel" aria-label="Showcase Lab ${code}">
    <div class="se-wheel-stage" tabindex="0" role="region" aria-label="Roda eksplorasi Lab ${code}. Gunakan panah atas dan bawah untuk memilih.">
      <div class="se-wheel-scene"><div class="se-wheel-drum">${products.map(p => `<figure class="se-wheel-card"><div class="se-wheel-face"><img src="${p.src || siteUrl(`/assets/se/${p.image}.webp`)}" alt="${p.alt || `Dokumentasi produk ${p.name}`}" loading="lazy" decoding="async" draggable="false"></div></figure>`).join('')}</div></div>
      <div class="se-wheel-label"><span>${label}</span><p>${subtitle}<br><em>${accent}</em></p></div>
      <div class="se-wheel-project" aria-live="polite" aria-atomic="true"><span class="se-wheel-project-count">01 / 05</span><h3>${products[0].name}</h3><p>${products[0].type}</p></div>
    </div>
  </div>
  <ul class="se-mobile-projects" aria-label="${label}" tabindex="0">
    ${products.map(product => `<li>
      <img src="${product.src || siteUrl(`/assets/se/${product.image}.webp`)}" alt="${product.alt || ''}" loading="lazy" decoding="async" draggable="false">
      <h3>${product.name}</h3>
      <p>${product.type}</p>
    </li>`).join('')}
  </ul>`;
}

export function initSEWorksWheel(root, products) {
  const host = root.querySelector('.se-works-wheel');
  if (!host || host.dataset.ready) return;
  host.dataset.ready = 'true';
  const stage = host.querySelector('.se-wheel-stage');
  const runway = host.closest('.se-work-scroll');
  const panel = runway.querySelector('.se-work-sticky');
  const scene = host.querySelector('.se-wheel-scene');
  const drum = host.querySelector('.se-wheel-drum');
  const cards = [...host.querySelectorAll('.se-wheel-card')];
  const label = host.querySelector('.se-wheel-label');
  const project = host.querySelector('.se-wheel-project');
  const faces = cards.map(card => card.firstElementChild);
  const projectTitle = project.querySelector('h3');
  const projectType = project.querySelector('p');
  const projectCount = project.querySelector('.se-wheel-project-count');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 640px)');
  const mobile = matchMedia('(max-width: 680px)');
  const count = products.length;
  let turn = 0, target = 0, active = -1, frame = 0, visible = false;
  let velocity = 0, previousTime = 0;
  let scrollStart = 0, scrollStep = 480;
  let metrics = null, drag = null;

  function measure() {
    if (mobile.matches) {
      runway.style.height = '';
      return;
    }
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    scrollStep = Math.max(480,panel.clientHeight*.78);
    runway.style.height = `${panel.clientHeight+(count+2)*scrollStep}px`;
    scrollStart = scrollY+runway.getBoundingClientRect().top;
    const cardW = Math.min(h * .62 * 1.45, w * (compact.matches ? .82 : .48));
    const cardH = cardW / 1.45;
    // Size the resting ring independently so larger drum images still fit it.
    const ringR = Math.min(cardH * 1.14, h * .35, w * (compact.matches ? .35 : .38));
    metrics = { cardW, cardH, ringR, ringScale: clamp((2*Math.PI*ringR/count*.72)/cardW,.16,1), drumR:cardH*2.22, bow:cardH*1.82, depth:cardH*2.7 };
    cards.forEach(card => { card.style.width = `${cardW}px`; card.style.height = `${cardH}px`; card.style.marginLeft = `${-cardW/2}px`; card.style.marginTop = `${-cardH/2}px`; });
    scene.style.perspective = `${metrics.depth}px`;
    requestDraw();
  }
  function updateActive(next) {
    const changed = next !== active;
    if (changed) {
      active = next;
      const p = products[active];
      projectTitle.textContent = p.name;
      projectType.textContent = p.type;
      projectCount.textContent = `${String(active+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
    }
  }
  function draw(time) {
    frame = 0;
    if (mobile.matches || !metrics || !visible || !root.classList.contains('is-active')) return;
    target = scrollTurn();
    const dt = previousTime ? clamp((time-previousTime)/1000,1/240,1/30) : 1/60;
    previousTime = time;
    if (reduce.matches || (Math.abs(target-turn)<.0005 && Math.abs(velocity)<.005)) {
      turn = target; velocity = 0;
    } else {
      const next = followTurn(turn,velocity,target,dt,Boolean(drag?.moved));
      turn = clamp(next.value,0,count+1); velocity = next.velocity;
    }
    const moving = Math.abs(target-turn)>.0005 || Math.abs(velocity)>.005;
    if (!moving) { turn=target; velocity=0; }
    const pose = wheelPose(turn,count);
    const m = pose.morph, pos = pose.position;
    const {ringR,ringScale,drumR,bow} = metrics;
    drum.style.transform = `translateZ(${-m*drumR}px)`;
    cards.forEach((card,i) => {
      const d = i-pos, drumDeg=d*40;
      const lead = i===pose.lead && (pose.opening || pose.closing);
      const cardMorph = lead ? m : pose.companionMorph;
      const float = lead ? pose.float : 0;
      // Each card returns to its own fixed ring slot by the shortest rotation.
      const ringDeg = ((i*360/count+180)%360)-180;
      const x = -cardMorph*bow*(1-Math.cos(rad(drumDeg)))+float*metrics.cardW*.025;
      // Cancel the parent's setback per card, allowing companions to stay
      // stationary during their fade while the lead keeps moving smoothly.
      card.style.transform = `translateZ(${(m-cardMorph)*drumR}px) translateX(${x}px) rotateZ(${(1-cardMorph)*ringDeg}deg) translateY(${-(1-cardMorph)*ringR}px) rotateY(${float*4}deg) rotateX(${cardMorph*drumDeg-float*3}deg) translateZ(${cardMorph*drumR}px)`;
      // Fade into the vanishing point instead of popping off at a hard cutoff.
      let edge = 1-smoothstep(1.05,1.6,Math.abs(d));
      if (compact.matches) edge *= 1-smoothstep(.55,.95,-d);
      let opacity = edge;
      if (pose.opening || pose.closing) {
        opacity = i===pose.lead ? 1 : pose.opening
          ? pose.depart+pose.arrive*edge
          : pose.depart*edge+pose.arrive;
      }
      card.style.opacity = String(opacity);
      card.style.zIndex = String(Math.round(100-Math.abs(d)*2));
      faces[i].style.transform = `scale(${ringScale+(1-ringScale)*cardMorph})`;
    });
    label.style.opacity = String(pose.labelOpacity);
    label.style.pointerEvents = 'none';
    const focus = (1-smoothstep(.2,.5,Math.abs(pos-Math.round(pos))))*pose.titleOpacity;
    project.style.opacity = String(focus);
    project.style.translate = `0 ${(1-focus)*7}px`;
    project.style.pointerEvents = focus<.2?'none':'auto';
    host.dataset.mode = m>.98?'drum':'ring';
    updateActive(clamp(Math.round(Math.min(turn,count)-1),0,count-1));
    host.dataset.phase = turn>count+.001 ? 'closing' : m>.98 ? 'projects' : 'opening';
    if (moving) requestDraw();
    else previousTime = 0;
  }
  function requestDraw() { if (!mobile.matches && !frame && visible && root.classList.contains('is-active')) frame=requestAnimationFrame(draw); }
  function scrollTurn() {
    const chapter = clamp((scrollY-scrollStart)/scrollStep,0,count+2);
    return turnFromChapter(chapter,count);
  }
  function to(value, gesture=false) {
    let chapter;
    if (value>count+1) chapter=count+2+panel.clientHeight/scrollStep*.65;
    else if (value<=0) chapter=0;
    else if (value>=count+1) chapter=count+1.85;
    else if (Number.isInteger(value)) chapter=value+(value===count?.25:.12);
    else if (value<1) chapter=value;
    else if (value>count) chapter=count+.35+(value-count)*1.3;
    else chapter=Math.floor(value)+.24+inverseSmootherstep(value%1)*.76;
    scrollSETo(root, scrollStart+chapter*scrollStep, { immediate: gesture||reduce.matches });
    requestDraw();
  }
  function resetGesture() { drag=null; stage.classList.remove('is-dragging'); }

  // Native wheel/touch/page scrolling all share one timeline; no scroll lock.
  window.addEventListener('scroll',requestDraw,{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  stage.addEventListener('pointerdown',e => {
    if (e.button!==0 || e.target.closest('button')) return;
    drag={x:e.clientX,y:e.clientY,start:scrollTurn(),id:e.pointerId,touch:e.pointerType==='touch',moved:false};
  });
  stage.addEventListener('pointermove',e => {
    if (!drag) return;
    const delta = drag.touch ? drag.x-e.clientX : drag.y-e.clientY;
    if (!drag.moved && Math.abs(delta)<6) return;
    if (!drag.moved) { drag.moved=true; stage.setPointerCapture(e.pointerId); stage.classList.add('is-dragging'); }
    to(clamp(drag.start+delta/(compact.matches?230:420),0,count+1),true);
  });
  const endDrag=e => {
    if (!drag) return;
    const moved=drag.moved;
    const current = scrollTurn();
    const next = drag.start===0 && current>.08 ? Math.max(1,Math.round(current)) : Math.round(current);
    try { if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId); } catch (_) { /* pointer cancellation */ }
    resetGesture();
    if (moved) to(next);
  };
  stage.addEventListener('pointerup',endDrag);
  stage.addEventListener('pointercancel',endDrag);
  stage.addEventListener('keydown',e => {
    let next;
    if (['ArrowDown','ArrowRight'].includes(e.key)) next=Math.round(scrollTurn())+1;
    else if (['ArrowUp','ArrowLeft'].includes(e.key)) next=Math.round(scrollTurn())-1;
    else if (e.key==='Home') next=0;
    else if (e.key==='End') next=count;
    else return;
    e.preventDefault(); e.stopPropagation(); to(next);
  });

  new ResizeObserver(measure).observe(stage);
  new IntersectionObserver(entries=>{ visible=entries[0].isIntersecting; if (visible) measure(); else { resetGesture(); if(frame) cancelAnimationFrame(frame); frame=0; previousTime=0; } },{rootMargin:'100px'}).observe(stage);
  new MutationObserver(()=>{
    if (root.classList.contains('is-active')) measure();
    else { if(frame) cancelAnimationFrame(frame); frame=0; previousTime=0; resetGesture(); }
  }).observe(root,{attributes:true,attributeFilter:['class']});
  reduce.addEventListener('change',()=>{ turn=target; velocity=0; requestDraw(); });
  compact.addEventListener('change',measure);
  mobile.addEventListener('change', measure);
  measure();
}
