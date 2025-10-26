// Animasi scroll muncul
const animElements = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

animElements.forEach(el => observer.observe(el));

// Base URL untuk API Backend
const API_BASE_URL = "http://localhost:3000/api";

// ========== FUNGSI UNTUK PROFIL ==========

// Ambil data profil dari API
async function getProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`);
    const result = await response.json();
    if (result.success) {
      renderProfile(result.data);
    }
  } catch (error) {
    console.error("❌ Gagal mengambil data profil:", error);
    showError('hero-name', 'Error memuat profil');
  }
}

// Render data profil ke HTML
function renderProfile(profile) {
  // Hero Section
  const heroName = document.getElementById('hero-name');
  const heroTitle = document.getElementById('hero-title');
  const heroImage = document.getElementById('hero-image');
  
  if (heroName) heroName.textContent = profile.name;
  if (heroTitle) heroTitle.textContent = profile.title;
  if (heroImage) {
    heroImage.src = profile.image;
    heroImage.alt = `Foto ${profile.name}`;
  }

  // About Section
  const aboutIntro = document.getElementById('about-intro');
  const aboutDesc = document.getElementById('about-description');
  
  if (aboutIntro) aboutIntro.textContent = profile.about.intro;
  if (aboutDesc) aboutDesc.textContent = profile.about.description;

  // Footer
  const footerText = document.getElementById('footer-text');
  if (footerText) {
    footerText.textContent = `© 2025 ${profile.name} | ${profile.university}`;
  }
}

// ========== FUNGSI UNTUK SKILLS ==========

// Ambil data skills dari API
async function getSkills() {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`);
    const result = await response.json();
    if (result.success) {
      renderSkills(result.data);
    }
  } catch (error) {
    console.error("❌ Gagal mengambil data skills:", error);
    showError('soft-skills-list', 'Error memuat skills');
  }
}

// Render data skills ke HTML
function renderSkills(skills) {
  // Soft Skills
  const softSkillsList = document.getElementById('soft-skills-list');
  if (softSkillsList) {
    softSkillsList.innerHTML = skills.softSkills.map(skill => 
      `<li>${skill}</li>`
    ).join('');
  }

  // Hard Skills
  const hardSkillsList = document.getElementById('hard-skills-list');
  if (hardSkillsList) {
    hardSkillsList.innerHTML = skills.hardSkills.map(skill => 
      `<li>${skill}</li>`
    ).join('');
  }
}

// ========== FUNGSI UNTUK PENGALAMAN ==========

// Ambil semua data pengalaman dari API
async function getExperiences() {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences`);
    const result = await response.json();
    if (result.success) {
      renderExperiences(result.data);
    }
  } catch (error) {
    console.error("❌ Gagal mengambil data pengalaman:", error);
    const container = document.getElementById("experience-container");
    if (container) {
      container.innerHTML = '<p style="text-align:center; color:#ff6b6b;">⚠️ Gagal memuat data. Pastikan backend sudah berjalan di http://localhost:3000</p>';
    }
  }
}

// Render data pengalaman ke HTML
function renderExperiences(experiences) {
  const container = document.getElementById("experience-container");
  if (!container) return;
  
  container.innerHTML = "";

  if (experiences.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#999;">Belum ada pengalaman yang ditambahkan.</p>';
    return;
  }

  experiences.forEach((exp, index) => {
    const card = document.createElement("div");
    card.classList.add("research-card");
    if (index % 2 !== 0) card.classList.add("reverse");

    card.innerHTML = `
      <div class="research-text">
        <h3>${exp.title} | ${exp.year}</h3>
        <h4>${exp.organization}</h4>
        <p>${exp.description}</p>
        <a href="${exp.link}" target="_blank" class="btn-detail">Lihat Detail</a>
      </div>
      <div class="research-image">
        <img src="${exp.image}" alt="${exp.organization}">
      </div>
    `;
    container.appendChild(card);
  });
}

// ========== FUNGSI UNTUK KONTAK ==========

// Ambil data kontak dari API
async function getContact() {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);
    const result = await response.json();
    if (result.success) {
      renderContact(result.data);
    }
  } catch (error) {
    console.error("❌ Gagal mengambil data kontak:", error);
    showError('contact-links', 'Error memuat kontak');
  }
}

// Render data kontak ke HTML
function renderContact(contact) {
  const contactLinks = document.getElementById('contact-links');
  if (!contactLinks) return;

  contactLinks.innerHTML = `
    <a href="mailto:${contact.email}">
      <img src="https://static.vecteezy.com/system/resources/previews/022/484/516/original/google-mail-gmail-icon-logo-symbol-free-png.png" alt="Email"> Email
    </a>
    <a href="${contact.instagram}" target="_blank">
      <img src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-icon-Logo-2016-present.png" alt="Instagram"> Instagram
    </a>
    <a href="${contact.youtube}" target="_blank">
      <img src="https://www.freeiconspng.com/uploads/youtube-logo-png-hd-21.png" alt="YouTube"> YouTube
    </a>
    <a href="${contact.linkedin}" target="_blank">
      <img src="https://pngimg.com/uploads/linkedIn/linkedIn_PNG7.png" alt="LinkedIn"> LinkedIn
    </a>
  `;
}

// ========== FUNGSI CRUD UNTUK PENGALAMAN (untuk admin) ==========

// Tambah pengalaman baru
async function addExperience(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      console.log("✅ Pengalaman berhasil ditambahkan:", result.data);
      getExperiences(); // Refresh tampilan
    }
    return result;
  } catch (error) {
    console.error("❌ Gagal menambah pengalaman:", error);
    return { success: false, message: error.message };
  }
}

// Update pengalaman
async function updateExperience(id, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      console.log("✅ Pengalaman berhasil diupdate");
      getExperiences(); // Refresh tampilan
    }
    return result;
  } catch (error) {
    console.error("❌ Gagal mengupdate pengalaman:", error);
    return { success: false, message: error.message };
  }
}

// Hapus pengalaman
async function deleteExperience(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, { 
      method: "DELETE" 
    });
    const result = await response.json();
    if (result.success) {
      console.log("✅ Pengalaman berhasil dihapus");
      getExperiences(); // Refresh tampilan
    }
    return result;
  } catch (error) {
    console.error("❌ Gagal menghapus pengalaman:", error);
    return { success: false, message: error.message };
  }
}

// Ambil pengalaman berdasarkan ID
async function getExperienceById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`);
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("❌ Gagal mengambil pengalaman:", error);
    return null;
  }
}

// ========== HELPER FUNCTIONS ==========

// Tampilkan error message di element
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = `<span style="color:#ff6b6b;">${message}</span>`;
  }
}

// ========== INIT - Load semua data saat halaman dimuat ==========
document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Loading portfolio data...");
  
  // Load semua data secara paralel
  await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences(),
    getContact()
  ]);
  
  console.log("✅ Portfolio loaded!");
  console.log("💡 Tips: Buka admin.html untuk mengelola data");
  console.log("📝 API Functions tersedia di window.portfolioAPI");
});

// Export fungsi untuk digunakan di console atau admin panel
window.portfolioAPI = {
  // Profile
  getProfile,
  
  // Skills
  getSkills,
  
  // Experiences
  getExperiences,
  getExperienceById,
  addExperience,
  updateExperience,
  deleteExperience,
  
  // Contact
  getContact
};