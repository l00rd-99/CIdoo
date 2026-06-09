import { auth } from './auth.js';
import { Cart } from './models.js';
import { i18n } from './i18n.js';
import { theme, themeToggleHTML } from './theme.js';

// Apply theme immediately on load
theme.init();

// ---- Toast ----
let toastContainer = null;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'info', duration = 3000) {
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ---- Header ----
export function renderHeader(activePage = '') {
  const cart = new Cart();
  const user = auth.getCurrentUser();
  const count = cart.count;
  const isDark = theme.isDark();

  const headerHTML = `
    <header class="header">
      <div class="header-inner">
        <a href="index.html" class="logo">Cidoo<span>.</span></a>
        <nav>
          <ul class="nav">
            <li><a href="index.html" ${activePage === 'home' ? 'class="active"' : ''}>${i18n.t('nav_catalog')}</a></li>
            <li><a href="cart.html" ${activePage === 'cart' ? 'class="active"' : ''}>${i18n.t('nav_cart')}</a></li>
            ${user
              ? `<li class="user-greeting">
                  <span>${i18n.t('nav_hi')}, ${escapeHtml(user.name)}</span>
                  <button class="btn btn-ghost btn-sm" id="logout-btn">${i18n.t('nav_logout')}</button>
                </li>`
              : `<li><a href="auth.html" ${activePage === 'auth' ? 'class="active"' : ''}>${i18n.t('nav_login')}</a></li>`
            }
            <li>
              <a href="cart.html" class="cart-icon" aria-label="${i18n.t('nav_cart')}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span class="cart-badge ${count === 0 ? 'hidden' : ''}" id="cart-badge">${count}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="header-controls">
          <button class="ctrl-btn lang-toggle" id="lang-btn" title="Switch language">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span class="ctrl-label">${i18n.t('lang_label')}</span>
          </button>
          <button class="ctrl-btn" id="theme-btn" title="Toggle theme">
            ${themeToggleHTML(i18n.t('theme_dark'), i18n.t('theme_light'), isDark)}
          </button>
        </div>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  document.getElementById('lang-btn').addEventListener('click', () => i18n.toggle());
  document.getElementById('theme-btn').addEventListener('click', () => theme.toggle());

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      auth.logout();
      showToast(i18n.t('auth_logout_toast'), 'info');
      setTimeout(() => { window.location.href = 'index.html'; }, 800);
    });
  }
}

export function updateCartBadge() {
  const cart = new Cart();
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = cart.count;
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Skeleton cards
export function renderSkeletons(container, count = 8) {
  container.innerHTML = Array(count).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-content">
        <div class="skeleton skeleton-line" style="width:40%;height:10px"></div>
        <div class="skeleton skeleton-line" style="width:90%"></div>
        <div class="skeleton skeleton-line" style="width:70%"></div>
        <div class="skeleton skeleton-line" style="width:30%;height:18px;margin-top:8px"></div>
        <div class="skeleton skeleton-line" style="height:36px;margin-top:12px;border-radius:20px"></div>
      </div>
    </div>
  `).join('');
}

// Order modal
export function showOrderModal(onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <h2 class="modal-title">${i18n.t('modal_title')}</h2>
      <div class="modal-form">
        <div class="form-group">
          <label class="form-label">${i18n.t('modal_name')}</label>
          <input class="form-input" id="order-name" placeholder="${i18n.t('auth_name_ph')}" type="text">
        </div>
        <div class="form-group">
          <label class="form-label">${i18n.t('modal_address')}</label>
          <input class="form-input" id="order-address" placeholder="...">
        </div>
        <div class="form-group">
          <label class="form-label">${i18n.t('modal_phone')}</label>
          <input class="form-input" id="order-phone" placeholder="+7 (___) ___-__-__" type="tel">
        </div>
        <div class="form-group">
          <label class="form-label">${i18n.t('modal_payment')}</label>
          <select class="filter-select" id="order-payment" style="width:100%">
            <option>${i18n.t('modal_pay1')}</option>
            <option>${i18n.t('modal_pay2')}</option>
            <option>${i18n.t('modal_pay3')}</option>
          </select>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" id="modal-cancel">${i18n.t('modal_cancel')}</button>
          <button class="btn btn-primary" id="modal-confirm">${i18n.t('modal_confirm')}</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));

  overlay.querySelector('#modal-cancel').addEventListener('click', () => closeModal(overlay));
  overlay.querySelector('#modal-confirm').addEventListener('click', () => {
    const name = overlay.querySelector('#order-name').value.trim();
    const address = overlay.querySelector('#order-address').value.trim();
    const phone = overlay.querySelector('#order-phone').value.trim();
    if (!name || !address || !phone) {
      showToast(i18n.t('modal_fill_all'), 'error'); return;
    }
    closeModal(overlay);
    onConfirm({ name, address, phone });
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
}

function closeModal(overlay) {
  overlay.classList.remove('open');
  setTimeout(() => overlay.remove(), 300);
}
