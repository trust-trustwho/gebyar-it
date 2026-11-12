import { siteUrl } from './site-url.js';
import { getLabFaculty, LAB_NAMES } from './data-faculty.js';
import { renderLabFacultyReference } from './lab-faculty-reference.js';
import { observeSectionReveals } from './section-reveal.js';
import './se-content.css';
import { renderSEPlayground, initSEPlayground } from './se-playground.js';
import { renderSEWorksWheel, initSEWorksWheel } from './se-works-wheel.js';
import { initSEParallax, scrollSETo } from './se-parallax.js';
import { renderSEEdgeObjects } from './se-edge-objects.js';
import { renderLabFooterActions, initLabFooter } from './lab-footer.js';
import { renderLabFacilities, initLabFacilities } from './lab-facilities.js';

// Sources: PPT_CSN.pdf pp. 1–8; Profil_LAB.pdf pp. 1–4.
// The organization follows the supplied 2020–2024 profile; topics are research examples, not completed products.
const PRODUCTS = [
  {
    "name": "Hybrid Cloud Networking",
    "type": "Contoh topik tugas akhir",
    "src": siteUrl("/assets/csn/hybrid-cloud.svg"),
    "alt": "Ilustrasi topik riset Hybrid Cloud Networking"
  },
  {
    "name": "Mitigasi MITM",
    "type": "Contoh topik tugas akhir",
    "src": siteUrl("/assets/csn/mitm.svg"),
    "alt": "Ilustrasi topik riset Mitigasi MITM"
  },
  {
    "name": "Drone Swarm Communication",
    "type": "Contoh topik tugas akhir",
    "src": siteUrl("/assets/csn/drone.svg"),
    "alt": "Ilustrasi topik riset Drone Swarm Communication"
  },
  {
    "name": "Smart Meter IoT",
    "type": "Contoh topik tugas akhir",
    "src": siteUrl("/assets/csn/smart-meter.svg"),
    "alt": "Ilustrasi topik riset Smart Meter IoT"
  },
  {
    "name": "Monitoring Jaringan",
    "type": "Contoh topik tugas akhir",
    "src": siteUrl("/assets/csn/monitoring.svg"),
    "alt": "Ilustrasi topik riset Monitoring Jaringan"
  }
];

const FACULTY = getLabFaculty('CSN');

const CAREERS = [
  [
    "Network Engineer",
    "Merancang, membangun, dan memelihara jaringan agar perangkat dapat berkomunikasi secara andal.",
    "Topologi jaringan · Routing · Switching"
  ],
  [
    "Cloud Architect",
    "Merancang infrastruktur cloud dan menghubungkan lingkungan komputasi untuk mendukung kebutuhan organisasi.",
    "Cloud networking · Virtualisasi · Hybrid cloud"
  ],
  [
    "Cybersecurity Specialist",
    "Menerapkan perlindungan jaringan dan mengevaluasi risiko untuk menjaga keamanan data serta layanan.",
    "Firewall · IDS/IPS · VPN"
  ],
  [
    "IoT System Designer",
    "Merancang integrasi sensor, perangkat, dan komunikasi jaringan untuk sistem Internet of Things.",
    "Wireless sensor network · LoRa · Integrasi perangkat"
  ],
  [
    "Field Engineer",
    "Menerapkan dan memelihara infrastruktur komputasi serta jaringan secara langsung di lapangan.",
    "Instalasi perangkat · Troubleshooting · Monitoring"
  ]
];

const PHOTOS = [
  {
    "src": siteUrl("/assets/csn/materi-4.webp"),
    "title": "Mengenal jalur karier.",
    "caption": "Materi CSN: prospek karier di bidang jaringan, cloud, keamanan siber, dan IoT."
  },
  {
    "src": siteUrl("/assets/csn/materi-6.webp"),
    "title": "Dari gagasan ke topik riset.",
    "caption": "Materi CSN: contoh topik tugas akhir di bidang jaringan, cloud, dan IoT."
  },
  {
    "src": siteUrl("/assets/csn/materi-2.webp"),
    "title": "Memahami keterhubungan.",
    "caption": "Materi CSN: sistem komputasi dan jaringan modern."
  },
  {
    "src": siteUrl("/assets/csn/materi-3.webp"),
    "title": "Koneksi yang bermakna.",
    "caption": "Materi CSN: efisiensi, konektivitas, keamanan, dan skalabilitas."
  },
  {
    "src": siteUrl("/assets/csn/materi-5.webp"),
    "title": "Membangun kompetensi.",
    "caption": "Materi CSN: topologi, cloud, keamanan, monitoring, dan IoT."
  },
  {
    "src": siteUrl("/assets/csn/materi-7.webp"),
    "title": "Tumbuh lewat eksplorasi.",
    "caption": "Materi CSN: praktik, relevansi industri, dan peluang riset."
  }
];


export function renderCSNSections() {
  return `
  <div class="se-editorial" id="csn-content">
    <section class="se-block se-about" id="csn-explore" aria-labelledby="csn-about-title">
      ${renderSEEdgeObjects('about', 'csn')}
      <div class="se-about-layout">
        <h2 id="csn-about-title" class="se-heading" data-se-reveal>Menghubungkan sistem.<br>Membuka <em>kemungkinan.</em></h2>
        <div class="se-about-copy">
          <p class="se-mission" data-se-words>Kami belajar menghubungkan perangkat, menjaga komunikasi data, dan membangun infrastruktur digital yang andal.</p>
          <p class="se-body">Laboratorium ${LAB_NAMES.CSN} merupakan ruang belajar dan riset sistem komputer, komunikasi data, serta jaringan di Teknik Informatika UIKA Bogor. Cloud, virtualisasi, keamanan informasi, dan Internet of Things menjadi bagian dari pengembangan infrastrukturnya.</p>
          <div class="se-faq-about" data-se-faq="about"></div>
        </div>
      </div>
      <div class="se-focus-line" aria-label="Lingkup penelitian"><span>Computer Networks</span><span>Cloud Computing</span><span>Cybersecurity</span><span>Internet of Things</span><span>Virtualisasi</span><span>Wireless Sensor Network</span></div>
    </section>

    <section class="se-block" id="csn-belajar" aria-labelledby="csn-learn-title">
      ${renderSEEdgeObjects('learn', 'csn')}
      <div class="se-section-heading"><h2 class="se-heading" id="csn-learn-title" data-se-reveal>Dari rasa ingin tahu,<br>menjadi <em>kemampuan.</em></h2><p class="se-body">Bangun fondasi, temukan fokusmu, lalu terapkan dalam sebuah produk. Setiap proses memberi ruang untuk mencoba dan bertumbuh.</p></div>
      <div class="se-learning">
        ${[
          ["01", "Pahami koneksinya", "Topologi & protokol jaringan", "Pelajari komunikasi data, TCP/IP, routing, dan perancangan topologi melalui Cisco, GNS3, serta Packet Tracer."],
          ["02", "Bangun infrastrukturnya", "Cloud & virtualisasi", "Eksplorasi pengelolaan sistem cloud dengan AWS, Azure, dan OpenStack serta hubungan antara jaringan dan layanan komputasi."],
          ["03", "Jaga keamanannya", "Firewall, IDS/IPS & VPN", "Pelajari perlindungan jaringan, analisis risiko, dan mitigasi serangan melalui simulasi serta konfigurasi perangkat."],
          ["04", "Hubungkan dunia nyata", "IoT, monitoring & otomatisasi", "Terapkan integrasi sensor, komunikasi drone, monitoring jaringan, dan otomatisasi dalam eksplorasi solusi."],
        ].map(([n,title,sub,desc]) => `<article class="se-learn-step" data-se-reveal><span class="se-step-no">${n}</span><h3>${title}</h3><p class="se-step-sub">${sub}</p><p class="se-body">${desc}</p></article>`).join('')}
      </div>
      <p class="se-small-note">Gambaran pengembangan kompetensi, bukan urutan semester kurikulum.</p>
    </section>

    <section class="se-block se-work" id="csn-karya" aria-labelledby="csn-work-title">
      <div class="se-work-scroll"><div class="se-work-sticky">
      <div class="se-section-heading"><h2 class="se-heading" id="csn-work-title" data-se-reveal>Dari koneksi<br>menjadi <em>solusi.</em></h2><p class="se-body">Lima contoh topik tugas akhir untuk mengeksplorasi cloud, keamanan, IoT, dan komunikasi jaringan. Setiap topik membuka ruang untuk penelitian.</p></div>
      ${renderSEWorksWheel(PRODUCTS, { code: 'CSN', label: 'TOPIK RISET CSN', subtitle: 'Terhubung', accent: 'lebih jauh.' })}
      </div></div>
      <div class="se-achievement-heading"><h3>Belajar yang <em>bermakna.</em></h3><span>NILAI TAMBAH PEMINATAN</span></div>
      <div class="se-achievements">
        <article data-se-reveal><span class="se-achievement-number">Praktik</span><h4>Hands-on project</h4><p class="se-body">Belajar melalui simulasi dan perangkat nyata untuk menghubungkan pemahaman konsep dengan penerapan di lapangan.</p></article>
        <article data-se-reveal><span class="se-achievement-number">Relevan</span><h4>Orientasi kebutuhan industri</h4><p class="se-body">Kompetensi jaringan, cloud, dan keamanan mendukung kebutuhan perusahaan serta transformasi digital lintas sektor.</p></article>
        <article data-se-reveal><span class="se-achievement-number">Riset</span><h4>Ruang penelitian & publikasi</h4><p class="se-body">Eksplorasi penelitian pada Internet of Things, cloud computing, dan keamanan jaringan menjadi bagian dari proses pengembangan keilmuan.</p></article>
      </div>
    </section>

    <section class="se-block" id="csn-dosen" aria-labelledby="csn-faculty-title">
      ${renderSEEdgeObjects('faculty', 'csn')}
      <div class="se-section-heading"><h2 class="se-heading" id="csn-faculty-title" data-se-reveal>Bertemu para<br><em>pembimbing.</em></h2><p class="se-body">Beragam bidang keahlian untuk mendampingi proses belajar, mengeksplorasi gagasan, dan mengembangkan karya.</p></div>
      <div class="se-faculty-directory">
        <div class="org-tree-block" id="csnOrgTree">
          <div class="org-tree-header"><h3 class="org-tree-title">Struktur Organisasi Lab CSN</h3></div>
          <div class="org-hierarchy-tree">
            <div class="se-org-leader">${renderOrgFaculty(FACULTY[0])}</div>
            <div class="org-tree-connector" aria-hidden="true"><div class="connector-stem"></div><div class="connector-branch-horizontal"></div><div class="connector-drop-lines"><span></span><span></span><span></span><span></span></div></div>
            <div class="se-org-members">${FACULTY.slice(1).map(renderOrgFaculty).join('')}</div>
          </div>
        </div>
        ${renderLabFacultyReference(FACULTY[0])}
      </div>
    </section>

    ${renderSEPlayground({ prefix: 'csn', photos: PHOTOS, description: 'Materi pembelajaran Laboratorium CSN' })}
    ${renderLabFacilities('csn')}

    <section class="se-block" id="csn-karier" aria-labelledby="csn-career-title">
      ${renderSEEdgeObjects('career', 'csn')}
      <div class="se-career-layout"><div><h2 class="se-heading" id="csn-career-title" data-se-reveal>Bekal hari ini.<br>Peluang <em>esok hari.</em></h2><p class="se-body">Kompetensi sistem komputer dan jaringan membuka beragam jalur profesi. Temukan peran di bidang jaringan, cloud, keamanan, dan Internet of Things.</p></div>
      <div class="se-career-list" data-se-faq="career"></div></div>
    </section>

    <footer class="se-block se-contact" id="csn-kontak">
      ${renderSEEdgeObjects('contact', 'csn')}
      <h2 class="se-heading" data-se-reveal>Ide berikutnya,<br>bisa berawal <em>darimu.</em></h2>
      ${renderLabFooterActions('csn')}
    </footer>
  </div>`;
}

function renderOrgFaculty(d) {
  return `<article class="org-card liquid-glass-dark ${d.leader ? 'org-card-highlight' : ''}"><span class="org-card-badge">${d.leader ? 'KEPALA LAB CSN' : 'DOSEN LAB CSN'}</span><div class="org-avatar-wrap"><div class="org-avatar-circle"><img src="${siteUrl(`/assets/dosen/${d.image}.jpg`)}" alt="${d.name}" class="org-avatar-img" loading="lazy"></div></div><h4 class="org-name">${d.name}</h4><p class="org-role">${LAB_NAMES.CSN}</p><p class="org-focus">${d.field}</p></article>`;
}

export function initCSNSections(root, onHome, onLab, createCarousel) {
  const scope = root.querySelector('.se-editorial');
  if (!scope || scope.dataset.initialized) return;
  scope.dataset.initialized = 'true';
  initSEPlayground(root);
  initSEWorksWheel(root, PRODUCTS);
  initSEParallax(root);
  initLabFacilities(scope, createCarousel);
  import('./se-faq.tsx').then(({ initSEFaq }) => initSEFaq(root, CAREERS, 'Menjadi ruang belajar, diskusi ilmiah, dan penelitian pada sistem komputer serta jaringan. Pengembangannya mencakup cloud, virtualisasi, keamanan informasi, Internet of Things, dan administrasi sistem untuk mendukung solusi bagi industri dan masyarakat.'));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = (id) => scrollSETo(root, root.querySelector(`#${id}`), { immediate: motion.matches, offset: -32 });
  root.querySelector('#csnExploreBtn')?.addEventListener('click', e => { e.preventDefault(); scrollTo('csn-explore'); });
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
