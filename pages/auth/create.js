// pages/auth/create.js
import { auth } from '../../shared/firebase.js';
import { auth, signInWithGoogle } from '../../shared/firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
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

function validar(username, email, pass, pass2) {
  if (!username || !email || !pass || !pass2) {
    showError(getTranslation('fill_all_fields'));
    return false;
  }
  if (username.length < 2) {
    showError(getTranslation('username_min_length'));
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError(getTranslation('invalid_email'));
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
  if (pass !== pass2) {
    showError(getTranslation('passwords_dont_match'));
    return false;
  }
  return true;
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const submitBtn = document.querySelector(".CRIAR");

  if (!validar(username, email, password, password2)) return;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: username
    });
    alert(getTranslation('account_created_success'));
    window.location.href = "./login.html?mensagem=1";
  } catch (error) {
    let errorMsg = getTranslation('signup_failed');
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMsg = getTranslation('user_already_exists');
        break;
      case "auth/invalid-email":
        errorMsg = getTranslation('invalid_email');
        break;
      case "auth/weak-password":
        errorMsg = getTranslation('password_min_length');
        break;
      case "auth/network-request-failed":
        errorMsg = getTranslation('network_error');
        break;
      case "auth/too-many-requests":
        errorMsg = getTranslation('too_many_requests');
        break;
      default:
        errorMsg = error.message || errorMsg;
    }
    showError(errorMsg);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  }
});

const googleBtn = document.getElementById('btn-google');
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    clearError();
    try {
      await signInWithGoogle();
      alert(getTranslation('account_created_success'));
      window.location.href = "../../index.html";
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return;
      }
      showError(getTranslation('google_auth_failed'));
    }
  });
}
