// pages/auth/create.js
import { auth } from '../../shared/firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initI18n, getTranslation } from '../../shared/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
});

function validar(nome, pass, pass2) {
  if (!nome || !pass || !pass2) {
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
  if (pass !== pass2) {
    alert(getTranslation('passwords_dont_match'));
    return false;
  }
  return true;
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (!validar(nome, password, password2)) return;

  try {
    await createUserWithEmailAndPassword(auth, nome, password);
    alert(getTranslation('account_created_success'));
    window.location.href = "./login.html?mensagem=1";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert(getTranslation('user_already_exists'));
    } else {
      alert("Error: " + error.message);
    }
  }
});
