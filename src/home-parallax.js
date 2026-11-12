import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateSectionHeadingDepth } from './se-parallax.js';

gsap.registerPlugin(ScrollTrigger);

export function initHomeParallax(hero) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 767px)');
  const body = document.body;
  let context;

  function sync() {
    context?.revert();
    context = null;
    if (inLab || reduce.matches) return;

    context = gsap.context(() => {
      const depth = compact.matches ? .19 : .34;
      const timeline = gsap.timeline({
        defaults: { duration: 1, ease: 'none' },
        scrollTrigger: {
          trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true,
        },
      });

      // Translate the wrapper so the fallback video and cursor canvas move together.
      const layers = [
        ['.hero-media', 70],
        ['.hero-right-col', 55],
        ['.hero-left-col', 40],
        ['.hero-scroll-hint', 10],
      ];
      for (const [selector, rate] of layers) {
        timeline.to(hero.querySelector(selector), { y: () => hero.offsetHeight * rate / 100 * depth }, 0);
      }
      timeline.to('.hero-parallax-fade', { opacity: 1, duration: .26 }, .02);
      timeline.to(['.hero-media', '.hero-split-row', '.hero-scroll-hint'], { opacity: 0, duration: .45 }, .55);

      animateSectionHeadingDepth(document.querySelectorAll('h2[data-home-reveal]'), compact.matches ? .55 : 1);
    });
  }

  // The lab routes share the DOM with the home page and hide its sections.
  let inLab = body.classList.contains('in-lab-view');
  new MutationObserver(() => {
    const next = body.classList.contains('in-lab-view');
    if (inLab === next) return;
    inLab = next;
    sync();
  }).observe(body, { attributes: true, attributeFilter: ['class'] });
  reduce.addEventListener('change', sync);
  compact.addEventListener('change', sync);
  sync();
}
