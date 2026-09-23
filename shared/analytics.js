/**
 * --------------------------------------------------------------------------
 * TopCinema - Google Analytics 4 (GA4) & Consent Mode v2 Controller
 * Tag ID: G-4Z7BD1Y1W9
 * RGPD / ePrivacy Compliant
 * --------------------------------------------------------------------------
 */

import { getLanguage, t } from './i18n.js';

export const GA_MEASUREMENT_ID = 'G-4Z7BD1Y1W9';
const CONSENT_STORAGE_KEY = 'topcinema_cookie_consent';

/**
 * Atualiza o estado de consentimento no Google Consent Mode v2
 * @param {'granted' | 'denied'} status 
 */
export function updateAnalyticsConsent(status) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': status
    });
  }
}

/**
 * Obtém a escolha de consentimento armazenada ('accepted' | 'declined' | null)
 * @returns {string | null}
 */
export function getSavedConsent() {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

/**
 * Salva a escolha de consentimento
 * @param {'accepted' | 'declined'} choice 
 */
export function setSavedConsent(choice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch (e) {
    console.error('Failed to save cookie consent:', e);
  }
}

/**
 * Determina o caminho relativo correto para a página de privacidade
 * @returns {string}
 */
function getPrivacyPageUrl() {
  const path = window.location.pathname;
  if (path.includes('/pages/privacy/')) {
    return './privacy.html';
  } else if (path.includes('/pages/')) {
    return '../privacy/privacy.html';
  }
  return './pages/privacy/privacy.html';
}

/**
 * Inicializa e monta o banner de consentimento de cookies se ainda não houver decisão
 */
export function initCookieConsent() {
  if (typeof document === 'undefined') return;

  const existingConsent = getSavedConsent();
  if (existingConsent) {
    // Aplica o consentimento já previamente salvo (garantia adicional)
    updateAnalyticsConsent(existingConsent === 'accepted' ? 'granted' : 'denied');
    return;
  }

  // Evitar duplicações
  if (document.getElementById('cookieConsentBanner')) return;

  const banner = document.createElement('aside');
  banner.id = 'cookieConsentBanner';
  banner.className = 'cookie-consent-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie Consent');
  banner.setAttribute('aria-live', 'polite');

  const privacyUrl = getPrivacyPageUrl();

  banner.innerHTML = `
    <div class="cookie-consent-content">
      <div class="cookie-consent-icon" aria-hidden="true">
        <i class="bi bi-cookie"></i>
      </div>
      <p class="cookie-consent-message">
        <span class="cookie-consent-text" data-i18n="cookie_consent_text">${t('cookie_consent_text')}</span> <a href="${privacyUrl}" class="cookie-privacy-link" data-i18n="cookie_consent_privacy">${t('cookie_consent_privacy')}</a>.
      </p>
    </div>
    <div class="cookie-consent-actions">
      <button type="button" class="cookie-btn cookie-btn-decline" id="cookieDeclineBtn" data-i18n="cookie_consent_decline">
        ${t('cookie_consent_decline')}
      </button>
      <button type="button" class="cookie-btn cookie-btn-accept" id="cookieAcceptBtn" data-i18n="cookie_consent_accept">
        ${t('cookie_consent_accept')}
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  // Animação de entrada
  requestAnimationFrame(() => {
    banner.classList.add('is-visible');
  });

  const dismissBanner = () => {
    banner.classList.remove('is-visible');
    banner.classList.add('is-hiding');
    setTimeout(() => {
      banner.remove();
    }, 350);
  };

  const acceptBtn = banner.querySelector('#cookieAcceptBtn');
  const declineBtn = banner.querySelector('#cookieDeclineBtn');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      setSavedConsent('accepted');
      updateAnalyticsConsent('granted');
      dismissBanner();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      setSavedConsent('declined');
      updateAnalyticsConsent('denied');
      dismissBanner();
    });
  }
}

// Auto-inicialização quando o DOM estiver pronto
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
}

