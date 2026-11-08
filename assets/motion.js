// Eazily landing — calm GSAP motion.
// Progressive: silently skips when GSAP is unavailable or the user prefers
// reduced motion; the vanilla reveal fallback still applies in that case.
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) { return; }

  // Thin scroll progress indicator
  gsap.to('#scroll-progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
  });

  // Hero: single soft rise, no blur, no theatrics
  var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.from('.hero-copy .eyebrow', { y: 14, opacity: 0, duration: 0.5 })
    .from('.hero-copy h1', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.hero-copy .lead', { y: 14, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.hero-actions > *', { y: 10, opacity: 0, duration: 0.45, stagger: 0.06 }, '-=0.35')
    .from('.hero-trust', { opacity: 0, duration: 0.4 }, '-=0.25')
    .from('.hero-photo', { scale: 1.04, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');

  // Subtle parallax on scroll (small movement)
  var hero = document.querySelector('.hero');
  if (hero) {
    gsap.to('.hero-visual', {
      yPercent: 4, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // Soft reveals — no heavy stagger
  gsap.utils.toArray('.collection-card').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      y: 22, opacity: 0, duration: 0.55, ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.services-grid li').forEach(function (el, i) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 92%' },
      y: 18, opacity: 0, duration: 0.45, ease: 'power2.out', delay: (i % 4) * 0.04
    });
  });

  gsap.utils.toArray('.steps-grid li').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      y: 20, opacity: 0, duration: 0.5, ease: 'power2.out'
    });
  });
})();
