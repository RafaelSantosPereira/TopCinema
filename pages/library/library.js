import { auth, firebaseConfig, initUserAccountPopup } from "../../shared/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { base_url, movieID, serieID, ImageBaseURL, discover_movies } from "../../shared/api.js";

const projectId = firebaseConfig.projectId;
const playlistsSelect = document.querySelector("#playlistsSelect");
const sortSelect = document.querySelector("#sort");
const gridList = document.querySelector(".grid-list");

let currentItems = [];
let pendingDeleteItem = null;

function escapeHTML(str) {
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector(".addBtn");
  const contCreate = document.querySelector(".createPlaylist");
  const createBtn = document.querySelector("#btnCreate");
  const inputField = document.querySelector(".createPlaylist input");
  const filtersSection = document.querySelector(".filters");

  const modalConfirmDelete = document.getElementById('modalConfirmDelete');
  const btnCloseConfirmDelete = document.getElementById('btnCloseConfirmDelete');
  const btnCancelDelete = document.getElementById('btnCancelDelete');
  const btnConfirmDelete = document.getElementById('btnConfirmDelete');
  const deleteModalDescription = document.getElementById('deleteModalDescription');

  if (contCreate && contCreate.classList.contains('hidden')) {
    contCreate.classList.remove('hidden');
  }
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    if (contCreate && contCreate.parentNode) {
      contCreate.parentNode.insertBefore(overlay, contCreate);
    } else {
      document.body.appendChild(overlay);
    }
  }
  
  onAuthStateChanged(auth, (user) => {
    const libraryContainer = document.querySelector(".library-container");
    if (user) {
      if (libraryContainer) libraryContainer.classList.remove('auth-state-active');
      if (filtersSection) filtersSection.style.display = "flex";
      loadUserPlaylists(user).then(playlists => {
        if (playlists && playlists.length > 0) {
          playlistsSelect.value = playlists[0].id;
          const event = new Event('change');
          playlistsSelect.dispatchEvent(event);
        } else {
          renderNoPlaylistsState();
        }
      });

      const formCreatePlaylist = document.querySelector("#formCreatePlaylist");
      const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const title = inputField.value.trim();
        
        if (!title) {
          alert("Please enter a name for the playlist!");
          return;
        }

        const success = await createNewPlaylist(user, title);
        if (success) {
          inputField.value = ""; 
          contCreate.classList.remove('open');
          overlay.classList.remove('visible');
        }
      };

      if (formCreatePlaylist) {
        formCreatePlaylist.addEventListener("submit", handleCreateSubmit);
      } else if (createBtn) {
        createBtn.addEventListener("click", handleCreateSubmit);
      }

    } else {
      console.warn("Utilizador não autenticado");
      if (libraryContainer) libraryContainer.classList.add('auth-state-active');
      if (filtersSection) filtersSection.style.display = "none";
      renderAuthRequiredState();
    }
  });

  const btnCloseModal = document.querySelector("#btnCloseModal");
  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", () => {
      contCreate.classList.remove('open');
      overlay.classList.remove('visible');
    });
  }

  btn.addEventListener('click', () => {
    contCreate.classList.toggle('open');
    if (contCreate.classList.contains('open')) {
      overlay.classList.add('visible');
      if (inputField) inputField.focus();
    } else {
      overlay.classList.remove('visible');
    }
  });

  function openConfirmDeleteModal({ itemId, itemType, itemTitle }) {
    pendingDeleteItem = { itemId, itemType, itemTitle };
    if (deleteModalDescription) {
      if (itemTitle) {
        deleteModalDescription.innerHTML = `Are you sure you want to remove <strong style="color: var(--white);">${escapeHTML(itemTitle)}</strong> from this playlist?`;
      } else {
        deleteModalDescription.textContent = 'Are you sure you want to remove this title from the playlist?';
      }
    }
    if (modalConfirmDelete) {
      modalConfirmDelete.classList.remove('hidden');
      modalConfirmDelete.classList.add('open');
    }
    if (overlay) {
      overlay.classList.add('visible');
    }
  }

  function closeConfirmDeleteModal() {
    pendingDeleteItem = null;
    if (modalConfirmDelete) {
      modalConfirmDelete.classList.remove('open');
      modalConfirmDelete.classList.add('hidden');
    }
    if (overlay && (!contCreate || !contCreate.classList.contains('open'))) {
      overlay.classList.remove('visible');
    }
  }

  if (btnCloseConfirmDelete) {
    btnCloseConfirmDelete.addEventListener('click', closeConfirmDeleteModal);
  }
  if (btnCancelDelete) {
    btnCancelDelete.addEventListener('click', closeConfirmDeleteModal);
  }

  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', async () => {
      if (!pendingDeleteItem) return;
      const { itemId, itemType } = pendingDeleteItem;
      btnConfirmDelete.disabled = true;
      btnConfirmDelete.textContent = 'Removing...';

      try {
        await deleteItemFromPlaylist(itemId, itemType);
      } finally {
        btnConfirmDelete.disabled = false;
        btnConfirmDelete.textContent = 'Remove';
        closeConfirmDeleteModal();
      }
    });
  }

  if (gridList) {
    gridList.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.card-delete-btn');
      if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const itemId = deleteBtn.getAttribute('data-id');
        const itemType = deleteBtn.getAttribute('data-type');
        const itemTitle = deleteBtn.getAttribute('data-title') || '';
        openConfirmDeleteModal({ itemId, itemType, itemTitle });
      }
    });
  }

  overlay.addEventListener('click', () => {
    if (contCreate) contCreate.classList.remove('open');
    closeConfirmDeleteModal();
    overlay.classList.remove('visible');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalConfirmDelete && modalConfirmDelete.classList.contains('open')) {
        closeConfirmDeleteModal();
      } else if (contCreate && contCreate.classList.contains('open')) {
        contCreate.classList.remove('open');
        overlay.classList.remove('visible');
      }
    }
  });

  if (playlistsSelect) {
    ['mousedown', 'click'].forEach(evt => playlistsSelect.addEventListener(evt, e => e.stopPropagation()));
    playlistsSelect.addEventListener("change", async () => {
      const playlistId = playlistsSelect.value;
      if (!playlistId) return;
      
      const user = auth.currentUser;
      if (!user) return;
      
      gridList.innerHTML = '';
      currentItems = [];
      await loadPlaylistItems(user, playlistId);
    });
  }

  document.addEventListener('click', (e) => {
    if (contCreate && e.target === contCreate) {
      contCreate.classList.toggle('open');
      if (contCreate.classList.contains('open')) overlay.classList.add('visible');
      else overlay.classList.remove('visible');
      return;
    }

    if (contCreate && btn && !e.target.closest('.createPlaylist') && !e.target.closest('.addBtn')) {
      contCreate.classList.remove('open');
      if (!modalConfirmDelete || !modalConfirmDelete.classList.contains('open')) {
        overlay.classList.remove('visible');
      }
    }
  });

  sortSelect.addEventListener('change', () => {
    if (currentItems.length > 0) {
      displaySortedItems();
    }
  });

  // user button & popup
  initUserAccountPopup();

  // cache caso o user saia para a movie-list
  const listLink = document.querySelector('.base-list');
  if (listLink) {
    listLink.addEventListener('click', function(){
      localStorage.clear();
      const Sort = 'popularity.desc&vote_count.gte=200';

      localStorage.setItem('CurrentURL', discover_movies + '&sort_by=' + Sort);      
      localStorage.setItem('id', movieID);
      localStorage.setItem('genreIndex', '1');
    });
  }
});

async function loadUserPlaylists(user) {
  try {
    const token = await user.getIdToken();
    
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "playlists" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "userId" },
                op: "EQUAL",
                value: { stringValue: user.uid }
              }
            },
            orderBy: [{
              field: { fieldPath: "createdAt" },
              direction: "DESCENDING"
            }]
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar playlists");
    }

    const result = await response.json();
    const playlists = result
      .filter(doc => doc.document)
      .map(doc => ({
        id: doc.document.name.split("/").pop(),
        title: doc.document.fields.title.stringValue
      }));

    playlistsSelect.innerHTML = '';
    if (playlists.length === 0) {
      renderNoPlaylistsState();
      return [];
    }

    playlists.forEach(({ id, title }) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = title;
      playlistsSelect.appendChild(option);
    });

    return playlists;
    
  } catch (error) {
    console.error("Erro ao carregar playlists:", error);
    return [];
  }
}

async function createNewPlaylist(user, title) {
  try {
    const token = await user.getIdToken();
    
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/playlists`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: {
            title: { stringValue: title },
            userId: { stringValue: user.uid },
            createdAt: { timestampValue: new Date().toISOString() }
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao criar playlist");
    }

    const createdDoc = await response.json();
    const newId = createdDoc.name ? createdDoc.name.split("/").pop() : null;

    await loadUserPlaylists(user);
    if (newId && playlistsSelect) {
      playlistsSelect.value = newId;
      const event = new Event('change');
      playlistsSelect.dispatchEvent(event);
    }
    console.log("Playlist criada com sucesso");
    return true;
  } catch (error) {
    console.error("Erro ao criar playlist:", error);
    alert("Error creating playlist. Please try again.");
    return false;
  }
}

async function loadPlaylistItems(user, playlistId) {
  try {
    const token = await user.getIdToken();
    
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/playlists/${playlistId}/items`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar items da playlist");
    }

    const result = await response.json();
    const items = result.documents?.map(doc => ({
      id: doc.fields.id.stringValue,
      type: doc.fields.type.stringValue
    })) ?? [];

    currentItems = [];
    for (const item of items) {
      const itemData = await loadSingleItem(item);
      if (itemData) {
        currentItems.push(itemData);
      }
    }

    if (currentItems.length === 0) {
      renderEmptyPlaylistState();
    } else {
      displaySortedItems();
    }
    
  } catch (error) {
    console.error("Erro ao carregar items da playlist:", error);
  }
}

async function loadSingleItem(item) {
  try {
    const { id, type } = item;
    
    const url = type === "movieId" 
      ? `${base_url}/movie/${id}`
      : `${base_url}/tv/${id}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.poster_path) {
      return null;
    }

    return {
      id: data.id,
      type: type,
      title: data.title || data.name,
      year: (data.release_date || data.first_air_date || '').slice(0, 4),
      rating: data.vote_average || 0,
      popularity: data.popularity || 0,
      releaseDate: data.release_date || data.first_air_date || '',
      posterPath: data.poster_path
    };
    
  } catch (error) {
    console.error(`Erro ao carregar item ${item.id}:`, error);
    return null;
  }
}

function displaySortedItems() {
  const sortedItems = [...currentItems];
  const sortValue = sortSelect.value;

  if (sortValue === 'popularity.desc') {
    sortedItems.sort((a, b) => b.popularity - a.popularity);
    
  } else if (sortValue === 'vote_average.desc') {
    sortedItems.sort((a, b) => b.rating - a.rating);
    
  } else if (sortValue === 'primary_release_date.desc') {
    sortedItems.sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return dateB - dateA;
    });
  }

  gridList.innerHTML = "";
  sortedItems.forEach(item => {
    createMovieCard(item);
  });
}

function createMovieCard(item) {
  const contentType = item.type === "movieId" ? movieID : serieID;
  const rate = item.rating.toFixed(1);
  const safeTitle = (item.title || '').replace(/"/g, '&quot;');

  const cardHTML = `
    <div class="movie-card relativeGroup">
      <a href="../detail/detail.html?${contentType}=${item.id}" class="card-btn">
        <figure class="poster-box card-banner">
          <img src="${ImageBaseURL}${item.posterPath}" class="img-cover" alt="${safeTitle}">
        </figure>
        <div class="card-wrapper">
          <h4 class="title">${item.title}</h4>
          <div class="meta-list">
            <div class="meta-item">
              <span class="span">${rate}</span>
              <img src="../../assets/images/star.png" width="20" height="20">
            </div>
            <div class="card-badge">${item.year}</div>
          </div>
        </div>
      </a>

      <button class="card-delete-btn" data-id="${item.id}" data-type="${contentType}" data-title="${safeTitle}" aria-label="Remove ${safeTitle} from playlist" title="Remove from playlist">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>`;

  gridList.insertAdjacentHTML('beforeend', cardHTML);
}

async function deleteItemFromPlaylist(itemId, itemType) {
  const user = auth.currentUser;
  if (!user) {
    alert("Not authenticated");
    return;
  }

  try {
    const token = await user.getIdToken();
    const playlistId = playlistsSelect.value;

    const itemsResponse = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/playlists/${playlistId}/items`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!itemsResponse.ok) {
      throw new Error("Erro ao buscar itens");
    }

    const itemsResult = await itemsResponse.json();

    const targetDocument = itemsResult.documents?.find(doc => {
      const docId = doc.fields.id?.stringValue;
      const docType = doc.fields.type?.stringValue;
      return docId === itemId && docType === itemType;
    });

    if (!targetDocument) {
      alert("Item not found in playlist");
      return;
    }

    const deleteResponse = await fetch(
      `https://firestore.googleapis.com/v1/${targetDocument.name}`,
      {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!deleteResponse.ok) {
      throw new Error("Erro ao eliminar item");
    }
    
    await loadPlaylistItems(user, playlistId);
    
  } catch (error) {
    console.error("Erro ao eliminar item:", error);
    alert("Error removing item: " + error.message);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchBtn = document.getElementById('search-btn');
  const searchField = document.getElementById('search-bar');
  
  const redirect = () => {
    const q = searchField?.value.trim();
    if (!q) return;
    window.location.href = `../search/search.html?search=${encodeURIComponent(q)}`;
  };
  
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      // In mobile viewport (<= 768px), first click opens expandable search bar
      if (window.innerWidth <= 768 && !searchBox?.classList.contains('active')) {
        e.preventDefault();
        searchBox?.classList.add('active');
        searchField?.focus();
        return;
      }
      redirect();
    });
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', () => {
      searchBox?.classList.remove('active');
      if (searchField) searchField.value = '';
    });
  }

  if (searchField) {
    searchField.addEventListener('keypress', e => {
      if (e.key === 'Enter') redirect();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchBox?.classList.contains('active')) {
      searchBox.classList.remove('active');
    }
  });
});

function renderAuthRequiredState() {
  const libraryContainer = document.querySelector(".library-container");
  if (libraryContainer) libraryContainer.classList.add('auth-state-active');
  if (!gridList) return;
  gridList.innerHTML = `
    <div class="library-empty-state library-prompt">
      <div class="empty-state-icon">
        <i class="bi bi-collection-play"></i>
      </div>
      <h2 class="empty-state-title">Your Personal Library</h2>
      <p class="empty-state-text">
        Log in to create custom playlists, organize your favorite movies and TV series, and access your collection anywhere.
      </p>
      <div class="empty-state-actions">
        <a href="../auth/login.html" class="empty-state-btn">Log In</a>
        <p class="auth-switch">Don't have an account? <a href="../auth/create.html" class="auth-link">Sign Up</a></p>
      </div>
    </div>
  `;
}

function renderNoPlaylistsState() {
  if (!gridList) return;
  gridList.innerHTML = `
    <div class="library-empty-state library-prompt">
      <div class="empty-state-icon">
        <i class="bi bi-folder-plus"></i>
      </div>
      <h2 class="empty-state-title">No playlists yet</h2>
      <p class="empty-state-text">
        You haven't created any playlists yet. Click "New Playlist" to start organizing your favorites.
      </p>
      <div class="empty-state-actions">
        <button type="button" class="empty-state-btn" id="btnEmptyCreate">New Playlist</button>
        <a href="../explore/movie-list.html" class="empty-state-btn btn-secondary">Explore Catalog</a>
      </div>
    </div>
  `;

  const btnEmptyCreate = document.getElementById('btnEmptyCreate');
  const contCreate = document.querySelector(".createPlaylist");
  const overlay = document.querySelector('.overlay');
  const inputField = document.querySelector(".createPlaylist input");
  if (btnEmptyCreate && contCreate && overlay) {
    btnEmptyCreate.addEventListener('click', () => {
      contCreate.classList.add('open');
      overlay.classList.add('visible');
      if (inputField) inputField.focus();
    });
  }
}

function renderEmptyPlaylistState() {
  if (!gridList) return;
  gridList.innerHTML = `
    <div class="library-empty-state library-prompt">
      <div class="empty-state-icon">
        <i class="bi bi-film"></i>
      </div>
      <h2 class="empty-state-title">This playlist is empty</h2>
      <p class="empty-state-text">
        No movies or TV shows added to this playlist yet. Explore the catalog and click "Add to Playlist" on any title.
      </p>
      <div class="empty-state-actions">
        <a href="../explore/movie-list.html" class="empty-state-btn">Explore Titles</a>
      </div>
    </div>
  `;
}

