const THEME_KEY = 'store_theme';

export const theme = {
  current: localStorage.getItem(THEME_KEY) || 'dark',

  init() {
    this.apply(this.current);
  },

  apply(t) {
    this.current = t;
    if (t === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, t);
  },

  toggle() {
    this.apply(this.current === 'dark' ? 'light' : 'dark');
    // Update all theme buttons on the page
    document.querySelectorAll('.theme-btn-label').forEach(el => {
      el.textContent = this.current === 'dark' ? _themeLabel('dark') : _themeLabel('light');
    });
    document.querySelectorAll('.theme-btn-icon').forEach(el => {
      el.innerHTML = this.current === 'dark' ? _moonIcon() : _sunIcon();
    });
  },

  isDark() {
    return this.current === 'dark';
  }
};

function _sunIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

function _moonIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

export function themeToggleHTML(labelDark, labelLight, isDark) {
  const label = isDark ? labelLight : labelDark; // show what clicking will switch TO
  const iconHtml = isDark ? _sunIcon() : _moonIcon();
  return `<span class="theme-btn-icon">${iconHtml}</span><span class="ctrl-label theme-btn-label">${label}</span>`;
}
