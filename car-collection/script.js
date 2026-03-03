/* ─── SCROLL REVEAL ─────────────────────────────────────────────── */
const revealTargets = document.querySelectorAll(
  '.car-card, .about-text, .about-visual, .stat-item'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

/* ─── NAV BACKGROUND ON SCROLL ──────────────────────────────────── */
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.background = 'rgba(11,11,11,0.95)';
    nav.style.backdropFilter = 'blur(12px)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)';
    nav.style.backdropFilter = 'blur(2px)';
  }
}, { passive: true });

/* ─── SMOOTH CARD TILT ──────────────────────────────────────────── */
document.querySelectorAll('.car-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
});

/* ─── CONTACT FORM ──────────────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const confirm = document.getElementById('form-confirm');
  confirm.textContent = 'Message received. We will be in touch.';
  e.target.reset();
  setTimeout(() => { confirm.textContent = ''; }, 5000);
}
