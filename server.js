const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000 || "https://api-portofolio-ivory.vercel.app/api";

// Middleware
app.use(cors());
app.use(express.json());

// Data profil
let profileData = {
  name: "Alvian Nurhakim",
  title: "Mahasiswa Informatika UNJ | Desainer & Problem Solver",
  university: "Universitas Negeri Jakarta",
  major: "Informatika",
  about: {
    intro: "Mahasiswa Aktif Universitas Negeri Jakarta yang saat ini sedang aktif dalam mengikuti organisasi kemahasiswaan. Merupakan lulusan SMK Akuntansi yang memilih melanjutkan perjalanan dalam bidang Teknologi.",
    description: "Sebagai Mahasiswa Informatika di Universitas Negeri Jakarta (UNJ), saya menawarkan kombinasi unik antara ketajaman analitis dan kreativitas desain grafis. Saya tidak hanya menciptakan visual yang menarik, tetapi juga mendesain solusi yang logis, fungsional, dan berorientasi pada pemecahan masalah..."
  },
  image: "Alvian Nurhakim PP.jpg",
  cta: "AYO KENALAN! SCIENCE IS BAD"
};

// Data skills
let skillsData = {
  softSkills: [
    "Kerjasama Tim (terkembang melalui pengalaman organisasi)",
    "Commitment & Responsibility",
    "Leadership",
    "Time Management"
  ],
  hardSkills: [
    "Microsoft Office",
    "Canva Software",
    "Software Engineering (VSCode, Figma, IntelliJ IDEA)"
  ]
};

// Data pengalaman (sesuai dengan screenshot)
let experiencesData = [
  {
    id: 1,
    title: "Praktik Kerja Lapangan",
    organization: "Account & Service Finance of Jakarta Global University",
    year: "2022",
    description: "Mempersiapkan segala dokumen serta segala hal administratif terkait kepentingan Universitas. Membantu dalam pendataan administratif yang dimiliki oleh Universitas.",
    image: "LOGO BEMP PTIK (1).png",
    link: "https://www.instagram.com/jg_university/"
  },
  {
    id: 2,
    title: "Badan Eksekutif Mahasiswa Prodi",
    organization: "Finance Division of BEMP Pendidikan Teknik Informatika dan Komputer",
    year: "2024 - Sekarang",
    description: "Koordinator Dana & Sponsorship pada acara Pelatihan Kepemimpinan Mahasiswa Prodi. Staff pada beberapa program kerja BEM Prodi, serta melanjutkan jabatan sebagai Kepala Biro Finance periode 2025/2026.",
    image: "LOGO BEMP PTIK (1).png",
    link: "https://www.instagram.com/bempptik_unj/"
  }
];

// Data kontak
let contactData = {
  email: "alviannurhakim11@gmail.com",
  instagram: "https://instagram.com/alvianhakim_",
  youtube: "https://youtube.com/@ALVIANNURHAKIMM",
  linkedin: "https://www.linkedin.com/in/alvian-nurhakim-b28576287"
};

// ========== ROUTES ==========

// GET - Ambil data profil
app.get('/api/profile', (req, res) => {
  res.json({
    success: true,
    data: profileData
  });
});

// PUT - Update data profil
app.put('/api/profile', (req, res) => {
  profileData = { ...profileData, ...req.body };
  res.json({
    success: true,
    message: "Profil berhasil diupdate",
    data: profileData
  });
});

// GET - Ambil semua skills
app.get('/api/skills', (req, res) => {
  res.json({
    success: true,
    data: skillsData
  });
});

// PUT - Update skills
app.put('/api/skills', (req, res) => {
  skillsData = { ...skillsData, ...req.body };
  res.json({
    success: true,
    message: "Skills berhasil diupdate",
    data: skillsData
  });
});

// GET - Ambil semua pengalaman
app.get('/api/experiences', (req, res) => {
  res.json({
    success: true,
    data: experiencesData
  });
});

// GET - Ambil pengalaman berdasarkan ID
app.get('/api/experiences/:id', (req, res) => {
  const experience = experiencesData.find(exp => exp.id === parseInt(req.params.id));
  if (experience) {
    res.json({
      success: true,
      data: experience
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Pengalaman tidak ditemukan"
    });
  }
});

// POST - Tambah pengalaman baru
app.post('/api/experiences', (req, res) => {
  const newExperience = {
    id: experiencesData.length + 1,
    ...req.body
  };
  experiencesData.push(newExperience);
  res.status(201).json({
    success: true,
    message: "Pengalaman berhasil ditambahkan",
    data: newExperience
  });
});

// PUT - Update pengalaman
app.put('/api/experiences/:id', (req, res) => {
  const index = experiencesData.findIndex(exp => exp.id === parseInt(req.params.id));
  if (index !== -1) {
    experiencesData[index] = { ...experiencesData[index], ...req.body };
    res.json({
      success: true,
      message: "Pengalaman berhasil diupdate",
      data: experiencesData[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Pengalaman tidak ditemukan"
    });
  }
});

// DELETE - Hapus pengalaman
app.delete('/api/experiences/:id', (req, res) => {
  const index = experiencesData.findIndex(exp => exp.id === parseInt(req.params.id));
  if (index !== -1) {
    const deleted = experiencesData.splice(index, 1);
    res.json({
      success: true,
      message: "Pengalaman berhasil dihapus",
      data: deleted[0]
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Pengalaman tidak ditemukan"
    });
  }
});

// GET - Ambil data kontak
app.get('/api/contact', (req, res) => {
  res.json({
    success: true,
    data: contactData
  });
});

// PUT - Update data kontak
app.put('/api/contact', (req, res) => {
  contactData = { ...contactData, ...req.body };
  res.json({
    success: true,
    message: "Kontak berhasil diupdate",
    data: contactData
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`\n📡 API Endpoints:`);
  console.log(`   GET    /api/profile`);
  console.log(`   PUT    /api/profile`);
  console.log(`   GET    /api/skills`);
  console.log(`   PUT    /api/skills`);
  console.log(`   GET    /api/experiences`);
  console.log(`   GET    /api/experiences/:id`);
  console.log(`   POST   /api/experiences`);
  console.log(`   PUT    /api/experiences/:id`);
  console.log(`   DELETE /api/experiences/:id`);
  console.log(`   GET    /api/contact`);
  console.log(`   PUT    /api/contact`);
  console.log(`\n✅ Backend siap digunakan!`);
});