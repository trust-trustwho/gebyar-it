import { siteUrl } from './site-url.js';
// Career examples grounded in the supplied lab materials; no alumni biographies.
// Roadmaps are editorial learning suggestions, not semester curricula or hiring guarantees.
export const CAREER_PATHS = [
  {
    "id": "web-se",
    "title": "Fullstack Web Developer",
    "labCode": "SE",
    "trackLabel": "Web & Aplikasi",
    "accentColor": "#eab308",
    "description": "Membangun aplikasi web dari antarmuka sampai pengolahan data.",
    "focus": "Web & Aplikasi",
    "topSkills": [
      "Pemrograman web",
      "Basis data",
      "Analisis kebutuhan"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Pahami kebutuhan pengguna dan dasar pemrograman web."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari antarmuka, layanan aplikasi, dan pengelolaan basis data."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Bangun contoh aplikasi dengan alur input, pengolahan, dan penyajian data."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Dokumentasikan rancangan, hasil pengujian, dan perbaikan aplikasi."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab SE · halaman 11",
        "href": siteUrl("/assets/referensi/lab-se.pdf#page=11")
      },
      {
        "label": "Materi Lab SE · halaman 16",
        "href": siteUrl("/assets/referensi/lab-se.pdf#page=16")
      }
    ]
  },
  {
    "id": "ux-se",
    "title": "UI/UX Designer",
    "labCode": "SE",
    "trackLabel": "Desain Pengalaman",
    "accentColor": "#eab308",
    "description": "Merancang pengalaman dan antarmuka aplikasi berdasarkan kebutuhan pengguna.",
    "focus": "Desain Pengalaman",
    "topSkills": [
      "Riset pengguna",
      "Prototyping",
      "Visual design"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Kenali kebutuhan pengguna dan prinsip interaksi antarmuka."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari prototyping dan perancangan visual."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Susun prototipe untuk menguji alur penggunaan aplikasi."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Catat hasil evaluasi dan tunjukkan perubahan desain dalam portofolio."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab SE · halaman 13",
        "href": siteUrl("/assets/referensi/lab-se.pdf#page=13")
      },
      {
        "label": "Materi Lab SE · halaman 15",
        "href": siteUrl("/assets/referensi/lab-se.pdf#page=15")
      },
      {
        "label": "Materi Lab SE · halaman 16",
        "href": siteUrl("/assets/referensi/lab-se.pdf#page=16")
      }
    ]
  },
  {
    "id": "network-csn",
    "title": "Network Engineer",
    "labCode": "CSN",
    "trackLabel": "Infrastruktur Jaringan",
    "accentColor": "#06b6d4",
    "description": "Merancang, menerapkan, dan memantau jaringan komputer.",
    "focus": "Infrastruktur Jaringan",
    "topSkills": [
      "Topologi jaringan",
      "Routing & switching",
      "Monitoring"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Pahami komunikasi data dan topologi jaringan."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari simulasi jaringan dengan Cisco, GNS3, atau Packet Tracer."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Buat dan uji rancangan jaringan dalam lingkungan praktik."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Dokumentasikan konfigurasi, pemantauan, serta penanganan gangguan."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab CSN · halaman 4",
        "href": siteUrl("/assets/referensi/lab-csn.pdf#page=4")
      },
      {
        "label": "Materi Lab CSN · halaman 5",
        "href": siteUrl("/assets/referensi/lab-csn.pdf#page=5")
      }
    ]
  },
  {
    "id": "security-csn",
    "title": "Cybersecurity Specialist",
    "labCode": "CSN",
    "trackLabel": "Keamanan Jaringan",
    "accentColor": "#06b6d4",
    "description": "Menganalisis risiko dan menerapkan perlindungan pada sistem serta jaringan.",
    "focus": "Keamanan Jaringan",
    "topSkills": [
      "Firewall",
      "IDS/IPS",
      "VPN"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Kenali sistem komputer, jaringan, dan dasar keamanan informasi."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari firewall, IDS/IPS, serta VPN."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Latih analisis dan mitigasi ancaman pada simulasi yang terkontrol."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Dokumentasikan temuan, konfigurasi perlindungan, dan hasil evaluasi."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab CSN · halaman 4",
        "href": siteUrl("/assets/referensi/lab-csn.pdf#page=4")
      },
      {
        "label": "Materi Lab CSN · halaman 5",
        "href": siteUrl("/assets/referensi/lab-csn.pdf#page=5")
      },
      {
        "label": "Materi Lab CSN · halaman 6",
        "href": siteUrl("/assets/referensi/lab-csn.pdf#page=6")
      }
    ]
  },
  {
    "id": "gis-git",
    "title": "GIS Analyst",
    "labCode": "GIT",
    "trackLabel": "Analisis Spasial",
    "accentColor": "#f97316",
    "description": "Mengolah data berbasis lokasi untuk memahami pola keruangan dan mendukung keputusan.",
    "focus": "Analisis Spasial",
    "topSkills": [
      "Data geospasial",
      "Analisis spasial",
      "Peta tematik"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Pahami data lokasi, peta, serta konsep sistem informasi geografis."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari pengolahan dan analisis data geospasial."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Buat analisis atau peta tematik dari persoalan berbasis lokasi."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Jelaskan sumber data, metode, hasil, dan batas analisis dalam portofolio."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab GIT · halaman 5",
        "href": siteUrl("/assets/referensi/lab-git.pdf#page=5")
      },
      {
        "label": "Materi Lab GIT · halaman 6",
        "href": siteUrl("/assets/referensi/lab-git.pdf#page=6")
      },
      {
        "label": "Materi Lab GIT · halaman 13",
        "href": siteUrl("/assets/referensi/lab-git.pdf#page=13")
      }
    ]
  },
  {
    "id": "webgis-git",
    "title": "WebGIS Developer",
    "labCode": "GIT",
    "trackLabel": "Aplikasi Geospasial",
    "accentColor": "#f97316",
    "description": "Mengembangkan aplikasi peta berbasis web untuk menyajikan informasi geospasial.",
    "focus": "Aplikasi Geospasial",
    "topSkills": [
      "WebGIS",
      "Basis data spasial",
      "Pemrograman spasial"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Pahami dasar pemrograman web dan informasi geografis."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari penyimpanan data spasial dan penyajian peta interaktif."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Bangun contoh WebGIS dengan layer dan informasi lokasi."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Dokumentasikan rancangan, data, dan evaluasi fungsi aplikasi."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab GIT · halaman 6",
        "href": siteUrl("/assets/referensi/lab-git.pdf#page=6")
      },
      {
        "label": "Materi Lab GIT · halaman 7",
        "href": siteUrl("/assets/referensi/lab-git.pdf#page=7")
      },
      {
        "label": "Materi Lab GIT · halaman 13",
        "href": siteUrl("/assets/referensi/lab-git.pdf#page=13")
      }
    ]
  },
  {
    "id": "data-keris",
    "title": "Data Scientist",
    "labCode": "KERIS",
    "trackLabel": "Analisis Data",
    "accentColor": "#a855f7",
    "description": "Mengolah dan menganalisis data untuk menemukan informasi serta mengembangkan model.",
    "focus": "Analisis Data",
    "topSkills": [
      "Pengolahan data",
      "Analisis data",
      "Pemodelan"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Pahami karakteristik data dan pertanyaan yang ingin dijawab."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari pengolahan, representasi, dan analisis data."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Kembangkan model untuk menjawab persoalan berbasis data."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Jelaskan metode, evaluasi, dan keterbatasan hasil dalam portofolio."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab KERIS · halaman 7",
        "href": siteUrl("/assets/referensi/lab-keris.pdf#page=7")
      },
      {
        "label": "Materi Lab KERIS · halaman 8",
        "href": siteUrl("/assets/referensi/lab-keris.pdf#page=8")
      }
    ]
  },
  {
    "id": "knowledge-keris",
    "title": "Knowledge Engineer",
    "labCode": "KERIS",
    "trackLabel": "Rekayasa Pengetahuan",
    "accentColor": "#a855f7",
    "description": "Merepresentasikan pengetahuan dan hubungan antar-konsep untuk mendukung sistem cerdas.",
    "focus": "Rekayasa Pengetahuan",
    "topSkills": [
      "Representasi pengetahuan",
      "Pemodelan",
      "Semantic Web"
    ],
    "roadmapSteps": [
      {
        "step": 1,
        "period": "Tahap 1",
        "title": "Bangun fondasi",
        "desc": "Kenali konsep, data, dan pengetahuan dalam suatu bidang masalah."
      },
      {
        "step": 2,
        "period": "Tahap 2",
        "title": "Dalami kompetensi",
        "desc": "Pelajari representasi pengetahuan dan hubungan antar-konsep."
      },
      {
        "step": 3,
        "period": "Tahap 3",
        "title": "Terapkan dalam proyek",
        "desc": "Buat contoh model pengetahuan untuk mendukung pemecahan masalah."
      },
      {
        "step": 4,
        "period": "Tahap 4",
        "title": "Susun portofolio",
        "desc": "Evaluasi konsistensi model dan dokumentasikan penerapannya."
      }
    ],
    "sources": [
      {
        "label": "Materi Lab KERIS · halaman 7",
        "href": siteUrl("/assets/referensi/lab-keris.pdf#page=7")
      },
      {
        "label": "Materi Lab KERIS · halaman 8",
        "href": siteUrl("/assets/referensi/lab-keris.pdf#page=8")
      },
      {
        "label": "Materi Lab KERIS · halaman 21",
        "href": siteUrl("/assets/referensi/lab-keris.pdf#page=21")
      }
    ]
  }
];
