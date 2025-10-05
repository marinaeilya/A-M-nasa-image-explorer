const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.getElementById("close");

const API_KEY = "u1TZ5ugpwWPN15wQkdgKx9VPPGqVRCizmTlmq4yx";
let retryCount = 0;

async function fetchNASAImages(query = "space") {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`
    );
    const data = await response.json();
    displayImages(data.collection.items.slice(0, 100));
    retryCount = 0; // reset retry counter
  } catch (error) {
    console.error("❌ NASA API failed:", error);
    retryCount++;
    if (retryCount <= 5) {
      console.log(`🔁 Retrying in 10s... Attempt ${retryCount}`);
      setTimeout(() => fetchNASAImages(query), 10000);
    } else {
      gallery.innerHTML = "<p>⚠️ Unable to load images after multiple attempts.</p>";
    }
  }
}

function displayImages(items) {
  gallery.innerHTML = "";
  items.forEach(item => {
    const img = document.createElement("img");
    img.src = item.links?.[0]?.href;
    img.alt = item.data?.[0]?.title || "NASA Image";
    img.addEventListener("click", () => openModal(item));
    gallery.appendChild(img);
  });
}

function openModal(item) {
  modal.style.display = "flex";
  modalImg.src = item.links?.[0]?.href;
  modalDesc.textContent = item.data?.[0]?.description || "No description available.";
}

closeBtn.addEventListener("click", () => (modal.style.display = "none"));

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchNASAImages(searchInput.value);
  }
});

fetchNASAImages();
