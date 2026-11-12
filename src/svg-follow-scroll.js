import { escapePrestasi } from './data-prestasi.js';

/**
 * SkillFE: SVG Follow Scroll (Scroll-Driven Path Stroke Timeline)
 * Adapted from /skillfe-svg-follow-scroll for "Prestasi & Portofolio Karya Riset"
 * 
 * Features:
 * - Dynamic scroll-driven path stroke progress interpolation (LERP 60/120fps)
 * - Vivid neon lime (#C2F84F) glow stroke tracing procedural timeline calligraphy
 * - Real-time beacon tip tracking using SVG path.getPointAtLength()
 * - Milestone card progressive unlocks with liquid glass aesthetics
 * - High-contrast inverted impact block at the bottom
 * - Category filtering (Semua, Kompetisi, Riset, Paten, Hilirisasi)
 * - Interactive detail modal with research & team metadata
 */

export class SvgFollowScrollTimeline {
  constructor(sectionEl) {
    this.section = typeof sectionEl === 'string' ? document.querySelector(sectionEl) : sectionEl;
    if (!this.section) return;

    this.svg = this.section.querySelector('.timeline-svg-canvas');
    this.path = this.section.querySelector('.timeline-stroke-path');
    this.faintPath = this.section.querySelector('.timeline-faint-path');
    this.tipGroup = this.section.querySelector('.timeline-tip-group');
    this.milestoneItems = Array.from(this.section.querySelectorAll('.timeline-milestone-item'));
    this.modalEl = document.getElementById('prestasiDetailModal');

    this.totalLength = 0;
    this.targetProgress = 0.12; // Start with 12% stroke visible at rest to hook curiosity
    this.currentProgress = 0.12;
    this.rafId = null;
    this.isDestroyed = false;

    this.init();
  }

  init() {
    this.measurePath();
    this.setupScrollListener();
    this.setupModal();
    this.startLoop();
  }

  measurePath() {
    if (!this.path) return;
    try {
      this.totalLength = this.path.getTotalLength();
      this.path.style.strokeDasharray = `${this.totalLength} ${this.totalLength}`;
      this.path.style.strokeDashoffset = `${this.totalLength * (1 - this.currentProgress)}`;

      if (this.faintPath) {
        this.faintPath.style.strokeDasharray = 'none';
      }
    } catch (e) {
      console.warn('SVG getTotalLength error:', e);
    }
  }

  setupScrollListener() {
    const onScroll = () => {
      if (!this.section) return;
      const rect = this.section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section scroll range: starts when top is 60% into viewport, ends when bottom exits
      const startOffset = vh * 0.65;
      const totalScrollable = rect.height - vh * 0.3;
      const currentScroll = startOffset - rect.top;

      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Map progress from [0, 1] to [0.12, 1.0] (preserving initial header hook at rest)
      this.targetProgress = 0.12 + 0.88 * rawProgress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      this.measurePath();
      onScroll();
    }, { passive: true });

    onScroll();
  }

  startLoop() {
    const loop = () => {
      if (this.isDestroyed) return;

      // Smooth LERP interpolation for buttery stroke flow
      const diff = this.targetProgress - this.currentProgress;
      this.currentProgress += diff * 0.11;

      this.render();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  render() {
    if (!this.path || this.totalLength === 0) return;

    const currentLen = Math.max(0, Math.min(this.totalLength, this.totalLength * this.currentProgress));
    this.path.style.strokeDashoffset = `${this.totalLength - currentLen}`;

    // Update dynamic SVG timeline cursor along the procedural vector
    if (this.tipGroup && this.path) {
      try {
        const pt = this.path.getPointAtLength(currentLen);
        const ptBehind = this.path.getPointAtLength(Math.max(0, currentLen - 2));
        const angle = Math.atan2(pt.y - ptBehind.y, pt.x - ptBehind.x) * (180 / Math.PI);
        this.tipGroup.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
        this.tipGroup.style.opacity = this.currentProgress > 0.04 ? '1' : '0';
      } catch (e) {
        // Fallback for older browsers
      }
    }

    // Activate milestones as the stroke advances
    const sectionRect = this.section.getBoundingClientRect();
    const vh = window.innerHeight;

    this.milestoneItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      // Milestone activates when it enters the active view window
      if (itemRect.top < vh * 0.72) {
        item.classList.add('is-unlocked');
      } else {
        item.classList.remove('is-unlocked');
      }
    });
  }

  setupModal() {
    if (!this.modalEl) return;

    const modalBackdrop = this.modalEl.querySelector('.prestasi-modal-backdrop');
    const modalCloseBtn = this.modalEl.querySelector('.prestasi-modal-close');
    const modalTitle = document.getElementById('modalPrestasiTitle');
    const modalYear = document.getElementById('modalPrestasiYear');
    const modalCategory = document.getElementById('modalPrestasiCategory');
    const modalLab = document.getElementById('modalPrestasiLab');
    const modalDesc = document.getElementById('modalPrestasiDesc');
    const modalPillars = document.getElementById('modalPrestasiPillars');
    const modalTeam = document.getElementById('modalPrestasiTeam');
    const modalImpact = document.getElementById('modalPrestasiImpact');
    const modalSources = document.getElementById('modalPrestasiSources');

    const closeModal = () => {
      this.modalEl.classList.remove('is-open');
      this.modalEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    this.modalEl.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Delegated click for "Detail Karya" buttons
    this.section.addEventListener('click', (e) => {
      const trigger = e.target.closest('.timeline-detail-btn, .timeline-card-inner');
      if (!trigger) return;

      const card = trigger.closest('.timeline-milestone-item');
      if (!card) return;

      const rawData = card.getAttribute('data-detail');
      if (!rawData) return;

      try {
        const data = JSON.parse(rawData);

        if (modalTitle) modalTitle.textContent = data.title || '';
        if (modalYear) modalYear.textContent = data.year || '';
        if (modalCategory) modalCategory.textContent = data.categoryLabel || '';
        if (modalDesc) modalDesc.textContent = data.fullDesc || data.desc || '';
        if (modalLab) {
          modalLab.textContent = data.lab || '';
          modalLab.className = `modal-lab-badge badge-${(data.labCode || 'se').toLowerCase()}`;
        }

        if (modalPillars) {
          modalPillars.innerHTML = (data.highlights || []).map(topic => `
            <span class="modal-tech-tag">${escapePrestasi(topic)}</span>
          `).join('');
        }

        if (modalTeam) {
          modalTeam.innerHTML = (data.people || []).map(person => `
            <div class="modal-team-row"><span class="modal-team-label">${escapePrestasi(person.label)}</span><span class="modal-team-names">${escapePrestasi(person.name)}</span></div>
          `).join('');
        }

        if (modalImpact) {
          modalImpact.innerHTML = (data.metrics || []).map(m => `
            <div class="modal-metric-card">
              <span class="modal-metric-val">${escapePrestasi(m.value)}</span>
              <span class="modal-metric-lbl">${escapePrestasi(m.label)}</span>
            </div>
          `).join('');
        }

        if (modalSources) {
          modalSources.innerHTML = (data.sources || []).map(source => `
            <a href="${escapePrestasi(source.href)}" target="_blank" rel="noopener noreferrer">${escapePrestasi(source.label)} <span aria-hidden="true">↗</span></a>
          `).join('');
        }

        this.modalEl.classList.add('is-open');
        this.modalEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      } catch (err) {
        console.error('Error parsing milestone data:', err);
      }
    });
  }

  destroy() {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

