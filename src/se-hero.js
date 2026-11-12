import { siteUrl } from './site-url.js';
import { paintSEBowlPreview } from './se-bowl-glow.js';
import { renderSEEdgeObjects } from './se-edge-objects.js';

// Shared laboratory hero source for pages and their Pill Reveal previews.
export function renderSEHero(preview = false, labInfo = null) {
  const code = (labInfo?.code || 'SE').toLowerCase();
  const hasContent = ['se', 'csn', 'git', 'keris'].includes(code);
  const name = labInfo?.name || 'Software Engineering';
  const tagline = labInfo?.tagline || 'Arsitektur Sistem & Rekayasa Perangkat Lunak';
  const descriptions = {
    se: 'Rancang aplikasi, bangun produk, dan selesaikan masalah melalui perangkat lunak di UIKA Bogor.',
    csn: 'Eksplorasi jaringan komputer, keamanan siber, dan infrastruktur cloud melalui pembelajaran dan riset di UIKA Bogor.',
    git: 'Eksplorasi data spasial, penginderaan jauh, dan sistem informasi geografis untuk memahami ruang dan wilayah.',
    keris: 'Eksplorasi kecerdasan buatan, pembelajaran mesin, dan sistem cerdas untuk mengembangkan solusi berbasis data.',
  };
  const markup = `
        <div class="se-hero-wrapper">
          ${hasContent ? `<span class="se-bowl-glow" aria-hidden="true"><canvas width="96" height="60" data-bowl-theme="${code}"></canvas></span>` : ''}
          ${hasContent ? renderSEEdgeObjects('hero', code) : ''}
          <!-- Top Utility Bar: Minimalist Back Link (NO Navbar) -->
          <div class="se-hero-top-bar">
            <a href="${siteUrl()}" class="se-hero-back-link liquid-glass" id="${code}HeroBackBtn" title="Kembali ke Beranda Utama">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Beranda</span>
            </a>
            <span class="se-hero-dept-tag">UIKA TEKNIK INFORMATIKA</span>
          </div>

          <!-- Central Editorial Content -->
          <div class="se-hero-content">
            <!-- Editorial Headline with Serif Italic Accent -->
            <h1 class="se-hero-title">
              Laboratorium <span class="editorial-italic">${name}</span>
            </h1>

            <!-- Official Lab Motto with Editorial Styling -->
            <div class="se-hero-motto">
              <span class="motto-text">${tagline}</span>
            </div>

            <!-- Refined Subtitle Narrative -->
            <p class="se-hero-subtitle">
              ${descriptions[code]}
            </p>

            <!-- High-Contrast Button Pair (Solid Primary + Refractive Liquid Glass) -->
            <div class="se-hero-actions">
              <a href="${hasContent ? `#${code}-explore` : siteUrl('/#quiz')}" class="se-btn-solid" id="${code}ExploreBtn" ${hasContent ? '' : 'data-lab-quiz'}>
                <span>${hasContent ? 'Eksplorasi Lab' : 'Kembali ke Hasil Quiz'}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
              <a href="${siteUrl()}" class="se-btn-liquid liquid-glass" id="${code}ActionHomeBtn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span>Kembali ke Beranda</span>
              </a>
            </div>
          </div>
        </div>
  `;
  if (!preview) return markup;
  // A passive, decorative miniature: no duplicate IDs or nested links in h3.
  return markup
    .replace(/<(\/?)(?:div|h1|p|a)(?=[\s>])/g, '<$1span')
    .replace(/\s(?:id|href|title)="[^"]*"/g, '')
    .replace(/\sdata-lab-quiz/g, '');
}

export function initSEHeroPreview(pill) {
  const preview = pill.querySelector('.se-pill-preview');
  const scene = preview?.querySelector('.se-pill-preview-scene');
  if (!preview || !scene) return () => {};
  paintSEBowlPreview(scene.querySelector('.se-bowl-glow canvas'));
  const resize = () => {
    const scale = preview.clientWidth / 1280;
    scene.style.transform = `translate(-50%, -50%) scale(${scale})`;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(preview);
  resize();
  return () => observer.disconnect();
}

export function renderSEHeroPreview(theme, stars, labInfo = null) {
  return `<span class="se-pill-preview" inert><span class="se-pill-preview-scene"><span class="aurora-bg-engine" style="--aurora-base-a:${theme.baseColorA};--aurora-base-b:${theme.baseColorB};--aurora-blob-1:${theme.blob1};--aurora-blob-2:${theme.blob2};--aurora-blob-3:${theme.blob3}"><span class="aurora-radial-base"></span><span class="aurora-blobs-layer"><span class="aurora-blob aurora-blob-1"></span><span class="aurora-blob aurora-blob-2"></span><span class="aurora-blob aurora-blob-3"></span></span><span class="aurora-stars-layer">${stars}</span></span>${renderSEHero(true, labInfo)}</span></span>`;
}
