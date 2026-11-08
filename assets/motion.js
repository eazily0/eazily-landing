// Eazily landing — GSAP motion layer.
// Progressive: silently skips when GSAP is unavailable or the user prefers
// reduced motion; the vanilla reveal fallback still applies in that case.
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) { return; }

  var finePointer = window.matchMedia('(pointer: fine)').matches;

  // ---- Scroll progress bar ----
  gsap.to('#scroll-progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
  });

  // ---- Hero entrance (blur-mask reveal) ----
  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-copy .eyebrow', { y: 18, opacity: 0, duration: 0.6 })
    .from('.hero-copy h1', { y: 26, opacity: 0, filter: 'blur(10px)', duration: 0.85 }, '-=0.35')
    .from('.hero-copy .lead', { y: 18, opacity: 0, duration: 0.6 }, '-=0.45')
    .from('.hero-actions > *', { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.35')
    .from('.hero-trust', { opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.hero-photo', { scale: 1.07, opacity: 0, duration: 0.95, ease: 'power2.out' }, '-=0.7');

  // ---- Parallax depth on scroll ----
  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to('.hero-visual', {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero-copy', {
      yPercent: -5, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // ---- Gentle floating of the confirmation card ----
  gsap.to('.mock-floating', { y: 10, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });

  // ---- Magnetic CTAs (fine pointers only) ----
  if (finePointer) {
    document.querySelectorAll('.hero-actions .btn, .header-actions .btn-primary').forEach(function (btn) {
      var max = 10;
      var xTo = gsap.quickTo(btn, 'x', { duration: 0.25, ease: 'power3.out' });
      var yTo = gsap.quickTo(btn, 'y', { duration: 0.25, ease: 'power3.out' });
      btn.addEventListener('pointermove', function (event) {
        var rect = btn.getBoundingClientRect();
        var dx = event.clientX - (rect.left + rect.width / 2);
        var dy = event.clientY - (rect.top + rect.height / 2);
        xTo(gsap.utils.clamp(-max, max, dx * 0.22));
        yTo(gsap.utils.clamp(-max, max, dy * 0.22));
      });
      btn.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  }

  // ---- Scroll-driven reveals ----
  gsap.utils.toArray('.collection-card').forEach(function (el, i) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      y: 28, opacity: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.08
    });
  });

  gsap.utils.toArray('.services-grid li').forEach(function (el, i) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 92%' },
      y: 24, opacity: 0, duration: 0.5, ease: 'power2.out', delay: (i % 4) * 0.06
    });
  });

  gsap.utils.toArray('.steps-grid li').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      y: 24, opacity: 0, duration: 0.55, ease: 'power2.out'
    });
  });
})();
