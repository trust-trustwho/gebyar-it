import { siteUrl, readSiteRoute } from './site-url.js';
import { FACULTY_DIRECTORY as DOSEN_DATA, filterFaculty, LAB_NAMES } from './data-faculty.js';
import { renderFacultyOrganization, renderDirectoryFacultyCard } from './faculty-content.js';
import { populateCareerModal } from './career-content.js';
import { renderPrestasiCards } from './data-prestasi.js';
import { initHeroHeadTracking } from './hero-head-tracking.js';
import { initMobileHomeBowl } from './se-bowl-glow.js';
import { initHomeParallax } from './home-parallax.js';
import { observeSectionReveals } from './section-reveal.js';
import './style.css';
import { renderSEHero, renderSEHeroPreview, initSEHeroPreview } from './se-hero.js';
import { pauseSEParallaxForZoom } from './se-parallax.js';
import { initCampusLogoOpening } from './liquid-glass-opening.js';
import { initLiquidNavbar, DEFAULT_NAV_ITEMS, NIMBUS_ICONS } from './liquid-glass-navbar.js';
import { SvgFollowScrollTimeline } from './svg-follow-scroll.js';
import { CardFanCarousel } from './card-fan-carousel.js';
import { CAREER_PATHS } from './data-alumni.js';
import { FruitStickerFooterEngine } from './fruit-sticker-footer.js';
import { renderSESections, initSESections } from './se-content.js';
import { renderCSNSections, initCSNSections } from './csn-content.js';
import { renderGITSections, initGITSections } from './git-content.js';
import { renderKERISSections, initKERISSections } from './keris-content.js';
import './mobile.css';

// Ensure manual scroll restoration so hard reloads (Ctrl+Shift+R) land clean at the top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Glyph set for matrix / cyber decoding scramble
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

/**
 * ScrambleIn: Reveals text character-by-character with random glyph decoding
 */
function runScrambleIn(element, text, delay = 0) {
  element.textContent = '\u00A0';
  let frame = 0;
  let timer;

  setTimeout(() => {
    timer = setInterval(() => {
      frame++;
      const revealedChars = Math.floor(frame * 0.5); // 0.5 chars per frame
      let output = '';

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          output += ' ';
        } else if (i < revealedChars) {
          output += text[i];
        } else if (i < revealedChars + 3) {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          break;
        }
      }

      element.textContent = output;

      if (revealedChars >= text.length) {
        clearInterval(timer);
        element.textContent = text;
      }
    }, 25);
  }, delay);
}

/**
 * ScrambleOnHover: Scrambles text while hovered and snaps back on mouseleave
 */
function attachScrambleHover(element) {
  const originalText = element.getAttribute('data-original-text') || element.textContent.trim();
  element.setAttribute('data-original-text', originalText);
  let interval;

  element.addEventListener('mouseenter', () => {
    clearInterval(interval);
    let frame = 0;
    interval = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 4);
      let out = '';
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === ' ') {
          out += ' ';
        } else if (i < revealed) {
          out += originalText[i];
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      element.textContent = out;
      if (revealed >= originalText.length) {
        clearInterval(interval);
      }
    }, 25);
  });

  element.addEventListener('mouseleave', () => {
    clearInterval(interval);
    element.textContent = originalText;
  });
}

// Render Main Hero DOM
document.querySelector('#app').innerHTML = `
  <!-- Fixed Floating Liquid Glass Header (SkillFE: /skillfe-liquid-navbar) -->
  <header class="neural-header">
    <div class="header-left-group">
      <!-- Logo Pill -->
      <button type="button" class="logo-pill" id="logoPill" title="Putar Ulang Animasi Opening Liquid Glass">
        <span class="nimbus-glass" aria-hidden="true"></span>
        <img src="${siteUrl(`/logokampus.png`)}" alt="" class="campus-logo-img" />
        <span class="logo-text">
          <span>UIKA</span>
          <span class="logo-university-name">Universitas Ibn Khaldun Bogor</span>
        </span>
      </button>
    </div>

    <!-- SkillFE: Liquid Glass Floating Waterline Navbar -->
    <div class="header-center-nav" id="liquidNavContainer"></div>

  </header>

  <!-- Bottom-Anchored Split Hero Section -->
  <section class="neural-hero" id="hero">
    <!-- Background Video with Interactive Cursor Head Tracking -->
    <div class="hero-media">
      <video class="hero-video-bg" muted playsinline preload="auto">
        <source src="${siteUrl(`/videohero.mp4`)}" type="video/mp4" />
      </video>
    </div>
    <canvas class="home-bowl-glow" width="96" height="60" data-bowl-theme="home" aria-hidden="true"></canvas>
    <div class="hero-parallax-fade" aria-hidden="true"></div>
    <div class="hero-welcome" id="heroWelcome"></div>

    <!-- Spacer pushing content downwards -->
    <div class="hero-spacer"></div>

    <!-- Bottom Row Split -->
    <div class="hero-split-row">
      <!-- Left Column: Title & Narrative -->
      <div class="hero-left-col">
        <h1 class="hero-heading">
          <span class="scramble-in" id="headLine1"></span><br />
          <span class="scramble-in" id="headLine2"></span>
        </h1>

        <p class="hero-narrative">
          <span class="desktop-copy">Pusat riset komputasi, rekayasa perangkat lunak, arsitektur jaringan, teknologi geospasial, dan kecerdasan buatan terapan melalui 4 laboratorium spesialisasi unggulan.</span>
          <span class="mobile-copy">Riset komputasi di empat laboratorium.<br />Perangkat lunak, jaringan, GIS, dan AI.</span>
        </p>
      </div>

      <!-- Right Column: Counter-Balance & Minimalist 4 Labs -->
      <div class="hero-right-col">
        <h2 class="hero-counter-heading">
          <span class="scramble-in" id="counterLine1"></span><br />
          <span class="scramble-in" id="counterLine2"></span>
        </h2>

        <!-- Minimalist 4 Labs Display -->
        <div class="hero-labs-minimal">
          <div class="lab-min-item" data-lab="se">
            <span class="lab-min-code">SE</span>
            <span class="lab-min-sub">Software Eng.</span>
          </div>

          <div class="lab-min-item" data-lab="csn">
            <span class="lab-min-code">CSN</span>
            <span class="lab-min-sub">Network & Cloud</span>
          </div>

          <div class="lab-min-item" data-lab="git">
            <span class="lab-min-code">GIT</span>
            <span class="lab-min-sub">Geospatial AI</span>
          </div>

          <div class="lab-min-item" data-lab="keris">
            <span class="lab-min-code">KERIS</span>
            <span class="lab-min-sub">Intelligent Sys.</span>
          </div>
        </div>
      </div>
    </div>
    <p class="hero-scroll-hint"><span class="desktop-copy">Scroll kebawah untuk mengenal Informatika UIKA</span><span class="mobile-copy">Gulir untuk menjelajah</span> <span class="hero-scroll-arrow" aria-hidden="true"></span></p>
  </section>

  <!-- Struktur Organisasi & Direktori Dosen (Dark Monochrome & Liquid Glass) -->
  <section class="dosen-org-section" id="dosen">

    <div class="dosen-container">
      <!-- Section Header -->
      <div class="dosen-header">
        <h2 class="dosen-heading" data-home-reveal>
          Struktur <span class="editorial-italic">Organisasi</span> &amp; Direktori <span class="editorial-italic">Dosen</span>
        </h2>
      </div>

      <!-- Stats Counter Strip -->
      <div class="dosen-stats-strip liquid-glass-dark">
        <div class="stat-col">
          <span class="stat-number">${DOSEN_DATA.length}</span>
          <span class="stat-label">Dosen dalam Direktori</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-col">
          <span class="stat-number">4</span>
          <span class="stat-label">Laboratorium Riset</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-col">
          <span class="stat-number">${DOSEN_DATA.filter(d => d.isKaLab).length}</span>
          <span class="stat-label">Kepala Laboratorium</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-col">
          <span class="stat-number">${DOSEN_DATA.filter(d => d.isPimpinan).length}</span>
          <span class="stat-label">Pimpinan Program Studi</span>
        </div>
      </div>

      <!-- View Switcher (SkillFE: Liquid Glass Navbar - /skillfe-liquid-navbar) -->
      <div class="dosen-view-controls">
        <div class="dosen-view-nav-wrapper" id="dosenViewNavContainer"></div>
      </div>

      <!-- Part 1: Bagan Struktur Organisasi -->
      <div class="org-tree-block" id="orgTreeBlock">${renderFacultyOrganization()}</div>

      <!-- Part 2: Direktori Dosen & Peneliti -->
      <div class="dosen-directory-block" id="dosenDirectoryBlock">
        <div class="directory-toolbar-wrap">
          <div class="directory-header-meta">
            <span class="section-tag-mono">KEANGGOTAAN BERDASARKAN MATERI LAB</span>
            <h3 class="directory-title">Direktori Dosen &amp; Peneliti</h3>
          </div>

          <!-- Filter & Search Toolbar -->
          <div class="directory-filter-bar">
            <!-- Lab Filters (SkillFE: Liquid Glass Navbar - /skillfe-liquid-navbar) -->
            <div class="dosen-lab-filter-nav-wrap" id="dosenLabFiltersNav"></div>

            <!-- Search Input -->
            <div class="dosen-search-pill liquid-glass-dark">
              <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                id="dosenSearchInput"
                placeholder="Cari nama, lab, bidang, atau NIDN arsip..."
                aria-label="Cari Dosen"
              />
              <button class="search-clear-btn" id="dosenSearchClear" style="display: none;" title="Hapus pencarian">&times;</button>
            </div>
          </div>
        </div>

        <!-- SkillFE: Curved Cylindrical Drag Carousel (/skillfe-drag-carousel) -->
        <div class="curved-carousel-stage" id="dosenCarouselStage">
          <!-- 3D Cylindrical Track -->
          <div class="curved-carousel-track" id="dosenCarouselTrack"></div>

          <!-- Empty State -->
          <div class="dosen-empty-state liquid-glass-dark" id="dosenEmptyState" style="display: none;"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- =========================================================================
       Part 4: Prestasi & Portofolio Karya Riset
       SkillFE: SVG Follow Scroll (Scroll-Driven Path Stroke Timeline) (/skillfe-svg-follow-scroll)
       ========================================================================= -->
  <section class="prestasi-timeline-section" id="prestasi">
    <div class="prestasi-container">
      
      <!-- Section Header Stage -->
      <div class="timeline-hero-stage">
        <h2 class="timeline-hero-title" data-home-reveal>
          Prestasi Mahasiswa &amp; <br />
          <span class="editorial-italic">Perjalanan Berkarya</span>
        </h2>
        <p class="timeline-hero-desc" data-home-reveal>
          <span class="desktop-copy">Capaian mahasiswa, pendanaan inkubasi, dan pengalaman kompetisi yang tercatat dalam berita resmi serta dokumentasi laboratorium.</span>
          <span class="mobile-copy">Capaian mahasiswa dari kompetisi, program, dan pendanaan.</span>
        </p>
      </div>

      <!-- SVG Follow Scroll Canvas (SkillFE: /skillfe-svg-follow-scroll) -->
      <div class="timeline-svg-wrapper" aria-hidden="true">
        <svg class="timeline-svg-canvas" viewBox="0 0 1200 2400" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur1" />
              <feGaussianBlur stdDeviation="18" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#C2F84F" />
              <stop offset="50%" stop-color="#d7ff7b" />
              <stop offset="100%" stop-color="#67e8f9" />
            </linearGradient>
          </defs>

          <!-- Faint Guide Trajectory Path -->
          <path
            class="timeline-faint-path"
            d="M 600,70 C 780,70 940,110 940,180 C 940,250 800,290 520,290 C 320,290 230,240 230,180 C 230,120 380,85 520,130 C 610,160 660,220 600,290 C 540,350 460,370 460,460 C 460,560 540,620 600,680 C 660,740 740,760 740,850 C 740,950 660,1010 600,1070 C 540,1130 460,1150 460,1240 C 460,1340 540,1400 600,1460 C 660,1520 740,1540 740,1630 C 740,1730 660,1790 600,1850 C 540,1910 470,1930 470,2000 C 470,2070 530,2120 600,2150 C 600,2180 600,2210 600,2240"
            stroke="rgba(0, 0, 0, 0.08)"
            stroke-width="12"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Active Animated Neon Stroke Path -->
          <path
            class="timeline-stroke-path"
            d="M 600,70 C 780,70 940,110 940,180 C 940,250 800,290 520,290 C 320,290 230,240 230,180 C 230,120 380,85 520,130 C 610,160 660,220 600,290 C 540,350 460,370 460,460 C 460,560 540,620 600,680 C 660,740 740,760 740,850 C 740,950 660,1010 600,1070 C 540,1130 460,1150 460,1240 C 460,1340 540,1400 600,1460 C 660,1520 740,1540 740,1630 C 740,1730 660,1790 600,1850 C 540,1910 470,1930 470,2000 C 470,2070 530,2120 600,2150 C 600,2180 600,2210 600,2240"
            stroke="url(#neonGradient)"
            stroke-width="12"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#neon-glow)"
          />

          <!-- Dynamic Leading SVG Cursor Tracking Scroll Progress -->
          <g class="timeline-tip-group" style="opacity: 0; pointer-events: none;">
            <circle class="timeline-cursor-pulse" r="20" fill="#C2F84F" opacity="0.25" />
            <circle r="9" fill="#C2F84F" opacity="0.6" filter="url(#neon-glow)" />
            <path d="M -7,-6 L 9,0 L -7,6 L -3.5,0 Z" fill="#C2F84F" stroke="#ffffff" stroke-width="1.2" />
            <circle r="3" fill="#ffffff" />
          </g>
        </svg>
      </div>

      <!-- Timeline Milestones Vertical Track -->
      <div class="timeline-milestones-track">${renderPrestasiCards()}</div>

    </div>
  </section>

  <!-- Modal Detail Prestasi & Portofolio Karya -->
  <div class="prestasi-modal-overlay" id="prestasiDetailModal" aria-hidden="true">
    <div class="prestasi-modal-backdrop"></div>
    <div class="prestasi-modal-dialog liquid-glass-dark">
      <button class="prestasi-modal-close" aria-label="Tutup Modal">&times;</button>
      
      <div class="modal-header-meta">
        <span class="modal-year-badge" id="modalPrestasiYear"></span>
        <span class="modal-category-badge" id="modalPrestasiCategory"></span>
        <span class="modal-lab-badge badge-se" id="modalPrestasiLab">Software Engineering (SE)</span>
      </div>

      <h3 class="modal-dialog-title" id="modalPrestasiTitle">Detail Capaian</h3>

      <div class="modal-body-scroll">
        <div class="modal-section-block">
          <h4 class="modal-subheading">Tentang Capaian</h4>
          <p class="modal-desc-text" id="modalPrestasiDesc"></p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-subheading">Lingkup Capaian</h4>
          <div class="modal-tech-tags" id="modalPrestasiPillars"></div>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-subheading">Penerima &amp; Tim</h4>
          <div class="modal-team-box" id="modalPrestasiTeam"></div>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-subheading">Catatan Capaian</h4>
          <div class="modal-impact-grid" id="modalPrestasiImpact"></div>
        </div>
        <div class="modal-section-block"><h4 class="modal-subheading">Sumber &amp; Dokumentasi</h4><div id="modalPrestasiSources" class="prestasi-source-list"></div></div>
      </div>

      <div class="modal-footer-action">
        <button class="modal-close-btn">Tutup Jendela</button>
      </div>
    </div>
  </div>

  <!-- Section Prospek Karir & Roadmap Karir Alumni -->
  <!-- SkillFE: Card Fan Carousel (/skillfe-card-fan-carousel) -->
  <section class="alumni-career-section" id="karir">
    <div class="career-background-glow"></div>
    <div class="career-grid-overlay"></div>

    <div class="career-container">
      
      <!-- Section Header Stage -->
      <div class="career-header-stage">
        <h2 class="career-section-title" data-home-reveal>
          Pilihan <span class="editorial-italic">Karier</span> &amp; Langkah <span class="editorial-italic">Pengembangan</span>
        </h2>

        <p class="career-section-desc" data-home-reveal>
          Jelajahi contoh profesi dari empat peminatan, kenali kompetensinya, dan susun langkah belajar sesuai bidang yang ingin kamu tekuni.
        </p>

        <!-- Industrial Impact Metrics Strip -->
        <div class="career-stats-strip liquid-glass-dark">
          <div class="career-stat-item">
            <span class="career-stat-num">4 Lab</span>
            <span class="career-stat-lbl">Peminatan Informatika</span>
          </div>
          <div class="career-stat-divider"></div>
          <div class="career-stat-item">
            <span class="career-stat-num">${CAREER_PATHS.length} Profesi</span>
            <span class="career-stat-lbl">Contoh Jalur Karier</span>
          </div>
          <div class="career-stat-divider"></div>
          <div class="career-stat-item">
            <span class="career-stat-num">4 Tahap</span>
            <span class="career-stat-lbl">Contoh Alur Belajar</span>
          </div>
          <div class="career-stat-divider"></div>
          <div class="career-stat-item">
            <span class="career-stat-num">4 PDF</span>
            <span class="career-stat-lbl">Sumber Materi Peminatan</span>
          </div>
        </div>
      </div>

      <!-- SkillFE: Card Fan Carousel Interactive Stage -->
      <div class="card-fan-stage-wrapper">
        <div class="fan-carousel-viewport">
          <div class="fan-layout">
            <!-- Cards rendered dynamically by CardFanCarousel -->
          </div>
        </div>

        <!-- Pagination Indicator Dots -->
        <div class="fan-controls-bar">
          <div class="fan-dots-wrapper" aria-label="Navigasi pilihan profesi"></div>
        </div>
      </div>

    </div>
  </section>

  <!-- Interactive Alumni Career Roadmap Modal -->
  <div class="career-modal-overlay" id="alumniRoadmapModal" aria-hidden="true">
    <div class="career-modal-backdrop"></div>
    <div class="career-modal-dialog liquid-glass-dark">
      <button class="career-modal-close" aria-label="Tutup Roadmap">&times;</button>
      
      <div class="career-modal-header">
        <div class="modal-alumni-headline">
          <div class="modal-alumni-tags">
            <span class="modal-track-badge" id="modalAlumniTrack"></span>
            <span class="modal-grad-badge" id="modalAlumniGrad">Contoh profesi</span>
          </div>
          <h3 class="modal-alumni-name" id="modalAlumniName">Detail Profesi</h3>
          <p class="modal-alumni-role" id="modalAlumniRole"></p>
        </div>
      </div>

      <div class="career-modal-body">
        <!-- Alumni Quote / Experience -->
        <div class="modal-quote-box">

          <p class="modal-quote-text" id="modalAlumniQuote"></p>
        </div>

        <!-- 4-Stage Timeline Roadmap -->
        <div class="modal-roadmap-section">
          <h4 class="modal-subheading">CONTOH ALUR PENGEMBANGAN KOMPETENSI</h4>
          <p class="career-roadmap-note">Contoh alur belajar, bukan pembagian semester. Sesuaikan dengan minat dan kurikulum yang berlaku.</p><div class="modal-roadmap-timeline" id="modalAlumniRoadmap">
            <!-- Injected dynamically -->
          </div>
        </div>

        <!-- Metrics & Competencies -->
        <div class="modal-skills-metrics-row">
          <div class="modal-skills-col">
            <h4 class="modal-subheading">KOMPETENSI TERKAIT</h4>
            <div class="modal-skills-list" id="modalAlumniSkills"></div>
          </div>
          <div class="modal-salary-col"><h4 class="modal-subheading">SUMBER MATERI</h4><div class="prestasi-source-list" id="modalCareerSources"></div></div>
        </div>
      </div>

      <div class="career-modal-footer">
        <button class="career-modal-action-btn" id="modalCloseActionBtn">Tutup Jendela</button>
      </div>
    </div>
  </div>

  <!-- Lab Matcher Quiz (SkillFE Dark Monochrome & Liquid Glass) -->
  <section class="lab-matcher-section" id="quiz">
    <div class="matcher-sticky-wrapper">
      <div class="matcher-ambient-glow" aria-hidden="true"></div>

      <div class="matcher-container">
        <div class="matcher-header">
          <h2 class="matcher-heading" data-home-reveal>
            Temukan <span class="editorial-italic">Laboratorium</span> Idealmu
          </h2>

          <p class="matcher-subtext" data-home-reveal>
            <span class="desktop-copy">3 pertanyaan singkat untuk menemukan lab yang paling sesuai dengan potensimu.</span>
            <span class="mobile-copy">Jawab 3 pertanyaan untuk menemukan lab yang cocok.</span>
          </p>
        </div>

        <!-- Main Quiz Container (No card around question, liquid glass on options only) -->
        <div class="matcher-card" id="matcherCard">
          <!-- Rendered by initLabMatcherQuiz() -->
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Fruit Sticker Footer (SkillFE: /skillfe-fruit-footer) -->
  <footer class="fsf" id="footer"></footer>

  <!-- Laboratory Detail Sections (Prepared empty as requested) -->
  <section class="lab-detail-section" id="se" data-lab="SE"></section>
  <section class="lab-detail-section" id="csn" data-lab="CSN"></section>
  <section class="lab-detail-section" id="git" data-lab="GIT"></section>
  <section class="lab-detail-section" id="keris" data-lab="KERIS"></section>
`;

// Global lab transition and navigation state
let currentActiveLab = null;
let lastZoomedLab = 'se';
let lastZoomedLabInfo = null;
let lastResultScrollY = 0;
let isZoomingTransition = false;
let labOpenedFromQuiz = false;
let restartLabMatcherQuiz;

// Navigation Index Mapping for SkillFE Liquid Glass Navbar (in order of page flow)
const LAB_NAV_INDEX_MAP = {
  hero: 0,
  beranda: 0,
  dosen: 1,
  prestasi: 2,
  karir: 3,
  quiz: 4,
  se: 5,
  csn: 6,
  git: 7,
  keris: 8
};

// Initialize SkillFE: Liquid Glass Navbar ("Waterline")
const liquidNavContainer = document.getElementById('liquidNavContainer');
let liquidNavInstance = null;

if (liquidNavContainer) {
  liquidNavInstance = initLiquidNavbar({
    container: liquidNavContainer,
    items: DEFAULT_NAV_ITEMS,
    defaultActive: 0,
    tone: 'light',
    syncMobileLayout: true,
   
    onChange: (idx, item) => {
      const targetId = item.id;
      if (['hero', 'se', 'csn', 'git', 'keris', 'quiz', 'dosen', 'prestasi', 'karir'].includes(targetId)) {
        activateLabView(targetId);
      }
    }
  });
}

const syncSectionIds = ['hero', 'dosen', 'prestasi', 'karir', 'quiz'];
const homeHero = document.getElementById('hero');
const homeHeader = liquidNavContainer.closest('.neural-header');
const dosenSectionEl = document.getElementById('dosen');
const mobileHeaderLayout = matchMedia('(max-width: 680px)');
const homeNavSections = syncSectionIds.slice(1).map((id) => document.getElementById(id)).filter(Boolean);
let mobileHeaderFrame = 0;

function updateMobileHeader() {
  const pastHero = mobileHeaderLayout.matches && homeHero.getBoundingClientRect().bottom <= 0;
  homeHeader.classList.toggle('is-past-hero', pastHero);
  // Match the section behind the fixed header, regardless of its total height.
  const headerBottom = pastHero && !currentActiveLab ? homeHeader.offsetHeight : 0;
  const section = headerBottom && homeNavSections.find((element) => {
    const { top, bottom } = element.getBoundingClientRect();
    return top <= headerBottom && bottom > headerBottom;
  });
  if (section) {
    liquidNavInstance?.setActiveIndex(LAB_NAV_INDEX_MAP[section.id], { fromScroll: true });
  }
}

function scheduleMobileHeader() {
  if (!mobileHeaderLayout.matches || mobileHeaderFrame) return;
  mobileHeaderFrame = requestAnimationFrame(() => {
    mobileHeaderFrame = 0;
    updateMobileHeader();
  });
}

const heroHeaderObserver = new IntersectionObserver(scheduleMobileHeader);

function syncMobileHeader() {
  updateMobileHeader();
  if (mobileHeaderLayout.matches) {
    scheduleMobileHeader();
    heroHeaderObserver.observe(homeHero);
    window.addEventListener('scroll', scheduleMobileHeader, { passive: true });
    window.addEventListener('resize', scheduleMobileHeader);
  } else {
    heroHeaderObserver.disconnect();
    window.removeEventListener('scroll', scheduleMobileHeader);
    window.removeEventListener('resize', scheduleMobileHeader);
  }
}

syncMobileHeader();
mobileHeaderLayout.addEventListener('change', syncMobileHeader);

// Auto-sync Liquid Navbar active state on scroll across Beranda sections
syncSectionIds.forEach((secId) => {
  const el = document.getElementById(secId);
  if (el) {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !currentActiveLab && !mobileHeaderLayout.matches) {
        const idx = LAB_NAV_INDEX_MAP[secId];
        if (idx !== undefined && liquidNavInstance) {
          liquidNavInstance.setActiveIndex(idx, { fromScroll: true });
        }
      }
    }, { threshold: 0.3 });
    obs.observe(el);
  }
});

// Dosen Section Scroll Detection: activates Liquid Glass Header theme
if (dosenSectionEl) {
  const dosenObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      document.body.classList.add('in-dosen-section');
    } else {
      document.body.classList.remove('in-dosen-section');
    }
  }, { threshold: 0.12 });
  dosenObserver.observe(dosenSectionEl);
}

// Cyber Scramble Animations for Hero Section
function triggerHeroScrambles() {
  import('./hero-welcome.tsx').then(({ initHeroWelcome }) => initHeroWelcome());
  const h1 = document.getElementById('headLine1');
  const h2 = document.getElementById('headLine2');
  const c1 = document.getElementById('counterLine1');
  const c2 = document.getElementById('counterLine2');
  if (h1) runScrambleIn(h1, 'Teknik', 120);
  if (h2) runScrambleIn(h2, 'Informatika', 380);
  if (c1) runScrambleIn(c1, 'Empat', 620);
  if (c2) runScrambleIn(c2, 'Pilar Lab', 880);
}

// Initial Opening Animation Launch
const initialPath = readSiteRoute();
const initialHash = window.location.hash.toLowerCase();
const isDirectRoute = ['se', 'csn', 'git', 'keris', 'dosen', 'prestasi', 'karir', 'quiz'].includes(initialPath)
  || ['#dosen', '#prestasi', '#karir', '#quiz'].includes(initialHash);
let isOpeningActive = !isDirectRoute;

if (!isDirectRoute) {
  window.scrollTo(0, 0);

  // Launch Liquid Glass Opening Experience with UIKA Campus Logo
  initCampusLogoOpening({
    logoSrc: siteUrl('/logokampus.png'),
    onComplete: () => {
      isOpeningActive = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'instant' });
      }
      triggerHeroScrambles();
    }
  });
} else {
  triggerHeroScrambles();
}

// Allow replaying Liquid Glass Opening on Logo Pill click
const logoPill = document.getElementById('logoPill');
if (logoPill) {
  logoPill.dataset.refract = liquidNavInstance?.navEl.dataset.refract ?? 'off';
  logoPill.addEventListener('click', () => {
    isOpeningActive = true;
    window.scrollTo({ top: 0, behavior: 'instant' });
    history.replaceState(null, '', siteUrl('/'));
    initCampusLogoOpening({
      logoSrc: siteUrl('/logokampus.png'),
      onComplete: () => {
        isOpeningActive = false;
        window.scrollTo({ top: 0, behavior: 'instant' });
        const heroEl = document.getElementById('hero');
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: 'instant' });
        }
        triggerHeroScrambles();
      }
    });
  });
}

// Attach Hover Scramble Micro-interactions
document.querySelectorAll('.scramble-hover').forEach((el) => {
  attachScrambleHover(el);
});

// Load cursor-controlled poses when the character is visible on desktop.
function startHomeHeroTracking() {
  if (mobileHeaderLayout.matches) return;
  mobileHeaderLayout.removeEventListener('change', startHomeHeroTracking);
  initHeroHeadTracking(document.querySelector('.hero-video-bg'));
}

mobileHeaderLayout.addEventListener('change', startHomeHeroTracking);
startHomeHeroTracking();
initMobileHomeBowl(homeHero, mobileHeaderLayout);
initHomeParallax(document.getElementById('hero'));

// ==========================================================================
// Lab Matcher Quiz Engine (SkillFE Dark Monochrome & Liquid Glass)
// ==========================================================================

const QUIZ_QUESTIONS = [
  {
    step: 1,
    category: "MINAT BELAJAR",
    question: "Kegiatan mana yang paling ingin kamu pelajari?",
    options: [
      {
        tag: "A",
        lab: "SE",
        title: "Merancang dan membangun aplikasi",
        description: "Mengubah kebutuhan pengguna menjadi fitur, lalu membuat dan menguji aplikasi web atau mobile."
      },
      {
        tag: "B",
        lab: "CSN",
        title: "Menghubungkan dan mengamankan perangkat",
        description: "Mempelajari cara komputer bertukar data serta cara menjaga jaringan dan server tetap andal."
      },
      {
        tag: "C",
        lab: "GIT",
        title: "Menganalisis peta dan data lokasi",
        description: "Memakai peta digital atau citra satelit untuk memahami pola dan perubahan di suatu wilayah."
      },
      {
        tag: "D",
        lab: "KERIS",
        title: "Mengembangkan sistem yang bisa mengenali pola",
        description: "Melatih model dari data atau menyusun aturan dan pengetahuan agar sistem bisa memberi rekomendasi."
      }
    ]
  },
  {
    step: 2,
    category: "PILIHAN PROYEK",
    question: "Kalau bisa mencoba satu proyek, mana yang paling menarik buatmu?",
    options: [
      {
        tag: "A",
        lab: "SE",
        title: "Aplikasi peminjaman ruang kampus",
        description: "Rancang alur peminjaman, buat fitur cek jadwal, dan uji apakah aplikasinya mudah dipakai."
      },
      {
        tag: "B",
        lab: "CSN",
        title: "Pemantauan jaringan kampus",
        description: "Hubungkan perangkat dan buat peringatan saat koneksi atau server mengalami gangguan."
      },
      {
        tag: "C",
        lab: "GIT",
        title: "Peta interaktif risiko banjir",
        description: "Gabungkan data ketinggian dan riwayat banjir untuk menampilkan wilayah yang berisiko di peta."
      },
      {
        tag: "D",
        lab: "KERIS",
        title: "Model yang mengenali jenis sampah dari foto",
        description: "Siapkan contoh foto, latih model untuk membedakan jenis sampah, lalu uji dengan foto baru."
      }
    ]
  },
  {
    step: 3,
    category: "ARAH KARIER",
    question: "Setelah lulus, pekerjaan seperti apa yang ingin kamu jelajahi?",
    options: [
      {
        tag: "A",
        lab: "SE",
        title: "Software Developer",
        description: "Membangun, menguji, dan memperbaiki aplikasi agar membantu penggunanya."
      },
      {
        tag: "B",
        lab: "CSN",
        title: "Network Engineer",
        description: "Menyiapkan jaringan, memantau koneksi, dan menangani gangguan agar layanan tetap berjalan."
      },
      {
        tag: "C",
        lab: "GIT",
        title: "GIS Analyst",
        description: "Mengolah data lokasi dan membuat peta untuk membantu pengambilan keputusan."
      },
      {
        tag: "D",
        lab: "KERIS",
        title: "Machine Learning Engineer",
        description: "Mengembangkan dan mengevaluasi model yang mengenali pola atau membuat prediksi dari data."
      }
    ]
  }
];

const LAB_PROFILES = {
  SE: {
    code: "SE",
    name: LAB_NAMES.SE,
    tagline: "Arsitektur Sistem & Rekayasa Perangkat Lunak",
    description: "Karakter analitis Anda cocok untuk merancang arsitektur aplikasi modern, clean code, dan platform digital berkinerja tinggi.",
    matchRate: "98%",
    highlightColor: "#d7ff7b", // Cyber Lime (skillfe-highlight-text default)
    path: siteUrl("/se"),
    previewMedia: siteUrl("/assets/fasilitas/se/se_lab_p2_4.png"),
    pillars: [
      "Microservices & Cloud-Native Architecture",
      "Fullstack Web & Cross-Platform Mobile",
      "Clean Code, Design Patterns & CI/CD Pipelines"
    ]
  },
  CSN: {
    code: "CSN",
    name: LAB_NAMES.CSN,
    tagline: "Keamanan Siber & Infrastruktur Cloud",
    description: "Fokus Anda selaras dengan pertahanan siber, keandalan server cloud, dan arsitektur jaringan masa depan.",
    matchRate: "97%",
    highlightColor: "#67e8f9", // Electric Cyan
    path: siteUrl("/csn"),
    previewMedia: siteUrl("/assets/fasilitas/csn/IMG_20261019_153039.jpg"),
    pillars: [
      "Cyber Defense & Penetration Testing",
      "Enterprise Cloud & Hybrid Virtualization",
      "Serverless Architecture & Network Automation"
    ]
  },
  GIT: {
    code: "GIT",
    name: LAB_NAMES.GIT,
    tagline: "Komputasi Spasial & AI Geospasial",
    description: "Minat Anda selaras dengan analitika data spasial bumi, penginderaan citra satelit, dan sistem pemetaan wilayah cerdas.",
    matchRate: "96%",
    highlightColor: "#fef08a", // Sunburst Yellow
    path: siteUrl("/git"),
    previewMedia: siteUrl("/assets/fasilitas/git/IMG_20261019_152912.jpg"),
    pillars: [
      "Satellite Remote Sensing & Earth Observation",
      "Spatial Big Data & AI-driven WebGIS",
      "Smart City Infrastructure & Spatial Modeling"
    ]
  },
  KERIS: {
    code: "KERIS",
    name: LAB_NAMES.KERIS,
    tagline: "Kecerdasan Buatan & Machine Learning",
    description: "Keingintahuan Anda sangat cocok untuk riset deep learning, computer vision, dan pengembangan model AI otonom.",
    matchRate: "99%",
    highlightColor: "#ddd6fe", // Soft Lavender
    path: siteUrl("/keris"),
    previewMedia: siteUrl("/assets/fasilitas/keris/keris_lab_p1_1.png"),
    pillars: [
      "Deep Learning & Artificial Neural Networks",
      "Computer Vision & Pattern Recognition",
      "Natural Language Processing & Generative AI"
    ]
  }
};

async function navigateFromLabFooter(section, labId) {
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  if (!mobileHeaderLayout.matches || !motion.matches) {
    activateLabView(labId);
    return;
  }

  const footer = section.querySelector('.se-contact');
  if (footer.inert) return;
  const sourceUrl = location.href;
  footer.inert = true;
  const exit = footer.animate(
    [{ opacity: 1 }, { opacity: 0, translate: '0 -8px' }],
    { duration: 180, easing: 'ease-in', fill: 'forwards' },
  );

  try {
    await exit.finished;
    if (location.href !== sourceUrl || currentActiveLab !== section.id) return;
    activateLabView(labId);
    if (mobileHeaderLayout.matches && motion.matches) {
      document.getElementById(labId)?.querySelector('.se-hero-wrapper')?.animate(
        [{ opacity: .45, translate: '0 12px' }, { opacity: 1, translate: '0 0' }],
        { duration: 460, easing: 'cubic-bezier(.22, 1, .36, 1)' },
      );
    }
  } finally {
    exit.cancel();
    footer.inert = false;
  }
}

// Switch to a lab or scroll to the selected home section.
function activateLabView(targetLabId, pushUrl = true, { immediate = false } = {}) {
  if (liquidNavInstance && LAB_NAV_INDEX_MAP[targetLabId] !== undefined) {
    liquidNavInstance.setActiveIndex(LAB_NAV_INDEX_MAP[targetLabId]);
  }

  const quizEl = document.getElementById('quiz');
  const dosenEl = document.getElementById('dosen');
  const prestasiEl = document.getElementById('prestasi');
  const karirEl = document.getElementById('karir');
  const footerEl = document.getElementById('footer');
  const heroEl = document.getElementById('hero');
  const labSections = document.querySelectorAll('.lab-detail-section');
  const heroVideo = heroEl ? heroEl.querySelector('video') : null;
  const headerEl = document.querySelector('.neural-header');

  if (targetLabId === 'karir') {
    currentActiveLab = null;
    if (headerEl) headerEl.classList.remove('is-hidden');
    document.body.classList.remove('in-lab-view');
    if (heroEl) {
      heroEl.style.display = '';
      if (heroVideo) heroVideo.pause();
    }
    if (quizEl) quizEl.style.display = 'block';
    if (dosenEl) dosenEl.style.display = 'block';
    if (prestasiEl) prestasiEl.style.display = 'block';
    if (karirEl) karirEl.style.display = 'block';
    if (footerEl) footerEl.style.display = '';
    labSections.forEach(sec => sec.classList.remove('is-active'));
    if (pushUrl) history.pushState(null, '', siteUrl('/#karir'));
    if (karirEl) karirEl.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth' });
    return;
  }

  if (targetLabId === 'prestasi') {
    currentActiveLab = null;
    if (headerEl) headerEl.classList.remove('is-hidden');
    document.body.classList.remove('in-lab-view');
    if (heroEl) {
      heroEl.style.display = '';
      if (heroVideo) heroVideo.pause();
    }
    if (quizEl) quizEl.style.display = 'block';
    if (dosenEl) dosenEl.style.display = 'block';
    if (prestasiEl) prestasiEl.style.display = 'block';
    if (karirEl) karirEl.style.display = 'block';
    if (footerEl) footerEl.style.display = '';
    labSections.forEach(sec => sec.classList.remove('is-active'));
    if (pushUrl) history.pushState(null, '', siteUrl('/#prestasi'));
    if (prestasiEl) prestasiEl.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth' });
    return;
  }

  if (targetLabId === 'dosen') {
    currentActiveLab = null;
    if (headerEl) headerEl.classList.remove('is-hidden');
    document.body.classList.remove('in-lab-view');
    if (heroEl) {
      heroEl.style.display = '';
      if (heroVideo) heroVideo.pause();
    }
    if (quizEl) quizEl.style.display = 'block';
    if (dosenEl) dosenEl.style.display = 'block';
    if (prestasiEl) prestasiEl.style.display = 'block';
    if (karirEl) karirEl.style.display = 'block';
    if (footerEl) footerEl.style.display = '';
    labSections.forEach(sec => sec.classList.remove('is-active'));
    if (pushUrl) history.pushState(null, '', siteUrl('/#dosen'));
    if (dosenEl) dosenEl.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth' });
    return;
  }

  if (targetLabId === 'quiz') {
    currentActiveLab = null;
    if (headerEl) headerEl.classList.remove('is-hidden');
    document.body.classList.remove('in-lab-view');
    if (heroEl) {
      heroEl.style.display = '';
      if (heroVideo) heroVideo.pause();
    }
    if (quizEl) quizEl.style.display = 'block';
    if (dosenEl) dosenEl.style.display = 'block';
    if (prestasiEl) prestasiEl.style.display = 'block';
    if (karirEl) karirEl.style.display = 'block';
    if (footerEl) footerEl.style.display = '';
    labSections.forEach(sec => sec.classList.remove('is-active'));
    if (pushUrl) history.pushState(null, '', siteUrl('/#quiz'));
    if (quizEl) quizEl.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth' });
    return;
  }

  if (targetLabId === 'hero' || targetLabId === 'beranda') {
    currentActiveLab = null;
    if (headerEl) headerEl.classList.remove('is-hidden');
    document.body.classList.remove('in-lab-view');
    if (heroEl) {
      heroEl.style.display = '';
      if (heroVideo) heroVideo.pause();
    }
    if (quizEl) quizEl.style.display = 'block';
    if (dosenEl) dosenEl.style.display = 'block';
    if (prestasiEl) prestasiEl.style.display = 'block';
    if (karirEl) karirEl.style.display = 'block';
    if (footerEl) footerEl.style.display = '';
    labSections.forEach(sec => sec.classList.remove('is-active'));
    if (pushUrl) history.pushState(null, '', siteUrl('/'));
    if (isOpeningActive) {
      window.scrollTo(0, 0);
    } else if (heroEl) {
      heroEl.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth' });
    }
    return;
  }

  const targetSection = document.getElementById(targetLabId);
  if (targetSection) {
    currentActiveLab = targetLabId;
    if (headerEl) headerEl.classList.add('is-hidden');
    document.body.classList.add('in-lab-view');
    renderLabDetailContent(targetSection, targetLabId);

    // Hide hero section completely in laboratory detail sections
    if (heroEl) {
      heroEl.style.display = 'none';
      if (heroVideo && typeof heroVideo.pause === 'function') heroVideo.pause();
    }
    if (quizEl) quizEl.style.display = 'none';
    if (dosenEl) dosenEl.style.display = 'none';
    if (prestasiEl) prestasiEl.style.display = 'none';
    if (karirEl) karirEl.style.display = 'none';
    if (footerEl) footerEl.style.display = 'none';
    labSections.forEach(sec => sec.classList.remove('is-active'));
    targetSection.classList.add('is-active');

    // Distinct path for each lab: /se, /csn, /git, /keris
    if (pushUrl) history.pushState(null, '', siteUrl('/' + targetLabId));

    // Section starts clean at top of page (hero is hidden)
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

/**
 * SkillFE: Aurora Gradient Palettes customized for each Laboratory (/skillfe-aurora-gradient)
 * Features additive color blending, radial base pulse, and desynchronized wander loops
 */
const LAB_AURORA_THEMES = {
  SE: {
    // Software Engineering: Cyber Emerald & Electric Lime & Aqua
    baseColorA: "rgba(16, 185, 129, 0.22)",
    baseColorB: "rgba(6, 182, 212, 0.20)",
    blob1: "rgba(16, 185, 129, 0.42)",   // Emerald-500
    blob2: "rgba(20, 184, 166, 0.38)",   // Teal-500
    blob3: "rgba(190, 242, 100, 0.35)",  // Cyber Lime / #d7ff7b
  },
  CSN: {
    // Computer System Network: Electric Cyan & Sky Blue & Deep Indigo
    baseColorA: "rgba(6, 182, 212, 0.22)",
    baseColorB: "rgba(59, 130, 246, 0.20)",
    blob1: "rgba(6, 182, 212, 0.42)",    // Cyan-500
    blob2: "rgba(59, 130, 246, 0.38)",   // Blue-500
    blob3: "rgba(99, 102, 241, 0.35)",   // Indigo-500
  },
  GIT: {
    // Geospatial Information Technology: Warm Amber & Sunset Rose & Sunburst Gold
    baseColorA: "rgba(245, 158, 11, 0.22)",
    baseColorB: "rgba(244, 63, 94, 0.18)",
    blob1: "rgba(245, 158, 11, 0.42)",   // Amber-500
    blob2: "rgba(244, 63, 94, 0.36)",    // Rose-500
    blob3: "rgba(250, 204, 21, 0.35)",   // Sunburst Gold / #fef08a
  },
  KERIS: {
    // Kelompok Riset Sistem Cerdas (AI): Neural Violet & Cosmic Fuchsia & Deep Purple
    baseColorA: "rgba(139, 92, 246, 0.24)",
    baseColorB: "rgba(217, 70, 239, 0.18)",
    blob1: "rgba(139, 92, 246, 0.45)",   // Violet-500
    blob2: "rgba(217, 70, 239, 0.38)",   // Fuchsia-500
    blob3: "rgba(129, 140, 248, 0.35)",  // Soft Lavender / #ddd6fe
  }
};

/**
 * Deterministic pseudo-random starfield generator (SSR and hydration safe)
 */
function generateAuroraStars(count = 38) {
  function pseudoRandom(seed) {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  }

  let stars = '';
  for (let i = 0; i < count; i++) {
    const posX = (pseudoRandom(i + 1) * 100).toFixed(2);
    const posY = (pseudoRandom(i + 101) * 100).toFixed(2);
    const duration = (pseudoRandom(i + 201) * 3 + 2.5).toFixed(2);
    const delay = (pseudoRandom(i + 301) * 4).toFixed(2);
    const maxOpacity = (pseudoRandom(i + 401) * 0.45 + 0.25).toFixed(2);
    const size = (pseudoRandom(i + 501) * 1.5 + 1.2).toFixed(1);

    stars += `<span class="aurora-star" style="left:${posX}%; top:${posY}%; width:${size}px; height:${size}px; --star-max-opacity:${maxOpacity}; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }
  return stars;
}

/**
 * Render responsive, high-end laboratory detail showcase with SkillFE Aurora Gradient engine
 * and SkillFE: Pure Dark Monochrome (/skillfe-dark-monochrome)
 */
function renderLabDetailContent(sectionEl, labId) {
  const labCode = labId.toUpperCase();
  const labInfo = LAB_PROFILES[labCode];
  if (!labInfo) return;

  const auroraTheme = LAB_AURORA_THEMES[labCode] || LAB_AURORA_THEMES.SE;

  // For SE, build the Minimalist & Elegant Dark Monochrome Hero Section (/skillfe-dark-monochrome)
  const sectionTools = {
    SE: [renderSESections, initSESections],
    CSN: [renderCSNSections, initCSNSections],
    GIT: [renderGITSections, initGITSections],
    KERIS: [renderKERISSections, initKERISSections],
  }[labCode];
  if (sectionTools) {
    if (sectionEl.querySelector('.se-hero-wrapper')) {
      return;
    }

    sectionEl.innerHTML = `
      <div class="lab-detail-page lab-page-${labId}">
        <!-- SkillFE: Atmospheric Living Aurora Gradient Engine (Preserved Background) -->
        <div class="aurora-bg-engine" aria-hidden="true" style="
          --aurora-base-a: ${auroraTheme.baseColorA};
          --aurora-base-b: ${auroraTheme.baseColorB};
          --aurora-blob-1: ${auroraTheme.blob1};
          --aurora-blob-2: ${auroraTheme.blob2};
          --aurora-blob-3: ${auroraTheme.blob3};
        ">
          <!-- Layer 1: Pulsing Base Radial Gradients -->
          <div class="aurora-radial-base"></div>

          <!-- Layer 2: Desynchronized Additive Moving Blur Blobs -->
          <div class="aurora-blobs-layer">
            <div class="aurora-blob aurora-blob-1"></div>
            <div class="aurora-blob aurora-blob-2"></div>
            <div class="aurora-blob aurora-blob-3"></div>
          </div>

          <!-- Layer 3: Twinkling Starlight Field -->
          <div class="aurora-stars-layer">
            ${generateAuroraStars(38)}
          </div>
        </div>

        <!-- SE Laboratory Hero Section (SkillFE: /skillfe-dark-monochrome - Minimalist & Elegant, No Navbar) -->
        ${renderSEHero(false, labInfo)}
      </div>
    `;

    const [renderSections, initSections] = sectionTools;
    sectionEl.querySelector('.lab-detail-page').insertAdjacentHTML('beforeend', renderSections());
    const createCarousel = (stage, track, empty, options) => new CurvedCarousel(stage, track, empty, options);
    initSections(sectionEl, returnFromLab, lab => void navigateFromLabFooter(sectionEl, lab), createCarousel);

    bindLabHomeLinks(sectionEl, labId);

    return;
  }

  // Shared hero for CSN, GIT and KERIS, matching their quiz pill previews.
  if (sectionEl.querySelector('.se-hero-wrapper')) return;

  sectionEl.innerHTML = `
    <div class="lab-detail-page lab-page-${labId}">
      <!-- SkillFE: Atmospheric Living Aurora Gradient Engine -->
      <div class="aurora-bg-engine" aria-hidden="true" style="
        --aurora-base-a: ${auroraTheme.baseColorA};
        --aurora-base-b: ${auroraTheme.baseColorB};
        --aurora-blob-1: ${auroraTheme.blob1};
        --aurora-blob-2: ${auroraTheme.blob2};
        --aurora-blob-3: ${auroraTheme.blob3};
      ">
        <!-- Layer 1: Pulsing Base Radial Gradients -->
        <div class="aurora-radial-base"></div>

        <!-- Layer 2: Desynchronized Additive Moving Blur Blobs (30s, 40s, 50s wander loops) -->
        <div class="aurora-blobs-layer">
          <div class="aurora-blob aurora-blob-1"></div>
          <div class="aurora-blob aurora-blob-2"></div>
          <div class="aurora-blob aurora-blob-3"></div>
        </div>

        <!-- Layer 3: Twinkling Starlight Field -->
        <div class="aurora-stars-layer">
          ${generateAuroraStars(38)}
        </div>
      </div>
      ${renderSEHero(false, labInfo)}
    </div>
  `;

  bindLabHomeLinks(sectionEl, labId);
  sectionEl.querySelector('[data-lab-quiz]')?.addEventListener('click', event => {
    event.preventDefault();
    executePillZoomOutFromLab();
  });
}

function bindLabHomeLinks(sectionEl, labId) {
  sectionEl.querySelectorAll(`#${labId}HeroBackBtn, #${labId}ActionHomeBtn`).forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFromLab();
    });
  });
}

function returnFromLab() {
  if (isZoomingTransition) return;
  if (labOpenedFromQuiz) {
    restartLabMatcherQuiz();
  }

  activateLabView('hero', true, { immediate: true });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.getElementById('hero')?.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }
}

/**
 * Execute Pill Zoom In Transition:
 * Dives directly through the split-pill white aperture on letter 'o' into the respective laboratory section.
 * The screen stays firmly sticky (first on quiz with position:fixed lock, then locked sticky at top of lab)
 * until the zoom in transition completely finishes, after which normal scrolling continues.
 */
function executePillZoomToLab(pillEl, labInfo, onComplete) {
  if (!pillEl || !labInfo) return;
  const targetLabId = labInfo.code.toLowerCase();
  const targetSection = document.getElementById(targetLabId);
  if (!targetSection) return;

  if (isZoomingTransition) return;
  isZoomingTransition = true;

  lastZoomedLab = targetLabId;
  lastZoomedLabInfo = labInfo;

  // 1. Ensure scroll position is safely pinned inside the sticky zone
  const quizSection = document.getElementById('quiz');
  if (quizSection) {
    const totalTrack = quizSection.offsetHeight - window.innerHeight;
    const exitBuffer = 260;
    const safeStickyScroll = quizSection.offsetTop + Math.max(0, totalTrack - exitBuffer);
    if (window.scrollY > safeStickyScroll) {
      window.scrollTo({ top: safeStickyScroll, behavior: 'instant' });
    }
    lastResultScrollY = safeStickyScroll;
  } else {
    lastResultScrollY = window.scrollY;
  }

  // 2. Physically pin the quiz sticky wrapper with position: fixed !important
  const stickyWrapper = document.querySelector('.matcher-sticky-wrapper');
  if (stickyWrapper) {
    stickyWrapper.classList.add('is-zoom-locked');
  }

  // 3. Lock scroll events smoothly via e.preventDefault() without calling window.scrollTo on every tick!
  let isStickyLockActive = true;

  const lockScrollHandler = (e) => {
    if (!isStickyLockActive) return;
    if (e.cancelable) e.preventDefault();
  };

  window.addEventListener('wheel', lockScrollHandler, { passive: false });
  window.addEventListener('touchmove', lockScrollHandler, { passive: false });
  window.addEventListener('keydown', lockScrollHandler, { passive: false });

  // 3. Target the letter anchor element that defines the exact position of letter 'o' in "Laborat[o]rium"
  const targetAnchor = document.querySelector('.pill-letter-anchor') || pillEl;
  const splitPillEl = document.getElementById('resultSplitPill') || pillEl;

  // Clear any temporary transitions or transforms on pill and matcherCard
  splitPillEl.style.transition = 'none';
  const matcherCard = document.getElementById('matcherCard');
  if (matcherCard) {
    matcherCard.style.transform = 'none';
    matcherCard.style.transition = 'none';
    void matcherCard.offsetWidth;
  }
  void targetAnchor.offsetWidth;
  void splitPillEl.offsetWidth;

  // Measure exact sub-pixel bounding boxes
  const anchorRect = targetAnchor.getBoundingClientRect();
  const splitRect = splitPillEl.getBoundingClientRect();

  // The true geometric center of the letter 'o' / split pill aperture
  const pillCenterX = (splitRect && splitRect.width > 0)
    ? (splitRect.left + splitRect.width / 2)
    : (anchorRect.left + anchorRect.width / 2);
  const pillCenterY = (splitRect && splitRect.height > 0)
    ? (splitRect.top + splitRect.height / 2)
    : (anchorRect.top + anchorRect.height / 2);

  const pillW = (splitRect && splitRect.width > 0) ? splitRect.width : (anchorRect.width || 48);
  const pillH = (splitRect && splitRect.height > 0) ? splitRect.height : (anchorRect.height || 28);

  const maxCornerDist = Math.hypot(
    Math.max(pillCenterX, window.innerWidth - pillCenterX),
    Math.max(pillCenterY, window.innerHeight - pillCenterY)
  );
  const targetRadius = Math.ceil(maxCornerDist) + 8;
  const aperture = (rx, ry) => `ellipse(${rx}px ${ry}px at ${pillCenterX}px ${pillCenterY}px)`;
  const startClip = aperture(pillW / 2, pillH / 2);
  const endClip = aperture(targetRadius, targetRadius);

  // 4. Render laboratory content immediately so it's directly visible inside the aperture
  renderLabDetailContent(targetSection, targetLabId);
  // The hero must exist before its glow is painted for the first zoom frame.
  pauseSEParallaxForZoom(targetSection, 'zoom-in');

  // 5. Position target laboratory directly inside the letter aperture via clip-path (no empty white screen!)
  targetSection.classList.add('is-active');
  targetSection.style.position = 'fixed';
  targetSection.style.top = '0';
  targetSection.style.left = '0';
  targetSection.style.width = '100vw';
  targetSection.style.height = '100dvh';
  targetSection.style.zIndex = '60';
  targetSection.style.pointerEvents = 'none';
  targetSection.style.overflow = 'hidden';
  targetSection.style.background = '#fdfdfd';
  targetSection.style.clipPath = startClip;
  targetSection.style.transformOrigin = `${pillCenterX}px ${pillCenterY}px`;
  targetSection.style.transform = 'scale(0.92)';
  targetSection.style.willChange = 'clip-path, transform, opacity';
  targetSection.style.transition = 'none';
  targetSection.scrollTop = 0;
  void targetSection.offsetWidth;

  // 6. Anchor card scaling right at the center of letter 'o'
  if (matcherCard) {
    const cardRect = matcherCard.getBoundingClientRect();
    const originX = pillCenterX - cardRect.left;
    const originY = pillCenterY - cardRect.top;
    matcherCard.style.transformOrigin = `${originX}px ${originY}px`;
    matcherCard.style.willChange = 'transform, opacity';
    matcherCard.style.transition = 'none';
    matcherCard.style.transform = 'none';
    matcherCard.style.opacity = '1';
    void matcherCard.offsetWidth;
  }

  // 7. Dive directly: aperture blossoms from letter 'o' into full lab screen (no white void!)
  const headerEl = document.querySelector('.neural-header');
  if (headerEl) headerEl.classList.add('is-hidden');
  document.body.classList.add('in-lab-view');

  const finish = (animations = []) => {
    activateLabView(targetLabId, true);
    labOpenedFromQuiz = true;

    targetSection.style.position = '';
    targetSection.style.top = '';
    targetSection.style.left = '';
    targetSection.style.width = '';
    targetSection.style.height = '';
    targetSection.style.zIndex = '';
    targetSection.style.clipPath = '';
    targetSection.style.webkitClipPath = '';
    targetSection.style.transform = '';
    targetSection.style.transformOrigin = '';
    targetSection.style.pointerEvents = '';
    targetSection.style.overflow = '';
    targetSection.style.willChange = '';
    targetSection.style.transition = '';

    if (stickyWrapper) {
      stickyWrapper.classList.remove('is-zoom-locked');
    }

    if (matcherCard) {
      matcherCard.style.transform = '';
      matcherCard.style.transformOrigin = '';
      matcherCard.style.opacity = '';
      matcherCard.style.willChange = '';
      matcherCard.style.transition = '';
    }

    delete targetSection.dataset.seEntryTransition;

    animations.forEach(animation => animation.cancel());
    isStickyLockActive = false;
    window.removeEventListener('wheel', lockScrollHandler);
    window.removeEventListener('touchmove', lockScrollHandler);
    window.removeEventListener('keydown', lockScrollHandler);
    isZoomingTransition = false;
    if (typeof onComplete === 'function') onComplete();
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }

  const duration = 1120;
  const fill = 'both';
  const easing = 'cubic-bezier(0.45, 0, 0.45, 1)';
  const animations = [
    targetSection.animate([
      { clipPath: startClip, transform: 'scale(0.92)' },
      { clipPath: endClip, transform: 'scale(1)' },
    ], { duration, easing, fill }),
    targetSection.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 280, easing: 'ease-out', fill,
    }),
  ];
  if (matcherCard) {
    animations.push(matcherCard.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.85)' },
    ], { duration, easing, fill }));
    animations.push(matcherCard.animate([
      { opacity: 1, offset: 0 },
      { opacity: 1, offset: 0.32, easing: 'ease-in-out' },
      { opacity: 0, offset: 0.9 },
      { opacity: 0 },
    ], { duration, fill }));
  }

  // Once the lab fills the screen, the hidden quiz no longer owns input.
  const revealFinished = () => finish(animations);
  animations[0].finished.then(revealFinished, revealFinished);
}

/**
 * Smoothly collapses the /skillfe-pill-reveal back into the original letter 'o'
 * by scrubbing the Web Animations API timeline from 1400ms (stadium pill) to 0ms (closed letter)
 */
function animatePillCollapse(duration = 750, onDone) {
  if (!window.__pillAnimGroup || window.__pillAnimGroup.length === 0) {
    if (typeof onDone === 'function') onDone();
    return;
  }

  const startAnimTime = 1400; // animDuration
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const p = Math.min(1, elapsed / duration);
    // Quartic easeOut for silky, elegant deceleration into the letter
    const ease = 1 - Math.pow(1 - p, 4);
    const currentAnimTime = startAnimTime * (1 - ease);

    window.__pillAnimGroup.forEach(a => {
      a.currentTime = Math.max(0, currentAnimTime);
    });

    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      window.__pillAnimGroup.forEach(a => {
        a.currentTime = 0;
      });
      if (typeof onDone === 'function') onDone();
    }
  }

  requestAnimationFrame(step);
}

/**
 * Execute Pill Zoom Out Transition (Reverse):
 * Iris aperture contracts smoothly from full laboratory view directly back into letter 'o',
 * and the stadium pill smoothly closes into the character 'o' (zero blank white overlay!).
 */
function executePillZoomOutFromLab(onComplete) {
  if (isZoomingTransition) return;

  const labId = currentActiveLab || lastZoomedLab || 'se';
  const targetSection = document.getElementById(labId);
  const quizEl = document.getElementById('quiz');
  const dosenEl = document.getElementById('dosen');
  const matcherCard = document.getElementById('matcherCard');

  if (!quizEl || !targetSection) return;

  isZoomingTransition = true;

  // Preserve the hero before the document scroll returns to the quiz track.
  pauseSEParallaxForZoom(targetSection, 'zoom-out');

  // Ensure result screen exists for this lab if not already rendered
  const resultLab = matcherCard?.querySelector('.result-lab-name')?.dataset.lab;
  if (resultLab?.toLowerCase() !== labId) {
    lastResultScrollY = 0;
    window.__renderQuizResultForLab(labId);
  }

  // Lock user scroll during reverse transition
  const lockScrollDuringZoomOut = (e) => {
    if (e.cancelable) e.preventDefault();
  };
  window.addEventListener('wheel', lockScrollDuringZoomOut, { passive: false });
  window.addEventListener('touchmove', lockScrollDuringZoomOut, { passive: false });
  window.addEventListener('keydown', lockScrollDuringZoomOut, { passive: false });

  // 1. Reveal quiz view underneath
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.style.display = '';
    const heroVideo = heroEl.querySelector('video');
    if (heroVideo) heroVideo.pause();
  }
  quizEl.style.display = 'block';
  if (dosenEl) dosenEl.style.display = 'block';
  const prestasiEl = document.getElementById('prestasi');
  if (prestasiEl) prestasiEl.style.display = 'block';
  const karirEl = document.getElementById('karir');
  if (karirEl) karirEl.style.display = 'block';
  const footerEl = document.getElementById('footer');
  if (footerEl) footerEl.style.display = '';
  quizEl.classList.add('is-result-sticky');

  // 2. Pin quiz card in fixed sticky position
  const stickyWrapper = document.querySelector('.matcher-sticky-wrapper');
  if (stickyWrapper) {
    stickyWrapper.classList.add('is-zoom-locked');
  }

  // 3. Align scroll to the sticky position
  const totalTrack = quizEl.offsetHeight - window.innerHeight;
  const exitBuffer = 260;
  const fallbackScrollY = quizEl.offsetTop + Math.max(0, totalTrack - exitBuffer);
  const restoreScrollY = (lastResultScrollY && lastResultScrollY > 0) ? lastResultScrollY : fallbackScrollY;
  window.scrollTo({ top: restoreScrollY, behavior: 'instant' });

  // Ensure animGroup is locked at full pill expansion
  if (window.__pillAnimGroup) {
    window.__pillAnimGroup.forEach(a => {
      a.currentTime = 1400; // animDuration
    });
  }

  const targetAnchor = document.querySelector('.pill-letter-anchor');
  const splitPill = document.getElementById('resultSplitPill');

  // Force reflow and clear transforms
  if (matcherCard) {
    matcherCard.style.transform = 'none';
    matcherCard.style.transition = 'none';
    void matcherCard.offsetWidth;
  }
  if (targetAnchor) void targetAnchor.offsetWidth;
  if (splitPill) {
    splitPill.style.transition = 'none';
    void splitPill.offsetWidth;
  }

  const anchorRect = targetAnchor ? targetAnchor.getBoundingClientRect() : null;
  const splitRect = splitPill ? splitPill.getBoundingClientRect() : null;

  // True geometric center of letter 'o'
  const pillCenterX = (splitRect && splitRect.width > 0)
    ? (splitRect.left + splitRect.width / 2)
    : (anchorRect ? (anchorRect.left + anchorRect.width / 2) : window.innerWidth / 2);
  const pillCenterY = (splitRect && splitRect.height > 0)
    ? (splitRect.top + splitRect.height / 2)
    : (anchorRect ? (anchorRect.top + anchorRect.height / 2) : window.innerHeight / 2);

  const pillW = (splitRect && splitRect.width > 0) ? splitRect.width : (anchorRect ? anchorRect.width : 48);
  const pillH = (splitRect && splitRect.height > 0) ? splitRect.height : 28;

  const maxCornerDist = Math.hypot(
    Math.max(pillCenterX, window.innerWidth - pillCenterX),
    Math.max(pillCenterY, window.innerHeight - pillCenterY)
  );
  const targetRadius = Math.ceil(maxCornerDist * 1.35);

  // 4. Pin laboratory section on top with full screen clip-path
  targetSection.style.position = 'fixed';
  targetSection.style.top = '0';
  targetSection.style.left = '0';
  targetSection.style.width = '100vw';
  targetSection.style.height = '100vh';
  targetSection.style.zIndex = '60';
  targetSection.style.pointerEvents = 'none';
  targetSection.style.overflow = 'hidden';
  targetSection.style.background = '#fdfdfd';
  targetSection.style.clipPath = `ellipse(${targetRadius}px ${targetRadius}px at ${pillCenterX}px ${pillCenterY}px)`;
  targetSection.style.webkitClipPath = `ellipse(${targetRadius}px ${targetRadius}px at ${pillCenterX}px ${pillCenterY}px)`;
  targetSection.style.transformOrigin = `${pillCenterX}px ${pillCenterY}px`;
  targetSection.style.transform = 'scale(1)';
  targetSection.style.transition = 'none';
  void targetSection.offsetWidth;

  // 5. Prepare matcherCard in zoomed-in state (scale 2.2, opacity 0) anchored exactly at letter 'o'
  if (matcherCard && anchorRect) {
    const cardRect = matcherCard.getBoundingClientRect();
    const originX = pillCenterX - cardRect.left;
    const originY = pillCenterY - cardRect.top;
    matcherCard.style.transformOrigin = `${originX}px ${originY}px`;
    matcherCard.style.willChange = 'transform, opacity';
    matcherCard.style.transition = 'none';
    matcherCard.style.transform = 'scale(2.2)';
    matcherCard.style.opacity = '0';
    void matcherCard.offsetWidth;
  }

  // 6. Direct Iris contraction: lab contracts back into letter 'o' while quiz card zooms back in
  requestAnimationFrame(() => {
    targetSection.style.transition = 'clip-path 1.15s cubic-bezier(0.35, 0, 0.15, 1), -webkit-clip-path 1.15s cubic-bezier(0.35, 0, 0.15, 1), transform 1.15s cubic-bezier(0.35, 0, 0.15, 1)';
    targetSection.style.clipPath = `ellipse(${pillW / 2}px ${pillH / 2}px at ${pillCenterX}px ${pillCenterY}px)`;
    targetSection.style.webkitClipPath = `ellipse(${pillW / 2}px ${pillH / 2}px at ${pillCenterX}px ${pillCenterY}px)`;
    targetSection.style.transform = 'scale(0.92)';

    if (matcherCard) {
      matcherCard.style.transition = 'transform 1.15s cubic-bezier(0.35, 0, 0.15, 1), opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1)';
      matcherCard.style.transform = 'scale(1)';
      matcherCard.style.opacity = '1';
    }
  });

  // 7. Iris meets letter 'o' at 1150ms: hide lab section and gracefully collapse stadium pill into letter 'o'
  setTimeout(() => {
    targetSection.classList.remove('is-active');
    delete targetSection.dataset.seEntryTransition;
    targetSection.style.position = '';
    targetSection.style.top = '';
    targetSection.style.left = '';
    targetSection.style.width = '';
    targetSection.style.height = '';
    targetSection.style.zIndex = '';
    targetSection.style.clipPath = '';
    targetSection.style.webkitClipPath = '';
    targetSection.style.transform = '';
    targetSection.style.transformOrigin = '';
    targetSection.style.pointerEvents = '';
    targetSection.style.overflow = '';
    targetSection.style.willChange = '';
    targetSection.style.transition = '';

    if (typeof window.__onReverseZoomOutComplete === 'function') {
      window.__onReverseZoomOutComplete(() => {
        window.scrollTo({ top: quizEl.offsetTop, behavior: 'instant' });

        if (stickyWrapper) {
          stickyWrapper.classList.remove('is-zoom-locked');
        }
        window.removeEventListener('wheel', lockScrollDuringZoomOut);
        window.removeEventListener('touchmove', lockScrollDuringZoomOut);
        window.removeEventListener('keydown', lockScrollDuringZoomOut);

        if (matcherCard) {
          matcherCard.style.transformOrigin = '';
          matcherCard.style.transform = '';
          matcherCard.style.opacity = '';
          matcherCard.style.willChange = '';
          matcherCard.style.transition = '';
        }

        currentActiveLab = null;
        labOpenedFromQuiz = false;
        isZoomingTransition = false;
        liquidNavInstance?.setActiveIndex(LAB_NAV_INDEX_MAP.quiz);
        const headerEl = document.querySelector('.neural-header');
        if (headerEl) headerEl.classList.remove('is-hidden');
        document.body.classList.remove('in-lab-view');
        const footerEl = document.getElementById('footer');
        if (footerEl) footerEl.style.display = '';
        const karirEl = document.getElementById('karir');
        if (karirEl) karirEl.style.display = 'block';
        history.pushState(null, '', siteUrl('/#quiz'));

        if (typeof onComplete === 'function') onComplete();
      });
    }
  }, 1150);
}

function initLabMatcherQuiz() {
  const container = document.getElementById('matcherCard');
  if (!container) return;

  let currentStep = 0;
  let cleanupStickyEngine;
  const userAnswers = [];
  const quizSection = document.getElementById('quiz');

  restartLabMatcherQuiz = () => {
    cleanupStickyEngine?.();
    cleanupStickyEngine = null;
    quizSection.classList.remove('is-result-sticky');
    quizSection.querySelector('.matcher-sticky-wrapper')?.classList.remove('is-zoom-locked');
    delete window.__pillAnimGroup;
    delete window.__onReverseZoomOutComplete;
    labOpenedFromQuiz = false;
    lastResultScrollY = 0;
    userAnswers.length = 0;
    currentStep = 0;
    renderQuestion(currentStep);
  };

  function renderQuestion(stepIndex) {
    const q = QUIZ_QUESTIONS[stepIndex];
    const totalSteps = QUIZ_QUESTIONS.length;
    const progressPercent = ((stepIndex + 1) / totalSteps) * 100;

    container.innerHTML = `
      <div class="matcher-card-inner">
        <!-- Progress & Step Header -->
        <div class="matcher-progress-header">
          <div class="matcher-step-badge">
            <span class="step-num">0${q.step}</span>
            <span class="step-divider">/</span>
            <span class="step-total">0${totalSteps}</span>
            <span class="step-cat">${q.category}</span>
          </div>

          <div class="matcher-progress-bar-bg">
            <div class="matcher-progress-bar-fill" style="width: ${progressPercent}%;">
              <span class="sparkle-dust sparkle-dust-1" aria-hidden="true">✦</span>
              <span class="sparkle-dust sparkle-dust-2" aria-hidden="true">✧</span>
              <div class="progress-sparkle-head" aria-hidden="true">
                <span class="sparkle-core"></span>
                <span class="sparkle-star">✦</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Title -->
        <h3 class="matcher-question-title">${q.question}</h3>

        <!-- Options Grid -->
        <div class="matcher-options-list" role="radiogroup">
          ${q.options.map((opt, idx) => `
            <button class="matcher-option-btn liquid-glass" data-lab="${opt.lab}" data-index="${idx}">
              <div class="opt-tag-circle">${opt.tag}</div>
              <div class="opt-text-group">
                <span class="opt-title">${opt.title}</span>
                <span class="opt-desc">${opt.description}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Attach click listeners to option buttons
    container.querySelectorAll('.matcher-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedLab = btn.getAttribute('data-lab');
        userAnswers[stepIndex] = selectedLab;

        // Visual click reaction
        btn.classList.add('is-selected');

        setTimeout(() => {
          if (stepIndex < totalSteps - 1) {
            currentStep++;
            renderQuestion(currentStep);
          } else {
            renderResult();
          }
        }, 220);
      });
    });
  }

  function renderResult(preferredLabCode = null) {
    cleanupStickyEngine?.();
    let winningLab = preferredLabCode ? preferredLabCode.toUpperCase() : "SE";
    if (!preferredLabCode) {
      // Tally votes
      const counts = { SE: 0, CSN: 0, GIT: 0, KERIS: 0 };
      userAnswers.forEach((lab) => {
        if (counts[lab] !== undefined) counts[lab]++;
      });

      // Find highest; tiebreak priority if equal
      winningLab = "SE";
      let maxVotes = -1;
      for (const lab of ["KERIS", "SE", "CSN", "GIT"]) {
        if (counts[lab] > maxVotes) {
          maxVotes = counts[lab];
          winningLab = lab;
        }
      }
    }

    const labInfo = LAB_PROFILES[winningLab] || LAB_PROFILES.SE;
    const resultName = labInfo.code === 'KERIS'
      ? labInfo.name.replace(' and Reliable', ' and<br> Reliable')
      : labInfo.name;
    lastZoomedLab = winningLab.toLowerCase();
    lastZoomedLabInfo = labInfo;

    container.innerHTML = `
      <div class="matcher-result-card">
        <span class="result-badge-eyebrow">REKOMENDASI LABORATORIUM</span>
        <h3 class="result-lab-name" data-lab="${labInfo.code}">
          <span class="highlight-wipe" style="--highlight-color: ${labInfo.highlightColor || '#d7ff7b'}; --delay: 0.22s;">
            <span>Laborat</span><span class="pill-letter-anchor" aria-label="o"><span class="pill-letter-char">o</span><span class="split-pill" id="resultSplitPill" aria-hidden="true">${renderSEHeroPreview(LAB_AURORA_THEMES[labInfo.code], generateAuroraStars(12), labInfo)}<span class="hairline-slit"></span></span></span><span>rium</span>
          </span>
          <span class="highlight-wipe" style="--highlight-color: ${labInfo.highlightColor || '#d7ff7b'}; --delay: 0.36s;">${resultName}</span>
        </h3>

        <p class="result-tagline">${labInfo.tagline}</p>

        <p class="result-description">${labInfo.description}</p>

        <!-- Pillars Card (Liquid Glass applied directly here) -->
        <div class="result-pillars-card liquid-glass">
          <span class="pillars-title"><span class="desktop-copy">FOKUS KOMPETENSI UNGGULAN:</span><span class="mobile-copy">FOKUS KOMPETENSI</span></span>
          <div class="pillars-list">
            ${labInfo.pillars.map(p => `
              <div class="pillar-tag">
                <span class="pillar-check">✓</span>
                <span>${p}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Button Pair (Solid Black Primary + Liquid Glass Secondary) -->
        <div class="result-actions-row">
          <a href="${labInfo.path}" class="result-btn-solid" id="exploreLabBtn">
            <span>Eksplorasi Lab ${labInfo.code}</span>
            <span style="font-size: 15px;">→</span>
          </a>

          <button class="result-btn-glass liquid-glass" id="resetQuizBtn">
            <span>Ulangi Quiz</span>
            <span style="font-size: 14px;">↻</span>
          </button>
        </div>

        <!-- Subtle Continuing Scroll Hint -->
        <div class="result-scroll-hint" id="resultScrollHint">
          <span class="hint-arrow">↓</span>
          <span>Scroll terus untuk lanjut ke Struktur Organisasi &amp; Direktori Dosen</span>
        </div>
      </div>
    `;

    // Seamless Bi-directional /skillfe-pill-reveal with Native Sticky Track
    const anchorEl = container.querySelector('.pill-letter-anchor');
    const charEl = container.querySelector('.pill-letter-char');
    const splitPill = document.getElementById('resultSplitPill');
    const hairlineSlit = container.querySelector('.hairline-slit');
    const cleanupHeroPreview = initSEHeroPreview(splitPill);
    const quizSection = document.getElementById('quiz');
    const hintEl = document.getElementById('resultScrollHint');

    let hasZoomed = false;
    const animDuration = 1400; // in milliseconds

    // Enable sticky track on the section and gently align to quiz top
    if (quizSection) {
      quizSection.classList.add('is-result-sticky');
      const targetTop = quizSection.offsetTop;
      if (!isZoomingTransition) window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }

    const anchorAnim = anchorEl.animate([
      { width: '1ch', offset: 0 },
      { width: '1ch', offset: 0.14 },
      { width: '1ch', offset: 0.32 },
      { width: '1.05ch', offset: 0.44 },
      { width: '0.95em', offset: 0.60 },
      { width: '2.3em', offset: 1.0 }
    ], {
      duration: animDuration,
      fill: 'forwards',
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });

    const charAnim = charEl.animate([
      { opacity: 1, transform: 'translate(-50%, -50%) scale(1)', filter: 'blur(0px)', offset: 0 },
      { opacity: 1, transform: 'translate(-50%, -50%) scale(1)', filter: 'blur(0px)', offset: 0.14 },
      { opacity: 0.85, transform: 'translate(-50%, -50%) scale(1.02)', filter: 'blur(0.4px)', offset: 0.24 },
      { opacity: 0.35, transform: 'translate(-50%, -50%) scale(1.05)', filter: 'blur(1.2px)', offset: 0.36 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.08)', filter: 'blur(2.2px)', offset: 0.48 },
      { opacity: 0, transform: 'translate(-50%, -50%) scale(1.08)', filter: 'blur(3px)', offset: 1.0 }
    ], {
      duration: animDuration,
      fill: 'forwards',
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });

    const pillAnim = splitPill.animate([
      { width: '1.5px', opacity: 0, borderColor: 'transparent', boxShadow: 'none', clipPath: 'inset(50% 0)', offset: 0 },
      { opacity: 1, clipPath: 'inset(45% 0)', offset: 0.02 },
      { width: '1.5px', opacity: 1, borderColor: 'transparent', boxShadow: 'none', clipPath: 'inset(0% 0)', offset: 0.14 },
      { width: '0.22em', opacity: 1, borderColor: 'rgba(0, 0, 0, 0.08)', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)', clipPath: 'inset(0% 0)', offset: 0.24 },
      { width: '0.45em', opacity: 1, borderColor: 'rgba(0, 0, 0, 0.10)', boxShadow: 'inset 0 1px 1px #fff, 0 2px 6px rgba(0, 0, 0, 0.05)', clipPath: 'inset(0% 0)', offset: 0.36 },
      { width: '0.95em', opacity: 1, borderColor: 'rgba(0, 0, 0, 0.13)', boxShadow: 'inset 0 1px 2px #fff, 0 2px 10px rgba(0, 0, 0, 0.07)', clipPath: 'inset(0% 0)', offset: 0.60 },
      { width: '2.3em', opacity: 1, borderColor: 'rgba(0, 0, 0, 0.14)', boxShadow: 'inset 0 1px 2px #fff, 0 3px 14px rgba(0, 0, 0, 0.09)', clipPath: 'inset(0% 0)', offset: 1.0 }
    ], {
      duration: animDuration,
      fill: 'forwards',
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });

    const slitAnim = hairlineSlit.animate([
      { opacity: 0, clipPath: 'inset(50% 0)', offset: 0 },
      { opacity: 1, clipPath: 'inset(45% 0)', offset: 0.02 },
      { opacity: 1, clipPath: 'inset(0% 0)', offset: 0.14 },
      { opacity: 0.5, clipPath: 'inset(0% 0)', offset: 0.26 },
      { opacity: 0, clipPath: 'inset(0% 0)', offset: 0.40 },
      { opacity: 0, clipPath: 'inset(0% 0)', offset: 1.0 }
    ], {
      duration: animDuration,
      fill: 'forwards',
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });

    const animGroup = [anchorAnim, charAnim, pillAnim, slitAnim];
    animGroup.forEach(a => a.pause());

    window.__pillAnimGroup = animGroup;

    let autoZoomTriggered = false;

    window.__onReverseZoomOutComplete = (onFinished) => {
      hasZoomed = false;
      autoZoomTriggered = false;
      isProgressActive = false; // Pause sticky scroll updates while pill is collapsing
      if (rafId) cancelAnimationFrame(rafId);

      // Smoothly collapse pill from 1400ms down to 0ms (back to original letter 'o')
      animatePillCollapse(750, () => {
        // Letter 'o' is now 100% restored and intact
        currentProgress = 0;
        targetProgress = 0;
        isProgressActive = true;

        if (splitPill) splitPill.classList.remove('is-clickable');
        if (hintEl) {
          hintEl.innerHTML = '<span class="hint-arrow">↓</span> <span>Scroll terus untuk lanjut ke Struktur Organisasi &amp; Direktori Dosen</span>';
          hintEl.classList.remove('is-visible');
        }

        // Resume normal sticky scroll loop
        rafId = requestAnimationFrame(updateStickyScroll);
        window.addEventListener('scroll', onWindowScrollGuard, { passive: true });

        if (typeof onFinished === 'function') onFinished();
      });
    };

    // Synchronous Scroll Guard: catches high-speed wheel/touchpad flicks before unsticking can occur
    const onWindowScrollGuard = () => {
      if (!isProgressActive || hasZoomed || isZoomingTransition || currentActiveLab) return;
      if (!quizSection) return;

      const totalTrack = quizSection.offsetHeight - window.innerHeight;
      const exitBuffer = 260;
      const safeMaxScroll = quizSection.offsetTop + Math.max(0, totalTrack - exitBuffer);

      if (window.scrollY >= safeMaxScroll) {
        window.scrollTo({ top: safeMaxScroll, behavior: 'instant' });
        currentProgress = 1;
        targetProgress = 1;
        animGroup.forEach(a => a.currentTime = animDuration);
        triggerZoomToLab();
      }
    };
    window.addEventListener('scroll', onWindowScrollGuard, { passive: true });

    const triggerZoomToLab = () => {
      if (isZoomingTransition) return;
      hasZoomed = true;
      autoZoomTriggered = true;
      isProgressActive = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onWindowScrollGuard);

      // Lock current animation frame firmly at full pill expansion (100%)
      animGroup.forEach(a => {
        a.currentTime = animDuration;
      });

      // Force synchronous reflow on the letter anchor & split pill
      void anchorEl.offsetWidth;
      void splitPill.offsetWidth;

      // Save exact sticky scroll position for seamless reverse alignment
      lastResultScrollY = window.scrollY;

      executePillZoomToLab(splitPill, labInfo);
    };

    // Make splitPill clickable to enter lab directly when expanded
    splitPill.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerZoomToLab();
    });

    // Native Sticky Track Progress Loop with Soft Cushioned Entry & Exit
    let currentProgress = 0;
    let targetProgress = 0;
    let isProgressActive = true;
    let rafId = null;

    const updateStickyScroll = () => {
      if (!isProgressActive || hasZoomed) return;

      if (quizSection && !currentActiveLab && !isZoomingTransition) {
        const rect = quizSection.getBoundingClientRect();
        const totalTrack = quizSection.offsetHeight - window.innerHeight;

        let rawP = 0;
        const enterBuffer = 70;
        const exitBuffer = 260;
        const safeMaxScroll = quizSection.offsetTop + Math.max(0, totalTrack - exitBuffer);

        if (totalTrack > 0) {
          const scrolled = -rect.top;
          // Soft cushions: 70px buffer upon entering and 260px buffer before exiting
          const animTravel = Math.max(1, totalTrack - enterBuffer - exitBuffer);

          if (scrolled <= enterBuffer) {
            rawP = 0;
          } else if (scrolled >= totalTrack - exitBuffer) {
            rawP = 1;
            if (window.scrollY > safeMaxScroll) {
              window.scrollTo({ top: safeMaxScroll, behavior: 'instant' });
            }
          } else {
            rawP = (scrolled - enterBuffer) / animTravel;
          }

          targetProgress = Math.max(0, Math.min(1, rawP));
        }

        if (rawP >= 1) {
          // Fast-scroll bypass: immediately complete the pill expansion
          currentProgress = 1;
        } else {
          // Dynamic adaptive smoothing: responds quickly to fast scrolls without lagging behind
          const delta = Math.abs(targetProgress - currentProgress);
          const lerpFactor = delta > 0.4 ? 0.35 : (delta > 0.15 ? 0.22 : 0.15);
          currentProgress += (targetProgress - currentProgress) * lerpFactor;

          if (Math.abs(targetProgress - currentProgress) < 0.001) {
            currentProgress = targetProgress;
          }
        }

        const animTime = Math.max(0, Math.min(animDuration, currentProgress * animDuration));
        animGroup.forEach(a => {
          a.currentTime = animTime;
        });

        if (currentProgress >= 0.88) {
          splitPill.classList.add('is-clickable');
          if (hintEl) hintEl.classList.add('is-visible');
        } else {
          splitPill.classList.remove('is-clickable');
          if (hintEl) hintEl.classList.remove('is-visible');
        }

        // Reset autoZoomTriggered if user reversed back up
        if (currentProgress < 0.85) {
          autoZoomTriggered = false;
        }

        // Trigger zoom in transition smoothly once pill stadium expansion is genuinely complete
        const isAnimFinished = (currentProgress >= 0.985) || (targetProgress >= 1 && currentProgress >= 0.96);
        if (isAnimFinished && !hasZoomed && !autoZoomTriggered && !isZoomingTransition) {
          hasZoomed = true;
          autoZoomTriggered = true;
          isProgressActive = false;
          if (rafId) cancelAnimationFrame(rafId);
          window.removeEventListener('scroll', onWindowScrollGuard);
          currentProgress = 1;
          animGroup.forEach(a => {
            a.currentTime = animDuration;
          });
          if (hintEl) {
            hintEl.innerHTML = '<span class="hint-arrow">✦</span> <span>Memasuki Laboratorium...</span>';
            hintEl.classList.add('is-visible');
          }
          triggerZoomToLab();
        }
      }

      if (isProgressActive && !hasZoomed) {
        rafId = requestAnimationFrame(updateStickyScroll);
      }
    };

    rafId = requestAnimationFrame(updateStickyScroll);

    cleanupStickyEngine = () => {
      cleanupHeroPreview();
      isProgressActive = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onWindowScrollGuard);
      animGroup.forEach(a => a.cancel());
    };

    const exploreBtn = document.getElementById('exploreLabBtn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerZoomToLab();
      });
    }

    const resetBtn = document.getElementById('resetQuizBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        restartLabMatcherQuiz();
        quizSection.scrollIntoView({ behavior: 'instant' });
      });
    }
  }

  window.__renderQuizResultForLab = (code) => renderResult(code);

  // Initial render
  renderQuestion(currentStep);
}

// Mount Quiz Engine
initLabMatcherQuiz();

/**
 * Faculty Directory Dataset (Teknik Informatika UIKA Bogor)
 */


/**
 * SkillFE: Curved Cylindrical Drag Carousel (/skillfe-drag-carousel)
 * Mathematical cylinder projection, 1:1 pointer tracking, momentum coasting,
 * dynamic quad distortion, and seamless infinite looping for faculty cards.
 */
class CurvedCarousel {
  constructor(stageEl, trackEl, emptyEl, options = {}) {
    this.stage = stageEl;
    this.track = trackEl;
    this.emptyState = emptyEl;
    this.data = options.data || [];
    this.renderCard = options.renderCard || null;
    this.centerInStage = options.centerInStage || false;
    this.uniqueSmallSets = options.uniqueSmallSets || false;
    this.cardWidth = options.cardWidth ?? 305;
    this.mobileHeightScale = options.mobileHeightScale ?? 1;
    this.pitch = this.cardWidth + (options.cardGap ?? 0);
    this.autoSpeed = -40; // units/sec (continuous drift from right to left)
    this.isPaused = false;

    this.scrollX = 0;
    this.velocity = 0;
    this.isDragging = false;
    this.isCoasting = false;
    this.isHovered = false;
    this.lastPointerX = 0;
    this.lastTime = performance.now();
    this.dragDistance = 0;
    this.justDragged = false;
    this.animId = null;
    this.inViewport = false;
    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.inViewport = entry.isIntersecting;
      this.syncLoop();
    }, { rootMargin: '160px' });
    this.visibilityObserver.observe(this.stage);
    this.onVisibilityChange = () => this.syncLoop();
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.initEvents();
    this.setData(this.data);
  }

  getUnitScale() {
    const stageW = (this.stage && this.stage.clientWidth > 0) ? this.stage.clientWidth : (window.innerWidth > 0 ? window.innerWidth : 1200);
    if (window.innerWidth <= 640) {
      return Math.min(Math.max(stageW / 480, 0.78), 1, stageW / this.cardWidth);
    }
    if (window.innerWidth <= 820) {
      return Math.max(Math.min(stageW / 760, 1), 0.82);
    }
    return Math.max(Math.min(stageW / 1380, 1.05), 0.85);
  }

  scrollByOffset(deltaX) {
    this.isCoasting = true;
    this.velocity = deltaX * 2.8;
    this.scrollX += deltaX;
  }

  setData(dataList) {
    this.data = dataList || [];
    if (this.data.length === 0) {
      if (this.track) this.track.innerHTML = '';
      if (this.emptyState) this.emptyState.style.display = 'flex';
      return;
    }

    if (this.emptyState) this.emptyState.style.display = 'none';

    // To ensure seamless cylindrical looping without empty gaps, repeat if few items:
    let repeatCount = 1;
    if (this.data.length < 9 && !(this.uniqueSmallSets && this.data.length < 3)) {
      repeatCount = Math.ceil(10 / this.data.length);
    }
    this.displayList = [];
    for (let r = 0; r < repeatCount; r++) {
      this.displayList.push(...this.data);
    }

    this.totalCards = this.displayList.length;
    this.totalWidth = this.totalCards * this.pitch;

    this.renderDOM();
  }

  renderDOM() {
    if (!this.track) return;
    this.track.innerHTML = this.displayList.map((d, idx) => this.renderCard ? this.renderCard(d, idx) : renderDirectoryFacultyCard(d, idx)).join('');

    this.cardElements = Array.from(this.track.children);

    // Attach copy email & lab links
    this.track.querySelectorAll('.dosen-contact-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.justDragged) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const email = btn.getAttribute('data-email');
        if (!email) return;
        navigator.clipboard.writeText(email).then(() => {
          const textSpan = btn.querySelector('.email-text');
          if (textSpan) {
            const originalText = textSpan.textContent;
            textSpan.textContent = 'Tersalin!';
            btn.classList.add('is-copied');
            setTimeout(() => {
              textSpan.textContent = originalText;
              btn.classList.remove('is-copied');
            }, 1800);
          }
        });
      });
    });

    this.track.querySelectorAll('[data-lab-target]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (this.justDragged) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const targetLab = link.getAttribute('data-lab-target');
        if (targetLab) activateLabView(targetLab);
      });
    });
  }

  initEvents() {
    const el = this.stage;
    if (!el) return;

    el.addEventListener('pointerdown', (e) => {
      if (this.renderCard && e.target.closest('button, a, input')) return;
      this.isDragging = true;
      this.isCoasting = false;
      this.velocity = 0;
      this.dragDistance = 0;
      this.lastPointerX = e.clientX;
      this.lastTime = performance.now();
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
      el.style.cursor = 'grabbing';
    });

    el.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const now = performance.now();
      const dt = Math.max((now - this.lastTime) / 1000, 0.005);
      const u = Math.max(this.getUnitScale(), 0.5);
      const dx = e.clientX - this.lastPointerX;
      this.dragDistance += Math.abs(dx);
      const dxUnits = dx / u;

      if (!isNaN(dxUnits)) {
        this.scrollX += dxUnits;
        this.velocity = dxUnits / dt;
      }

      this.lastPointerX = e.clientX;
      this.lastTime = now;
    });

    const endDrag = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.isCoasting = true;
      if (this.dragDistance > 6) {
        this.justDragged = true;
        setTimeout(() => { this.justDragged = false; }, 220);
      }
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
      el.style.cursor = 'grab';
    };

    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);

    // Hover slowdown UX
    el.addEventListener('pointerenter', () => { this.isHovered = true; });
    el.addEventListener('pointerleave', () => { this.isHovered = false; });
  }

  syncLoop() {
    if (!this.inViewport || document.hidden) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
      return;
    }
    if (this.animId !== null) return;

    const loop = (currentTime) => {
      this.animId = null;
      if (!this.inViewport || document.hidden) return;
      let dt = (currentTime - this.lastTime) / 1000;
      if (isNaN(dt) || dt <= 0 || dt > 0.1) dt = 0.016;
      this.lastTime = currentTime;
      const u = Math.max(this.getUnitScale(), 0.5);

      if (!this.isDragging) {
        if (this.isCoasting) {
          // Exponential velocity decay (~95% per second)
          this.velocity *= Math.pow(0.05, dt);
          if (isNaN(this.velocity)) this.velocity = 0;
          this.scrollX += this.velocity * dt;

          const activeSpeed = this.isPaused ? 0 : (this.isHovered ? -12 : this.autoSpeed);
          if (Math.abs(this.velocity) < Math.abs(activeSpeed) + 5) {
            this.isCoasting = false;
            this.velocity = activeSpeed;
          }
        } else {
          const activeSpeed = this.isPaused ? 0 : (this.isHovered ? -12 : this.autoSpeed);
          this.scrollX += activeSpeed * dt;
        }
      }

      if (isNaN(this.scrollX)) this.scrollX = 0;

      if (this.totalWidth > 0) {
        this.scrollX = ((this.scrollX % this.totalWidth) + this.totalWidth) % this.totalWidth;
      }

      this.updatePositions(u);
      this.animId = requestAnimationFrame(loop);
    };

    this.lastTime = performance.now();
    this.animId = requestAnimationFrame(loop);
  }

  updatePositions(u) {
    const heightScale = mobileHeaderLayout.matches ? this.mobileHeightScale : 1;
    if (!this.cardElements || this.cardElements.length === 0) return;
    const safeU = Math.max(u || 0.85, 0.5);
    const halfSpan = this.totalWidth / 2;
    const originX = this.centerInStage ? this.stage.clientWidth / 2 - 720 * safeU : 0;

    this.cardElements.forEach((card, i) => {
      let rawOffset = (i * this.pitch + this.scrollX) % this.totalWidth;
      if (rawOffset > halfSpan) rawOffset -= this.totalWidth;
      if (rawOffset < -halfSpan) rawOffset += this.totalWidth;
      if (this.uniqueSmallSets && this.data.length < 3) {
        rawOffset = (i - (this.data.length - 1) / 2) * this.pitch;
      }

      // Mathematical Cylinder Projection
      const t = rawOffset;
      const centerDist = t / 706;
      const x = 720 + t * (1 + 0.083 * centerDist * centerDist);
      const d = Math.abs(x - 720) / 706;

      // Culling: if completely off-screen beyond borders, hide
      if (x < -240 || x > 1680) {
        card.style.display = 'none';
        return;
      }
      card.style.display = 'block';

      const cardW = this.cardWidth;
      const cardCenterY = (245 - 12 * d * d) * heightScale;

      // Non-symmetric Quad Distortion (Edge Heights)
      const leftEdgeQ = Math.abs((x - cardW / 2) - 720) / 706;
      const rightEdgeQ = Math.abs((x + cardW / 2) - 720) / 706;
      const leftH = (365 + 75 * Math.pow(leftEdgeQ, 2.6)) * heightScale;
      const rightH = (365 + 75 * Math.pow(rightEdgeQ, 2.6)) * heightScale;
      const maxH = Math.max(leftH, rightH);

      // Positioning
      card.style.position = 'absolute';
      card.style.left = `${originX + (x - cardW / 2) * safeU}px`;
      card.style.top = `${(cardCenterY - maxH / 2) * safeU}px`;
      card.style.width = `${cardW * safeU}px`;
      card.style.height = `${maxH * safeU}px`;
      card.style.zIndex = Math.round(100 - d * 50);
      card.style.opacity = Math.max(0.18, 1 - Math.pow(d, 3) * 0.85);
      card.style.borderRadius = `${18 * safeU}px`;

      // Dynamic Quad clip-path with 15u corner rounding
      const r = 15 * safeU;
      const topL = ((maxH - leftH) * safeU) / 2;
      const btmL = topL + leftH * safeU;
      const topR = ((maxH - rightH) * safeU) / 2;
      const btmR = topR + rightH * safeU;
      const wPx = cardW * safeU;

      if (wPx > 60 && maxH > 60) {
        try {
          card.style.clipPath = `path('M ${r} ${topL} L ${wPx - r} ${topR} Q ${wPx} ${topR} ${wPx} ${topR + r} L ${wPx} ${btmR - r} Q ${wPx} ${btmR} ${wPx - r} ${btmR} L ${r} ${btmL} Q 0 ${btmL} 0 ${btmL - r} L 0 ${topL + r} Q 0 ${topL} ${r} ${topL} Z')`;
        } catch (_) {
          card.style.clipPath = 'none';
        }
      } else {
        card.style.clipPath = 'none';
      }
    });
  }

  destroy() {
    this.visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }
}

/**
 * Initialize Direktori Dosen & Struktur Organisasi
 */
function initDosenDirectory() {
  const orgBlock = document.getElementById('orgTreeBlock');
  const directoryBlock = document.getElementById('dosenDirectoryBlock');
  const searchInput = document.getElementById('dosenSearchInput');
  const searchClear = document.getElementById('dosenSearchClear');

  const stage = document.getElementById('dosenCarouselStage');
  const track = document.getElementById('dosenCarouselTrack');
  const emptyStateEl = document.getElementById('dosenEmptyState');
  const dosenViewNavContainer = document.getElementById('dosenViewNavContainer');
  const dosenLabFiltersNav = document.getElementById('dosenLabFiltersNav');

  let activeFilter = 'ALL';
  let searchQuery = '';
  let dosenCarousel = null;
  let dosenViewNav = null;
  let dosenLabNavInstance = null;

  // Ensure initial display state is explicit
  if (orgBlock) orgBlock.style.display = 'block';
  if (directoryBlock) directoryBlock.style.display = 'block';

  // Mount SkillFE: Liquid Glass Navbar ("Waterline") — /skillfe-liquid-navbar
  if (dosenViewNavContainer) {
    dosenViewNav = initLiquidNavbar({
      container: dosenViewNavContainer,
      syncMobileLayout: true,
      items: [
        { id: 'all', label: 'Semua Tampilan', icon: NIMBUS_ICONS.grid, fx: 'glow' },
        { id: 'org', label: 'Struktur Organisasi', icon: NIMBUS_ICONS.tree, fx: 'spin' },
        { id: 'directory', label: 'Direktori Dosen', icon: NIMBUS_ICONS.users, fx: 'drop' }
      ],
      defaultActive: 0,
      tone: 'light',
     
      onChange: (idx, item) => {
        const view = item.id;
        if (view === 'all') {
          if (orgBlock) orgBlock.style.display = 'block';
          if (directoryBlock) directoryBlock.style.display = 'block';
        } else if (view === 'org') {
          if (orgBlock) orgBlock.style.display = 'block';
          if (directoryBlock) directoryBlock.style.display = 'none';
        } else if (view === 'directory') {
          if (orgBlock) orgBlock.style.display = 'none';
          if (directoryBlock) directoryBlock.style.display = 'block';
        }

        if (dosenCarousel) {
          requestAnimationFrame(() => {
            const u = dosenCarousel.getUnitScale();
            dosenCarousel.updatePositions(u);
          });
        }

        if (dosenLabNavInstance) {
          requestAnimationFrame(() => {
            dosenLabNavInstance.measure?.();
          });
        }
      }
    });
  }

  // Mount Lab Filters via SkillFE: Liquid Glass Navbar — /skillfe-liquid-navbar
  if (dosenLabFiltersNav) {
    dosenLabNavInstance = initLiquidNavbar({
      container: dosenLabFiltersNav,
      syncMobileLayout: true,
      items: [
        { id: 'ALL', label: `Semua (${DOSEN_DATA.length})`, icon: NIMBUS_ICONS.grid, fx: 'glow' },
        { id: 'SE', label: `SE (${DOSEN_DATA.filter(d => d.labCode === 'SE').length})`, icon: NIMBUS_ICONS.code, fx: 'pop' },
        { id: 'CSN', label: `CSN (${DOSEN_DATA.filter(d => d.labCode === 'CSN').length})`, icon: NIMBUS_ICONS.server, fx: 'spin' },
        { id: 'GIT', label: `GIT (${DOSEN_DATA.filter(d => d.labCode === 'GIT').length})`, icon: NIMBUS_ICONS.globe, fx: 'plane' },
        { id: 'KERIS', label: `KERIS (${DOSEN_DATA.filter(d => d.labCode === 'KERIS').length})`, icon: NIMBUS_ICONS.brain, fx: 'drop' },
        { id: 'PIMPINAN', label: `Pimpinan Prodi (${DOSEN_DATA.filter(d => d.isPimpinan).length})`, icon: NIMBUS_ICONS.user, fx: 'wave' }
      ],
      defaultActive: 0,
      tone: 'light',
     
      onChange: (idx, item) => {
        activeFilter = item.id || 'ALL';
        renderCarousel();
      }
    });
  }

  // Render cards in curved cylindrical carousel
  function renderCarousel() {
    const filtered = filterFaculty(DOSEN_DATA, activeFilter, searchQuery);

    if (filtered.length === 0) {
      if (emptyStateEl) {
        emptyStateEl.style.display = 'flex';
        emptyStateEl.innerHTML = `
          <div class="empty-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h4 class="empty-title">Tidak Ada Dosen Ditemukan</h4>
          <p class="empty-subtext">Tidak ada data dosen atau peneliti yang cocok dengan kata kunci "<strong>${escapeHtml(searchQuery)}</strong>".</p>
          <button class="empty-reset-btn" id="emptyResetFilterBtn">Reset Filter &amp; Pencarian</button>
        `;

        const emptyResetBtn = document.getElementById('emptyResetFilterBtn');
        if (emptyResetBtn) {
          emptyResetBtn.addEventListener('click', () => {
            activeFilter = 'ALL';
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            if (searchClear) searchClear.style.display = 'none';
            if (dosenLabNavInstance) {
              dosenLabNavInstance.setActiveIndex(0);
            }
            renderCarousel();
          });
        }
      }
      if (dosenCarousel) dosenCarousel.setData([]);
      return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';

    if (!dosenCarousel && stage && track) {
      dosenCarousel = new CurvedCarousel(stage, track, emptyStateEl, { data: filtered });
    } else if (dosenCarousel) {
      dosenCarousel.setData(filtered);
    }
  }

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClear) {
        searchClear.style.display = searchQuery ? 'block' : 'none';
      }
      renderCarousel();
    });
  }

  // Clear Search
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClear.style.display = 'none';
      renderCarousel();
    });
  }

  // Listen to lab target links in Org Chart
  document.querySelectorAll('#orgTreeBlock [data-lab-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLab = link.getAttribute('data-lab-target');
      if (targetLab) activateLabView(targetLab);
    });
  });

  // Helper escape
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Initial render
  renderCarousel();
}

// Mount Faculty Directory Engine
initDosenDirectory();

// Mount SVG Follow Scroll Timeline Engine (SkillFE: /skillfe-svg-follow-scroll)
const prestasiTimeline = new SvgFollowScrollTimeline('#prestasi');

/**
 * Alumni Career Roadmap Modal & Card Fan Carousel Interaction
 */
function openAlumniRoadmapModal(data) {
  populateCareerModal(data);
}

// Setup Modal Close Handlers
const alumniModal = document.getElementById('alumniRoadmapModal');
if (alumniModal) {
  const closeBtn = alumniModal.querySelector('.career-modal-close');
  const backdrop = alumniModal.querySelector('.career-modal-backdrop');
  const actionBtn = document.getElementById('modalCloseActionBtn');

  const closeIt = () => {
    alumniModal.classList.remove('is-open');
    alumniModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeIt);
  if (backdrop) backdrop.addEventListener('click', closeIt);
  if (actionBtn) actionBtn.addEventListener('click', closeIt);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && alumniModal.classList.contains('is-open')) {
      closeIt();
    }
  });
}

// Mount Card Fan Carousel Engine (SkillFE: /skillfe-card-fan-carousel)
const alumniCarousel = new CardFanCarousel('#karir', CAREER_PATHS, {
  onSelect: (data) => openAlumniRoadmapModal(data)
});

// Mount Fruit Sticker Footer Engine (SkillFE: /skillfe-fruit-footer)
const fruitFooter = new FruitStickerFooterEngine('#footer', {
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
  background: "linear-gradient(to bottom, #f9fafc, #f8fafc)",
  stickers: [
    { fruit: "chip", x: 2, y: 66, size: 0.92, rotate: -8 },
    { fruit: "code", x: 11, y: 98, size: 0.72, rotate: 10 },
    { fruit: "cyber", x: 63, y: -28, size: 0.64, rotate: -10, shape: "oval", behind: true },
    { fruit: "ai", x: 99, y: 84, size: 0.58, rotate: 6, shape: "oval" },
    { fruit: "satellite", x: 88, y: -26, size: 0.68, rotate: 12, behind: true },
  ],
});

observeSectionReveals(document.querySelectorAll('[data-home-reveal]'));

// Route handler for distinct paths: /se, /csn, /git, /keris, /#dosen, /#prestasi, /#karir, /#quiz or / (Beranda)
function handleInitialRoute() {
  // If opening is active (e.g. initial visit or Ctrl+Shift+R reload), always initialize cleanly on Hero
  if (isOpeningActive) {
    activateLabView('hero', false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  const path = readSiteRoute();
  const hash = window.location.hash.toLowerCase();

  if (['se', 'csn', 'git', 'keris'].includes(path)) {
    activateLabView(path, false);
  } else if (hash === '#prestasi' || path === 'prestasi') {
    activateLabView('prestasi', false, { immediate: true });
  } else if (hash === '#karir' || path === 'karir') {
    activateLabView('karir', false, { immediate: true });
  } else if (hash === '#dosen' || path === 'dosen') {
    activateLabView('dosen', false, { immediate: true });
  } else if (hash === '#quiz' || path === 'quiz') {
    if (currentActiveLab && ['se', 'csn', 'git', 'keris'].includes(currentActiveLab)) {
      executePillZoomOutFromLab();
    } else {
      activateLabView('quiz', false, { immediate: true });
    }
  } else {
    // Default Beranda (/)
    activateLabView('hero', false);
  }
}

window.addEventListener('popstate', handleInitialRoute);
handleInitialRoute();

// Global scroll-up detection when user is inside an active laboratory section to reverse zoom transition
let lastTouchY = 0;
let startTouchX = 0;
let isTouchActive = false;
let mobileReverseGesture = false;

window.addEventListener('touchstart', (e) => {
  if (e.touches && e.touches.length > 0) {
    lastTouchY = e.touches[0].clientY;
    startTouchX = e.touches[0].clientX;
    isTouchActive = true;
    mobileReverseGesture = Boolean(labOpenedFromQuiz && window.scrollY <= 4 && e.touches.length === 1);
  }
}, { passive: true });

window.addEventListener('touchend', () => {
  isTouchActive = false;
}, { passive: true });

window.addEventListener('touchcancel', () => {
  isTouchActive = false;
}, { passive: true });

function handleLabScrollUpIntent(e) {
  if (!currentActiveLab || isZoomingTransition) return;
  if (!['se', 'csn', 'git', 'keris'].includes(currentActiveLab)) return;

  const labSection = document.getElementById(currentActiveLab);
  let isAtLabTop = false;
  if (labSection) {
    const rect = labSection.getBoundingClientRect();
    isAtLabTop = rect.top >= -35 && rect.top <= 60;
  } else {
    isAtLabTop = window.scrollY <= 35;
  }

  if (isAtLabTop) {
    if (e && e.cancelable) e.preventDefault();
    executePillZoomOutFromLab();
  }
}

window.addEventListener('wheel', (e) => {
  if (e.deltaY < -4) {
    handleLabScrollUpIntent(e);
  }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  if (isTouchActive && e.touches && e.touches.length > 0) {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - lastTouchY; // positive = dragging finger downwards = scrolling page up
    if (mobileHeaderLayout.matches) {
      const deltaX = Math.abs(e.touches[0].clientX - startTouchX);
      if (mobileReverseGesture && e.touches.length === 1 && deltaY > 52 && deltaY > deltaX * 2) {
        mobileReverseGesture = false;
        handleLabScrollUpIntent(e);
      }
    } else if (deltaY > 20) {
      handleLabScrollUpIntent(e);
    }
  }
}, { passive: false });

window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'PageUp', 'Home', 'Escape', 'Backspace'].includes(e.key)) {
    handleLabScrollUpIntent(e);
  }
}, { passive: false });
