(function(){
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const storageKey = 'lesson5-theme';

  function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.textContent = theme === 'light' ? '☀️' : '🌙';
      toggle.setAttribute('aria-pressed', theme === 'light');
      toggle.setAttribute('aria-label', theme === 'light' ? 'Toggle dark mode' : 'Toggle light mode');
    }
  }

  const savedTheme = localStorage.getItem(storageKey);
  const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
  setTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
      try { localStorage.setItem(storageKey, nextTheme); } catch (e) {}
    });
  }
})();
