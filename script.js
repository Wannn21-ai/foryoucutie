const $ = (selector) => document.querySelector(selector);

// ===== PENGATURAN PERSONAL =====
const HER_NAME = "kamu";
const SONG_TITLE = "A little melody";
const SONG_ARTIST = "A song picked for you ♡";

$("#herName").textContent = HER_NAME;
$("#songTitle").textContent = SONG_TITLE;
$("#songArtist").textContent = SONG_ARTIST;

// ===== PEMBUKA =====
$("#startBtn").addEventListener("click", () => {
  $("#welcome").classList.add("hidden");
  $("#content").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== PEMUTAR MUSIK =====
const music = $("#music");
const playBtn = $("#playBtn");

playBtn.addEventListener("click", async () => {
  try {
    if (music.paused) await music.play();
    else music.pause();
  } catch (error) {
    alert("Musiknya belum bisa diputar. Cek file assets/music.mp3, ya!");
  }
});

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}

music.addEventListener("play", () => {
  playBtn.textContent = "Ⅱ";
  playBtn.setAttribute("aria-label", "Jeda musik");
});
music.addEventListener("pause", () => {
  playBtn.textContent = "▶";
  playBtn.setAttribute("aria-label", "Putar musik");
});
music.addEventListener("loadedmetadata", () => {
  $("#duration").textContent = formatTime(music.duration);
});
music.addEventListener("timeupdate", () => {
  $("#currentTime").textContent = formatTime(music.currentTime);
  const percent = music.duration ? (music.currentTime / music.duration) * 100 : 0;
  $("#progress").style.width = `${percent}%`;
});
music.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  $("#progress").style.width = "0%";
});

// ===== GALERI FOTO =====
const photoDialog = $("#photoDialog");
document.querySelectorAll(".photo").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    $("#largePhoto").src = button.dataset.photo;
    $("#largePhoto").alt = img.alt;
    if (typeof photoDialog.showModal === "function") photoDialog.showModal();
  });
});
$("#closePhoto").addEventListener("click", () => photoDialog.close());
photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) photoDialog.close();
});

// ===== SURAT DIGITAL =====
$("#letterBtn").addEventListener("click", () => {
  const letter = $("#letterText");
  const isOpening = letter.classList.contains("hidden");
  letter.classList.toggle("hidden");
  $("#envelope").textContent = isOpening ? "💌✨" : "💌";
  $("#letterBtn").textContent = isOpening ? "Tutup surat ♡" : "Buka surat ♡";
  $("#letterHint").textContent = isOpening
    ? "A little message for you 🌷"
    : "Ada pesan kecil di dalamnya...";
});

// ===== KEJUTAN TERAKHIR =====
$("#giftBtn").addEventListener("click", () => {
  $("#gift").textContent = "🎁💖";
  $("#surprise").classList.remove("hidden");
  $("#giftBtn").classList.add("hidden");
  $("#surprise").scrollIntoView({ behavior: "smooth", block: "center" });
});

// ===== HUJAN BUNGA LILY + TABURAN HATI =====
// Ganti nama file di bawah jika nama gambar lily milikmu berbeda.
const lilyImages = [
  "assets/lily-1.png",
  "assets/lily-2.png",
  "assets/lily-3.png"
];

let rainRunning = false;

function burstHearts() {
  if (rainRunning) return;
  rainRunning = true;

  const rain = $("#flowerRain");
  const heartArea = $("#heartArea");
  rain.replaceChildren();
  heartArea.replaceChildren();

  const symbols = ["💗", "💖", "💕", "✨", "🎀"];
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.animationDelay = `${Math.random() * 0.8}s`;
    heartArea.appendChild(heart);
  }

  const flowerCount = 32;
  let finished = 0;

  function finishRain() {
    finished++;
    if (finished >= flowerCount) {
      rain.replaceChildren();
      rainRunning = false;
    }
  }

  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement("img");
    flower.className = "lily-particle";
    flower.alt = "";
    flower.draggable = false;
    flower.src = lilyImages[Math.floor(Math.random() * lilyImages.length)];

    flower.style.setProperty("--start-x", `${Math.random() * 100}%`);
    flower.style.setProperty("--flower-size", `${24 + Math.random() * 34}px`);
    flower.style.setProperty("--fall-duration", `${4 + Math.random() * 3}s`);
    flower.style.setProperty("--fall-delay", `${Math.random() * 2.2}s`);
    flower.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    flower.style.setProperty("--spin", `${-420 + Math.random() * 840}deg`);
    flower.style.setProperty("--flower-opacity", `${0.72 + Math.random() * 0.28}`);

    flower.addEventListener("animationend", finishRain, { once: true });
    flower.addEventListener("error", () => {
      flower.removeEventListener("animationend", finishRain);
      flower.remove();
      finishRain();
    }, { once: true });

    rain.appendChild(flower);
  }
}

$("#heartBtn").addEventListener("click", burstHearts);
