// login.js
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

function validar(nome, pass) {
  if (!nome || !pass) {
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
  return true;
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const password = document.getElementById("password").value;

  if (!validar(nome, password)) return;

  try {
    await signInWithEmailAndPassword(auth, nome, password);
    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Incorrect credentials. Please try again.");
  }
});
