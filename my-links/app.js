(function(){
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'my-links-theme';

  function applyTheme(theme){
    if(theme === 'light'){
      body.setAttribute('data-theme','light');
      toggle.innerText = '🌙';
      toggle.setAttribute('aria-pressed','false');
      toggle.setAttribute('aria-label','Toggle dark mode');
    } else {
      body.setAttribute('data-theme','dark');
      toggle.innerText = '☀️';
      toggle.setAttribute('aria-pressed','true');
      toggle.setAttribute('aria-label','Toggle light mode');
    }
  }

  // initialize
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved || 'dark';
  applyTheme(initial);

  toggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try{ localStorage.setItem(STORAGE_KEY,next);}catch(e){}
  });
})();
