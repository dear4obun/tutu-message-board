
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
    size: 6 + Math.random() * 4,
    speed: 0.5 + Math.random() * 1,
    dx: -0.5 + Math.random() * -1.5,
    tail: [],
    color: "#ffe6f0"
  };
}

function updateStars() {
  if (stars.length < 5 && Math.random() < 0.05) {
    stars.push(createStar());
  }
  stars.forEach(star => {
    star.tail.push({ x: star.x, y: star.y });
    if (star.tail.length > 8) star.tail.shift();
    star.x += star.dx;
    star.y += star.speed;
  });
  stars = stars.filter(s => s.y < height + 20);
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  stars.forEach(star => {
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < star.tail.length; i++) {
      const t = star.tail[i];
      ctx.globalAlpha = i / star.tail.length;
      ctx.beginPath();
      ctx.arc(t.x, t.y, (star.size / 2) * (i / star.tail.length), 0, Math.PI * 2);
      ctx.fill();
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
  const box = document.getElementById("messageBox");
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if (msg) {
    const div = document.createElement("div");
    div.className = "message";
    const now = new Date();
    div.textContent = `[${now.toLocaleString()}] ${msg}`;
    box.appendChild(div);
    input.value = "";
  }
}
