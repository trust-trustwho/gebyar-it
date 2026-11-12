import { siteUrl } from './site-url.js';
// Membership follows the supplied lab materials; current lab heads and program
// leadership follow official UIKA publications for 2024–2028, checked 2026-11-03.
// NIDN values are explicitly archive identifiers on the official faculty page.
export const FACULTY_CHECKED_AT = '2026-11-03';
export const FACULTY_OFFICIAL_SOURCE = 'https://fts.uika-bogor.ac.id/program-studi/dosen/teknik-informatika';
export const FACULTY_LEADERSHIP_SOURCE = 'https://uika-bogor.ac.id/berita/rektor-uika-bogor-lantik-pejabat-struktural-baru-untuk-masa-bakti-2024%E2%80%932028';
export const LAB_NAMES = {
  "SE": "Software Engineering",
  "CSN": "Computer System Network",
  "GIT": "Geospatial Information Technology",
  "KERIS": "Knowledge Engineering and Reliable Intelligent Systems"
};
const MEMBERS = [
  {
    "id": "bu_berlin",
    "name": "Berlina Wulandari, S.T., M.Kom.",
    "field": "System Analyst",
    "fieldLabel": "Bidang Keahlian",
    "image": "bu_berlin",
    "labCode": "SE",
    "leader": true,
    "nidn": "0412109102",
    "sourceHref": siteUrl("/assets/referensi/lab-se.pdf#page=8"),
    "sourceLabel": "Materi Lab SE · hlm. 8",
    "email": "berlina@uika-bogor.ac.id"
  },
  {
    "id": "pak_safar",
    "name": "Safaruddin Hidayat Al Ikhsan, S.Kom., M.Kom.",
    "field": "Mobile Programming",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_safar",
    "labCode": "SE",
    "leader": false,
    "nidn": "0404118502",
    "sourceHref": siteUrl("/assets/referensi/lab-se.pdf#page=8"),
    "sourceLabel": "Materi Lab SE · hlm. 8"
  },
  {
    "id": "pak_hersanto",
    "name": "Hersanto Fajri, S.Ds., M.M.D.",
    "field": "Multimedia Design",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_hersanto",
    "labCode": "SE",
    "leader": false,
    "nidn": "0401058603",
    "sourceHref": siteUrl("/assets/referensi/lab-se.pdf#page=8"),
    "sourceLabel": "Materi Lab SE · hlm. 8",
    "leadershipRole": "Ketua Program Studi"
  },
  {
    "id": "pak_fitrah",
    "name": "Fitrah Satrya Fajar Kusumah, S.Kom., M.Kom.",
    "field": "System Analyst",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_fitrah",
    "labCode": "SE",
    "leader": false,
    "nidn": "0411058902",
    "sourceHref": siteUrl("/assets/referensi/lab-se.pdf#page=8"),
    "sourceLabel": "Materi Lab SE · hlm. 8"
  },
  {
    "id": "bu_freza",
    "name": "Freza Riana, S.Si., M.Si.",
    "field": "Math & Statistic",
    "fieldLabel": "Bidang Keahlian",
    "image": "bu_freza",
    "labCode": "SE",
    "leader": false,
    "nidn": "0428098701",
    "sourceHref": siteUrl("/assets/referensi/lab-se.pdf#page=8"),
    "sourceLabel": "Materi Lab SE · hlm. 8"
  },
  {
    "id": "pak_ade",
    "name": "Ade Hendri Hendrawan, S.Kom., M.Kom.",
    "field": "Sistem komputer dan jaringan",
    "fieldLabel": "Bidang Lab",
    "image": "pak_ade",
    "labCode": "CSN",
    "leader": true,
    "nidn": "0403106805",
    "sourceHref": siteUrl("/assets/referensi/profil-lab.pdf#page=2"),
    "sourceLabel": "Profil Lab · struktur NCC 2020–2024, hlm. 2"
  },
  {
    "id": "pak_yugo",
    "name": "Yuggo Afrianto, S.T., M.Kom.",
    "field": "Sistem komputer dan jaringan",
    "fieldLabel": "Bidang Lab",
    "image": "pak_yugo",
    "labCode": "CSN",
    "leader": false,
    "nidn": "0411018701",
    "sourceHref": siteUrl("/assets/referensi/profil-lab.pdf#page=2"),
    "sourceLabel": "Profil Lab · struktur NCC 2020–2024, hlm. 2"
  },
  {
    "id": "pak_ritzkal",
    "name": "Dr. Ritzkal, S.Kom., M.Kom.",
    "field": "Sistem komputer dan jaringan",
    "fieldLabel": "Bidang Lab",
    "image": "pak_ritzkal",
    "labCode": "CSN",
    "leader": false,
    "nidn": "0419058601",
    "sourceHref": siteUrl("/assets/referensi/profil-lab.pdf#page=2"),
    "sourceLabel": "Profil Lab · struktur NCC 2020–2024, hlm. 2"
  },
  {
    "id": "pak_bayu",
    "name": "Bayu Adhi Prakosa, S.Kom., M.T.",
    "field": "Sistem komputer dan jaringan",
    "fieldLabel": "Bidang Lab",
    "image": "pak_bayu",
    "labCode": "CSN",
    "leader": false,
    "nidn": "0421098002",
    "sourceHref": siteUrl("/assets/referensi/profil-lab.pdf#page=2"),
    "sourceLabel": "Profil Lab · struktur NCC 2020–2024, hlm. 2"
  },
  {
    "id": "pak_erwin",
    "name": "Dr. Erwin Hermawan",
    "field": "Pemodelan Spasial Dinamik",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_erwin",
    "labCode": "GIT",
    "leader": true,
    "nidn": "0426018205",
    "sourceHref": siteUrl("/assets/referensi/lab-git.pdf#page=2"),
    "sourceLabel": "Materi Lab GIT · hlm. 2"
  },
  {
    "id": "pak_iksal",
    "name": "Iksal Yanuarsyah",
    "field": "Aplikasi Penginderaan Jauh",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_iksal",
    "labCode": "GIT",
    "leader": false,
    "nidn": "0428018003",
    "sourceHref": siteUrl("/assets/referensi/lab-git.pdf#page=2"),
    "sourceLabel": "Materi Lab GIT · hlm. 2"
  },
  {
    "id": "pak_sahid",
    "name": "Sahid Agustian Hudjimartsu, S.T., M.Kom.",
    "field": "Pemrograman Spasial",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_sahid",
    "labCode": "GIT",
    "leader": false,
    "nidn": "0417088406",
    "sourceHref": siteUrl("/assets/referensi/lab-git.pdf#page=2"),
    "sourceLabel": "Materi Lab GIT · hlm. 2"
  },
  {
    "id": "bu_nurul",
    "name": "Nurul Kamilah, S.Kom., M.Kom.",
    "field": "Perancangan Sistem Informasi Geospasial",
    "fieldLabel": "Bidang Keahlian",
    "image": "bu_nurul",
    "labCode": "GIT",
    "leader": false,
    "nidn": "0427118601",
    "sourceHref": siteUrl("/assets/referensi/lab-git.pdf#page=2"),
    "sourceLabel": "Materi Lab GIT · hlm. 2"
  },
  {
    "id": "pak_aftaf",
    "name": "Mohammad Aftaf Muhajir, S.Si., M.Kom.",
    "field": "Pemrograman Spasial",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_aftaf",
    "labCode": "GIT",
    "leader": false,
    "nidn": "0419098907",
    "sourceHref": siteUrl("/assets/referensi/lab-git.pdf#page=2"),
    "sourceLabel": "Materi Lab GIT · hlm. 2"
  },
  {
    "id": "bu_fety",
    "name": "Fety Fatimah, S.Kom., M.Kom.",
    "field": "Perancangan Sistem Informasi Geospasial",
    "fieldLabel": "Bidang Keahlian",
    "image": "bu_fety",
    "labCode": "GIT",
    "leader": false,
    "nidn": "0330108103",
    "sourceHref": siteUrl("/assets/referensi/lab-git.pdf#page=2"),
    "sourceLabel": "Materi Lab GIT · hlm. 2",
    "leadershipRole": "Sekretaris Program Studi"
  },
  {
    "id": "bu_puspa",
    "name": "Dr. Puspa Eosina, S.Si., M.Kom.",
    "field": "Data Mining & Machine Learning",
    "fieldLabel": "Bidang Keahlian",
    "image": "bu_puspa",
    "labCode": "KERIS",
    "leader": true,
    "nidn": "0429037106",
    "sourceHref": siteUrl("/assets/referensi/lab-keris.pdf#page=21"),
    "sourceLabel": "Materi Lab KERIS · hlm. 21"
  },
  {
    "id": "pak_foni",
    "name": "Dr. Foni Agus Setiawan",
    "field": "Semantic Web & Knowledge Engineering",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_foni",
    "labCode": "KERIS",
    "leader": false,
    "nidn": "",
    "sourceHref": siteUrl("/assets/referensi/lab-keris.pdf#page=21"),
    "sourceLabel": "Materi Lab KERIS · hlm. 21"
  },
  {
    "id": "bu_gibtha",
    "name": "Gibtha Fitri Laxmi, S.Kom., M.Kom.",
    "field": "Computer Vision & Pengenalan Pola",
    "fieldLabel": "Bidang Keahlian",
    "image": "bu_gibtha",
    "labCode": "KERIS",
    "leader": false,
    "nidn": "0412078506",
    "sourceHref": siteUrl("/assets/referensi/lab-keris.pdf#page=21"),
    "sourceLabel": "Materi Lab KERIS · hlm. 21"
  },
  {
    "id": "pak_andik",
    "name": "Andi Eko Kristus Pramuko, S.Si., M.T.",
    "field": "IoT dan Big Data",
    "fieldLabel": "Bidang Keahlian",
    "image": "pak_andik",
    "labCode": "KERIS",
    "leader": false,
    "nidn": "0406116206",
    "sourceHref": siteUrl("/assets/referensi/lab-keris.pdf#page=21"),
    "sourceLabel": "Materi Lab KERIS · hlm. 21"
  },
  {
    "id": "bu_dewi",
    "name": "Dewi Primasari",
    "field": "Pengabdian kepada Masyarakat",
    "fieldLabel": "Bidang Keahlian",
    "image": "bu_dewi",
    "labCode": "KERIS",
    "leader": false,
    "nidn": "0428097404",
    "sourceHref": siteUrl("/assets/referensi/lab-keris.pdf#page=21"),
    "sourceLabel": "Materi Lab KERIS · hlm. 21"
  }
];

export function getLabFaculty(code) {
  return MEMBERS.filter(member => member.labCode === code).map(member => ({ ...member }));
}
export const FACULTY_DIRECTORY = MEMBERS.map(member => ({
  ...member, image: siteUrl(`/assets/dosen/${member.image}.jpg`),
  initials: member.name.replace(/^(Dr\. )/, '').split(/[ ,]+/).slice(0, 2).map(word => word[0]).join(''),
  category: member.labCode, lab: LAB_NAMES[member.labCode],
  role: member.leadershipRole ? `${member.leadershipRole} · 2024–2028` : `${member.leader ? 'Kepala' : 'Dosen'} Lab ${member.labCode}`,
  isPimpinan: Boolean(member.leadershipRole), isKaLab: member.leader,
  expertise: [member.field],
}));
export function filterFaculty(data, category = 'ALL', query = '') {
  const needle = query.trim().toLocaleLowerCase('id');
  return data.filter(member => (category === 'ALL' || (category === 'PIMPINAN' ? member.isPimpinan : member.labCode === category))
    && (!needle || [member.name, member.nidn, member.role, member.lab, ...member.expertise].join(' ').toLocaleLowerCase('id').includes(needle)));
}
