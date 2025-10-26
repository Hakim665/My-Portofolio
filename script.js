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

const API_URL = "https://68fd8d4f7c700772bb116143.mockapi.io/api/v1/experience";

// ✅ 1. Ambil semua data pengalaman
async function getExperiences() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderExperiences(data);
  } catch (error) {
    console.error("Gagal mengambil data pengalaman:", error);
  }
}

// ✅ 2. Tampilkan data ke halaman
function renderExperiences(experiences) {
  const container = document.getElementById("experience-container");
  container.innerHTML = "";

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

// ✅ 3. Tambah data pengalaman (gunakan lewat Postman/backend)
async function addExperience(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}

// ✅ 4. Hapus pengalaman berdasarkan ID
async function deleteExperience(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

// ✅ 5. Ambil data pengalaman berdasarkan ID
async function getExperienceById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

// Jalankan saat halaman dimuat
getExperiences();
