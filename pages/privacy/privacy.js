import { initUserAccountPopup } from "../../shared/firebase.js";
import { initI18n } from "../../shared/i18n.js";

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar o seletor de idioma e aplicar traduções imediatas
  initI18n();

  // Inicializar popup de utilizador e autenticação no header
  initUserAccountPopup();

  // Lógica de pesquisa no cabeçalho
  const searchBox = document.getElementById('searchBox');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchBtn = document.getElementById('search-btn');
  const searchField = document.getElementById('search-bar');

  const redirectSearch = () => {
    const query = searchField?.value.trim();
    if (!query) return;
    window.location.href = `../search/search.html?search=${encodeURIComponent(query)}`;
  };

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !searchBox?.classList.contains('active')) {
        e.preventDefault();
        searchBox?.classList.add('active');
        searchField?.focus();
        return;
      }
      redirectSearch();
    });
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', () => {
      searchBox?.classList.remove('active');
      if (searchField) searchField.value = '';
    });
  }

  if (searchField) {
    searchField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') redirectSearch();
    });
  }
});

