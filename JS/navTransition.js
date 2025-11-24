(function(){
const DURATION = 420;
document.documentElement.classList.add('page-transition-loaded');
document.body.classList.add('page-transition','page-hidden');
requestAnimationFrame(()=>document.body.classList.remove('page-hidden'));
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if(!a || !a.href) return;
  if(a.getAttribute('target') === '_blank' || a.hasAttribute('download')) return;
  try {
    const url = new URL(a.href, location.href);
    if(url.origin !== location.origin) return;
  } catch (err) {
    return;
  }
  e.preventDefault();
  document.body.classList.add('page-hidden');
  const timeout = setTimeout(()=> location.href = a.href, DURATION + 60);
  const onTransitionEnd = (ev) => {
    if(ev.target !== document.body) return;
    document.body.removeEventListener('transitionend', onTransitionEnd);
    clearTimeout(timeout);
    location.href = a.href;
  };
  document.body.addEventListener('transitionend', onTransitionEnd);
}, { passive: false });
window.addEventListener('pageshow', (ev) => {
  if(ev.persisted) document.body.classList.remove('page-hidden');
});
})();