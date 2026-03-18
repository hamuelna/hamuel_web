// Theme toggle - persist preference
const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', 'light');
  }
  themeBtn?.setAttribute('aria-pressed', theme === 'light');
  try {
    localStorage.setItem('ham-theme', theme);
  } catch (_) {}
}

function initTheme() {
  const saved = localStorage.getItem('ham-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

themeBtn?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

initTheme();

// Mobile nav toggle
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', navLinks?.classList.contains('open'));
});

// Expandable experience details
document.querySelectorAll('[data-expandable]').forEach((item) => {
  const btn = item.querySelector('.timeline-header');
  const details = item.querySelector('.timeline-details');
  if (!btn || !details) return;

  btn.addEventListener('click', () => {
    const expanded = item.hasAttribute('data-expanded');
    item.toggleAttribute('data-expanded');
    btn.setAttribute('aria-expanded', !expanded);
    details.setAttribute('aria-hidden', expanded);
  });
});
