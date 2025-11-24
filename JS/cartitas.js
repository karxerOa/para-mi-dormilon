(function(){
  const cards = [
    { id: 'ahora', title: 'Abre ahora', icon: '💕', desc: 'Puedes abrir esta carta ahora', message: '¿Sabes que te amo demasiado? Te adoro, me encantas. No sé ni cómo terminé haciendo este detalle para ti JAJA. Estaba pensando en cómo darte cartitas según lo que sientas, pero como todavía no podemos vernos en persona, decidí hacerlas digitalmente. Nada me impide darte cariño así. Es mi manera de expresarte lo que siento. Yo soy detallista cuando alguien me importa de verdad, y tú me importas muchísimo. Dejando eso de lado, espero que te guste lo que hice. Me peleé un poco con los colores y con el programa que usé, pero lo hice con mucho cariño para ti. '},
    { id: 'alegria', title: 'Alegría', icon: 'celebration', desc: '¿Estás feliz hoy, mi amor?', message: 'Me alegra que hoy estés bien. Tú mereces ser feliz. Si algún día lo olvidas, vuelve a leer esto y recuerda lo fuerte que eres. Tú puedes con todo.' },
    { id: 'tristeza', title: 'Tristeza', icon: 'mood_bad', desc: '¿Te sientes bien?', message: 'Si hoy no te sientes bien, no pasa nada. No tienes que fingir, cariño. No estás solo; aquí estoy yo, incluso si no quieres hablar mucho. Solo recuerda que puedes confiar en mí para contarme lo que te pasa. Te amo mucho.' },
    { id: 'nostalgia', title: 'Nostalgia', icon: 'hourglass_top', desc: 'Recuerdos?.', message: 'Cuando te dé nostalgia, está bien. A veces extrañar solo significa que algo fue importante. Date un momento para ti mi niño y sigue a tu ritmo.' },
    { id: 'orgullo', title: 'Orgullo', icon: 'military_tech', desc: '¿Lograste algo?.', message: 'Estoy orgulloso de ti, de tu esfuerzo, de cómo sigues intentando incluso cuando te cuesta, eres alguien inteligente. Vas mejor de lo que crees. Sigue así, mi dormilón' },
    { id: 'miedo', title: 'Miedo', icon: 'psychology', desc: '¿Tienes miedo?.', message: 'Si algo te asusta, respira un momento. Es normal sentirse así. No tienes que tener todo claro. Hazlo a tu ritmo pues tú puedes con más de lo que piensas. Recuerda que puedes contarme cualquier cosa. No tengas miedo, yo estoy contigo.' },
    { id: 'cariño', title: 'Cariño', icon: 'favorite', desc: '¿Tienes dudas?', message: 'Por si hoy lo dudas, TÚ eres importante. Si el día te pesa, recuerda que puedes apoyarte en mí cuando lo necesites. Te amo demasiado.' },
    { id: 'ansiedad', title: 'Ansiedad', icon: 'sentiment_dissatisfied', desc: '¿Tu mente va rápido?.', message: 'Si tu mente va rápido hoy, tómate un momento. No tienes que controlar todo. Estoy contigo, aunque no digas nada, Tranquilo, mi niño. Todo estará bien.' },
    { id: 'enojo', title: 'Enojo', icon: 'report_gmailerrorred', desc: 'Cuando algo te frustra.', message: 'Si estás molesto, date tu espacio. Es válido sentirse así. Cuando se te pase un poco, aquí estoy para escucharte sin juzgar.' },
    { id: 'soledad', title: 'Soledad', icon: 'dark_mode', desc: 'Para los días que te sientas solo.', message: 'Si te sientes solo, recuerda que sí hay alguien que siempre piensa en ti y te quiere. No estás cargando todo tú.' },
    { id: 'frustracion', title: 'Frustración', icon: 'build_circle', desc: 'Cuando nada encaja.', message: 'Sé que te esfuerzas, aunque no salga como quieres. A veces solo necesitas un respiro y volver a intentarlo. No te rindas. Confío en ti y yo sé que eres capaz de hacer muchas cosas' },
    { id: 'confusion', title: 'Confusión', icon: 'help_outline', desc: '¿Estás confundido?.', message: 'Si no sabes qué pensar o qué hacer, está bien. Nadie tiene todo resuelto. Tómate tu tiempo; entenderás las cosas poco a poco. Y no olvides que te amo demasiado' },
    { id: 'motivacion', title: 'Motivación', icon: 'rocket', desc: '¿No tienes motivación?.', message: 'Sigue avanzando, aunque sea de a poquito. No necesitas hacerlo perfecto. Yo creo en ti. Y si quieres más mtivación, sabes que puedes conversar conmigo.' },
    { id: 'amor', title: 'Amor', icon: 'favorite', desc: '¿Mi amor?.', message: 'Solo quiero que recuerdes que te amo mucho, mi niño, mi chico bonito, precioso, mi dormilón. Gracias por elegirme.' },
    { id: 'estres', title: 'Estrés', icon: 'grain', desc: 'Cuando estés estresado.', message: 'Respira hondo un momento. Trata de relajarte. No tienes que cargarlo todo. Haz una cosa a la vez.' },
    { id: 'calma', title: 'Calma', icon: 'spa', desc: 'Calma.', message: 'Tómate un ratito para ti. Aquí puedes respirar tranquilo. Cualquier cosa que pase por tu mente, se va resolver. Tú puedees' },
    { id: 'autoestima', title: 'Autoestima', icon: 'self_improvement', desc: '¿Qué sucede, mi niño?.', message: 'Sé que a veces dudas de ti, pero vales más de lo que piensas. No tienes que compararte con nadie. Eres suficiente, mi dormilón.' },
    { id: 'agradecimiento', title: 'Agradecimiento', icon: 'emoji_events', desc: 'Te doy las gracias.', message: 'Gracias por todo lo que haces y por lo que eres. Te valoro más de lo que digo. Eres importante para mí.' },
    { id: 'extranarte', title: 'Extrañarte', icon: 'comment', desc: '¿Me extrañas?.', message: 'Si hoy me extrañas, quiero que sepas que yo también pienso en ti. No importa la distancia; sigues siendo importante para mí, eres mi prioridad, y si me hablas en este momento, creeme que te contestaré lo más rápido que pueda.' }
  ];

  const container = document.getElementById('cardsContainer');
  if (!container) return;

  function renderCards(){
    container.innerHTML = '';
    cards.forEach(card => {
      const el = document.createElement('article');
      el.className = 'card';
      el.setAttribute('data-id', card.id);
      el.setAttribute('data-message', card.message);
      el.setAttribute('data-title', card.title);

      el.innerHTML = `
        <div class="thumb" aria-hidden="true"><span class="material-symbols-outlined thumb-icon">${card.icon}</span></div>
        <div class="meta">
          <h4>${card.title}</h4>
          <p class="card-desc">${card.desc}</p>
          <div class="actions">
            <button class="btn open-btn">Abrir cartita</button>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
  }

  renderCards();

  const confirmModal = document.getElementById('confirmModal');
  const messageModal = document.getElementById('messageModal');
  const confirmText = document.getElementById('confirmText');
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');
  const messageTitle = document.getElementById('messageTitle');
  const messageBody = document.getElementById('messageBody');
  const messageClose = document.getElementById('messageClose');

  let activeCard = null;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-btn');
    if (!btn) return;
    const cardEl = btn.closest('.card');
    if (!cardEl) return;
    activeCard = {
      title: cardEl.getAttribute('data-title'),
      message: cardEl.getAttribute('data-message')
    };
    confirmText.textContent = `Estás a punto de abrir la cartita de "${activeCard.title}". ¿Deseas continuar?`;
    confirmModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  });

  confirmNo.addEventListener('click', () => {
    confirmModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    activeCard = null;
  });

  confirmYes.addEventListener('click', () => {
    confirmModal.setAttribute('aria-hidden','true');
    if (!activeCard) { document.body.style.overflow = ''; return; }
    messageTitle.textContent = activeCard.title;
    messageBody.textContent = activeCard.message;
    messageModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    activeCard = null;
  });

  messageClose.addEventListener('click', () => {
    messageModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (confirmModal.getAttribute('aria-hidden') === 'false') { confirmModal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; activeCard = null; }
      if (messageModal.getAttribute('aria-hidden') === 'false') { messageModal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
    }
  });
})();