// Eazily landing — small progressive enhancements only.

(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') menu.hidden = true;
    });
  }

  // Current year in footer
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Waitlist — posts to Supabase when assets/config.js exists (safe, RLS-gated
  // insert into waitlist_signups). Without config, it degrades to a local
  // confirmation so the site never breaks in a fresh checkout.
  var form = document.getElementById('waitlist-form');
  var note = document.getElementById('waitlist-note');
  var emailInput = document.getElementById('waitlist-email');
  if (form && note) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var cfg = window.EAZILY_CONFIG || null;
      var base = cfg && cfg.supabaseUrl ? String(cfg.supabaseUrl).replace(/\/+$/, '') : '';
      var button = form.querySelector('button');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!base || !cfg.supabaseAnonKey || !email) {
        form.hidden = true;
        note.textContent = 'Thanks — we’ll email you when the app launches.';
        note.hidden = false;
        return;
      }

      button.disabled = true;
      button.textContent = 'Sending…';

      fetch(base + '/rest/v1/waitlist_signups', {
        method: 'POST',
        headers: {
          'apikey': cfg.supabaseAnonKey,
          'Authorization': 'Bearer ' + cfg.supabaseAnonKey,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email: email, source: 'landing' })
      }).then(function (response) {
        if (response.status === 201 || response.ok) {
          form.hidden = true;
          note.textContent = 'Thanks — we’ll email you when the app launches.';
          note.hidden = false;
        } else {
          throw new Error('signup rejected');
        }
      }).catch(function () {
        button.disabled = false;
        button.textContent = 'Notify me';
        note.textContent = 'Could not subscribe right now — please try again or email contact@eazily.com.';
        note.hidden = false;
      });
    });
  }

  // Gentle reveal-on-scroll (skipped when GSAP handles motion, or entirely for
  // reduced-motion users).
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || window.gsap || !('IntersectionObserver' in window)) return;

  var revealables = document.querySelectorAll('.services-grid li, .steps-grid li, .assurance-item, .pro-copy');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealables.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    observer.observe(el);
  });
})();
