
const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStar() {
  return {
    x: Math.random() * width,
    y: -20,
    size: 14 + Math.random() * 6,
    speed: 0.4 + Math.random(),
    dx: -0.5 + Math.random() * -1.5,
    tail: [],
    color: "#ffe6f0"
  };
}

function updateStars() {
  if (stars.length < 5 && Math.random() < 0.06) {
    stars.push(createStar());
  }
  stars.forEach(star => {
    star.tail.push({ x: star.x, y: star.y });
    if (star.tail.length > 10) star.tail.shift();
    star.x += star.dx;
    star.y += star.speed;
  });
  stars = stars.filter(s => s.y < height + 40);
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  stars.forEach(star => {
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.fillRect(star.x, star.y, star.size / 2, star.size / 2);

    for (let i = 0; i < star.tail.length; i++) {
      const t = star.tail[i];
      ctx.globalAlpha = i / star.tail.length;
      ctx.beginPath();
      ctx.fillRect(t.x, t.y, 2, 2);
      ctx.globalAlpha = 1;
    }
  });
}

function animate() {
  updateStars();
  drawStars();
  requestAnimationFrame(animate);
}
animate();

function addMessage() {
  const msg = document.getElementById("messageInput").value.trim();
  const author = document.getElementById("authorInput").value.trim();
  const box = document.getElementById("messageBox");
  if (msg && author) {
    const div = document.createElement("div");
    div.className = "message";
    const meta = document.createElement("div");
    meta.className = "meta";
    const now = new Date();
    meta.textContent = `来自 ${author} · ${now.toLocaleString()}`;
    div.textContent = msg;
    div.appendChild(meta);
    box.appendChild(div);
    document.getElementById("messageInput").value = "";
    document.getElementById("authorInput").value = "";

    const empty = document.querySelector(".empty");
    if (empty) empty.remove();
  }
}
