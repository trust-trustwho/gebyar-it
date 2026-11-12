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

// Content references: PPT_SE.pdf pp. 8–16, 20, 31, 34, 40–42, 65, 74–76;
// Profil_LAB.pdf pp. 5–8. Images are extracted from the supplied PDF.
const PRODUCTS = [
  { name: 'SIAK', type: 'Sistem informasi akademik', image: 'siak', page: 74,
    description: 'Pengalaman akademik dalam satu sistem. SIAK menjadi salah satu produk yang ditampilkan Laboratorium SE, dengan keterlibatan mahasiswa angkatan 2022.',
    skills: ['Pengembangan web', 'Pengolahan data', 'Antarmuka aplikasi'] },
  { name: 'SIMPEG', type: 'Sistem informasi kepegawaian', image: 'simpeg', page: 75,
    description: 'Penerapan rekayasa perangkat lunak dalam pengelolaan informasi kepegawaian. Produk ini ditampilkan dalam dokumentasi karya mahasiswa angkatan 2022.',
    skills: ['Analisis kebutuhan', 'Basis data', 'Pengembangan sistem'] },
  { name: 'Support PMB', type: 'Dukungan penerimaan mahasiswa baru', image: 'pmb', page: 76,
    description: 'Kontribusi mahasiswa angkatan 2022 pada pengembangan sistem pendukung penerimaan mahasiswa baru, sebagaimana ditampilkan dalam portofolio Lab SE.',
    skills: ['Aplikasi web', 'Desain antarmuka', 'Integrasi informasi'] },
  { name: 'UCL', type: 'UIKA Campus Life', image: 'ucl', page: 72,
    description: 'UCL (UIKA Campus Life) merupakan salah satu produk yang ditampilkan dalam portofolio Laboratorium SE. Dokumentasinya memperlihatkan antarmuka akses platform untuk lingkungan kampus.',
    skills: ['Pengembangan web', 'Desain antarmuka', 'Layanan kampus'] },
  { name: 'Website Prodi', type: 'Website Program Studi Teknik Informatika', image: 'website-prodi', page: 73,
    description: 'Website Program Studi Teknik Informatika ditampilkan sebagai produk Lab SE. Dokumentasinya memuat profil prodi, informasi akademik, dan kegiatan di lingkungan Teknik Informatika.',
    skills: ['Website profil', 'Penyajian informasi', 'Antarmuka web'] },
];

const FACULTY = getLabFaculty('SE');

const CAREERS = [
  ['Web & Fullstack Developer', 'Membangun aplikasi web dari antarmuka hingga pengolahan data. Menggabungkan pemrograman web, basis data, dan pemahaman kebutuhan pengguna.', 'Pemrograman web · Basis data · Web service'],
  ['Mobile Developer', 'Mengembangkan aplikasi perangkat bergerak, baik native maupun hybrid. Menerjemahkan kebutuhan pengguna menjadi pengalaman yang nyaman di perangkat mobile.', 'Pemrograman mobile · Perancangan aplikasi · Pengujian'],
  ['UI/UX Designer', 'Merancang pengalaman dan antarmuka aplikasi melalui pemahaman pengguna, prototyping, serta evaluasi desain.', 'Riset pengguna · Prototyping · Visual design'],
  ['System Analyst', 'Menganalisis kebutuhan dan proses kerja untuk menghasilkan rancangan sistem yang terstruktur dan dapat dikembangkan.', 'Analisis kebutuhan · Pemodelan sistem · Komunikasi'],
  ['Software Tester & Quality Assurance', 'Mengevaluasi fungsi dan kualitas perangkat lunak. Menyusun pengujian agar aplikasi bekerja sesuai kebutuhan.', 'Skenario pengujian · Analisis · Dokumentasi'],
  ['IT Consultant & Wirausahawan', 'Menerapkan kemampuan rekayasa perangkat lunak untuk membantu organisasi atau mengembangkan produk dan usaha teknologi sendiri.', 'Pemecahan masalah · Pengembangan produk · Kolaborasi'],
];

export function renderSESections() {
  return `
  <div class="se-editorial" id="se-content">
    <section class="se-block se-about" id="se-explore" aria-labelledby="se-about-title">
      ${renderSEEdgeObjects('about')}
      <div class="se-about-layout">
        <h2 id="se-about-title" class="se-heading" data-se-reveal>Berawal dari ide.<br>Menjadi <em>karya.</em></h2>
        <div class="se-about-copy">
          <p class="se-mission" data-se-words>Kami belajar memahami masalah, merancang solusi, dan membangun perangkat lunak yang berguna bagi kehidupan.</p>
          <p class="se-body">Laboratorium Software Engineering merupakan ruang belajar dan riset pengembangan perangkat lunak di Teknik Informatika UIKA Bogor. Web, mobile, dan kecerdasan buatan menjadi bagian dari pengembangan solusi untuk mendukung smart campus.</p>
          <div class="se-faq-about" data-se-faq="about"></div>
        </div>
      </div>
      <div class="se-focus-line" aria-label="Lingkup penelitian"><span>Web Engineering</span><span>Mobile Engineering</span><span>UI/UX</span><span>Augmented Reality</span><span>Big Data</span><span>Decision Support</span></div>
    </section>

    <section class="se-block" id="se-belajar" aria-labelledby="se-learn-title">
      ${renderSEEdgeObjects('learn')}
      <div class="se-section-heading"><h2 class="se-heading" id="se-learn-title" data-se-reveal>Dari rasa ingin tahu,<br>menjadi <em>kemampuan.</em></h2><p class="se-body">Bangun fondasi, temukan fokusmu, lalu terapkan dalam sebuah produk. Setiap proses memberi ruang untuk mencoba dan bertumbuh.</p></div>
      <div class="se-learning">
        ${[
          ['01','Pahami masalah','Analisis kebutuhan & logika','Pelajari cara memahami kebutuhan pengguna, berpikir analitis, dan menuangkan solusi ke dalam perancangan berorientasi objek.'],
          ['02','Rancang pengalaman','UI/UX & perancangan sistem','Eksplorasi riset pengguna, prototyping, visual design, serta perancangan antarmuka yang mengikuti prinsip UI dan UX.'],
          ['03','Bangun solusinya','Web & mobile development','Kembangkan website, sistem pengolahan data, dan aplikasi mobile native maupun hybrid. Hubungkan kemampuan teknis menjadi aplikasi yang utuh.'],
          ['04','Tumbuh lewat kolaborasi','Proyek, riset & komunikasi','Latih kerja tim, komunikasi, dan kemampuan analisis melalui proyek. Eksplorasi riset web, mobile, AR, big data, dan sistem pendukung keputusan.'],
        ].map(([n,title,sub,desc]) => `<article class="se-learn-step" data-se-reveal><span class="se-step-no">${n}</span><h3>${title}</h3><p class="se-step-sub">${sub}</p><p class="se-body">${desc}</p></article>`).join('')}
      </div>
      <p class="se-small-note">Gambaran pengembangan kompetensi, bukan urutan semester kurikulum.</p>
    </section>

    <section class="se-block se-work" id="se-karya" aria-labelledby="se-work-title">
      <div class="se-work-scroll"><div class="se-work-sticky">
      <div class="se-section-heading"><h2 class="se-heading" id="se-work-title" data-se-reveal>Belajar dengan<br><em>mewujudkan.</em></h2><p class="se-body">Dari kebutuhan di lingkungan kampus, lahir kesempatan untuk mengembangkan dan menerapkan perangkat lunak.</p></div>
      ${renderSEWorksWheel(PRODUCTS)}
      </div></div>
      <div class="se-achievement-heading"><h3>Langkah yang <em>membanggakan.</em></h3><span>CATATAN PRESTASI</span></div>
      <div class="se-achievements">
        <article data-se-reveal><span class="se-achievement-number">140<em>juta</em></span><h4>Pendanaan capstone Bangkit</h4><p class="se-body">Muhammad Rizki, angkatan 2021, menerima pendanaan Best Capstone Project Bangkit serta meraih predikat Distinction Graduate.</p></article>
        <article data-se-reveal><span class="se-achievement-number">10<em>besar</em></span><h4>Finalis nasional EDSEN</h4><p class="se-body">Tim InnoSoft menjadi finalis nasional EDSEN Hackathon tahun 2022. Pengalaman berkompetisi menjadi bagian dari perjalanan berkarya.</p></article>
        <article data-se-reveal><span class="se-achievement-number">I, II, III</span><h4>Lomba inovasi Kabupaten Bogor</h4><p class="se-body">Tim InnoSoft meraih juara I, II, dan III dalam lomba inovasi tingkat Kabupaten Bogor tahun 2020.</p></article>
      </div>
    </section>

    <section class="se-block" id="se-dosen" aria-labelledby="se-faculty-title">
      ${renderSEEdgeObjects('faculty')}
      <div class="se-section-heading"><h2 class="se-heading" id="se-faculty-title" data-se-reveal>Bertemu para<br><em>pembimbing.</em></h2><p class="se-body">Beragam bidang keahlian untuk mendampingi proses belajar, mengeksplorasi gagasan, dan mengembangkan karya.</p></div>
      <div class="se-faculty-directory">
        <div class="org-tree-block" id="seOrgTree">
          <div class="org-tree-header"><h3 class="org-tree-title">Struktur Organisasi Lab SE</h3></div>
          <div class="org-hierarchy-tree">
            <div class="se-org-leader">${renderOrgFaculty(FACULTY[0])}</div>
            <div class="org-tree-connector" aria-hidden="true"><div class="connector-stem"></div><div class="connector-branch-horizontal"></div><div class="connector-drop-lines"><span></span><span></span><span></span><span></span></div></div>
            <div class="se-org-members">${FACULTY.slice(1).map(renderOrgFaculty).join('')}</div>
          </div>
        </div>
        ${renderLabFacultyReference(FACULTY[0])}
      </div>
    </section>

    ${renderSEPlayground()}
    ${renderLabFacilities('se')}

    <section class="se-block" id="se-karier" aria-labelledby="se-career-title">
      ${renderSEEdgeObjects('career')}
      <div class="se-career-layout"><div><h2 class="se-heading" id="se-career-title" data-se-reveal>Bekal hari ini.<br>Peluang <em>esok hari.</em></h2><p class="se-body">Kemampuan rekayasa perangkat lunak membuka berbagai jalur profesi. Temukan peran yang sesuai dengan minat dan keahlian yang ingin kamu bangun.</p></div>
      <div class="se-career-list" data-se-faq="career"></div></div>
    </section>

    <footer class="se-block se-contact" id="se-kontak">
      ${renderSEEdgeObjects('contact')}
      <h2 class="se-heading" data-se-reveal>Ide berikutnya,<br>bisa berawal <em>darimu.</em></h2>
      ${renderLabFooterActions('se')}
    </footer>
  </div>`;
}

function renderOrgFaculty(d) {
  return `<article class="org-card liquid-glass-dark ${d.leader ? 'org-card-highlight' : ''}"><span class="org-card-badge">${d.leader ? 'KEPALA LAB SE' : 'DOSEN LAB SE'}</span><div class="org-avatar-wrap"><div class="org-avatar-circle"><img src="${siteUrl(`/assets/dosen/${d.image}.jpg`)}" alt="${d.name}" class="org-avatar-img" loading="lazy"></div></div><h4 class="org-name">${d.name}</h4><p class="org-role">Software Engineering</p><p class="org-focus">${d.field}</p>${d.leader && d.email ? `<button type="button" class="dosen-contact-btn" data-se-copy-email="${d.email}" title="Salin email kepala lab"><span class="email-text">${d.email}</span></button><span class="se-sr-only" data-se-copy-status role="status"></span>` : ''}</article>`;
}

export function initSESections(root, onHome, onLab, createCarousel) {
  const scope = root.querySelector('.se-editorial');
  if (!scope || scope.dataset.initialized) return;
  scope.dataset.initialized = 'true';
  initSEPlayground(root);
  initSEWorksWheel(root, PRODUCTS);
  initSEParallax(root);
  initLabFacilities(scope, createCarousel);
  import('./se-faq.tsx').then(({ initSEFaq }) => initSEFaq(root, CAREERS));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = (id) => scrollSETo(root, root.querySelector(`#${id}`), { immediate: motion.matches, offset: -32 });
  root.querySelector('#seExploreBtn')?.addEventListener('click', e => { e.preventDefault(); scrollTo('se-explore'); });
  initLabFooter(root, onLab);
  const emailButton = scope.querySelector('[data-se-copy-email]');
  const emailStatus = scope.querySelector('[data-se-copy-status]');
  let emailFeedbackTimer;
  emailButton?.addEventListener('click', async () => {
    const email = emailButton.dataset.seCopyEmail;
    try {
      await navigator.clipboard.writeText(email);
      emailStatus.textContent = 'Email kepala lab tersalin.';
      const label = emailButton.querySelector('.email-text');
      label.textContent = 'Tersalin!';
      clearTimeout(emailFeedbackTimer);
      emailFeedbackTimer = setTimeout(() => { label.textContent = email; }, 1800);
    } catch {
      emailStatus.textContent = 'Email tidak dapat disalin. Alamat email: ' + email;
      window.location.href = `mailto:${email}`;
    }
  });
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
