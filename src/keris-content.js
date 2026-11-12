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

// Sources: PPT_KERIS.pdf pp. 4–8, 10–12, 14–18, 21.
// Four documented PKM topics and one research field; diagrams are explanatory illustrations.
const PRODUCTS = [
  {
    "name": "Prediksi dengan Autoencoder",
    "type": "Topik PKM terdokumentasi · 2019",
    "src": siteUrl("/assets/keris/autoencoder.svg"),
    "alt": "Ilustrasi topik KERIS: Prediksi dengan Autoencoder"
  },
  {
    "name": "Pemetaan UMKM Kuliner",
    "type": "Topik PKM terdokumentasi · 2020",
    "src": siteUrl("/assets/keris/knn.svg"),
    "alt": "Ilustrasi topik KERIS: Pemetaan UMKM Kuliner"
  },
  {
    "name": "Model Penyebaran COVID-19",
    "type": "Topik PKM terdokumentasi · 2022",
    "src": siteUrl("/assets/keris/cellular-automata.svg"),
    "alt": "Ilustrasi topik KERIS: Model Penyebaran COVID-19"
  },
  {
    "name": "Optimasi Rute Angkutan",
    "type": "Topik PKM terdokumentasi · 2024",
    "src": siteUrl("/assets/keris/rute-bogor.svg"),
    "alt": "Ilustrasi topik KERIS: Optimasi Rute Angkutan"
  },
  {
    "name": "Semantic Web & Knowledge",
    "type": "Bidang penelitian KERIS",
    "src": siteUrl("/assets/keris/semantic-web.svg"),
    "alt": "Ilustrasi topik KERIS: Semantic Web & Knowledge"
  }
];

const FACULTY = getLabFaculty('KERIS');

const CAREERS = [
  [
    "Peneliti",
    "Merumuskan pertanyaan, menganalisis data, dan mengembangkan model untuk menghasilkan pengetahuan baru.",
    "Metode penelitian · Analisis data · Pengembangan model"
  ],
  [
    "Data Scientist",
    "Mengolah dan merepresentasikan data untuk menemukan informasi serta pola yang mendukung pemecahan masalah.",
    "Pengolahan data · Analisis · Representasi data"
  ],
  [
    "AI & Machine Learning Specialist",
    "Mengembangkan dan mengevaluasi model kecerdasan buatan untuk menyelesaikan persoalan berbasis data.",
    "Machine learning · Pemodelan · Evaluasi"
  ],
  [
    "Knowledge Engineer",
    "Merepresentasikan pengetahuan dan relasi antar-konsep untuk mendukung pengembangan sistem cerdas.",
    "Representasi pengetahuan · Semantic Web · Knowledge Engineering"
  ]
];

const PHOTOS = [
  {
    "src": siteUrl("/assets/keris/diskusi.webp"),
    "title": "Bertemu dan bertukar ide.",
    "caption": "Diskusi bersama anggota KERIS pada pertemuan luring di akhir masa pandemi."
  },
  {
    "src": siteUrl("/assets/keris/sosialisasi.webp"),
    "title": "Menyusun langkah bersama.",
    "caption": "Sosialisasi program kelulusan bersama dosen pembimbing, 15 September 2022."
  },
  {
    "src": siteUrl("/assets/keris/sharing-alumni.webp"),
    "title": "Belajar dari perjalanan.",
    "caption": "Sharing bersama alumni Lab KERIS, 15 Oktober 2022."
  },
  {
    "src": siteUrl("/assets/keris/apresiasi-alumni.webp"),
    "title": "Pengalaman yang dibagikan.",
    "caption": "Dokumentasi kegiatan sharing bersama alumni KERIS."
  },
  {
    "src": siteUrl("/assets/keris/presentasi.webp"),
    "title": "Mengembangkan gagasan.",
    "caption": "Presentasi dan diskusi ilmiah anggota Lab KERIS."
  },
  {
    "src": siteUrl("/assets/keris/ide-skripsi.webp"),
    "title": "Tumbuh lewat diskusi.",
    "caption": "Diskusi perkembangan ide skripsi bersama anggota KERIS."
  }
];


export function renderKERISSections() {
  return `
  <div class="se-editorial" id="keris-content">
    <section class="se-block se-about" id="keris-explore" aria-labelledby="keris-about-title">
      ${renderSEEdgeObjects('about', 'keris')}
      <div class="se-about-layout">
        <h2 id="keris-about-title" class="se-heading" data-se-reveal>Memahami data.<br>Menumbuhkan <em>kecerdasan.</em></h2>
        <div class="se-about-copy">
          <p class="se-mission" data-se-words>Kami belajar menggali informasi dari data, merepresentasikan pengetahuan, dan mengembangkan model untuk sistem yang cerdas.</p>
          <p class="se-body">KERIS (Knowledge Engineering and Reliable Intelligent Systems) merupakan ruang belajar dan riset di Teknik Informatika UIKA Bogor. Data mining, machine learning, representasi pengetahuan, computer vision, serta IoT dan big data menjadi bagian dari pengembangan keilmuannya.</p>
          <div class="se-faq-about" data-se-faq="about"></div>
        </div>
      </div>
      <div class="se-focus-line" aria-label="Lingkup penelitian"><span>Data Mining</span><span>Machine Learning</span><span>Knowledge Engineering</span><span>Computer Vision</span><span>Semantic Web</span><span>IoT &amp; Big Data</span></div>
    </section>

    <section class="se-block" id="keris-belajar" aria-labelledby="keris-learn-title">
      ${renderSEEdgeObjects('learn', 'keris')}
      <div class="se-section-heading"><h2 class="se-heading" id="keris-learn-title" data-se-reveal>Dari rasa ingin tahu,<br>menjadi <em>kemampuan.</em></h2><p class="se-body">Bangun fondasi, temukan fokusmu, lalu terapkan dalam sebuah produk. Setiap proses memberi ruang untuk mencoba dan bertumbuh.</p></div>
      <div class="se-learning">
        ${[
          ["01", "Kenali datanya", "Pengolahan & representasi data", "Pelajari cara mengolah serta merepresentasikan data sebagai dasar untuk mencari informasi dan memahami persoalan."],
          ["02", "Temukan polanya", "Analisis data", "Kembangkan kemampuan analisis untuk menggali pola, hubungan, dan informasi baru dari data."],
          ["03", "Bangun modelnya", "Pemodelan & sistem cerdas", "Eksplorasi machine learning, representasi pengetahuan, dan computer vision untuk mengembangkan model yang sesuai dengan persoalan."],
          ["04", "Terapkan bersama", "Otomasi, riset & kolaborasi", "Hubungkan pengolahan data dengan otomasi dan latih pengembangan gagasan melalui diskusi, penelitian, serta kolaborasi."],
        ].map(([n,title,sub,desc]) => `<article class="se-learn-step" data-se-reveal><span class="se-step-no">${n}</span><h3>${title}</h3><p class="se-step-sub">${sub}</p><p class="se-body">${desc}</p></article>`).join('')}
      </div>
      <p class="se-small-note">Gambaran pengembangan kompetensi, bukan urutan semester kurikulum.</p>
    </section>

    <section class="se-block se-work" id="keris-karya" aria-labelledby="keris-work-title">
      <div class="se-work-scroll"><div class="se-work-sticky">
      <div class="se-section-heading"><h2 class="se-heading" id="keris-work-title" data-se-reveal>Dari data<br>menjadi <em>pengetahuan.</em></h2><p class="se-body">Empat topik PKM dalam dokumentasi KERIS dan satu bidang riset menunjukkan ruang eksplorasi data, model, optimasi, serta representasi pengetahuan.</p></div>
      ${renderSEWorksWheel(PRODUCTS, { code: 'KERIS', label: 'RISET & EKSPLORASI KERIS', subtitle: 'Bertumbuh', accent: 'dengan data.' })}
      </div></div>
      <div class="se-achievement-heading"><h3>Langkah yang <em>membanggakan.</em></h3><span>CATATAN PENGEMBANGAN MAHASISWA</span></div>
      <div class="se-achievements">
        <article data-se-reveal><span class="se-achievement-number">2<em>GSA</em></span><h4>Google Student Ambassador</h4><p class="se-body">Pada 2025, dua mahasiswa TI UIKA dari Lab KERIS tercatat lolos menjadi Google Student Ambassador.</p></article>
        <article data-se-reveal><span class="se-achievement-number">7<em>peserta</em></span><h4>Program Bangkit</h4><p class="se-body">Dokumentasi program 2023–2024 mencatat satu mahasiswa pada angkatan 4, empat pada angkatan 5, dan dua pada angkatan 6.</p></article>
        <article data-se-reveal><span class="se-achievement-number">Malaysia</span><h4>Pengalaman internasional</h4><p class="se-body">Dokumentasi memuat pertukaran pelajar 2022–2023 dan internship internasional di UNICEL Malaysia pada 2024.</p></article>
      </div>
    </section>

    <section class="se-block" id="keris-dosen" aria-labelledby="keris-faculty-title">
      ${renderSEEdgeObjects('faculty', 'keris')}
      <div class="se-section-heading"><h2 class="se-heading" id="keris-faculty-title" data-se-reveal>Bertemu para<br><em>pembimbing.</em></h2><p class="se-body">Beragam bidang keahlian untuk mendampingi proses belajar, mengeksplorasi gagasan, dan mengembangkan karya.</p></div>
      <div class="se-faculty-directory">
        <div class="org-tree-block" id="kerisOrgTree">
          <div class="org-tree-header"><h3 class="org-tree-title">Struktur Organisasi Lab KERIS</h3></div>
          <div class="org-hierarchy-tree">
            <div class="se-org-leader">${renderOrgFaculty(FACULTY[0])}</div>
            <div class="org-tree-connector" aria-hidden="true"><div class="connector-stem"></div><div class="connector-branch-horizontal"></div><div class="connector-drop-lines"><span></span><span></span><span></span><span></span></div></div>
            <div class="se-org-members">${FACULTY.slice(1).map(renderOrgFaculty).join('')}</div>
          </div>
        </div>
        ${renderLabFacultyReference(FACULTY[0])}
      </div>
    </section>

    ${renderSEPlayground({ prefix: 'keris', photos: PHOTOS, description: 'Dokumentasi diskusi dan kegiatan Laboratorium KERIS' })}
    ${renderLabFacilities('keris')}

    <section class="se-block" id="keris-karier" aria-labelledby="keris-career-title">
      ${renderSEEdgeObjects('career', 'keris')}
      <div class="se-career-layout"><div><h2 class="se-heading" id="keris-career-title" data-se-reveal>Bekal hari ini.<br>Peluang <em>esok hari.</em></h2><p class="se-body">Kemampuan mengolah data, merepresentasikan pengetahuan, dan membangun model membuka jalur profesi di bidang penelitian, data, serta kecerdasan buatan.</p></div>
      <div class="se-career-list" data-se-faq="career"></div></div>
    </section>

    <footer class="se-block se-contact" id="keris-kontak">
      ${renderSEEdgeObjects('contact', 'keris')}
      <h2 class="se-heading" data-se-reveal>Ide berikutnya,<br>bisa berawal <em>darimu.</em></h2>
      ${renderLabFooterActions('keris')}
    </footer>
  </div>`;
}

function renderOrgFaculty(d) {
  return `<article class="org-card liquid-glass-dark ${d.leader ? 'org-card-highlight' : ''}"><span class="org-card-badge">${d.leader ? 'KEPALA LAB KERIS' : 'DOSEN LAB KERIS'}</span><div class="org-avatar-wrap"><div class="org-avatar-circle"><img src="${siteUrl(`/assets/dosen/${d.image}.jpg`)}" alt="${d.name}" class="org-avatar-img" loading="lazy"></div></div><h4 class="org-name">${d.name}</h4><p class="org-role">KERIS Research Group</p><p class="org-focus">${d.field}</p></article>`;
}

export function initKERISSections(root, onHome, onLab, createCarousel) {
  const scope = root.querySelector('.se-editorial');
  if (!scope || scope.dataset.initialized) return;
  scope.dataset.initialized = 'true';
  initSEPlayground(root);
  initSEWorksWheel(root, PRODUCTS);
  initSEParallax(root);
  initLabFacilities(scope, createCarousel);
  import('./se-faq.tsx').then(({ initSEFaq }) => initSEFaq(root, CAREERS, 'Mengembangkan kemampuan pengolahan, representasi, dan analisis data untuk menghasilkan informasi serta model. Ruang riset KERIS mencakup Data Mining dan Machine Learning, Semantic Web dan Knowledge Engineering, Computer Vision dan Pengenalan Pola, serta IoT dan Big Data.'));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = (id) => scrollSETo(root, root.querySelector(`#${id}`), { immediate: motion.matches, offset: -32 });
  root.querySelector('#kerisExploreBtn')?.addEventListener('click', e => { e.preventDefault(); scrollTo('keris-explore'); });
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
