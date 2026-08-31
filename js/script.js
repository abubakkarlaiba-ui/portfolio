// Particle Background
class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
    this.init();
    this.animate();
  }
  resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
  init() {
    this.particles = [];
    const c = Math.min(Math.floor((this.canvas.width * this.canvas.height) / 8000), 90);
    for (let i = 0; i < c; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height,
        size: Math.random() * 1.8 + 0.4, speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4, opacity: Math.random() * 0.35 + 0.05
      });
    }
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p, i) => {
      p.x += p.speedX; p.y += p.speedY;
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(180,150,60,${p.opacity})`;
      this.ctx.fill();
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[j].x - p.x, dy = this.particles[j].y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(180,150,60,${0.06 * (1 - dist / 140)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
      if (this.mouse.x && this.mouse.y) {
        const dx = this.mouse.x - p.x, dy = this.mouse.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(180,150,60,${0.15 * (1 - dist / this.mouse.radius)})`;
          this.ctx.fill();
        }
      }
    });
    requestAnimationFrame(() => this.animate());
  }
}

// Nav scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('active')));

// Scroll reveal
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revealObs.observe(el));

// Hero role rotation
const roles = ['Full-Stack Developer', 'Frontend Engineer', 'Backend Architect', 'Creative Problem Solver'];
const roleEl = document.getElementById('heroRoles');
let roleIdx = 0;
if (roleEl) {
  roleEl.innerHTML = `<span class="hero-role visible">${roles[0]}</span>`;
  setInterval(() => {
    const spans = roleEl.querySelectorAll('.hero-role');
    spans.forEach(s => s.classList.remove('visible'));
    roleIdx = (roleIdx + 1) % roles.length;
    const next = document.createElement('span');
    next.className = 'hero-role';
    next.textContent = roles[roleIdx];
    roleEl.innerHTML = '';
    roleEl.appendChild(next);
    requestAnimationFrame(() => next.classList.add('visible'));
  }, 3000);
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = '✓ Sent!';
  btn.style.background = '#22C55E';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; this.reset(); }, 3000);
});

// Init
document.addEventListener('DOMContentLoaded', () => { new ParticleBackground(); });
