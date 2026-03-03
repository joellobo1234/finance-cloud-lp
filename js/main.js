/* ─── Smooth scroll & initial animations ─── */

document.addEventListener('DOMContentLoaded', () => {

  /* ─ Sticky header shadow ─ */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* ─ Hamburger toggle ─ */
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (ham && nav) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      nav.classList.toggle('open');
    });
    /* Close on outside click */
    document.addEventListener('click', (e) => {
      if (!ham.contains(e.target) && !nav.contains(e.target)) {
        ham.classList.remove('open');
        nav.classList.remove('open');
      }
    });
    /* Close on nav link click */
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ─ Intersection observer – fade-in sections ─ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.feature-card, .pricing-card, .principle-card, .blog-card, .feature-block, .faq-item, .float-card, .philosophy-section .two-col, .cta-banner'
  ).forEach(el => {
    el.classList.add('observe');
    observer.observe(el);
  });

});

/* ══════════════ WAITLIST MODAL ══════════════ */

function openWaitlist(plan) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Reset form state
  const form = document.getElementById('waitlist-form');
  const success = document.getElementById('modal-success');
  if (form) form.style.display = '';
  if (success) success.style.display = 'none';
  // Pre-select plan if provided
  if (plan) {
    const sel = document.getElementById('wl-plan');
    if (sel) sel.value = plan;
  }
}

function closeWaitlist(e) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  if (e && e.target !== overlay) return; // only close on overlay bg click
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Also close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('modal-overlay');
    if (overlay && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

function handleWaitlist(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Joining…';
  btn.disabled = true;

  // Simulate async submission
  setTimeout(() => {
    const form = document.getElementById('waitlist-form');
    const success = document.getElementById('modal-success');
    if (form) form.style.display = 'none';
    if (success) success.style.display = '';
  }, 900);
}
