// pages/auth/login.js
import { auth, signInWithGoogle, ensureUserHasDefaultPlaylist, getSafeRedirectUrl } from '../../shared/firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initI18n, getTranslation } from '../../shared/i18n.js';
import { showToast, showToastKey } from '../../shared/toast.js';

function preserveAuthRedirect() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect') || params.get('returnUrl');
  if (redirect) {
    const switchLink = document.querySelector('.auth-switch a');
    if (switchLink) {
      switchLink.href = `./create.html?redirect=${encodeURIComponent(redirect)}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  preserveAuthRedirect();
});

const errorBox = document.getElementById('auth-error');

function showError(message) {
  if (errorBox) {
    errorBox.textContent = message;
    errorBox.classList.remove('hidden');
  } else {
    showToast(message, 'error');
  }
}

function clearError() {
  if (errorBox) {
    errorBox.textContent = '';
    errorBox.classList.add('hidden');
  }
}

function validar(nome, pass) {
  if (!nome || !pass) {
    showError(getTranslation('fill_all_fields'));
    return false;
  }
  if (pass.length < 6) {
    showError(getTranslation('password_min_length'));
    return false;
  }
  if (pass.length > 20) {
    showError(getTranslation('password_max_length'));
    return false;
  }
  return true;
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();

  const nome = document.getElementById("nome").value.trim();
  const password = document.getElementById("password").value;
  const submitBtn = document.querySelector(".LOGIN");

  if (!validar(nome, password)) return;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');
  }

  try {
    await signInWithEmailAndPassword(auth, nome, password);
    showToastKey('login_success', 'success');
    const destination = getSafeRedirectUrl('../../index.html');
    setTimeout(() => {
      window.location.href = destination;
    }, 900);
  } catch (error) {
    showError(getTranslation('login_failed'));
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
    }
  }
});

const googleBtn = document.getElementById('btn-google');
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    clearError();
    googleBtn.disabled = true;
    googleBtn.classList.add('is-loading');
    try {
      const userCredential = await signInWithGoogle();
      if (userCredential && userCredential.user) {
        await ensureUserHasDefaultPlaylist(userCredential.user);
      }
      showToastKey('login_success', 'success');
      const destination = getSafeRedirectUrl('../../index.html');
      setTimeout(() => {
        window.location.href = destination;
      }, 900);
    } catch (error) {
      console.error("Google Auth Error:", error);
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return;
      }
      showError(getTranslation('google_auth_failed'));
    } finally {
      googleBtn.disabled = false;
      googleBtn.classList.remove('is-loading');
    }
  });
}
