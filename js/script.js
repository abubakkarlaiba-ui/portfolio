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
document.addEventListener('DOMContentLoaded', () => {});
