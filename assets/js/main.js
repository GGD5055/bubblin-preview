(function () {
  'use strict';

  // -----------------------------
  // Hamburger menu
  // -----------------------------
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // -----------------------------
  // Smooth scroll for in-page links
  // -----------------------------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // -----------------------------
  // Fade-in on scroll
  // -----------------------------
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));

  // -----------------------------
  // Floating bubbles in hero
  // -----------------------------
  const bubbleLayer = document.querySelector('.bubble-layer');
  if (bubbleLayer) {
    const colors = [
      'rgba(64,224,208,0.55)',
      'rgba(255,182,193,0.55)',
      'rgba(255,200,100,0.45)',
      'rgba(170,220,255,0.55)',
      'rgba(255,255,255,0.65)',
    ];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('span');
      b.className = 'bubble';
      const size = Math.random() * 40 + 20; // 20-60
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.bottom = '-' + (Math.random() * 40 + 10) + 'px';
      b.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${colors[i % colors.length]} 60%, transparent 72%)`;
      b.style.animationDuration = Math.random() * 10 + 8 + 's';
      b.style.animationDelay = Math.random() * 8 + 's';
      bubbleLayer.appendChild(b);
    }
  }

  // -----------------------------
  // Scattered Bubblins — random floating
  // -----------------------------
  const scatter = document.querySelector('.hero-char-scatter');
  if (scatter) {
    const chars = Array.from(scatter.querySelectorAll('.c'));
    const states = chars.map((el) => {
      const cs = getComputedStyle(el);
      // baseの変形を保持（ひっくり返り・反転・傾き）
      const baseTransform = cs.getPropertyValue('--base').trim() || 'none';
      return {
        el,
        baseTransform,
        ax: Math.random() * 18 + 14,    // x振幅 14-32px
        ay: Math.random() * 22 + 16,    // y振幅 16-38px
        ar: Math.random() * 6 + 3,      // 回転ゆらぎ 3-9deg
        px: Math.random() * Math.PI * 2, // 位相
        py: Math.random() * Math.PI * 2,
        pr: Math.random() * Math.PI * 2,
        sx: Math.random() * 0.0006 + 0.0005, // 速度 x
        sy: Math.random() * 0.0007 + 0.0006,
        sr: Math.random() * 0.0005 + 0.0003,
      };
    });
    let lastT = performance.now();
    const tick = (t) => {
      lastT = t;
      for (const s of states) {
        s.px += s.sx * 16;
        s.py += s.sy * 16;
        s.pr += s.sr * 16;
        const dx = Math.sin(s.px) * s.ax;
        const dy = Math.cos(s.py) * s.ay;
        const dr = Math.sin(s.pr) * s.ar;
        s.el.style.transform =
          `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) rotate(${dr.toFixed(2)}deg) ${s.baseTransform}`;
      }
      requestAnimationFrame(tick);
    };
    // 既存のCSSアニメを無効化
    chars.forEach((el) => (el.style.animation = 'none'));
    requestAnimationFrame(tick);
  }

  // -----------------------------
  // Header shadow on scroll
  // -----------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // -----------------------------
  // FAQ accordion
  // -----------------------------
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => item.classList.toggle('open'));
    }
  });
})();
