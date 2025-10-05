const apiKey = "u1TZ5ugpwWPN15wQkdgKx9VPPGqVRCizmTlmq4yx";
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("close");
const searchInput = document.getElementById("searchInput");

// الكواكب الافتراضية
const defaultSearchTerms = [
  "Sun", "Mercury", "Venus", "Earth", "Mars", 
  "Jupiter", "Saturn", "Uranus", "Neptune", "Milky Way", "Andromeda"
];

async function fetchNASAImages(query) {
  try {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    const res = await fetch(url);
    const data = await res.json();
    return data.collection.items;
  } catch (error) {
    console.error("Connection failed, retrying...", error);
    setTimeout(() => fetchNASAImages(query), 5000); // إعادة المحاولة تلقائيًا بعد 5 ثوانٍ
  }
}

async function loadImages(queries = defaultSearchTerms) {
  gallery.innerHTML = "";
  for (const term of queries) {
    const items = await fetchNASAImages(term);
    if (!items) continue;

    const topImages = items.slice(0, 10); // 10 صور من كل كوكب

    topImages.forEach(item => {
      const img = document.createElement("img");
      img.src = item.links[0].href;
      img.alt = item.data[0].title;
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = item.links[0].href;
        modalDesc.textContent = item.data[0].description || "No description available.";
      });
      gallery.appendChild(img);
    });
  }
}

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      loadImages([query]);
    } else {
      loadImages(defaultSearchTerms);
    }
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

loadImages();
