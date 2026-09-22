import { 
    ImageBaseURL,
    discover_movies,
    discover_series,
    trendingMovies,
    trendingSeries,
    movieID,
    serieID,
    escapeHtml
} from '../../shared/api.js';
import { initUserAccountPopup } from '../../shared/firebase.js';
import { initI18n, applyI18n, getTranslation } from '../../shared/i18n.js';
import { getMovieCardSkeletons, getPaginationLoader } from '../../shared/skeletons.js';

// ==========================================================================
// DOM Elements
// ==========================================================================
const container = document.querySelector(".container");
const gridList = document.querySelector(".grid-list");
const contentType = document.getElementById('type');
const sortBy = document.getElementById('sort');
const provider = document.getElementById('provider');
const customCheckbox = document.getElementById('customCheckbox');
const genreButtons = document.querySelectorAll('.genre-bt');
const searchBtn = document.querySelector(".search-btn");
const searchField = document.querySelector('.search-field');
const genreSidebar = document.querySelector('.genre-sidebar');
const genreToggleBtn = document.getElementById('genreToggleBtn');
const closeGenreBtn = document.getElementById('closeGenreBtn');
const genreOverlay = document.getElementById('genreOverlay');
const genreCountBadge = document.getElementById('genreCountBadge');
const searchBox = document.getElementById('searchBox');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const filterExtra = document.getElementById('filter-extra');
const listBox = document.querySelector('.list-box');
const filtersContainer = document.querySelector('.filters');

// ==========================================================================
// State & Pagination
// ==========================================================================
let currentPage = 1;
let isLoading = false;
let hasMore = true;

// Clean up legacy explorer keys from localStorage to prevent old session conflicts
['CurrentURL', 'ContentOption', 'activeGenres', 'genreIndex', 'SortOption', 'scrollPosition', 'index', 'id'].forEach(key => {
    localStorage.removeItem(key);
});

// ==========================================================================
// Genre Configuration per Media Type
// ==========================================================================
function updateGenreButtonConfig(type) {
    const btScience = document.getElementById('btScience');
    const btAction = document.getElementById('btAction');
    const btAdventure = document.getElementById('btAdventure');
    const btWar = document.getElementById('btWar');
    const btFantasy = document.getElementById('btFantasy');
    const btThriller = document.getElementById('btThriller');
    const btRomance = document.getElementById('btRomance');
    const btHorror = document.getElementById('btHorror');

    const isTv = (type === 'series' || type === 'anime');

    if (btScience) {
        btScience.value = isTv ? '10765' : '878';
        btScience.setAttribute('data-i18n', 'genre_scifi');
        btScience.textContent = getTranslation('genre_scifi');
    }
    if (btAction) {
        btAction.value = isTv ? '10759' : '28';
        btAction.setAttribute('data-i18n', 'genre_action');
        btAction.textContent = getTranslation('genre_action');
    }
    if (btWar) {
        btWar.value = isTv ? '10768' : '10752';
        btWar.setAttribute('data-i18n', 'genre_war');
        btWar.textContent = getTranslation('genre_war');
    }

    const tvHiddenButtons = [btAdventure, btFantasy, btThriller, btRomance, btHorror];
    tvHiddenButtons.forEach(btn => {
        if (btn) {
            btn.style.display = isTv ? 'none' : 'inline-block';
        }
    });

    applyI18n();
}

// ==========================================================================
// URL Query Parameters Helper (Single Source of Truth)
// ==========================================================================
function getFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);

    let type = params.get('type') || 'movies';
    if (!['movies', 'series', 'anime'].includes(type)) {
        type = 'movies';
    }

    let sort = params.get('sort') || 'popularity.desc';
    const allowedSorts = ['trending', 'popularity.desc', 'vote_average.desc', 'primary_release_date.desc', 'first_air_date.desc'];
    if (!allowedSorts.includes(sort)) {
        sort = 'popularity.desc';
    }

    // Anime does not have a trending endpoint in TMDB
    if (type === 'anime' && sort === 'trending') {
        sort = 'popularity.desc';
    }

    let prov = params.get('provider') || 'all';
    const allowedProviders = ['all', '8', '9', '1899', '350', '337'];
    if (!allowedProviders.includes(prov)) {
        prov = 'all';
    }

    const excludeAnimations = params.get('exclude_animations') === 'true';

    const genresParam = params.get('genres');
    let genres = [];
    if (genresParam) {
        genres = genresParam.split(',').map(g => g.trim()).filter(g => g.length > 0);
    }

    return {
        type,
        sort,
        provider: prov,
        excludeAnimations,
        genres
    };
}

function setFiltersToUrl(filters, pushHistory = false) {
    const params = new URLSearchParams();

    // Keep URL clean: only set parameters that deviate from defaults
    if (filters.type && filters.type !== 'movies') {
        params.set('type', filters.type);
    }
    if (filters.sort && filters.sort !== 'popularity.desc') {
        params.set('sort', filters.sort);
    }
    if (filters.provider && filters.provider !== 'all') {
        params.set('provider', filters.provider);
    }
    if (filters.excludeAnimations) {
        params.set('exclude_animations', 'true');
    }
    if (filters.genres && filters.genres.length > 0) {
        params.set('genres', filters.genres.join(','));
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

    if (pushHistory) {
        window.history.pushState(null, '', newUrl);
    } else {
        window.history.replaceState(null, '', newUrl);
    }
}

// ==========================================================================
// UI Synchronization
// ==========================================================================
function syncUIWithFilters(filters) {
    if (contentType) contentType.value = filters.type;
    if (sortBy) {
        sortBy.value = (filters.sort === 'first_air_date.desc') ? 'primary_release_date.desc' : filters.sort;
    }
    if (provider) provider.value = filters.provider;
    if (customCheckbox) customCheckbox.checked = filters.excludeAnimations;

    const isTrending = (filters.sort === 'trending');

    // Disable Anime option when on Trending (no TMDB trending anime endpoint)
    const animeOption = contentType?.querySelector('option[value="anime"]');
    if (animeOption) {
        animeOption.disabled = isTrending;
    }

    // Disable Trending option when on Anime
    const trendingOption = sortBy?.querySelector('option[value="trending"]');
    if (trendingOption) {
        trendingOption.disabled = (filters.type === 'anime');
    }

    if (genreSidebar) {
        genreSidebar.classList.toggle('collapsed', isTrending);
    }
    if (filterExtra) {
        filterExtra.classList.toggle('collapsed', isTrending);
    }
    if (listBox) {
        listBox.classList.toggle('expanded', isTrending);
    }
    if (filtersContainer) {
        filtersContainer.classList.toggle('trending', isTrending);
    }

    // Toggle mobile genre button (hidden when Trending)
    if (genreToggleBtn) {
        genreToggleBtn.style.display = isTrending ? 'none' : '';
    }

    // Update active genre count badge on mobile button
    const activeCount = filters.genres.length;
    if (genreCountBadge) {
        genreCountBadge.textContent = activeCount;
        genreCountBadge.classList.toggle('hidden', activeCount === 0);
    }

    updateGenreButtonConfig(filters.type);

    genreButtons.forEach(button => {
        if (filters.genres.includes(button.value)) {
            button.classList.add('genre-bt-active');
        } else {
            button.classList.remove('genre-bt-active');
        }
    });
}

// ==========================================================================
// TMDB Declarative API Builder
// ==========================================================================
function buildApiUrl(filters, page = 1) {
    const { type, sort, provider, genres, excludeAnimations } = filters;

    if (sort === 'trending') {
        const trendingBase = (type === 'movies') ? trendingMovies : trendingSeries;
        return `${trendingBase}&page=${page}`;
    }

    const baseUrl = (type === 'movies') ? discover_movies : discover_series;

    let apiSort = sort;
    if (type !== 'movies' && apiSort === 'primary_release_date.desc') {
        apiSort = 'first_air_date.desc';
    }

    let voteCountThreshold = 200;
    if (apiSort.includes('release_date') || apiSort.includes('first_air_date')) {
        voteCountThreshold = 10;
    } else if (type === 'movies') {
        voteCountThreshold = (apiSort === 'vote_average.desc') ? 300 : 200;
    } else if (type === 'series') {
        voteCountThreshold = (apiSort === 'popularity.desc') ? 170 : 250;
    } else if (type === 'anime') {
        if (apiSort === 'vote_average.desc') voteCountThreshold = 70;
        else if (apiSort === 'popularity.desc') voteCountThreshold = 40;
        else voteCountThreshold = 20;
    }

    let finalGenres = [...genres];
    if (type === 'anime' && !finalGenres.includes('16')) {
        finalGenres.unshift('16');
    }

    let url = `${baseUrl}&sort_by=${encodeURIComponent(apiSort)}&vote_count.gte=${voteCountThreshold}&page=${page}`;

    if (type === 'anime') {
        url += '&with_original_language=ja';
    }

    if (finalGenres.length > 0) {
        url += `&with_genres=${finalGenres.join(',')}`;
    }

    if (excludeAnimations && type !== 'anime') {
        url += '&without_genres=16';
    }

    if (provider && provider !== 'all') {
        url += `&watch_region=US&with_watch_providers=${encodeURIComponent(provider)}`;
    }

    return url;
}

// ==========================================================================
// Fetch and Render
// ==========================================================================
async function fetchAndRender(filters, page = 1, append = false) {
    if (!append) {
        gridList.innerHTML = getMovieCardSkeletons(16);
        currentPage = 1;
        hasMore = true;
    } else {
        document.getElementById('gridPaginationLoader')?.remove();
        gridList.insertAdjacentHTML('beforeend', getPaginationLoader());
    }

    isLoading = true;
    const url = buildApiUrl(filters, page);
    const mediaId = (filters.type === 'movies') ? movieID : serieID;

    try {
        const res = await fetch(url);
        document.getElementById('gridPaginationLoader')?.remove();

        if (!res.ok) {
            console.error('Fetch error from TMDB proxy:', res.status, res.statusText);
            if (!append) gridList.innerHTML = '';
            isLoading = false;
            return false;
        }

        const data = await res.json();
        if (!append) {
            gridList.innerHTML = '';
        }

        if (!data.results || data.results.length === 0) {
            if (!append) {
                gridList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: var(--on-surface-variant);">
                        <p style="font-size: 1.6rem; margin-bottom: 8px;">No titles found with the selected filters.</p>
                        <p style="font-size: 1.3rem;">Try selecting different genres or providers.</p>
                    </div>
                `;
            }
            hasMore = false;
            isLoading = false;
            return false;
        }

        if (data.page >= data.total_pages) {
            hasMore = false;
        }

        renderMovieCards(data.results, mediaId);
        isLoading = false;
        return true;
    } catch (error) {
        console.error('Network error loading content:', error);
        document.getElementById('gridPaginationLoader')?.remove();
        if (!append) gridList.innerHTML = '';
        isLoading = false;
        return false;
    }
}

function renderMovieCards(data, mediaId) {
    data.forEach(item => {
        const { name, title, first_air_date, poster_path, vote_average, release_date, id } = item;
        if (!poster_path) {
            return;
        }
        const titleOrName = escapeHtml(title || name || 'Untitled');
        const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
        const rate = (typeof vote_average === 'number') ? vote_average.toFixed(1) : 'N/A';

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');
        movieEl.innerHTML = `
            <a href="../detail/detail.html?${mediaId}=${id}" class="card-btn"> 
                <figure class="poster-box card-banner">
                    <img src="${ImageBaseURL + poster_path}" class="img-cover" alt="${titleOrName}" loading="lazy">
                </figure>
                <div class="card-wrapper">
                    <h4 class="title">${titleOrName}</h4>
                    <div class="meta-list">
                        <div class="meta-item">
                            <span class="span">${rate}</span>
                            <img src="../../assets/images/star.png" width="20" height="20" loading="lazy" alt="" aria-hidden="true">             
                        </div>
                        <div class="card-badge">${year}</div>           
                    </div>
                </div>
            </a>
        `;
        gridList.appendChild(movieEl);
    });
}

// ==========================================================================
// Event Listeners & History Strategy
// ==========================================================================

// 1. Content Type Switch (Movies, Series, Anime) -> pushState (Major state change)
if (contentType) {
    contentType.addEventListener('change', (e) => {
        const filters = getFiltersFromUrl();
        // Prevent switching to anime when on trending (no TMDB trending anime endpoint)
        if (filters.sort === 'trending' && e.target.value === 'anime') {
            contentType.value = filters.type;
            return;
        }
        filters.type = e.target.value;
        // Reset genres when switching content type (IDs differ between Movies and Series)
        filters.genres = [];
        syncUIWithFilters(filters);
        setFiltersToUrl(filters, true);
        fetchAndRender(filters, 1, false);
        if (container) container.scrollTop = 0;
    });
}

// 2. Sort Selection -> pushState (Major sort order change)
if (sortBy) {
    sortBy.addEventListener('change', (e) => {
        const filters = getFiltersFromUrl();
        // Prevent switching to trending when on anime
        if (filters.type === 'anime' && e.target.value === 'trending') {
            sortBy.value = filters.sort;
            return;
        }
        filters.sort = e.target.value;
        if (filters.sort === 'trending') {
            filters.genres = [];
            filters.provider = 'all';
            filters.excludeAnimations = false;
        }
        syncUIWithFilters(filters);
        setFiltersToUrl(filters, true);
        fetchAndRender(filters, 1, false);
        if (container) container.scrollTop = 0;
    });
}

// 3. Provider Selection -> replaceState (Fine-tuning refinement)
if (provider) {
    provider.addEventListener('change', (e) => {
        const filters = getFiltersFromUrl();
        filters.provider = e.target.value;
        if (filters.sort === 'trending' && filters.provider !== 'all') {
            filters.sort = 'popularity.desc';
        }
        syncUIWithFilters(filters);
        setFiltersToUrl(filters, false);
        fetchAndRender(filters, 1, false);
        if (container) container.scrollTop = 0;
    });
}

// 4. Exclude Animations Checkbox -> replaceState (Fine-tuning refinement)
if (customCheckbox) {
    customCheckbox.addEventListener('change', (e) => {
        const filters = getFiltersFromUrl();
        filters.excludeAnimations = e.target.checked;
        syncUIWithFilters(filters);
        setFiltersToUrl(filters, false);
        fetchAndRender(filters, 1, false);
        if (container) container.scrollTop = 0;
    });
}

// 5. Genre Buttons Toggle -> replaceState (Avoids polluting history on rapid toggling)
genreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filters = getFiltersFromUrl();
        const genreVal = button.value;
        const index = filters.genres.indexOf(genreVal);

        if (index > -1) {
            filters.genres.splice(index, 1);
        } else {
            filters.genres.push(genreVal);
        }

        if (filters.sort === 'trending' && filters.genres.length > 0) {
            filters.sort = 'popularity.desc';
        }

        syncUIWithFilters(filters);
        setFiltersToUrl(filters, false);
        fetchAndRender(filters, 1, false);
        if (container) container.scrollTop = 0;
    });
});

// 6. Browser Back / Forward Navigation (popstate)
window.addEventListener('popstate', () => {
    const filters = getFiltersFromUrl();
    syncUIWithFilters(filters);
    fetchAndRender(filters, 1, false);
});

// 7. Infinite Scroll Pagination
if (container) {
    container.addEventListener('scroll', async () => {
        if (isLoading || !hasMore) return;
        const diff = container.scrollHeight - container.scrollTop;
        if (diff <= container.clientHeight + 300) {
            currentPage++;
            const filters = getFiltersFromUrl();
            await fetchAndRender(filters, currentPage, true);
        }
    });
}

// 8. Mobile Genre Drawer handlers
function openGenreDrawer() {
    genreSidebar?.classList.add('open');
    genreOverlay?.classList.add('visible');
}

function closeGenreDrawer() {
    genreSidebar?.classList.remove('open');
    genreOverlay?.classList.remove('visible');
}

if (genreToggleBtn) {
    genreToggleBtn.addEventListener('click', openGenreDrawer);
}
if (closeGenreBtn) {
    closeGenreBtn.addEventListener('click', closeGenreDrawer);
}
if (genreOverlay) {
    genreOverlay.addEventListener('click', closeGenreDrawer);
}

// 9. Search bar redirect & Mobile Expandable Search
function redirect() {
    const q = searchField?.value.trim();
    if (!q) return;
    window.location.href = `../search/search.html?search=${encodeURIComponent(q)}`;
}

if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        // In mobile viewport (< 768px), first click opens the expandable bar
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

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && searchField && document.activeElement === searchField) {
        redirect();
    }
    if (event.key === 'Escape') {
        closeGenreDrawer();
        if (searchBox?.classList.contains('active')) {
            searchBox.classList.remove('active');
        }
    }
});

// ==========================================================================
// App Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    initUserAccountPopup();
    const filters = getFiltersFromUrl();
    syncUIWithFilters(filters);
    fetchAndRender(filters, 1, false);
});
