import { renderCareerCards } from './career-content.js';
/**
 * SkillFE: Card Fan Carousel (/skillfe-card-fan-carousel)
 * Adapted for "Prospek Karir & Roadmap Karir Alumni"
 * 
 * Features:
 * - Fanned arc coordinates (7 dynamic visible slots, quadratic parabolic offsets)
 * - Dual responsive scaling (Horizontal Multiplier & Vertical Budget Multiplier)
 * - GSAP elastic entry animation (elastic.out(1.05, 0.78))
 * - Interactive hover push spread physics
 * - Circular pagination cycle with smooth entry/exit transitions
 * - Refractive glass chevron arrow buttons and pagination indicator dots
 * - Interactive detail modal showing full step-by-step career roadmap
 */

import gsap from 'gsap';

export const MAX_VISIBLE = 7;
export const HALF = 3;

export const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

export function getResponsiveMultiplier(width) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.50;
  if (width < 1024) return 0.75;
  return 1.0;
}

export function getHeightMultiplier(width) {
  let idealPx;
  if (width < 480) idealPx = 22 * 16;
  else if (width < 640) idealPx = 26 * 16;
  else if (width < 768) idealPx = 28 * 16;
  else if (width < 1024) idealPx = 34 * 16;
  else idealPx = 38 * 16;

  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return available / idealPx;
}

export function getSlotConfig(totalCards, slot) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

export class CardFanCarousel {
  constructor(containerEl, cardsData, options = {}) {
    this.container = typeof containerEl === 'string' ? document.querySelector(containerEl) : containerEl;
    if (!this.container) return;

    this.cardsData = cardsData || [];
    this.totalCards = this.cardsData.length;
    this.needsPagination = this.totalCards > MAX_VISIBLE;
    this.centerIndex = this.needsPagination ? HALF : (this.totalCards >> 1);

    this.isAnimating = false;
    this.hasEntered = false;
    this.direction = null;
    this.prevVisible = new Set();
    this.activeSlot = null;
    this.leaveTimer = null;

    this.options = {
      onSelect: options.onSelect || null,
      ...options
    };

    this.init();
  }

  init() {
    this.renderDOM();
    this.bindEvents();
    this.updateLayout();
  }

  getVisibleMap(center) {
    const map = new Map();
    if (!this.needsPagination) {
      this.cardsData.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      const idx = ((center + slot - HALF) % this.totalCards + this.totalCards) % this.totalCards;
      map.set(idx, slot);
    }
    return map;
  }

  cycle(dir) {
    if (this.isAnimating || !this.needsPagination) return;
    this.isAnimating = true;
    this.direction = dir;
    this.centerIndex = dir === 'right'
      ? (this.centerIndex + 1) % this.totalCards
      : (this.centerIndex - 1 + this.totalCards) % this.totalCards;

    this.updatePaginationIndicators();
    this.updateLayout();
  }

  renderDOM() {
    this.fanLayout = this.container.querySelector('.fan-layout');
    if (!this.fanLayout) return;

    // Render cards
    this.fanLayout.innerHTML = renderCareerCards(this.cardsData);

    this.cardElements = Array.from(this.fanLayout.querySelectorAll('.fan-card'));

    // Pagination elements
    this.prevBtn = this.container.querySelector('.fan-arrow-prev');
    this.nextBtn = this.container.querySelector('.fan-arrow-next');
    this.dotsContainer = this.container.querySelector('.fan-dots-wrapper');

    if (this.dotsContainer) {
      this.dotsContainer.innerHTML = this.cardsData.map((_, i) => `
        <button class="fan-dot-btn ${i === this.centerIndex ? 'is-active' : ''}" data-idx="${i}" aria-label="Go to slide ${i + 1}"></button>
      `).join('');
    }
  }

  updatePaginationIndicators() {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.fan-dot-btn');
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.centerIndex);
    });
  }

  updateLayout() {
    if (!this.cardElements || !this.cardElements.length) return;

    const visibleMap = this.getVisibleMap(this.centerIndex);
    const previouslyVisible = this.prevVisible;
    const isFirstMount = !this.hasEntered;
    const width = window.innerWidth;
    const compactCareerFan = this.container.id === 'karir' && matchMedia('(max-width: 680px)').matches;
    const multiplier = compactCareerFan ? 0.085 : getResponsiveMultiplier(width);
    const hMult = getHeightMultiplier(width);
    const slotCount = this.needsPagination ? MAX_VISIBLE : this.totalCards;
    const config = (slot) => {
      const base = getSlotConfig(slotCount, slot);
      if (!compactCareerFan) return base;
      return {
        ...base,
        y: base.y * 0.12,
        rot: base.rot * 0.25,
      };
    };

    if (isFirstMount) this.isAnimating = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      completedCount++;
      if (completedCount >= visibleCount) {
        this.isAnimating = false;
        if (isFirstMount) this.hasEntered = true;
      }
    };

    this.cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, {
            ...target,
            duration: 1.2,
            ease: "elastic.out(1.05,.78)",
            delay: 0.2 + slot * 0.06,
            onComplete: onCardDone
          });
        } else if (!wasVisible) {
          const enterX = this.direction === "right" ? 40 : -40;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: this.direction === "right" ? 30 : -30,
            scale: 0.5,
            opacity: 0
          });
          gsap.to(card, {
            ...target,
            duration: 0.6,
            ease: "power2.out",
            onComplete: onCardDone
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.5,
            ease: "power2.out",
            onComplete: onCardDone
          });
        }
      } else if (wasVisible) {
        const exitX = this.direction === "right" ? -40 : 40;
        gsap.to(card, {
          x: `${exitX}rem`,
          opacity: 0,
          scale: 0.5,
          rotation: this.direction === "right" ? -30 : 30,
          duration: 0.4,
          ease: "power2.in",
          zIndex: 0
        });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    this.prevVisible = new Set(visibleMap.keys());
    if (compactCareerFan) {
      clearTimeout(this.leaveTimer);
      this.activeSlot = null;
      this.fanLayout.onmouseleave = null;
      this.cardElements.forEach((card) => { card.onmouseenter = null; });
    } else {
      this.setupHoverPhysics(visibleMap, config);
    }
  }

  setupHoverPhysics(visibleMap, config) {
    const visibleEntries = [];
    this.cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          delay,
          ease: "elastic.out(1,.75)",
          overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    visibleEntries.forEach(({ el, slot }) => {
      el.onmouseenter = () => {
        if (this.isAnimating) return;
        if (this.leaveTimer) {
          clearTimeout(this.leaveTimer);
          this.leaveTimer = null;
        }
        if (this.activeSlot !== slot) {
          this.activeSlot = slot;
          updateHoverLayout(slot);
        }
      };
    });

    this.fanLayout.onmouseleave = () => {
      if (this.isAnimating) return;
      if (this.leaveTimer) clearTimeout(this.leaveTimer);
      this.leaveTimer = setTimeout(() => {
        this.activeSlot = null;
        updateHoverLayout(null);
      }, 50);
    };
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.cycle('left'));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.cycle('right'));
    }

    if (this.dotsContainer) {
      this.dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.fan-dot-btn');
        if (!dot || this.isAnimating) return;
        const targetIdx = parseInt(dot.getAttribute('data-idx'), 10);
        if (targetIdx === this.centerIndex) return;
        const dir = targetIdx > this.centerIndex ? 'right' : 'left';
        this.direction = dir;
        this.centerIndex = targetIdx;
        this.updatePaginationIndicators();
        this.updateLayout();
      });
    }

    // Touch Swipe support for mobile
    let touchStartX = 0;
    this.fanLayout.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.fanLayout.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 40) {
          this.cycle(diff > 0 ? 'left' : 'right');
        }
      }
    }, { passive: true });

    // Window resize
    window.addEventListener('resize', () => {
      if (!this.isAnimating) this.updateLayout();
    }, { passive: true });

    // Delegated click: side card brings to center, center card opens modal
    this.fanLayout.addEventListener('click', (e) => {
      const cardEl = e.target.closest('.fan-card');
      if (!cardEl) return;
      const idx = parseInt(cardEl.getAttribute('data-index'), 10);

      if (idx !== this.centerIndex) {
        // Bring clicked side card to center
        if (this.isAnimating) return;
        const dir = idx > this.centerIndex ? 'right' : 'left';
        this.direction = dir;
        this.centerIndex = idx;
        this.updatePaginationIndicators();
        this.updateLayout();
        return;
      }

      // Open roadmap modal on center card click
      const data = this.cardsData[idx];
      if (data && typeof this.options.onSelect === 'function') {
        this.options.onSelect(data);
      }
    });
  }
}
