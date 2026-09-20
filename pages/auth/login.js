// pages/auth/login.js
import { auth } from '../../shared/firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initI18n, getTranslation } from '../../shared/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
});

function validar(nome, pass) {
  if (!nome || !pass) {
    alert(getTranslation('fill_all_fields'));
    return false;
  }
  if (pass.length < 4) {
    alert(getTranslation('password_min_length'));
    return false;
  }
  if (pass.length > 20) {
    alert(getTranslation('password_max_length'));
    return false;
  }
  return true;
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const password = document.getElementById("password").value;

  if (!validar(nome, password)) return;

  try {
    await signInWithEmailAndPassword(auth, nome, password);
    alert(getTranslation('login_success'));
    window.location.href = "../../index.html";
  } catch (error) {
    alert(getTranslation('login_failed'));
  }
});
