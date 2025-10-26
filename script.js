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

// === KONFIGURASI DASAR API ===
const apiUrl = "https://YOUR-API-URL.mockapi.io/api/v1/experience"; 
// Ganti dengan URL dari MockAPI.io kamu

// === AMBIL DATA (GET) ===
async function getExperience() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const container = document.getElementById("experience-list");
    container.innerHTML = "";

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("experience-card");
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Lihat Detail</a>
        <img src="${item.image}" alt="${item.title}">
        <div class="action-buttons">
          <button onclick="editExperience('${item.id}')">Edit</button>
          <button onclick="deleteExperience('${item.id}')">Hapus</button>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

// === TAMBAH DATA (POST) ===
async function addExperience() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const link = document.getElementById("link").value;
  const image = document.getElementById("image").value;

  if (!title || !description) {
    alert("Judul dan deskripsi harus diisi!");
    return;
  }

  const newData = { title, description, link, image };

  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    alert("Data berhasil ditambahkan!");
    getExperience();
  } catch (error) {
    console.error("Gagal menambah data:", error);
  }
}

// === HAPUS DATA (DELETE) ===
async function deleteExperience(id) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      alert("Data berhasil dihapus!");
      getExperience();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  }
}

// === EDIT DATA (PUT) ===
async function editExperience(id) {
  const newTitle = prompt("Masukkan judul baru:");
  const newDescription = prompt("Masukkan deskripsi baru:");
  const newLink = prompt("Masukkan link baru:");
  const newImage = prompt("Masukkan URL gambar baru:");

  const updatedData = {
    title: newTitle,
    description: newDescription,
    link: newLink,
    image: newImage,
  };

  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    alert("Data berhasil diperbarui!");
    getExperience();
  } catch (error) {
    console.error("Gagal memperbarui data:", error);
  }
}

// === PANGGIL SAAT HALAMAN DIMUAT ===
document.addEventListener("DOMContentLoaded", getExperience);