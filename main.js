/**
 * Deepak Kumar Portfolio — Main JavaScript Module
 * Theme Toggling, Accessible Mobile Nav, Scroll Reveal, Section Tracking, Skill Bar Animation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initFormHandler();
  initCurrentYear();
});

/* ── Theme Switcher (Dark / Light with LocalStorage) ────────── */
function initTheme() {
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('dk_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('dk_portfolio_theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeBtn?.setAttribute('aria-label', 'Switch to Light Theme');
      } else {
        themeIcon.className = 'fas fa-moon';
        themeBtn?.setAttribute('aria-label', 'Switch to Dark Theme');
      }
    }
  }
}

/* ── Navbar Glass & Mobile Menu Handling ────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Glassmorphism background threshold on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('sc');
    } else {
      navbar?.classList.remove('sc');
    }
  });

  // Mobile Hamburger Toggle
  if (ham && navLinks) {
    ham.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      ham.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        ham.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        ham.setAttribute('aria-label', 'Open navigation menu');
        ham.focus();
      }
    });
  }

  // Active section highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nlinks a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navItems.forEach((item) => {
              if (item.getAttribute('href') === `#${currentId}`) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
  }
}

/* ── Scroll Reveal Animations ────────────────────────────────── */
function initScrollReveal() {
  const revElements = document.querySelectorAll('.rev');

  if ('IntersectionObserver' in window && revElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('up');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver support
    revElements.forEach((el) => el.classList.add('up'));
  }
}

/* ── Animated Skill Progress Bars ───────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.sf[data-width]');

  if ('IntersectionObserver' in window && bars.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const widthVal = entry.target.getAttribute('data-width');
            if (widthVal) {
              entry.target.style.width = widthVal;
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    bars.forEach((bar) => observer.observe(bar));
  } else {
    bars.forEach((bar) => {
      const widthVal = bar.getAttribute('data-width');
      if (widthVal) bar.style.width = widthVal;
    });
  }
}

/* ── Contact Form Honeypot & Submission Handler ─────────────── */
function initFormHandler() {
  const form = document.querySelector('.project-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const honeypot = form.querySelector('input[name="_honeypot"]');
    if (honeypot && honeypot.value !== '') {
      // Bot detected, prevent submission silently
      e.preventDefault();
      console.warn('Spam submission detected.');
      return;
    }
  });
}

/* ── Auto-Updating Copyright Year ──────────────────────────── */
function initCurrentYear() {
  const yearEl = document.getElementById('yr');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
