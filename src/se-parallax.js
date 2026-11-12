import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './se-parallax.css';
import { initSEBowlGlow, resetSEBowlGlow } from './se-bowl-glow.js';

gsap.registerPlugin(ScrollTrigger);
const controllers = new WeakMap();
let activeController = null;

export function pauseSEParallaxForZoom(root, direction) {
  root.dataset.seEntryTransition = direction;
  root.querySelector('.se-hero-wrapper')?.classList.add('se-hero-revealed');
  resetSEBowlGlow(root);
  // Stop synchronously before restoring quiz scroll. Waiting for the mutation
  // observer lets ScrollTrigger fade the fixed hero using quiz coordinates.
  controllers.get(root)?.stop?.();
}

export function scrollSETo(root, target, { immediate = false, offset = 0 } = {}) {
  if (target == null) return;
  const controller = controllers.get(root);
  if (controller?.lenis) {
    controller.lenis.scrollTo(target, { immediate, offset, duration: 1.2 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: immediate ? 'instant' : 'smooth' });
  } else {
    target?.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth', block: 'start' });
  }
}

// Adapt SkillFE's synchronized depth layers to the existing editorial hero.
// No replacement scenery: the original aurora remains untouched.
export function animateSectionHeadingDepth(headings, depth) {
  headings.forEach(heading => {
    let layer = heading.querySelector('.se-depth-heading');
    if (!layer) {
      layer = document.createElement('span');
      layer.className = 'se-depth-heading';
      layer.append(...heading.childNodes);
      heading.append(layer);
    }

    gsap.fromTo(layer, { y: 32 * depth }, {
      y: -24 * depth,
      ease: 'none',
      scrollTrigger: { trigger: heading, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    });
  });
}

export function initSEParallax(root) {
  if (controllers.has(root)) return;
  const page = root.querySelector('.lab-detail-page');
  const hero = root.querySelector('.se-hero-wrapper');
  if (!page || !hero) return;
  const controller = { lenis: null };
  controllers.set(root, controller);
  initSEBowlGlow(root);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 767px)');
  const mobile = matchMedia('(max-width: 680px)');
  let context = null;
  let tick = null;
  let refreshFrame = 0;
  let entryFrame = 0;
  let resizeObserver = null;

  function stop() {
    if (entryFrame) cancelAnimationFrame(entryFrame);
    entryFrame = 0;
    if (refreshFrame) cancelAnimationFrame(refreshFrame);
    refreshFrame = 0;
    resizeObserver?.disconnect();
    resizeObserver = null;
    if (tick) gsap.ticker.remove(tick);
    tick = null;
    context?.revert();
    context = null;
    controller.lenis?.destroy();
    controller.lenis = null;
    if (activeController === controller) activeController = null;
    page.classList.remove('se-parallax-active');
  }
  controller.stop = stop;

  function start() {
    stop();
    if (!root.classList.contains('is-active') || root.dataset.seEntryTransition || reduce.matches || mobile.matches) return;
    activeController?.stop();
    activeController = controller;
    page.classList.add('se-parallax-active');
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    });
    controller.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    context = gsap.context(() => {
      const depth = compact.matches ? .55 : 1;
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
      timeline.to(hero.querySelector('.se-hero-content'), { yPercent: 40 * depth, ease: 'none', duration: 1 }, 0);
      [
        ['.se-hero-subtitle', 70],
        ['.se-hero-motto', 55],
        ['.se-hero-title', 40],
        ['.se-hero-actions', 10],
      ].forEach(([selector, rate], index) => {
        // Keep depth ratios, but cap local text travel: these are short copy
        // layers rather than full-height scenery, so large percentages collide.
        timeline.to(hero.querySelector(selector), { y: rate * .18 * depth, ease: 'none', duration: 1 }, index === 0 ? 0 : '<');
      });
      // Fade content rather than painting over the existing animated background.
      timeline.to(hero.querySelector('.se-hero-content'), { opacity: 0, ease: 'none', duration: .45 }, .55);

      page.querySelectorAll('.se-edge-object').forEach((object, index) => {
        const stage = object.closest('.se-work-scroll, .se-playground, .se-block, .se-hero-wrapper');
        const direction = index % 2 === 0 ? 1 : -1;
        gsap.fromTo(object, { y: 44 * depth * direction, rotation: -3 * direction }, {
          y: -44 * depth * direction,
          rotation: 3 * direction,
          ease: 'none',
          scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        });
      });

      animateSectionHeadingDepth(page.querySelectorAll('.se-block:not(.se-work):not(.se-playground) .se-heading'), depth);
    }, page);

    ScrollTrigger.refresh();
    let previousHeight = page.offsetHeight;
    let previousWidth = page.offsetWidth;
    resizeObserver = new ResizeObserver(() => {
      const height = page.offsetHeight;
      const width = page.offsetWidth;
      if (height === previousHeight && width === previousWidth) return;
      previousHeight = height;
      previousWidth = width;
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        lenis.resize();
        ScrollTrigger.refresh();
      });
    });
    resizeObserver.observe(page);
  }

  // This app keeps laboratory DOM mounted while changing routes.
  // Remove the scroll engine and only our GSAP context when SE is hidden.
  new MutationObserver(records => {
    const enteredFromQuiz = records.some(record =>
      record.attributeName === 'data-se-entry-transition' && record.oldValue === 'zoom-in'
    );
    if (!enteredFromQuiz || !root.classList.contains('is-active') || root.dataset.seEntryTransition || reduce.matches) {
      start();
      return;
    }
    // Let the browser paint the lab in normal flow before measuring its scroll effects.
    stop();
    entryFrame = requestAnimationFrame(() => {
      entryFrame = requestAnimationFrame(start);
    });
  }).observe(root, { attributes: true, attributeOldValue: true, attributeFilter: ['class', 'data-se-entry-transition'] });
  reduce.addEventListener('change', start);
  compact.addEventListener('change', start);
  mobile.addEventListener('change', start);
  start();
}
