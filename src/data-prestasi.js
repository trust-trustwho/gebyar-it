import { siteUrl } from './site-url.js';
const seSource = (page, label = `Dokumentasi Lab SE · halaman ${page}`) => ({
  label, href: siteUrl(`/assets/referensi/lab-se.pdf#page=${page}`),
});

// Only documented claims. Dates refer to the event/program, not cohort or news publication.
export const PRESTASI = [
  {
    id: 'gsa-2025', year: '2025', category: 'program', categoryLabel: 'PROGRAM MAHASISWA',
    title: 'Terpilih sebagai Google Student Ambassador', lab: 'Teknik Informatika · UIKA Bogor', labCode: 'KERIS', labs: ['KERIS'],
    subject: 'Ridho Mas’ud Said & Anastia Firyal Nisrina',
    desc: 'Dua mahasiswa Teknik Informatika UIKA terpilih sebagai Google Student Ambassador 2025.',
    fullDesc: 'Ridho Mas’ud Said dan Anastia Firyal Nisrina terpilih sebagai Google Student Ambassador 2025. Fakultas Teknik & Sains UIKA mengumumkan capaian ini pada 19 September 2025. Program ini mendukung pengembangan kepemimpinan dan literasi teknologi mahasiswa. Keanggotaan lab merujuk dokumentasi KERIS halaman 12, sedangkan nama penerima merujuk pengumuman fakultas.',
    highlights: ['Google Student Ambassador', 'Pengembangan mahasiswa'],
    people: [{ label: 'Mahasiswa terpilih', name: 'Ridho Mas’ud Said dan Anastia Firyal Nisrina' }],
    metrics: [{ value: '2', label: 'Mahasiswa terpilih' }, { value: '2025', label: 'Tahun program' }],
    preview: 'Ridho Mas’ud Said · Anastia Firyal Nisrina',
    sources: [
      { label: 'Pengumuman resmi FTS UIKA · 19 September 2025', href: 'https://fts.uika-bogor.ac.id/news/read/selamat-sukses-kami-ucapkan-selamat-yang-sebesar-besarnya-kepada-ridho-mas-ud-said-dan-anastia-firyal-nisrina-mahasiswa-prodi-teknik-informatika-universitas-ibn-khaldun-atas-terpilihnya-sebagai-google-student-ambassador-gsa-2025' },
      { label: 'Dokumentasi Lab KERIS · halaman 12', href: siteUrl('/assets/referensi/lab-keris.pdf#page=12') },
    ],
  },
  {
    id: 'teladan-2024', year: '2024', category: 'penghargaan', categoryLabel: 'PENGHARGAAN MAHASISWA',
    title: 'Mahasiswa Teladan Fakultas Teknik dan Sains', lab: 'Software Engineering (SE)', labCode: 'SE', labs: ['SE'],
    subject: 'Muhammad Rizki · angkatan 2021',
    desc: 'Dokumentasi Lab SE mencatat Muhammad Rizki sebagai Mahasiswa Teladan Fakultas Teknik dan Sains UIKA pada 2024.',
    fullDesc: 'Materi Lab SE pada halaman 20 mencantumkan Muhammad Rizki, mahasiswa angkatan 2021, sebagai Mahasiswa Teladan Fakultas Teknik dan Sains UIKA tahun 2024. Penghargaan ini menjadi bagian dari catatan pencapaian mahasiswa pada materi pengenalan Lab SE.',
    highlights: ['Mahasiswa teladan', 'Fakultas Teknik dan Sains'],
    people: [{ label: 'Penerima', name: 'Muhammad Rizki · angkatan 2021' }],
    metrics: [{ value: '2024', label: 'Tahun penghargaan' }, { value: 'FTS', label: 'Lingkup fakultas' }],
    preview: 'Muhammad Rizki · Software Engineering', sources: [seSource(20)],
  },
  {
    id: 'resaji-bangkit-2023', year: '2023', category: 'pendanaan', categoryLabel: 'PENDANAAN INKUBASI',
    title: 'reSaji masuk 10 tim terbaik Bangkit', lab: 'Software Engineering (SE) · kolaborasi lintas kampus', labCode: 'SE', labs: ['SE'],
    subject: 'Muhammad Rizki bersama tim reSaji',
    desc: 'Tim lintas kampus reSaji terpilih mengikuti inkubasi Bangkit 2023 dengan pendanaan hingga Rp140 juta.',
    fullDesc: 'Muhammad Rizki, mahasiswa peminatan Software Engineering UIKA angkatan 2021, berkolaborasi dengan mahasiswa dari kampus lain dalam tim reSaji. Platform ini menghubungkan penjual makanan berlebih dengan pembeli untuk membantu mengurangi pemborosan makanan. Menurut berita resmi UIKA, reSaji termasuk sepuluh tim terbaik Bangkit 2023 yang mendapat kesempatan inkubasi dengan pendanaan hingga Rp140 juta. Pendanaan inkubasi mendukung pengembangan proyek tim lintas kampus tersebut.',
    highlights: ['Bangkit 2023', 'Inkubasi produk', 'Pengurangan pemborosan makanan'],
    people: [{ label: 'Mahasiswa UIKA', name: 'Muhammad Rizki · SE angkatan 2021' }, { label: 'Tim', name: 'reSaji · kolaborasi mahasiswa lintas kampus' }],
    metrics: [{ value: '10 besar', label: 'Tim terbaik Bangkit 2023' }, { value: '≤ Rp140 jt', label: 'Pendanaan inkubasi tim' }],
    preview: 'Muhammad Rizki · tim lintas kampus reSaji',
    sources: [{ label: 'Berita resmi UIKA · pendanaan reSaji', href: 'https://uika-bogor.ac.id/berita/keren-mahasiswa-fts-uika-bogor-dapat-pendanaan-rp140-juta-dari-program-bangkit-2023' }, seSource(20)],
  },
  {
    id: 'edsen-2022', year: '2022', category: 'kompetisi', categoryLabel: 'FINALIS KOMPETISI NASIONAL',
    title: '10 besar finalis nasional EDSEN Hackathon', lab: 'Software Engineering (SE)', labCode: 'SE', labs: ['SE'],
    subject: 'Tim InnoSoft',
    desc: 'Tim InnoSoft masuk sepuluh besar finalis nasional EDSEN Hackathon 2022 berdasarkan dokumentasi Lab SE.',
    fullDesc: 'Dokumentasi Lab SE pada halaman 31 menampilkan foto kegiatan dan keterangan bahwa tim InnoSoft menjadi sepuluh besar finalis nasional EDSEN Hackathon tahun 2022. Dokumentasi tersebut merekam pengalaman tim dalam mengikuti kompetisi tingkat nasional.',
    highlights: ['EDSEN Hackathon', 'Finalis nasional'],
    people: [{ label: 'Tim', name: 'InnoSoft · Laboratorium SE' }],
    metrics: [{ value: '10 besar', label: 'Finalis nasional' }, { value: '2022', label: 'Tahun kompetisi' }],
    preview: 'Tim InnoSoft · dokumentasi Lab SE', sources: [seSource(31)],
  },
  {
    id: 'inovasi-bogor-2020', year: '2020', category: 'kompetisi', categoryLabel: 'KOMPETISI TINGKAT KABUPATEN',
    title: 'Juara I, II, dan III lomba inovasi', lab: 'Software Engineering (SE)', labCode: 'SE', labs: ['SE'],
    subject: 'Tim InnoSoft · Kabupaten Bogor',
    desc: 'Dokumentasi Lab SE mencatat perolehan juara I, II, dan III tim InnoSoft pada lomba inovasi Kabupaten Bogor 2020.',
    fullDesc: 'Materi Lab SE pada halaman 34–35 mencatat tim InnoSoft meraih juara I, II, dan III pada lomba inovasi tingkat Kabupaten Bogor tahun 2020. Foto dokumentasi memperlihatkan papan penghargaan ketiga peringkat. Capaian ini merupakan bagian dari dokumentasi keikutsertaan tim pada kompetisi inovasi daerah.',
    highlights: ['Inovasi daerah', 'Kabupaten Bogor'],
    people: [{ label: 'Tim', name: 'InnoSoft · Laboratorium SE' }],
    metrics: [{ value: 'I, II, III', label: 'Peringkat dalam dokumentasi' }, { value: 'Kabupaten', label: 'Bogor · tahun 2020' }],
    preview: 'Tim InnoSoft · lomba inovasi Kabupaten Bogor', sources: [seSource(34), seSource(35)],
  },
  {
    id: 'hackathon-2020', year: '2020', category: 'kompetisi', categoryLabel: 'FINALIS KOMPETISI NASIONAL',
    title: '5 besar finalis hackathon nasional', lab: 'Software Engineering (SE) & KERIS', labCode: 'SE', labs: ['SE', 'KERIS'],
    subject: 'Kolaborasi InnoSoft dan KERIS',
    desc: 'Kolaborasi InnoSoft dan KERIS masuk lima besar finalis hackathon nasional 2020 menurut dokumentasi Lab SE.',
    fullDesc: 'Halaman 36 materi Lab SE menampilkan foto spanduk dan keterangan kolaborasi tim InnoSoft dan KERIS yang lolos lima besar finalis lomba hackathon tingkat nasional pada 2020. Pengalaman ini mempertemukan anggota kedua lab dalam kompetisi tingkat nasional.',
    highlights: ['Hackathon nasional', 'Kolaborasi antarlab'],
    people: [{ label: 'Tim', name: 'Kolaborasi InnoSoft dan KERIS' }],
    metrics: [{ value: '5 besar', label: 'Finalis nasional' }, { value: '2020', label: 'Tahun kompetisi' }],
    preview: 'Tim InnoSoft & KERIS', sources: [seSource(36)],
  },
];

export function escapePrestasi(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

export function renderPrestasiCards() {
  return PRESTASI.map((item, index) => `
    <div class="timeline-milestone-item milestone-pos-${index === 5 ? 'center' : index % 2 ? 'right' : 'left'}" data-category="${item.category}" data-detail="${escapePrestasi(JSON.stringify(item))}">
      <div class="timeline-card liquid-glass-dark"><div class="timeline-card-inner">
        <div class="timeline-card-top"><span class="timeline-year-tag">${item.year}</span><span class="timeline-cat-pill">${item.categoryLabel}</span><div class="timeline-labs-group">${item.labs.map(lab => `<span class="dosen-lab-badge badge-${lab.toLowerCase()}">${lab}</span>`).join('')}</div></div>
        <h4 class="timeline-card-title">${escapePrestasi(item.title)}</h4>
        <p class="timeline-card-product"><strong>${escapePrestasi(item.subject)}</strong></p>
        <p class="timeline-card-desc">${escapePrestasi(item.desc)}</p>
        <div class="timeline-metric-row">${item.metrics.map(metric => `<span class="timeline-metric-chip">${escapePrestasi(metric.value)} · ${escapePrestasi(metric.label)}</span>`).join('')}</div>
        <div class="timeline-card-footer"><span class="timeline-team-preview">${escapePrestasi(item.preview)}</span><button type="button" class="timeline-detail-btn" aria-label="Lihat detail: ${escapePrestasi(item.title)}">Detail capaian <span aria-hidden="true">↗</span></button></div>
      </div></div>
    </div>`).join('');
}
