// Particle Background
class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };

    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => this.onMouse(e));
    this.init();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onMouse(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  init() {
    this.particles = [];
    const count = Math.min(Math.floor((this.canvas.width * this.canvas.height) / 9000), 80);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[j].x - p.x;
        const dy = this.particles[j].y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(212, 175, 55, ${0.06 * (1 - dist / 150)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }

      if (this.mouse.x && this.mouse.y) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(212, 175, 55, ${0.3 * (1 - dist / this.mouse.radius)})`;
          this.ctx.fill();
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Navigation
const nav = document.querySelector('nav');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinksAll.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Hero role rotation
const heroRoles = document.querySelectorAll('.hero-role');
let currentRole = 0;
if (heroRoles.length > 0) {
  setInterval(() => {
    heroRoles[currentRole].classList.remove('active');
    currentRole = (currentRole + 1) % heroRoles.length;
    heroRoles[currentRole].classList.add('active');
  }, 3000);
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ Sent!';
  btn.style.background = '#22C55E';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  new ParticleBackground();
});
