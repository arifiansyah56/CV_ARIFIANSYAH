export const experienceData = [
  {
    id: 1,
    role: 'Project Control',
    company: 'PT. Manajemen Konstruksi Utama',
    period: 'Maret 2026 – Sekarang',
    description: 'Menyusun master schedule dengan MS Project, tracking progress harian/mingguan, analisis schedule/cost variance, laporan Kurva S.',
  },
  {
    id: 2,
    role: 'Supervisor',
    company: 'PT. Rancang Bangun Sarana',
    period: 'November 2025 – Maret 2026',
    description: 'Supervisi konstruksi lapangan, quality control (mencapai 99% kepatuhan), tracking defect, dan laporan harian terperinci.',
  },
  {
    id: 3,
    role: 'Perancang Proyek & Pengawas',
    company: 'CV. Ghani Utama',
    period: 'Juli 2023 – Oktober 2025',
    description: 'Desain struktural & shop drawing (AutoCAD/Revit), analisis struktur hingga 5 lantai (SAP2000/ETABS), estimasi biaya, zero critical defects.',
  },
  {
    id: 4,
    role: 'Supervisor',
    company: 'PT. Mitra Konstruksi',
    period: 'Juli 2020 – Desember 2020',
    description: 'Mengelola 12+ pekerja konstruksi, inspeksi harian & pengujian material.',
  },
  {
    id: 5,
    role: 'Quality Control',
    company: 'PT. Wika Konstruksi',
    period: 'Juni 2019 – September 2019',
    description: 'Inspeksi QA/QC di lokasi konstruksi dan pelaporan ketidaksesuaian.',
  },
];

export const skillsData = [
  {
    category: 'BIM, Desain & Scheduling',
    items: ['Revit', 'AutoCAD', 'Civil3D', 'Tekla Structures', 'Microsoft Project', 'Primavera P6'],
  },
  {
    category: 'Analisis Struktural',
    items: ['SAP2000', 'ETABS'],
  },
  {
    category: 'Kompetensi Inti',
    items: [
      'Manajemen Proyek',
      'Progress Control',
      'Scheduling',
      'QA/QC',
      'Estimasi Biaya',
      'Koordinasi BIM',
    ],
  },
];

export const educationData = [
  {
    id: 1,
    title: 'Sarjana Sains Terapan (D4) Teknik Sipil',
    institution: 'Institut Teknologi Sepuluh Nopember (ITS)',
    details: 'IPK 3.21/4.00',
  },
];

export const certificationsData = [
  'Tekla Modeler',
  'Pelaksana Bangunan Gedung',
  'Pelaksana Bangunan Air',
];

export const leadershipData = [
  'Supervisor Acara Dvillage ITS',
  'Anggota HIMA Teknik Sipil ITS',
];

export const projectsData = [
  {
    id: 1,
    title: 'Gedung Perkantoran 5 Lantai',
    category: 'Desain Struktural & BIM',
    role: 'Perancang Proyek Utama',
    description: 'Desain struktural lengkap dan shop drawing untuk gedung perkantoran komersial. Meliputi analisis beban, desain pondasi, dan pemodelan BIM 3D.',
    fullScope: 'Perancangan struktural menyeluruh dari tahap konseptual hingga shop drawing akhir. Cakupan pekerjaan meliputi rekayasa pondasi, analisis beban (gempa dan angin), perhitungan beton bertulang, serta integrasi BIM 3D (Level of Development 300) untuk deteksi benturan (clash detection) antar disiplin ilmu.',
    challenges: 'Menavigasi peraturan bangunan lokal yang ketat terkait ketahanan gempa (zona seismik tinggi) dan mengoptimalkan penggunaan material baja/beton tanpa mengorbankan integritas struktural dan estetika arsitektur.',
    software: ['Revit', 'SAP2000', 'AutoCAD'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888081622-15cb2a3d971c?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2940&auto=format&fit=crop'
    ]
  },
  {
    id: 2,
    title: 'Proyek Infrastruktur Jalan Tol',
    category: 'Manajemen Konstruksi',
    role: 'Project Control',
    description: 'Manajemen jadwal dan biaya (cost-schedule control) untuk pembangunan jalan tol sepanjang 15km. Mengoptimalkan alokasi sumber daya dan tracking kurva S.',
    fullScope: 'Pengendalian proyek end-to-end untuk segmen jalan tol sepanjang 15km. Bertanggung jawab atas resource loading, analisis jalur kritis (critical path analysis), penyusunan master schedule, serta pembuatan laporan Kurva S mingguan dan bulanan untuk pemangku kepentingan (stakeholders).',
    challenges: 'Mengelola penundaan akibat cuaca ekstrem dan hambatan rantai pasok untuk pengiriman aspal dan material timbunan, sambil mempertahankan proyek agar tetap berada di jalur kritis tanpa pembengkakan biaya.',
    software: ['Primavera P6', 'Microsoft Project', 'Civil3D'],
    image: 'https://images.unsplash.com/photo-1541888081622-15cb2a3d971c?q=80&w=2940&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541888081622-15cb2a3d971c?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=2787&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590496734139-38b43fb46bf7?q=80&w=2940&auto=format&fit=crop'
    ]
  },
  {
    id: 3,
    title: 'Kompleks Residensial Modern',
    category: 'Quality Control & Supervisi',
    role: 'Supervisor Lapangan',
    description: 'Pengawasan kualitas dan progres harian untuk perumahan elite dengan 50+ unit. Mencapai tingkat zero critical defect pada saat serah terima.',
    fullScope: 'Supervisi lapangan harian dan penjaminan mutu (quality assurance) untuk kompleks perumahan mewah berkapasitas 50+ unit. Memimpin koordinasi langsung antara subkontraktor, arsitek, dan klien. Mengawasi pengujian material dan inspeksi struktural.',
    challenges: 'Mempertahankan standar penyelesaian (finishing) kelas atas di beberapa unit secara bersamaan dengan tenggat waktu yang ketat, serta mencapai tingkat zero critical defect pada saat proses serah terima (handover) kepada klien.',
    software: ['AutoCAD', 'Microsoft Excel'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356f67?q=80&w=2831&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356f67?q=80&w=2831&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2893&auto=format&fit=crop'
    ]
  }
];

