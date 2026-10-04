/**
 * --------------------------------------------------------------------------
 * TopCinema - Sistema Nativo de Toast / Notificações
 * Zero dependências externas, suporte completo i18n e acessibilidade (a11y)
 * Estilos centralizados em assets/css/toast.css
 * --------------------------------------------------------------------------
 */

import { getTranslation } from './i18n.js';

let container = null;

function ensureToastStylesheet() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('tc-toast-stylesheet')) {
    const isSubDir = window.location.pathname.includes('/pages/');
    const cssPath = isSubDir ? '../../assets/css/toast.css' : './assets/css/toast.css';
    
    const existingLink = document.querySelector('link[href*="toast.css"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.id = 'tc-toast-stylesheet';
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
    }
  }
}

function getOrCreateContainer() {
  ensureToastStylesheet();
  if (container && document.body.contains(container)) {
    return container;
  }
  container = document.getElementById('tc-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'tc-toast-container';
    container.className = 'tc-toast-container';
    container.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(container);
  }
  return container;
}

const TYPE_ICONS = {
  success: 'bi-check-circle-fill',
  error: 'bi-x-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
  info: 'bi-info-circle-fill'
};

/**
 * Exibe um toast com mensagem de texto
 * @param {string} message - Texto a exibir
 * @param {'success'|'error'|'warning'|'info'} [type='info'] - Tipo visual do toast
 * @param {number} [duration=3500] - Duração em ms (0 = fixo até fechar manual)
 * @returns {{ element: HTMLElement, dismiss: () => void }}
 */
export function showToast(message, type = 'info', duration = 3500) {
  if (typeof document === 'undefined') return null;

  const validTypes = ['success', 'error', 'warning', 'info'];
  const safeType = validTypes.includes(type) ? type : 'info';
  const toastContainer = getOrCreateContainer();

  const toast = document.createElement('div');
  toast.className = `tc-toast tc-toast-${safeType}`;
  toast.setAttribute('role', safeType === 'error' ? 'alert' : 'status');
  toast.setAttribute('aria-live', safeType === 'error' ? 'assertive' : 'polite');

  const iconClass = TYPE_ICONS[safeType] || TYPE_ICONS.info;

  toast.innerHTML = `
    <i class="bi ${iconClass} tc-toast-icon" aria-hidden="true"></i>
    <div class="tc-toast-message"></div>
    <button type="button" class="tc-toast-close" aria-label="Close">
      <i class="bi bi-x-lg" aria-hidden="true"></i>
    </button>
  `;

  // Prevenir injeção XSS usando textContent
  const messageEl = toast.querySelector('.tc-toast-message');
  if (messageEl) {
    messageEl.textContent = message;
  }

  let progressBar = null;
  let progressInner = null;
  if (duration > 0) {
    progressBar = document.createElement('div');
    progressBar.className = 'tc-toast-progress-bar';
    progressInner = document.createElement('div');
    progressInner.className = 'tc-toast-progress';
    progressBar.appendChild(progressInner);
    toast.appendChild(progressBar);
  }

  let dismissTimeout = null;
  let remainingTime = duration;
  let startTime = Date.now();
  let isClosed = false;

  function dismiss() {
    if (isClosed) return;
    isClosed = true;
    if (dismissTimeout) clearTimeout(dismissTimeout);
    toast.classList.remove('tc-toast-show');
    toast.classList.add('tc-toast-hide');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }

  const closeBtn = toast.querySelector('.tc-toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });
  }

  function startTimer() {
    if (duration <= 0) return;
    startTime = Date.now();
    if (progressInner) {
      progressInner.style.transition = `width ${remainingTime}ms linear`;
      progressInner.style.width = '0%';
    }
    dismissTimeout = setTimeout(() => {
      dismiss();
    }, remainingTime);
  }

  function pauseTimer() {
    if (duration <= 0 || isClosed) return;
    clearTimeout(dismissTimeout);
    const elapsed = Date.now() - startTime;
    remainingTime = Math.max(0, remainingTime - elapsed);
    if (progressInner) {
      const computedWidth = window.getComputedStyle(progressInner).width;
      progressInner.style.transition = 'none';
      progressInner.style.width = computedWidth;
    }
  }

  function resumeTimer() {
    if (duration <= 0 || isClosed || remainingTime <= 0) return;
    startTimer();
  }

  toast.addEventListener('mouseenter', pauseTimer);
  toast.addEventListener('mouseleave', resumeTimer);

  toastContainer.appendChild(toast);

  // Animação de entrada
  requestAnimationFrame(() => {
    toast.classList.add('tc-toast-show');
    startTimer();
  });

  return { element: toast, dismiss };
}

/**
 * Exibe um toast traduzido usando a chave de i18n
 * @param {string} key - Chave do dicionário i18n
 * @param {'success'|'error'|'warning'|'info'} [type='info'] - Tipo visual
 * @param {number} [duration=3500] - Duração em ms
 */
export function showToastKey(key, type = 'info', duration = 3500) {
  const translated = getTranslation(key);
  return showToast(translated, type, duration);
}

// Suporte global conveniente se necessário
if (typeof window !== 'undefined') {
  window.showToast = showToast;
  window.showToastKey = showToastKey;
}
