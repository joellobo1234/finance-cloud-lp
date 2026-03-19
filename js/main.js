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

  document.querySelectorAll('.observe').forEach(el => {
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

async function handleNewsletter(e) {
  e.preventDefault();
  const form = e.target;
  const inp = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button');
  const origBtnText = btn.textContent;
  
  btn.textContent = '...';
  btn.disabled = true;

  try {
    const response = await fetch("https://formsubmit.co/ajax/joellobo2007@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        email: inp.value,
        _subject: `[Automa8 Financial] New newsletter subscription from ${inp.value}`,
        _template: "table"
      })
    });

    if (response.ok) {
      inp.value = '';
      inp.placeholder = "✓ You're subscribed!";
      btn.textContent = '✓';
      setTimeout(() => {
        inp.placeholder = 'you@example.com';
        btn.textContent = origBtnText;
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error();
    }
  } catch (e) {
    btn.textContent = 'Error';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = origBtnText; }, 3000);
  }
}

async function handleWaitlist(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  
  btn.textContent = 'Joining…';
  btn.disabled = true;

  const nameVal = document.getElementById('wl-name').value;
  const emailVal = document.getElementById('wl-email').value;
  const planVal = document.getElementById('wl-plan').value;

  // Validation
  if (/\d/.test(nameVal)) {
    alert("Full name should not contain numbers");
    btn.textContent = 'Try Again';
    btn.disabled = false;
    return;
  }

  const formData = {
    name: nameVal,
    email: emailVal,
    plan: planVal,
    _subject: `[Automa8 Financial] ${nameVal} joined the waitlist`,
    _template: "table"
  };

  try {
    const response = await fetch("https://formsubmit.co/ajax/joellobo2007@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const waitlistForm = document.getElementById('waitlist-form');
      const success = document.getElementById('modal-success');
      if (waitlistForm) waitlistForm.style.display = 'none';
      if (success) success.style.display = '';
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    console.error("FormSubmit Error:", error);
    btn.textContent = 'Try Again';
    btn.disabled = false;
    alert("Something went wrong. Please try again or email us at hello@automa8.io");
  }
}

async function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-send');
  const orig = btn.textContent;
  
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const nameVal = form.querySelector('input[type="text"]').value;
  const emailVal = form.querySelector('input[type="email"]').value;
  const messageVal = form.querySelector('textarea').value;

  // Validation
  if (/\d/.test(nameVal)) {
    alert("Name should not contain numbers");
    btn.textContent = 'Error - Name';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = orig; }, 2000);
    return;
  }

  if (messageVal.length > 1000) {
    alert("Message is too long (max 1000 characters)");
    btn.textContent = 'Too Long';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = orig; }, 2000);
    return;
  }

  const formData = {
    name: nameVal,
    email: emailVal,
    message: messageVal,
    _subject: `[Automa8 Financial] ${nameVal} submitted the contact form`,
    _template: "table"
  };

  try {
    const response = await fetch("https://formsubmit.co/ajax/joellobo2007@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#0d9668';
      setTimeout(() => {
        form.reset();
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    console.error("FormSubmit Error:", error);
    btn.textContent = 'Error - Try Again';
    btn.disabled = false;
    btn.style.background = '#dc2626';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 3000);
  }
}
