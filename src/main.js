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

// Scroll-reactive left/right splash visibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const rootStyle = document.documentElement.style;
const splashVisibility = {
  currentLeft: 0.65,
  currentRight: 0.12,
  targetLeft: 0.65,
  targetRight: 0.12,
  rafId: 0,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setSplashVisibility(left, right) {
  rootStyle.setProperty('--splash-left-visibility', left.toFixed(3));
  rootStyle.setProperty('--splash-right-visibility', right.toFixed(3));
}

function animateSplashVisibility() {
  splashVisibility.currentLeft += (splashVisibility.targetLeft - splashVisibility.currentLeft) * 0.08;
  splashVisibility.currentRight += (splashVisibility.targetRight - splashVisibility.currentRight) * 0.08;

  setSplashVisibility(splashVisibility.currentLeft, splashVisibility.currentRight);

  const settled =
    Math.abs(splashVisibility.targetLeft - splashVisibility.currentLeft) < 0.01 &&
    Math.abs(splashVisibility.targetRight - splashVisibility.currentRight) < 0.01;

  if (!settled) {
    splashVisibility.rafId = window.requestAnimationFrame(animateSplashVisibility);
  } else {
    splashVisibility.rafId = 0;
  }
}

function updateSplashVisibility() {
  if (prefersReducedMotion.matches) {
    splashVisibility.targetLeft = 0.34;
    splashVisibility.targetRight = 0.22;
  } else {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = clamp(scrollY / maxScroll, 0, 1);
    const phase = progress * Math.PI * 3;
    const dominance = (Math.sin(phase) + 1) / 2;

    splashVisibility.targetLeft = 0.18 + dominance * 0.52;
    splashVisibility.targetRight = 0.18 + (1 - dominance) * 0.52;
  }

  if (!splashVisibility.rafId) {
    splashVisibility.rafId = window.requestAnimationFrame(animateSplashVisibility);
  }
}

updateSplashVisibility();
window.addEventListener('scroll', updateSplashVisibility, { passive: true });
window.addEventListener('resize', updateSplashVisibility);
prefersReducedMotion.addEventListener('change', updateSplashVisibility);

