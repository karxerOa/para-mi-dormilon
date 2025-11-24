(function cardBursts() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  function showBurst(card, clientX, clientY) {
    const rect = card.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    const emojiAttr = card.getAttribute('data-emoji') || '✨ ❤️';
    const pool = emojiAttr.split(/\s+/).filter(Boolean);

    const burst = document.createElement('div');
    burst.className = 'card-burst';
    card.appendChild(burst);

    const particles = 8; 
    for (let i = 0; i < particles; i++) {
      const span = document.createElement('span');
      span.className = 'burst-item';
      span.textContent = pool[Math.floor(Math.random() * pool.length)];

      const size = Math.floor(Math.random() * 14) + 12;
      const dx = (Math.random() * 240) - 120;
      const dy = -Math.floor(Math.random() * 180) - 40;
      const rot = Math.floor(Math.random() * 90) - 45; 
      const dur = Math.floor(Math.random() * 300) + 600;
      const delay = Math.floor(Math.random() * 120); 

      span.style.setProperty('--x', localX + 'px');
      span.style.setProperty('--y', localY + 'px');
      span.style.setProperty('--size', size + 'px');
      span.style.setProperty('--dx', dx + 'px');
      span.style.setProperty('--dy', dy + 'px');
      span.style.setProperty('--rot', rot + 'deg');
      span.style.setProperty('--dur', dur + 'ms');
      span.style.animationDelay = delay + 'ms';

      span.style.pointerEvents = 'none';

      span.addEventListener('animationend', () => {
        span.remove();
        if (burst && burst.children.length === 0 && burst.parentNode) burst.parentNode.removeChild(burst);
      });

      burst.appendChild(span);
    }

    setTimeout(() => {
      if (burst && burst.parentNode) burst.parentNode.removeChild(burst);
    }, 1600);
  }

  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card || !gallery.contains(card)) return;
    const x = e.clientX;
    const y = e.clientY;
    showBurst(card, x, y);
  });

  gallery.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const card = e.target.closest('.gallery-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    showBurst(card, cx, cy);
  });

  document.querySelectorAll('.gallery-card').forEach(card => {
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
  });
})();