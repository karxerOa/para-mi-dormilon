(function initHeartsBackground() {
  const existing = document.querySelector('.hearts');
  const container = existing || (function () {
    const el = document.createElement('div');
    el.className = 'hearts';
    el.style.position = 'fixed';
    el.style.inset = '0';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '0';
    document.body.appendChild(el);
    return el;
  })();

  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '❤️';
    const size = Math.floor(Math.random() * 24) + 18;
    heart.style.fontSize = size + 'px';
    const x = Math.random() * 100;
    heart.style.left = x + 'vw';
    const duration = (Math.random() * 3) + 3;
    heart.style.animationDuration = duration + 's';
    const rotate = (Math.random() * 40) - 20;
    heart.style.transform = `translate(-50%, 0) rotate(${rotate}deg)`;
    heart.style.pointerEvents = 'auto';

    function removeAfterAnimation() {
      heart.removeEventListener('animationend', removeAfterAnimation);
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }
    heart.addEventListener('animationend', removeAfterAnimation);

    heart.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      heart.classList.add('pop');
      setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, 160);
    });

    container.appendChild(heart);
  }

  // controls
  const MIN_MS = 700;            // no crear más frecuentemente
  const MAX_ACTIVE = 12;        // máximo corazones en DOM
  let lastCreate = 0;
  let running = true;
  let isScrolling = false;

  function loop(now) {
    if (!running) return;
    if (!document.hidden && !isScrolling && (now - lastCreate) >= MIN_MS) {
      if (container.children.length < MAX_ACTIVE) {
        createHeart();
        lastCreate = now;
      }
    }
    requestAnimationFrame(loop);
  }

  let raf = requestAnimationFrame(loop);

  // pausar durante scroll/touch para mejorar rendimiento
  let scrollTimer = null;
  function onScroll() {
    isScrolling = true;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { isScrolling = false; }, 160);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('touchmove', onScroll, { passive: true });

  // visibilidad
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
    } else {
      if (!running) {
        running = true;
        lastCreate = performance.now();
        raf = requestAnimationFrame(loop);
      }
    }
  });

  // limpieza
  window.addEventListener('beforeunload', () => {
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(scrollTimer);
  });
})();

(function initFallingScene() {
  const falling = document.querySelector('.falling') || (function () {
    const el = document.createElement('div');
    el.className = 'falling';
    document.body.appendChild(el);
    return el;
  })();

  const heartsContainer = document.querySelector('.hearts') || (function () {
    const el = document.createElement('div');
    el.className = 'hearts';
    document.body.appendChild(el);
    return el;
  })();

  const heartEmoji = '❤️';

  function createLeaf() {
    const span = document.createElement('span');
    span.className = 'leaf';
    span.textContent = leaves[Math.floor(Math.random() * leaves.length)];


    const left = (Math.random() * 120) - 10; 
    const size = Math.floor(Math.random() * 18) + 14; 
    const duration = (Math.random() * 6) + 6; 
    const drift = (Math.random() * 300) - 150; 
    const rot = (Math.random() * 360) - 180; 
    const scale = (Math.random() * 0.7) + 0.6; 
    const opacity = (Math.random() * 0.3) + 0.75; 

    span.style.setProperty('--left', left + 'vw');
    span.style.setProperty('--size', size + 'px');
    span.style.setProperty('--duration', duration + 's');
    span.style.setProperty('--drift', drift + 'px');
    span.style.setProperty('--rot', rot + 'deg');
    span.style.setProperty('--scale', scale);
    span.style.setProperty('--opacity', opacity);

    function onEnd() {
      span.removeEventListener('animationend', onEnd);
      if (span.parentNode) span.parentNode.removeChild(span);
    }
    span.addEventListener('animationend', onEnd);

    falling.appendChild(span);

    if (falling.children.length > 160) {
      falling.removeChild(falling.firstElementChild);
    }
  }
  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = heartEmoji;

    const size = Math.floor(Math.random() * 36) + 18; 
    heart.style.fontSize = size + 'px';

    const x = Math.random() * 100;
    heart.style.left = x + 'vw';

    const duration = (Math.random() * 3) + 3; 
    heart.style.animationDuration = duration + 's';

    const rotate = (Math.random() * 60) - 30;
    heart.style.transform = `translate(-50%, 0) rotate(${rotate}deg)`;

    const hue = Math.floor(Math.random() * 60) - 20;
    heart.style.filter = `hue-rotate(${hue}deg)`;

    function removeAfterAnimation() {
      heart.removeEventListener('animationend', removeAfterAnimation);
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }
    heart.addEventListener('animationend', removeAfterAnimation);

    heart.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      heart.classList.add('pop');
      setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, 160);
    });

    heartsContainer.appendChild(heart);

    if (heartsContainer.children.length > 30) {
      heartsContainer.removeChild(heartsContainer.firstElementChild);
    }
  }

  let leafInterval = setInterval(() => {
    const count = Math.random() < 0.6 ? 2 : 1;
    for (let i = 0; i < count; i++) createLeaf();

    if (Math.random() < 0.06) createHeart();
  }, 120);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(leafInterval);
    } else {
      leafInterval = setInterval(() => {
        const count = Math.random() < 0.6 ? 2 : 1;
        for (let i = 0; i < count; i++) createLeaf();
        if (Math.random() < 0.06) createHeart();
      }, 120);
    }
  });

  // limpiar al salir
  window.addEventListener('beforeunload', () => clearInterval(leafInterval));
})();