// SVFF — UI Enhancements
(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ── */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── 2. TYPING ANIMATION ── */
  function initTyping() {
    var el = document.getElementById('hero-subtitle');
    if (!el) return;
    var words = ['Pure South Indian Flavours', 'Freshly Made Every Day', 'Taste of Tradition'];
    var wi = 0, ci = 0, deleting = false;
    el.innerHTML = '<span class="typed-text"></span><span class="typed-cursor">|</span>';
    var typed = el.querySelector('.typed-text');
    function tick() {
      var word = words[wi];
      if (!deleting) {
        typed.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        typed.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, deleting ? 55 : 90);
    }
    tick();
  }

  /* ── 3. COUNTER ANIMATION ── */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1800, start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + (el.getAttribute('data-suffix') || '+');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); observer.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ── 4. BACK TO TOP ── */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 5. PARALLAX HERO ── */
  function initParallax() {
    var hero = document.querySelector('.hero--stall-bg');
    if (!hero) return;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      hero.style.setProperty('--parallax-y', (y * 0.35) + 'px');
    }, { passive: true });
  }

  /* ── 6. FILTER BTN RIPPLE ── */
  function initFilterRipple() {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        var rect = btn.getBoundingClientRect();
        ripple.style.cssText = 'left:' + (e.clientX - rect.left) + 'px;top:' + (e.clientY - rect.top) + 'px';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
      });
    });
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initTyping();
    initCounters();
    initBackToTop();
    initParallax();
    initFilterRipple();
  });
})();
