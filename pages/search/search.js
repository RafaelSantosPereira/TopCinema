import { searchMovie, searchSerie, movieID, serieID, discover_movies } from "../../shared/api.js";
import { initUserAccountPopup } from "../../shared/firebase.js";
import { initI18n, applyI18n } from "../../shared/i18n.js";
import { getMovieCardSkeletons } from "../../shared/skeletons.js";

const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');

document.addEventListener('DOMContentLoaded', function () {
    initI18n();
    initUserAccountPopup();
    searchContent();

    const searchBox = document.getElementById('searchBox');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById("search-bar"); 
    const searchBtn = document.getElementById("search-btn");

    if (search && searchInput) {
        searchInput.value = search;
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", function (e) {
            if (window.innerWidth <= 768 && !searchBox?.classList.contains('active')) {
                e.preventDefault();
                searchBox?.classList.add('active');
                searchInput?.focus();
                return;
            }
            const inputValue = searchInput?.value.trim();
            if (inputValue) {
                window.location.href = `./search.html?search=${encodeURIComponent(inputValue)}`;
            }
        });
    }

    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', () => {
            searchBox?.classList.remove('active');
            if (searchInput) searchInput.value = '';
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const inputValue = searchInput.value.trim();
                if (inputValue) {
                    window.location.href = `./search.html?search=${encodeURIComponent(inputValue)}`;
                }
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

function ScrollSlider(containerId, innerId) {
    const container = document.getElementById(containerId);
    const inner = document.getElementById(innerId);

    if (!container || !inner) return;

    const left = container.querySelector('.bi-chevron-left');
    const right = container.querySelector('.bi-chevron-right');

    if (!left || !right) return;

    const width = inner.clientWidth;
    left.onclick = () => inner.scrollBy({ left: -width / 3, behavior: 'smooth' });
    right.onclick = () => inner.scrollBy({ left: width / 3, behavior: 'smooth' });
}

async function searchContent() {
    if (!search) return;
    const URLsearchMovie = searchMovie + search;
    const URLsearchSerie = searchSerie + search;

    const sliderInner = document.getElementById("slider-inner");
    const sliderInner2 = document.getElementById("slider-inner2");
    const movieContainer = document.getElementById("movie-container");
    const serieContainer = document.getElementById("series-container");

    if (sliderInner) sliderInner.innerHTML = getMovieCardSkeletons(6);
    if (sliderInner2) sliderInner2.innerHTML = getMovieCardSkeletons(6);

    try {
        const [movieResults, serieResults] = await Promise.all([
            getContent(URLsearchMovie, "slider-inner", movieID),
            getContent(URLsearchSerie, "slider-inner2", serieID)
        ]);

        if (!movieResults || movieResults.length === 0) {
            if (movieContainer) movieContainer.innerHTML = "";
        } else {
            ScrollSlider("movie-container", "slider-inner");
        }

        if (!serieResults || serieResults.length === 0) {
            if (serieContainer) serieContainer.innerHTML = "";
        } else {
            ScrollSlider("series-container", "slider-inner2");
        }

        const hasMovies = movieResults && movieResults.length > 0;
        const hasSeries = serieResults && serieResults.length > 0;

        if (!hasMovies && !hasSeries) {
            const listSection = document.getElementById("list");
            if (listSection) {
                const safeSearch = (search || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
                listSection.innerHTML = `
                    <div class="search-empty-state">
                        <div class="search-empty-icon">
                            <i class="bi bi-search"></i>
                        </div>
                        <h3 class="search-empty-title" data-i18n="no_results_title">No Results Found</h3>
                        <p class="search-empty-text"><span data-i18n="no_results_text">We couldn't find any movies or TV series matching</span> "<strong>${safeSearch}</strong>".</p>
                    </div>
                `;
                applyI18n();
            }
        }

    } catch (error) {
        console.error('Error fetching content:', error);
        if (sliderInner) sliderInner.innerHTML = '';
        if (sliderInner2) sliderInner2.innerHTML = '';
    }
}

export async function getContent(url, targetId, ID) {
    const container = document.getElementById(targetId);
    if (!container) return [];

    try {
        const res = await fetch(url);
        const data = await res.json();

        container.innerHTML = '';

        if (!data.results || data.results.length === 0) return [];

        data.results.forEach(item => {
            if (!item.poster_path) return;
            const title = item.title || item.name;
            const year = (item.release_date || item.first_air_date || '').slice(0, 4);
            const rate = item.vote_average.toFixed(1);
            container.innerHTML += `
                <div class="movie-card">
                    <a href="../detail/detail.html?${ID}=${item.id}" class="card-btn">
                        <figure class="poster-box card-banner">
                            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" class="img-cover" alt="${title}">
                        </figure>
                        <div class="card-wrapper">
                            <h4 class="title">${title}</h4>
                            <div class="meta-list">
                                <div class="meta-item">
                                    <span class="span">${rate}</span>
                                    <img src="../../assets/images/star.png" width="20" height="20">
                                </div>
                                <div class="card-badge">${year}</div>
                            </div>
                        </div>
                    </a>
                </div>`;
        });

        return data.results;
    } catch (err) {
        console.error("Failed to fetch or parse data:", err);
        container.innerHTML = '';
        return [];
    }
}

