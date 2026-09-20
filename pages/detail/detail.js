const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');
const serieId = urlParams.get('serieId');
const strimgMovie = "/movie?";
const strimgSerie = "/tv?";
import { serieID, movieID, base_url } from "../../shared/api.js";
const ImageBaseURL = 'https://image.tmdb.org/t/p/w780';
const backdropBaseUrl = 'https://image.tmdb.org/t/p/w1280';
export const movie_search = `${base_url}/movie/${movieId}`;
const credits_search = `${base_url}/movie/${movieId}/credits?language=en-US`;
const video_search = `${base_url}/movie/${movieId}/videos?language=en-US`;
export const serie_search = `${base_url}/tv/${serieId}`;
const serie_video_search = `${base_url}/tv/${serieId}/videos?language=en-US`;
const serie_credits = `${base_url}/tv/${serieId}/credits?language=en-US`;
const getMovieProviders = `${base_url}/movie/${movieId}/watch/providers?language=en-US`;
const getSeriesProviders = `${base_url}/tv/${serieId}/watch/providers?language=en-US`;

import { auth, firebaseConfig } from "../../shared/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
const projectId = firebaseConfig.projectId;

const movies_div = document.querySelector('.slider-inner');
const slider = document.querySelector('.slider-list');
const list = document.querySelector('.movie-list');
const contCreate = document.querySelector(".createPlaylist");
const authPromptModal = document.getElementById("authPromptModal");
const btn = document.querySelector(".addBtn");
const btnAdd = document.getElementById("btnAddTo");
let currentIdType = "";
let currentId = "";

console.log('ID do Filme:', movieId);
const content_div = document.getElementById('container');
if(movieId){
  getContent(movie_search, slider, movies_div, movieID, strimgMovie);
  getCredits(credits_search);
  getvideos(video_search);
  currentIdType = movieID;
  currentId = movieId;
}
else if(serieId){
  getContent(serie_search, slider, movies_div, serieID, strimgSerie);
  getvideos(serie_video_search);
  getCredits(serie_credits);
  currentIdType = serieID;
  currentId = serieId;
}

function getContent(url, Slider, parentElement, ID, stringQuery) {
    fetch(url).then(res => res.json()).then(data => {
      showMovies(data);
      const genres_id = [];
      data.genres.forEach(genre => {genres_id.push(genre.id);});
      const discoverWithGenres = `${base_url}/discover${stringQuery}language=en-US&sort_by=popularity&page=1&with_genres=${genres_id.join(',')}`;
      console.log(data);

      // Fazer fetch da URL discoverWithGenres para obter os dados dos filmes com base nos gêneros específicos
      fetch(discoverWithGenres).then(res => res.json()).then(movieData => {
          console.log(movieData); 
          movies_div.innerHTML='';
          showRecomended(movieData.results, Slider, parentElement, ID);
      });
    });
}

function getCredits(url){
    fetch(url).then(res => res.json()).then(data => {
      showCredits(data);  
      console.log(data);
    });
}

function getvideos(url) {
    fetch(url).then(res => res.json()).then(data => {
      showVideos(data);
      console.log(data);
    });
}

function showMovies(movie) {
      const { title, first_air_date, name, poster_path, vote_average, release_date, overview, genres, backdrop_path} = movie;
      
      const genres_name = [];
      movie.genres.forEach(genres => {
        genres_name.push(" " + genres.name);
      });
      const title_or_name = title || name;
      const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
      const rate = vote_average.toFixed(1);
      const duration = movie.runtime || (movie.seasons ? movie.seasons.length : 0);
      
      const movieTitleElement = document.getElementById('movie-title');
      const moviePosterElement = document.getElementById('movie-poster');
      const movieRatingElement = document.getElementById('movie-rating');
      const movieYearElement = document.getElementById('movie-year');
      const movieOverviewElement = document.getElementById('movie-overview');
      const movieBackdropImage = document.getElementById('backdrop-image');
      const movieGenresElement = document.getElementById('movie-genres');
      const DurationTimeElement = document.getElementById('duration-time');
      
      if(duration === movie.runtime){
        DurationTimeElement.textContent = `${duration}m`;
      }
      else{
        DurationTimeElement.textContent = `${duration} seasons`;
        if(duration <= 1){
          DurationTimeElement.textContent = `${duration} season`;
        }
      }

      movieTitleElement.textContent = `${title_or_name}`;
      moviePosterElement.src = ImageBaseURL + poster_path;
      movieOverviewElement.textContent = `${overview}`;
      movieYearElement.textContent = `${year}`;
      movieRatingElement.textContent = `${rate}`;
      movieBackdropImage.style.backgroundImage = `url("${backdropBaseUrl}${backdrop_path}")`;
      
      movieGenresElement.textContent = `${genres_name}`;
}

function showCredits(movie_cast){
      const { cast, crew } = movie_cast;
      
      const cast_name = [];
      let director_name;
      for(let i = 0; i < 10 && i < cast.length; i++){
        cast_name.push(" " + cast[i].name);         
      }
      
      crew.forEach(person => {
        if(person.known_for_department === "Directing"){
          director_name = person.name;
          return;
        }
      });
      const StarringElement = document.getElementById('Starring');
      const DirectorElement = document.getElementById('director');
      const directorLabelElement = document.getElementById('director-label');
      StarringElement.textContent = `${cast_name}`;
      if(!director_name){
        directorLabelElement.textContent = ``;
        DirectorElement.textContent = ``;
      }
      else{
        DirectorElement.textContent = `${director_name}`;
      }
}

function showVideos(trailers) {
      const { results } = trailers || {};
      const videoInnerElement = document.getElementById('video-inner');
      const label = document.getElementById('label-trailers');
      const videoList = document.querySelector('.video-list');

      if (!videoInnerElement) return;
      videoInnerElement.innerHTML = '';

      // Filtrar apenas vídeos válidos do YouTube
      const youtubeVideos = (results || []).filter(v => v.site === 'YouTube' && v.key);

      if (youtubeVideos.length === 0) {
        if (label) label.style.display = 'none';
        if (videoList) videoList.style.display = 'none';
        return;
      }

      if (label) label.style.display = '';
      if (videoList) videoList.style.display = '';

      // Priorizar Trailers oficiais e Teasers sobre Featurettes ou Behind the Scenes
      const priority = {
        'Trailer': 1,
        'Teaser': 2,
        'Clip': 3,
        'Featurette': 4,
        'Behind the Scenes': 5,
        'Bloopers': 6
      };

      youtubeVideos.sort((a, b) => {
        const pA = priority[a.type] || 99;
        const pB = priority[b.type] || 99;
        return pA - pB;
      });

      // Limitar a um máximo saudável (ex: 8 vídeos) para evitar sobrecarga no DOM
      const displayVideos = youtubeVideos.slice(0, 8);

      displayVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.setAttribute('role', 'button');
        videoCard.setAttribute('tabindex', '0');
        videoCard.setAttribute('aria-label', `Play ${video.name || video.type}`);

        const thumbnailUrl = `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`;

        videoCard.innerHTML = `
          <img src="${thumbnailUrl}" class="video-thumbnail" alt="${video.name || video.type}" loading="lazy">
          <div class="video-play-btn" aria-hidden="true">
            <i class="bi bi-play-fill"></i>
          </div>
          <div class="video-info-overlay">
            <span class="video-type-badge">${video.type || 'Video'}</span>
            <span class="video-title">${video.name || ''}</span>
          </div>
        `;

        const playVideo = () => {
          if (videoCard.classList.contains('playing')) return;
          videoCard.classList.add('playing');
          videoCard.removeAttribute('role');
          videoCard.removeAttribute('tabindex');
          videoCard.innerHTML = `
            <iframe 
              frameborder="0" 
              allowfullscreen 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              src="https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0">
            </iframe>
          `;
        };

        videoCard.addEventListener('click', playVideo);
        videoCard.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playVideo();
          }
        });

        videoInnerElement.appendChild(videoCard);
      });
}

function showRecomended(data, Slider, parentElement, ID){
      parentElement.innerHTML = '';
      data.forEach(movie => {
        const { name, title, first_air_date, poster_path, vote_average, release_date, id } = movie;
        if (!poster_path) return;
        const title_or_name = title || name;
        const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
        const rate = vote_average.toFixed(1);

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');   
        movieEl.innerHTML = `
          <a href="./detail.html?${ID}=${id}" class="card-btn"> 
            <figure class="poster-box card-banner">
              <img src="${ImageBaseURL + poster_path}" class="img-cover" alt="${title_or_name}" loading="lazy">
            </figure>
            <div class="card-wrapper">
              <h4 class="title">${title_or_name}</h4>
              <div class="meta-list">
                <div class="meta-item">
                  <span class="span">${rate}</span>
                  <img src="../../assets/images/star.png" width="20px" height="20px" loading="lazy" alt="rating">             
                </div>
                <div class="card-badge">${year}</div>           
              </div>
            </div>
          </a>
        `;
        parentElement.appendChild(movieEl);
      });

      const arrowLeft = Slider.querySelector(".bi-chevron-left");
      const arrowRight = Slider.querySelector(".bi-chevron-right");
      if (arrowLeft && arrowRight) {
        arrowLeft.onclick = () => {
          parentElement.scrollBy({ left: -parentElement.clientWidth / 3, behavior: 'smooth' });
        };
        arrowRight.onclick = () => {
          parentElement.scrollBy({ left: parentElement.clientWidth / 3, behavior: 'smooth' });
        };
      }
}

document.addEventListener('DOMContentLoaded', () => {
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

      function closeModals() {
        if (contCreate) contCreate.classList.remove('open');
        if (authPromptModal) authPromptModal.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
      }

      overlay.addEventListener('click', closeModals);

      const btnCloseModal = document.getElementById('btnCloseModal');
      if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeModals);
      }

      const btnCloseAuthModal = document.getElementById('btnCloseAuthModal');
      if (btnCloseAuthModal) {
        btnCloseAuthModal.addEventListener('click', closeModals);
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModals();
      });

      let currentUser = true;

      onAuthStateChanged(auth, (user) => {
        currentUser = user;
        if (user) {
          if (contCreate && contCreate.classList.contains('hidden')) contCreate.classList.remove('hidden');
          loadUserPlaylists(user);
        }
      });

      if (btn) {
        btn.addEventListener('click', () => {
          if (currentUser) {
            if (authPromptModal) authPromptModal.classList.remove('open');
            if (contCreate) {
              contCreate.classList.toggle('open');
              if (contCreate.classList.contains('open')) overlay.classList.add('visible');
              else overlay.classList.remove('visible');
            }
          } else {
            if (contCreate) contCreate.classList.remove('open');
            if (authPromptModal) {
              if (authPromptModal.classList.contains('hidden')) authPromptModal.classList.remove('hidden');
              authPromptModal.classList.toggle('open');
              if (authPromptModal.classList.contains('open')) overlay.classList.add('visible');
              else overlay.classList.remove('visible');
            }
          }
        });
      }

      const playlistsSelectEl = document.querySelector('#playlistsSelect');
      if (playlistsSelectEl) {
        ['mousedown', 'click'].forEach(evt => playlistsSelectEl.addEventListener(evt, e => e.stopPropagation()));
      }

      const formAddToPlaylist = document.getElementById('formAddToPlaylist');
      const handleAddSubmit = async (event) => {
        event.preventDefault();
        console.log("Adicionar item com:", currentIdType, currentId);
        const success = await addNew(currentId, currentIdType);
        if (success) {
          closeModals();
        }
      };

      if (formAddToPlaylist) {
        formAddToPlaylist.addEventListener('submit', handleAddSubmit);
      } else if (btnAdd) {
        btnAdd.addEventListener("click", handleAddSubmit);
      }
});

async function addNew(contentId, contentType) {
    try {
      const selectedPlaylistId = document.getElementById("playlistsSelect").value;
      if (!selectedPlaylistId) {
        alert("Please select a playlist");
        return false;
      }

      const token = await auth.currentUser.getIdToken();
      const itemsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/playlists/${selectedPlaylistId}/items`;

      const checkItemsResponse = await fetch(itemsUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (checkItemsResponse.ok) {
        const itemsData = await checkItemsResponse.json();
        const exists = itemsData.documents?.some(doc => doc.fields?.id?.stringValue === contentId);

        if (exists) {
          alert("This item is already in the playlist!");
          return false;
        }
      } 

      const response = await fetch(itemsUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: {
            id: { stringValue: contentId },
            type: { stringValue: contentType }
          }
        })
      });

      if (!response.ok) throw new Error("Erro ao adicionar item à playlist");

      const data = await response.json();
      console.log("Item adicionado à playlist:", data);
      alert("Content added successfully!");
      return true;

    } catch (error) {
      console.error("Erro ao adicionar à playlist:", error);
      return false;
    }
}

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
          const errorText = await response.text();
          throw new Error("Erro ao buscar playlists: " + errorText);
        }
    
        const result = await response.json();
        const playlists = result
          .filter(doc => doc.document)
          .map(doc => ({
            id: doc.document.name.split("/").pop(),
            title: doc.document.fields.title.stringValue
          }));
    
        const playlistsSelect = document.querySelector("#playlistsSelect");
        if (playlistsSelect) {
          playlistsSelect.innerHTML = "";
          playlists.forEach(({ id, title }) => {
            const option = document.createElement("option");
            option.value = id;
            option.textContent = title;
            playlistsSelect.appendChild(option);
          });
        }
    
        console.log("Playlists carregadas:", playlists);
    
      } catch (error) {
        console.error("Erro ao carregar playlists:", error);
      }
}

async function getProviders(contentId, contentType, url) {
  if (contentId && contentType) {
    try {
      const response = await fetch(url);
      console.log("Response from providers API:", response);
    }
    catch (error) {
      console.error("Erro ao buscar provedores:", error);
    }
  }
}

