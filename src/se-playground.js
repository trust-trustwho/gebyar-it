import { siteUrl } from './site-url.js';
// SkillFE visual-playground / Explorations: 300vh pinned center, two asymmetric
// parallax columns, subtle rotation, and passive documentary photos.
// CSS sticky implements the pin without changing the existing page scroll engine.
const PHOTOS = [
  { image: 'diskusi', title: 'Bertukar gagasan.', caption: 'Diskusi dan pengembangan SIAK & SIMPEG.', page: 40 },
  { image: 'kolaborasi', title: 'Belajar bersama.', caption: 'Ruang diskusi dan kegiatan mahasiswa Lab SE.', page: 42 },
  { image: 'asean', title: 'Membuka pengalaman.', caption: 'Proyek tingkat ASEAN bersama mahasiswa RPL.', page: 65 },
  { image: 'kegiatan-lab', title: 'Di balik sebuah karya.', caption: 'Dokumentasi kegiatan dan kebersamaan di Lab SE.', page: 41 },
  { image: 'penyambutan', title: 'Awal cerita bersama.', caption: 'Penyambutan mahasiswa Lab RPL angkatan 2021 & 2022.', page: 57 },
  { image: 'proyek-korlantas', title: 'Berkarya lebih jauh.', caption: 'Proyek dosen RPL bersama mahasiswa untuk Korlantas Polri, 2022.', page: 66 },
];

function photoCard(photo) {
  return `<figure class="se-play-card"><div class="se-play-photo"><img src="${photo.src || siteUrl(`/assets/se/${photo.image}.webp`)}" alt="${photo.caption}" width="1000" height="1000" loading="lazy" decoding="async" draggable="false"></div><figcaption><strong>${photo.title}</strong><span>${photo.caption}</span></figcaption></figure>`;
}

export function renderSEPlayground({ photos = PHOTOS, prefix = 'se', description = 'Dokumentasi kegiatan Laboratorium Software Engineering' } = {}) {
  return `<section class="se-block se-life se-playground" id="${prefix}-kehidupan" aria-labelledby="${prefix}-life-title">
    <div class="se-play-stage"><div class="se-play-center">
      <h2 class="se-heading" id="${prefix}-life-title">Ruang untuk<br><em>tumbuh bersama.</em></h2>
      <p class="se-body">Ada ruang untuk bertanya, mencoba,<br>dan membangun cerita bersama.</p>
    </div></div>
    <div class="se-play-columns" aria-label="${description}">
      <div class="se-play-column se-play-left">${photos.filter((_,i)=>i%2===0).map(photoCard).join('')}</div>
      <div class="se-play-column se-play-right">${photos.filter((_,i)=>i%2===1).map(photoCard).join('')}</div>
    </div>
  </section>`;
}

export function initSEPlayground(root) {
  const section = root.querySelector('.se-playground');
  if (!section || section.dataset.playgroundReady) return;
  section.dataset.playgroundReady = 'true';
  const columns = [...section.querySelectorAll('.se-play-column')];
  const cards = [...section.querySelectorAll('.se-play-card')];
  const compact = matchMedia('(max-width: 680px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;
  function render() {
    queued = false;
    if (!root.classList.contains('is-active')) return;
    const rect = section.getBoundingClientRect();
    const vh = innerHeight;
    const progress = Math.max(0,Math.min(1, -rect.top / Math.max(1,rect.height-vh)));
    const still = compact.matches || reduce.matches;
    // Different travel distances/directions give the two columns independent depth.
    columns[0].style.transform = still ? 'none' : `translate3d(0,${-progress*vh*.52}px,0)`;
    columns[1].style.transform = still ? 'none' : `translate3d(0,${progress*vh*.3}px,0)`;
    cards.forEach((card,i) => {
      const tilt = Math.sin(progress*Math.PI) * (i%2 ? 3 : -3);
      card.style.transform = still ? 'none' : `rotate(${tilt}deg)`;
    });
  }
  function schedule() {
    if (!queued && root.classList.contains('is-active')) { queued = true; requestAnimationFrame(render); }
  }
  window.addEventListener('scroll', () => {
    if (!compact.matches) schedule();
  }, { passive: true });
  window.addEventListener('resize',schedule,{passive:true});
  compact.addEventListener('change',schedule);
  reduce.addEventListener('change',schedule);
  const activeObserver = new MutationObserver(schedule);
  activeObserver.observe(root,{attributes:true,attributeFilter:['class']});

  schedule();
}
