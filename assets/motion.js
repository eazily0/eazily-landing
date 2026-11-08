// Eazily landing — GSAP-enhanced motion (progressive: skips entirely if GSAP
// is unavailable or the user prefers reduced motion; vanilla reveal still works).
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  try { gsap.registerPlugin(ScrollTrigger); } catch (e) { return; }

  // Hero entrance timeline
  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-copy .eyebrow', { y: 18, opacity: 0, duration: 0.6 })
    .from('.hero-copy h1', { y: 26, opacity: 0, duration: 0.7 }, '-=0.35')
    .from('.hero-copy .lead', { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-actions > *', { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.35')
    .from('.hero-trust', { opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.hero-photo', { scale: 1.06, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.7');

  // Scroll-driven reveals
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
