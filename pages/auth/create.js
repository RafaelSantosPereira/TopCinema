// pages/auth/create.js
import { auth } from '../../shared/firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

function validar(nome, pass, pass2) {
  if (!nome || !pass || !pass2) {
    alert("Please fill in all fields");
    return false;
  }
  if (pass.length < 4) {
    alert("Please enter a password with at least 4 characters");
    return false;
  }
  if (pass.length > 20) {
    alert("Please enter a password with fewer than 20 characters");
    return false;
  }
  if (pass !== pass2) {
    alert("Passwords do not match");
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
    alert("Account created successfully!");
    window.location.href = "./login.html?mensagem=1";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("This user already exists");
    } else {
      alert("Error: " + error.message);
    }
  }
});

