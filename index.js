import {
  ImageBaseURL,
  discover_movies,
  discover_series,
  topRatedMovies,
  topRatedSeries,
  trendingMovies,
  trendingSeries,
  movieID,
  serieID,
  trending,
  escapeHtml
} from './shared/api.js';
import { initUserAccountPopup } from './shared/firebase.js';
import { initI18n, applyI18n } from './shared/i18n.js';
import { getHeroBannerSkeleton, getMovieCardSkeletons } from './shared/skeletons.js';

/**
 * Configuration of home page movie & series carousel sections.
 */
const SECTIONS = [
  { listId: 'trending-movies', sliderId: 'slider-trending-movies', url: trendingMovies, mediaId: movieID },
  { listId: 'trending-series', sliderId: 'slider-trending-series', url: trendingSeries, mediaId: serieID },
  { listId: 'popular-movies',  sliderId: 'slider-popular-movies',  url: discover_movies, mediaId: movieID },
  { listId: 'popular-series',  sliderId: 'slider-popular-series',  url: discover_series, mediaId: serieID },
  { listId: 'toprated-movies', sliderId: 'slider-toprated-movies', url: topRatedMovies,    mediaId: movieID },
  { listId: 'toprated-series', sliderId: 'slider-toprated-series', url: topRatedSeries,    mediaId: serieID }
];

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initUserAccountPopup('./pages/auth');

  // Load Hero Banner
  renderHeroBanner(trending);

  // Load and setup horizontal content sliders
  SECTIONS.forEach(({ listId, sliderId, url, mediaId }) => {
    fetchSliderContent(url, sliderId, mediaId);
    setupScrollSlider(listId, sliderId);
  });

  // Setup Search Bar
  setupSearch();
});

/**
 * Fetches and renders the Hero Banner slider with autoplay and manual controls.
 * @param {string} url - TMDB endpoint URL
 */
async function renderHeroBanner(url) {
  const slider = document.querySelector('.banner-slider');
  const control = document.querySelector('.control-inner');
  const dotsContainer = document.getElementById('bannerDots');
  const bannerContainer = document.querySelector('.banner');

  if (slider) {
    slider.innerHTML = getHeroBannerSkeleton();
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.results?.length || !slider || !control) return;

    slider.innerHTML = '';
    control.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';

    let currentIndex = 0;
    const totalSlides = data.results.length;
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
          void bannerContainer.offsetHeight; // Force reflow so transition duration applies immediately
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
      const title = escapeHtml(item.title || item.name || '');
      const overview = escapeHtml(item.overview || '');
      const year = (item.release_date || item.first_air_date || '').slice(0, 4);
      const rating = (item.vote_average ?? 0).toFixed(1);
      const backdropPath = item.backdrop_path 
        ? "https://image.tmdb.org/t/p/original/" + item.backdrop_path 
        : (item.poster_path ? ImageBaseURL + item.poster_path : '');
      const posterPath = item.poster_path ? ImageBaseURL + item.poster_path : '';
      const detailLink = `./pages/detail/detail.html?${item.media_type === 'movie' ? 'movieId' : 'serieId'}=${item.id}`;

      // Slide Item
      const slide = document.createElement('div');
      slide.className = `slider-item${idx === 0 ? ' active' : ''}`;
      slide.innerHTML = `
        ${backdropPath ? `<img src="${backdropPath}" class="img-cover bannerRatio" loading="${idx === 0 ? 'eager' : 'lazy'}" alt="${title}">` : ''}
        <div class="banner-content">
          <h2 class="heading">${title}</h2>
          <div class="meta-list">
            <div class="meta-item">${year}</div>
            <div class="meta-item card-badge">${rating}</div>
          </div>
          <p class="banner-text">${overview}</p>
          <a href="${detailLink}" class="btn">
            <img src="./assets/images/play_circle.png" width="24" height="24" alt="" aria-hidden="true">
            <span class="span" data-i18n="watch_now">Watch now</span>
          </a>
        </div>`;
      slider.appendChild(slide);

      // Desktop Thumbnail Button
      if (posterPath) {
        const btn = document.createElement('button');
        btn.className = `poster-box slider-item${idx === 0 ? ' active' : ''}`;
        btn.dataset.index = idx;
        btn.setAttribute('aria-label', title);
        btn.innerHTML = `<img src="${posterPath}" class="img-cover" loading="lazy" draggable="false" alt="${title}">`;
        btn.addEventListener('click', () => {
          goToSlide(idx, false);
          resetAutoplay();
        });
        control.appendChild(btn);
      }

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
    let isDragging = false, startX = 0, scrollLeftVal = 0;
    const dragStart = (e) => {
      isDragging = true;
      stopAutoplay();
      startX = e.pageX - control.offsetLeft;
      scrollLeftVal = control.scrollLeft;
    };
    const dragMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - control.offsetLeft;
      const walk = (x - startX) * 1.3;
      control.scrollLeft = scrollLeftVal - walk;
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

    slider.addEventListener('touchstart', (e) => {
      if (window.innerWidth > 768) return;
      stopAutoplay();
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      if (window.innerWidth > 768) return;
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
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

  } catch (error) {
    console.error('Failed to load hero banner:', error);
    if (slider) {
      slider.innerHTML = '<div class="banner-error"><p data-i18n="network_error">Network error. Please check your connection and try again.</p></div>';
      applyI18n();
    }
  }
}

/**
 * Fetches content from TMDB and renders movie/series cards in a horizontal slider.
 * Single-pass DOM update for maximum performance.
 * @param {string} url - TMDB endpoint URL
 * @param {string} targetId - Container DOM element ID
 * @param {string} mediaParam - Query param identifier ('movieId' or 'serieId')
 */
async function fetchSliderContent(url, targetId, mediaParam) {
  const container = document.getElementById(targetId);
  if (container) {
    container.innerHTML = getMovieCardSkeletons(8);
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!container || !data.results?.length) return;

    const cardsHtml = data.results
      .filter(item => Boolean(item.poster_path))
      .map(item => {
        const title = escapeHtml(item.title || item.name || '');
        const year = (item.release_date || item.first_air_date || '').slice(0, 4);
        const rate = (item.vote_average ?? 0).toFixed(1);

        return `
          <div class="movie-card">
            <a href="./pages/detail/detail.html?${mediaParam}=${item.id}" class="card-btn">
              <figure class="poster-box card-banner">
                <img src="${ImageBaseURL}${item.poster_path}" class="img-cover" alt="${title}" loading="lazy">
              </figure>
              <div class="card-wrapper">
                <h4 class="title">${title}</h4>
                <div class="meta-list">
                  <div class="meta-item"><span class="span">${rate}</span><img src="./assets/images/star.png" width="20" height="20" alt="" aria-hidden="true"></div>
                  <div class="card-badge">${year}</div>
                </div>
              </div>
            </a>
          </div>`;
      })
      .join('');

    container.innerHTML = cardsHtml;
  } catch (error) {
    console.error(`Failed to load slider content (${targetId}):`, error);
    if (container) {
      container.innerHTML = '<p class="slider-error" data-i18n="network_error">Network error. Please check your connection and try again.</p>';
      applyI18n();
    }
  }
}

/**
 * Sets up horizontal scroll buttons for carousel sliders with full keyboard accessibility.
 * @param {string} listId - Parent list section element ID
 * @param {string} innerId - Inner scrollable container element ID
 */
function setupScrollSlider(listId, innerId) {
  const container = document.querySelector(`#${listId} .slider-list`);
  const inner = document.getElementById(innerId);
  if (!container || !inner) return;

  const left = container.querySelector('.bi-chevron-left');
  const right = container.querySelector('.bi-chevron-right');

  const scrollStep = () => Math.max(inner.clientWidth / 3, 200);

  const setupButton = (btn, direction) => {
    if (!btn) return;
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-label', direction === 'left' ? 'Scroll left' : 'Scroll right');

    const handleScroll = () => {
      inner.scrollBy({
        left: direction === 'left' ? -scrollStep() : scrollStep(),
        behavior: 'smooth'
      });
    };

    btn.addEventListener('click', handleScroll);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleScroll();
      }
    });
  };

  setupButton(left, 'left');
  setupButton(right, 'right');
}

/**
 * Sets up search bar interactions (expandable on mobile, Enter key, escape key, redirect).
 */
function setupSearch() {
  const searchBox = document.getElementById('searchBox');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchBtn = document.getElementById('search-btn');
  const searchField = document.getElementById('search-bar');

  const redirectToSearch = () => {
    const q = searchField?.value.trim();
    if (!q) return;
    window.location.href = `./pages/search/search.html?search=${encodeURIComponent(q)}`;
  };

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !searchBox?.classList.contains('active')) {
        e.preventDefault();
        searchBox?.classList.add('active');
        searchField?.focus();
        return;
      }
      redirectToSearch();
    });
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', () => {
      searchBox?.classList.remove('active');
      if (searchField) searchField.value = '';
    });
  }

  if (searchField) {
    searchField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        redirectToSearch();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchBox?.classList.contains('active')) {
      searchBox.classList.remove('active');
    }
  });
}

// Backwards compatibility exports
export { fetchSliderContent as getContent, setupSearch as redirect };
