const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");
const titleEl = document.querySelector("h1");

const newYear = "1 Jan 2026";

function countdown() {
  const newYearDate = new Date(newYear);
  const currentDate = new Date();

  const totalSeconds = (newYearDate - currentDate) / 1000;

  if (totalSeconds <= 0) {
    titleEl.style.display = "none";
    countdownEl.style.display = "none";
    messageEl.style.display = "block";
    messageEl.style.fontSize = "3rem";
    messageEl.style.color = "#ffd700";
    messageEl.style.textShadow = "0 0 20px #ff0055";
    return;
  }

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysEl.innerHTML = formatTime(days);
  hoursEl.innerHTML = formatTime(hours);
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Initial call
countdown();
setInterval(countdown, 1000);

// --- Hiệu ứng Pháo Hoa (Fireworks Effect) ---
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    this.friction = 0.96;
    this.gravity = 0.05;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

function createFirework(x, y) {
  const particleCount = 50;
  const angleIncrement = (Math.PI * 2) / particleCount;
  const power = 6;
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(x, y, color, {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power,
      }),
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Tạo hiệu ứng đuôi mờ
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.alpha > 0) {
      particle.update();
    } else {
      particles.splice(i, 1);
    }
  });

  // Ngẫu nhiên bắn pháo hoa
  if (Math.random() < 0.03) {
    createFirework(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.5,
    );
  }
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
