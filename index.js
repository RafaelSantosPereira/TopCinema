// Banner dinamicamente
import {
  ImageBaseURL,
  base_url,
  discover_movies,
  discover_series,
  topRatedMovies,
  topRatedSeries,
  searchMovie,
  searchSerie,
  trendingMovies,
  trendingSeries,
  movieID,
  serieID,
  trending
} from './shared/api.js';
import { initUserAccountPopup } from './shared/firebase.js';
import { initI18n, applyI18n } from './shared/i18n.js';
import { getHeroBannerSkeleton, getMovieCardSkeletons } from './shared/skeletons.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initUserAccountPopup('./pages/auth');

  function BannerContent(url) {
    const slider = document.querySelector('.banner-slider');
    if (slider) {
      slider.innerHTML = getHeroBannerSkeleton();
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!data.results.length) return;
        const slider = document.querySelector('.banner-slider');
        const control = document.querySelector('.control-inner');
        const dotsContainer = document.getElementById('bannerDots');
        if (!slider || !control) return;

        slider.innerHTML = '';
        control.innerHTML = '';
        if (dotsContainer) dotsContainer.innerHTML = '';

        let currentIndex = 0;
        const totalSlides = data.results.length;
        const bannerContainer = document.querySelector('.banner');
        let autoTransitionTimeout = null;

        function clearAutoTransition() {
          if (autoTransitionTimeout) {
            clearTimeout(autoTransitionTimeout);
            autoTransitionTimeout = null;
          }
          if (bannerContainer) {
            bannerContainer.classList.remove('is-auto');
          }
        }

        function goToSlide(i, isAuto = false) {
          if (i < 0) i = totalSlides - 1;
          if (i >= totalSlides) i = 0;
          currentIndex = i;

          if (bannerContainer) {
            if (autoTransitionTimeout) {
              clearTimeout(autoTransitionTimeout);
              autoTransitionTimeout = null;
            }
            if (isAuto) {
              bannerContainer.classList.add('is-auto');
              void bannerContainer.offsetHeight;
              autoTransitionTimeout = setTimeout(() => {
                bannerContainer.classList.remove('is-auto');
                autoTransitionTimeout = null;
              }, 1300);
            } else {
              bannerContainer.classList.remove('is-auto');
              void bannerContainer.offsetHeight;
            }
          }

          const activeSlide = slider.querySelector('.slider-item.active');
          if (activeSlide) activeSlide.classList.remove('active');
          if (slider.children[currentIndex]) {
            slider.children[currentIndex].classList.add('active');
          }

          const activeControl = control.querySelector('.active');
          if (activeControl) activeControl.classList.remove('active');
          if (control.children[currentIndex]) {
            const currentThumb = control.children[currentIndex];
            currentThumb.classList.add('active');

            // Scroll thumbnail into view smoothly if outside the visible strip
            if (currentIndex === 0) {
              control.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              const itemLeft = currentThumb.offsetLeft;
              const itemWidth = currentThumb.offsetWidth;
              const containerWidth = control.clientWidth;
              const currentScroll = control.scrollLeft;

              if (itemLeft < currentScroll + 20 || itemLeft + itemWidth > currentScroll + containerWidth - 20) {
                control.scrollTo({
                  left: itemLeft - (containerWidth / 2) + (itemWidth / 2),
                  behavior: 'smooth'
                });
              }
            }
          }

          if (dotsContainer) {
            const activeDot = dotsContainer.querySelector('.dot.active');
            if (activeDot) activeDot.classList.remove('active');
            if (dotsContainer.children[currentIndex]) {
              dotsContainer.children[currentIndex].classList.add('active');
            }
          }
        }

        // Autoplay controller for hero banner
        let autoplayTimer = null;
        const AUTOPLAY_INTERVAL = 8000;

        function startAutoplay() {
          stopAutoplay();
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
          if (totalSlides <= 1) return;
          autoplayTimer = setInterval(() => {
            goToSlide(currentIndex + 1, true);
          }, AUTOPLAY_INTERVAL);
        }

        function stopAutoplay() {
          if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
          }
        }

        function resetAutoplay() {
          clearAutoTransition();
          stopAutoplay();
          startAutoplay();
        }

        data.results.forEach((item, idx) => {
          const backdrop = "https://image.tmdb.org/t/p/original/" + item.backdrop_path;
          const slide = document.createElement('div');
          slide.className = `slider-item${idx === 0 ? ' active' : ''}`;
          slide.innerHTML = `
            <img src="${backdrop}" class="img-cover bannerRatio" loading="eager" alt="${item.title || item.name}">
            <div class="banner-content">
              <h2 class="heading">${item.title || item.name}</h2>
              <div class="meta-list">
                <div class="meta-item">${(item.release_date || item.first_air_date || '').slice(0, 4)}</div>
                <div class="meta-item card-badge">${item.vote_average.toFixed(1)}</div>
              </div>
              <p class="banner-text">${item.overview}</p>
              <a href="./pages/detail/detail.html?${item.media_type === 'movie' ? 'movieId' : 'serieId'}=${item.id}" class="btn">
                <img src="./assets/images/play_circle.png" width="24" height="24" alt="Play">
                <span class="span" data-i18n="watch_now">Watch now</span>
              </a>
            </div>`;
          slider.appendChild(slide);

          // Desktop Thumbnail Button
          const btn = document.createElement('button');
          btn.className = `poster-box slider-item${idx === 0 ? ' active' : ''}`;
          btn.dataset.index = idx;
          btn.innerHTML = `<img src="${ImageBaseURL}${item.poster_path}" class="img-cover" loading="lazy" draggable="false" alt="${item.title || item.name}">`;
          btn.addEventListener('click', () => {
            goToSlide(idx, false);
            resetAutoplay();
          });
          control.appendChild(btn);

          // Mobile Pagination Dot
          if (dotsContainer) {
            const dot = document.createElement('button');
            dot.className = `dot${idx === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            dot.addEventListener('click', () => {
              goToSlide(idx, false);
              resetAutoplay();
            });
            dotsContainer.appendChild(dot);
          }
        });

        applyI18n();
        startAutoplay();

        // Pause autoplay on mouse enter / resume on mouse leave
        if (bannerContainer) {
          bannerContainer.addEventListener('mouseenter', stopAutoplay);
          bannerContainer.addEventListener('mouseleave', startAutoplay);
        }

        // Pause autoplay while tab is inactive to save resources
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            stopAutoplay();
          } else {
            startAutoplay();
          }
        });

        // Desktop Drag for Banner Thumbnail Control
        let isDragging = false, startX, scrollLeft;
        const dragStart = (e) => {
          isDragging = true;
          stopAutoplay();
          startX = e.pageX - control.offsetLeft;
          scrollLeft = control.scrollLeft;
        };
        const dragMove = (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - control.offsetLeft;
          const walk = (x - startX) * 1.3;
          control.scrollLeft = scrollLeft - walk;
        };
        const dragEnd = () => {
          if (isDragging) {
            isDragging = false;
            startAutoplay();
          }
        };
        control.addEventListener('mousedown', dragStart);
        control.addEventListener('mousemove', dragMove);
        control.addEventListener('mouseup', dragEnd);
        control.addEventListener('mouseleave', dragEnd);

        // Mobile Touch Swipe for Banner Slider (< 768px)
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        slider.addEventListener('touchstart', (e) => {
          if (window.innerWidth > 768) return;
          stopAutoplay();
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
          if (window.innerWidth > 768) return;
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
            if (diffX < 0) {
              goToSlide(currentIndex + 1, false);
            } else {
              goToSlide(currentIndex - 1, false);
            }
          }
          resetAutoplay();
        }, { passive: true });
      });
  }

  function ScrollSlider(listId, innerId) {
    const container = document.querySelector(`#${listId} .slider-list`);
    const inner = document.getElementById(innerId);
    if (!container || !inner) return;

    const left = container.querySelector('.bi-chevron-left');
    const right = container.querySelector('.bi-chevron-right');
    const width = inner.clientWidth;

    if (left && right) {
      left.onclick = () => inner.scrollBy({ left: -width / 3, behavior: 'smooth' });
      right.onclick = () => inner.scrollBy({ left: width / 3, behavior: 'smooth' });
    }
  }

  // Banner
  BannerContent(trending);

  // Sliders com conteúdo
  getContent(trendingMovies,    'slider-trending-movies', movieID);
  getContent(trendingSeries,    'slider-trending-series', serieID);
  getContent(discover_movies,   'slider-popular-movies', movieID);
  getContent(discover_series,   'slider-popular-series', serieID);
  getContent(topRatedMovies,    'slider-toprated-movies', movieID);
  getContent(topRatedSeries,    'slider-toprated-series', serieID);

  // Scroll sliders buttons (desktop)
  ScrollSlider('trending-movies',    'slider-trending-movies');
  ScrollSlider('trending-series',    'slider-trending-series');
  ScrollSlider('popular-movies',     'slider-popular-movies');
  ScrollSlider('popular-series',     'slider-popular-series');
  ScrollSlider('toprated-movies',    'slider-toprated-movies');
  ScrollSlider('toprated-series',    'slider-toprated-series');

  // Search handling
  const searchBox = document.getElementById('searchBox');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchBtn = document.getElementById('search-btn');
  const searchField = document.getElementById('search-bar');

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
    searchField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        redirect();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchBox?.classList.contains('active')) {
      searchBox.classList.remove('active');
    }
  });

  const listLink = document.querySelector('.base-list');
  if (listLink) {
    listLink.addEventListener('click', function() {
      ['CurrentURL', 'ContentOption', 'activeGenres', 'genreIndex', 'SortOption', 'scrollPosition', 'index', 'id'].forEach(key => {
        localStorage.removeItem(key);
      });
      const Sort = 'popularity.desc&vote_count.gte=200';
      localStorage.setItem('CurrentURL', discover_movies + '&sort_by=' + Sort);
      localStorage.setItem('id', movieID);
      localStorage.setItem('genreIndex', '1');
    });
  }
});

// getContent para sliders
export function getContent(url, targetId, ID) {
  const container = document.getElementById(targetId);
  if (container) {
    container.innerHTML = getMovieCardSkeletons(8);
  }
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!container || !data.results.length) return;
      container.innerHTML = '';
      data.results.forEach(item => {
        if (!item.poster_path) return;
        const title = item.title || item.name;
        const year = (item.release_date || item.first_air_date || '').slice(0, 4);
        const rate = item.vote_average.toFixed(1);
        container.innerHTML += `
          <div class="movie-card">
            <a href="./pages/detail/detail.html?${ID}=${item.id}" class="card-btn">
              <figure class="poster-box card-banner">
                <img src="${ImageBaseURL}${item.poster_path}" class="img-cover" alt="${title}" loading="lazy">
              </figure>
              <div class="card-wrapper">
                <h4 class="title">${title}</h4>
                <div class="meta-list">
                  <div class="meta-item"><span class="span">${rate}</span><img src="./assets/images/star.png" width="20" height="20" alt="Rating"></div>
                  <div class="card-badge">${year}</div>
                </div>
              </div>
            </a>
          </div>`;
      });
    });
}

// redirecionar com base na pesquisa
export function redirect() {
  const field = document.getElementById('search-bar') || document.querySelector('.search-field');
  const q = field?.value.trim();
  if (!q) return;
  window.location.href = `./pages/search/search.html?search=${encodeURIComponent(q)}`;
}
