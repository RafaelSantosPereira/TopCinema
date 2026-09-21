// pages/auth/login.js
import { auth, signInWithGoogle } from '../../shared/firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initI18n, getTranslation } from '../../shared/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
});

const errorBox = document.getElementById('auth-error');

function showError(message) {
  if (errorBox) {
    errorBox.textContent = message;
    errorBox.classList.remove('hidden');
  } else {
    alert(message);
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
    alert(getTranslation('login_success'));
    window.location.href = "../../index.html";
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
      await signInWithGoogle();
      alert(getTranslation('login_success'));
      window.location.href = "../../index.html";
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
