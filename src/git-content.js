import { siteUrl } from './site-url.js';
import { getLabFaculty } from './data-faculty.js';
import { renderLabFacultyReference } from './lab-faculty-reference.js';
import { observeSectionReveals } from './section-reveal.js';
import './se-content.css';
import { renderSEPlayground, initSEPlayground } from './se-playground.js';
import { renderSEWorksWheel, initSEWorksWheel } from './se-works-wheel.js';
import { initSEParallax, scrollSETo } from './se-parallax.js';
import { renderSEEdgeObjects } from './se-edge-objects.js';
import { renderLabFooterActions, initLabFooter } from './lab-footer.js';
import { renderLabFacilities, initLabFacilities } from './lab-facilities.js';

// Sources: PPT_GIT.pdf pp. 2, 5, 7–17.
// Faculty, five example final projects, and activity photographs follow the supplied deck.
const PRODUCTS = [
  {
    "name": "WebGIS Fasilitas Publik",
    "type": "Contoh tugas akhir geospasial",
    "src": siteUrl("/assets/git/webgis.webp"),
    "alt": "Contoh dashboard persebaran fasilitas publik dari materi GIT."
  },
  {
    "name": "Pemetaan Risiko Banjir",
    "type": "Contoh tugas akhir geospasial",
    "src": siteUrl("/assets/git/disaster-gis.webp"),
    "alt": "Contoh peta risiko banjir dari materi GIT."
  },
  {
    "name": "Perubahan Tutupan Lahan",
    "type": "Contoh tugas akhir geospasial",
    "src": siteUrl("/assets/git/remote-sensing.webp"),
    "alt": "Contoh monitoring perubahan tutupan lahan dari materi GIT."
  },
  {
    "name": "Optimasi Lokasi Fasilitas",
    "type": "Contoh tugas akhir geospasial",
    "src": siteUrl("/assets/git/spatial-optimization.webp"),
    "alt": "Contoh visual optimasi lokasi fasilitas publik dari materi GIT."
  },
  {
    "name": "Deteksi Bangunan GeoAI",
    "type": "Contoh tugas akhir geospasial",
    "src": siteUrl("/assets/git/geoai.webp"),
    "alt": "Contoh deteksi bangunan dari citra satelit pada materi GIT."
  }
];

const FACULTY = getLabFaculty('GIT');

const CAREERS = [
  [
    "GIS Analyst",
    "Menganalisis data berbasis lokasi untuk memahami pola keruangan dan mendukung keputusan.",
    "Analisis spasial · Geoprocessing · Kartografi"
  ],
  [
    "WebGIS Developer",
    "Mengembangkan aplikasi peta berbasis web agar informasi geospasial dapat diakses dan digunakan secara interaktif.",
    "JavaScript · Spatial database · WebGIS"
  ],
  [
    "Remote Sensing Analyst",
    "Mengolah citra satelit atau data penginderaan jauh untuk memantau objek dan perubahan lingkungan.",
    "Citra satelit · Klasifikasi · Change detection"
  ],
  [
    "Geospatial Data Scientist",
    "Mengolah data spasial dan membangun analisis atau model untuk menjawab persoalan berbasis lokasi.",
    "Python · Data processing · Spatial modeling"
  ],
  [
    "GeoAI Engineer",
    "Mengintegrasikan kecerdasan buatan dengan data geospasial untuk deteksi, klasifikasi, serta prediksi.",
    "Machine learning · Deep learning · Computer vision"
  ],
  [
    "Geospatial Consultant",
    "Menerjemahkan kebutuhan organisasi menjadi solusi, rekomendasi, dan perencanaan berbasis informasi geospasial.",
    "Analisis kebutuhan · Spatial DSS · Komunikasi"
  ]
];

const PHOTOS = [
  {
    "src": siteUrl("/assets/git/kebersamaan.webp"),
    "title": "Cerita yang mempertemukan.",
    "caption": "Kebersamaan keluarga besar GIT dalam kegiatan family gathering."
  },
  {
    "src": siteUrl("/assets/git/diskusi.webp"),
    "title": "Bertukar sudut pandang.",
    "caption": "Diskusi dan sharing bersama keluarga besar GIT."
  },
  {
    "src": siteUrl("/assets/git/praktik.webp"),
    "title": "Belajar di dunia nyata.",
    "caption": "Praktik lapangan mahasiswa GIT."
  },
  {
    "src": siteUrl("/assets/git/apresiasi.webp"),
    "title": "Tumbuh dan saling mendukung.",
    "caption": "Apresiasi dan pengembangan diri dalam kegiatan GIT."
  },
  {
    "src": siteUrl("/assets/git/lapangan.webp"),
    "title": "Membaca bentang alam.",
    "caption": "Pengambilan data persawahan dengan drone di Kecamatan Leuwiliang, Kabupaten Bogor."
  },
  {
    "src": siteUrl("/assets/git/rtk.webp"),
    "title": "Ketelitian sejak awal.",
    "caption": "Pemasangan base station RTK dalam kegiatan lapangan GIT."
  }
];


export function renderGITSections() {
  return `
  <div class="se-editorial" id="git-content">
    <section class="se-block se-about" id="git-explore" aria-labelledby="git-about-title">
      ${renderSEEdgeObjects('about', 'git')}
      <div class="se-about-layout">
        <h2 id="git-about-title" class="se-heading" data-se-reveal>Membaca ruang.<br>Menemukan <em>makna.</em></h2>
        <div class="se-about-copy">
          <p class="se-mission" data-se-words>Kami belajar mengubah data lokasi menjadi informasi, analisis, prediksi, dan keputusan yang bermanfaat.</p>
          <p class="se-body">Laboratorium Geospatial Information Technology memadukan teknologi informasi, data geospasial, analisis spasial, penginderaan jauh, pemrograman, dan kecerdasan buatan. Di sini, memahami lokasi menjadi awal untuk mengembangkan model, aplikasi, dan solusi bagi dunia nyata.</p>
          <div class="se-faq-about" data-se-faq="about"></div>
        </div>
      </div>
      <div class="se-focus-line" aria-label="Lingkup penelitian"><span>GIS &amp; WebGIS</span><span>Remote Sensing</span><span>Spatial Modeling</span><span>Spatial Database</span><span>GeoAI</span><span>Digital Twin</span></div>
    </section>

    <section class="se-block" id="git-belajar" aria-labelledby="git-learn-title">
      ${renderSEEdgeObjects('learn', 'git')}
      <div class="se-section-heading"><h2 class="se-heading" id="git-learn-title" data-se-reveal>Dari rasa ingin tahu,<br>menjadi <em>kemampuan.</em></h2><p class="se-body">Bangun fondasi, temukan fokusmu, lalu terapkan dalam sebuah produk. Setiap proses memberi ruang untuk mencoba dan bertumbuh.</p></div>
      <div class="se-learning">
        ${[
          ["01", "Pahami data lokasi", "Sistem informasi geografis", "Pelajari data raster dan vektor, sistem koordinat, spatial database, geoprocessing, dan kartografi."],
          ["02", "Amati perubahan", "Penginderaan jauh", "Eksplorasi citra satelit, akuisisi data drone, dan pengolahan informasi untuk memahami objek serta perubahan bentang alam."],
          ["03", "Bangun model dan aplikasi", "Pemodelan & pemrograman spasial", "Kembangkan analisis spasial, model, otomatisasi, dan WebGIS untuk menyajikan informasi berbasis lokasi."],
          ["04", "Temukan pola dengan AI", "Geospatial artificial intelligence", "Integrasikan machine learning, deep learning, dan computer vision untuk deteksi objek, klasifikasi, prediksi, serta optimasi."],
        ].map(([n,title,sub,desc]) => `<article class="se-learn-step" data-se-reveal><span class="se-step-no">${n}</span><h3>${title}</h3><p class="se-step-sub">${sub}</p><p class="se-body">${desc}</p></article>`).join('')}
      </div>
      <p class="se-small-note">Gambaran pengembangan kompetensi, bukan urutan semester kurikulum.</p>
    </section>

    <section class="se-block se-work" id="git-karya" aria-labelledby="git-work-title">
      <div class="se-work-scroll"><div class="se-work-sticky">
      <div class="se-section-heading"><h2 class="se-heading" id="git-work-title" data-se-reveal>Dari data lokasi<br>menjadi <em>solusi.</em></h2><p class="se-body">Lima contoh tugas akhir dalam materi GIT: dari peta fasilitas publik dan risiko banjir, hingga optimasi lokasi serta deteksi bangunan dengan GeoAI.</p></div>
      ${renderSEWorksWheel(PRODUCTS, { code: 'GIT', label: 'TOPIK RISET GIT', subtitle: 'Memahami', accent: 'lebih dalam.' })}
      </div></div>
      <div class="se-achievement-heading"><h3>Riset yang <em>berdampak.</em></h3><span>DARI LAPANGAN KE KEPUTUSAN</span></div>
      <div class="se-achievements">
        <article data-se-reveal><span class="se-achievement-number">Drone</span><h4>Akuisisi data di Leuwiliang</h4><p class="se-body">Kegiatan lapangan menggabungkan drone dan RTK untuk mengambil data persawahan, membangun ortofoto, dan mendukung analisis spasial.</p></article>
        <article data-se-reveal><span class="se-achievement-number">2025–30</span><h4>Roadmap penelitian GIT</h4><p class="se-body">Arah riset berkembang dari data dan GIS menuju pemodelan, penginderaan jauh, GeoAI, serta sistem geospasial cerdas dan prediktif.</p></article>
        <article data-se-reveal><span class="se-achievement-number">Kolaborasi</span><h4>Solusi lintas keilmuan</h4><p class="se-body">WebGIS, jaringan sensor, kecerdasan buatan, dan visualisasi interaktif membuka peluang kolaborasi antarlaboratorium untuk solusi berbasis lokasi.</p></article>
      </div>
    </section>

    <section class="se-block" id="git-dosen" aria-labelledby="git-faculty-title">
      ${renderSEEdgeObjects('faculty', 'git')}
      <div class="se-section-heading"><h2 class="se-heading" id="git-faculty-title" data-se-reveal>Bertemu para<br><em>pembimbing.</em></h2><p class="se-body">Beragam bidang keahlian untuk mendampingi proses belajar, mengeksplorasi gagasan, dan mengembangkan karya.</p></div>
      <div class="se-faculty-directory">
        <div class="org-tree-block" id="gitOrgTree">
          <div class="org-tree-header"><h3 class="org-tree-title">Struktur Organisasi Lab GIT</h3></div>
          <div class="org-hierarchy-tree">
            <div class="se-org-leader">${renderOrgFaculty(FACULTY[0])}</div>
            <div class="org-tree-connector" aria-hidden="true"><div class="connector-stem"></div><div class="connector-branch-horizontal"></div><div class="connector-drop-lines"><span></span><span></span><span></span><span></span><span></span></div></div>
            <div class="se-org-members">${FACULTY.slice(1).map(renderOrgFaculty).join('')}</div>
          </div>
        </div>
        ${renderLabFacultyReference(FACULTY[0])}
      </div>
    </section>

    ${renderSEPlayground({ prefix: 'git', photos: PHOTOS, description: 'Dokumentasi kebersamaan dan kegiatan lapangan Laboratorium GIT' })}
    ${renderLabFacilities('git')}

    <section class="se-block" id="git-karier" aria-labelledby="git-career-title">
      ${renderSEEdgeObjects('career', 'git')}
      <div class="se-career-layout"><div><h2 class="se-heading" id="git-career-title" data-se-reveal>Bekal hari ini.<br>Peluang <em>esok hari.</em></h2><p class="se-body">Keahlian geospasial membuka peran di bidang analisis, pengembangan aplikasi, data, dan kecerdasan buatan. Temukan jalur yang sesuai dengan minatmu.</p></div>
      <div class="se-career-list" data-se-faq="career"></div></div>
    </section>

    <footer class="se-block se-contact" id="git-kontak">
      ${renderSEEdgeObjects('contact', 'git')}
      <h2 class="se-heading" data-se-reveal>Ide berikutnya,<br>bisa berawal <em>darimu.</em></h2>
      ${renderLabFooterActions('git')}
    </footer>
  </div>`;
}

function renderOrgFaculty(d) {
  return `<article class="org-card liquid-glass-dark ${d.leader ? 'org-card-highlight' : ''}"><span class="org-card-badge">${d.leader ? 'KEPALA LAB GIT' : 'DOSEN LAB GIT'}</span><div class="org-avatar-wrap"><div class="org-avatar-circle"><img src="${siteUrl(`/assets/dosen/${d.image}.jpg`)}" alt="${d.name}" class="org-avatar-img" loading="lazy"></div></div><h4 class="org-name">${d.name}</h4><p class="org-role">Geospatial Information Technology</p><p class="org-focus">${d.field}</p></article>`;
}

export function initGITSections(root, onHome, onLab, createCarousel) {
  const scope = root.querySelector('.se-editorial');
  if (!scope || scope.dataset.initialized) return;
  scope.dataset.initialized = 'true';
  initSEPlayground(root);
  initSEWorksWheel(root, PRODUCTS);
  initSEParallax(root);
  initLabFacilities(scope, createCarousel);
  import('./se-faq.tsx').then(({ initSEFaq }) => initSEFaq(root, CAREERS, 'Mengintegrasikan data geospasial dan teknologi Informatika untuk membangun solusi berbasis lokasi. Roadmap penelitian 2025–2030 bergerak dari GIS dan basis data spasial menuju pemodelan, penginderaan jauh, GeoAI, serta sistem geospasial cerdas, terintegrasi, dan prediktif.'));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = (id) => scrollSETo(root, root.querySelector(`#${id}`), { immediate: motion.matches, offset: -32 });
  root.querySelector('#gitExploreBtn')?.addEventListener('click', e => { e.preventDefault(); scrollTo('git-explore'); });
  initLabFooter(root, onLab);
  scope.addEventListener('click', e => {
    if (e.target.closest('[data-se-home]')) { e.preventDefault(); onHome(); }
    if (e.target.closest('[data-se-top]')) scrollSETo(root, 0, { immediate: motion.matches });
  });

  // SkillFE dark-monochrome + highlight-text: viewport reveal, no layout shift.
  observeSectionReveals(scope.querySelectorAll('[data-se-reveal]'));

  const mission = scope.querySelector('[data-se-words]');
  const text = mission.textContent;
  mission.innerHTML = `<span class="se-sr-only">${text}</span><span aria-hidden="true">${text.split(' ').map(w=>`<span class="se-word">${w} </span>`).join('')}</span>`;
  const words = [...mission.querySelectorAll('.se-word')];
  let pending = false;
  function updateScroll() {
    pending = false;
    if (!root.classList.contains('is-active')) return;
    const vh = window.innerHeight;
    const rect = mission.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (vh * .88 - rect.top) / (vh * .43)));
    words.forEach((word,i) => { word.style.opacity = motion.matches ? 1 : .28 + .72 * Math.max(0,Math.min(1,progress*words.length-i)); });
  }
  const schedule = () => { if (!pending && root.classList.contains('is-active')) { pending = true; requestAnimationFrame(updateScroll); } };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  motion.addEventListener('change', schedule);
  requestAnimationFrame(updateScroll);
}
