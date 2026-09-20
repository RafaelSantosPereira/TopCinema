// Importa a URL base do proxy configurada localmente ou injetada pelo GitHub Actions
import { base_url } from './config.js';
import { getLanguage } from './i18n.js';

const lang = getLanguage();
const langShort = lang.split('-')[0];

const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';
const api_key = ''; // Chave mantida em segredo na Cloudflare (já não é necessária no frontend)

const discover_movies = `${base_url}/discover/movie?include_adult=false&language=${lang}`;
const discover_series = `${base_url}/discover/tv?language=${lang}`;
const discover_anime = `${base_url}/discover/tv?language=${lang}&with_original_language=ja&with_genres=16`;
const topRatedMovies = `${base_url}/discover/movie?sort_by=vote_average.desc&vote_count.gte=300&language=${lang}`;
const topRatedSeries = `${base_url}/discover/tv?sort_by=vote_average.desc&vote_count.gte=300&language=${lang}`;
const searchMovie = `${base_url}/search/movie?include_adult=false&language=${lang}&page=1&query=`;
const searchSerie = `${base_url}/search/tv?include_adult=false&language=${lang}&page=1&query=`;
const trendingMovies = `${base_url}/trending/movie/week?language=${lang}`;
const trendingSeries = `${base_url}/trending/tv/week?language=${lang}`;
const trending = `${base_url}/trending/all/week?language=${lang}`;
// URL Builders para Filmes (Detalhes, Créditos, Vídeos, Providers)
const getMovieDetail = (id) => `${base_url}/movie/${id}?language=${lang}`;
const getMovieCredits = (id) => `${base_url}/movie/${id}/credits?language=${lang}`;
const getMovieVideos = (id) => `${base_url}/movie/${id}/videos?language=${lang}&include_video_language=${langShort},en,null`;
const getMovieProviders = (id) => `${base_url}/movie/${id}/watch/providers`;

// URL Builders para Séries (Detalhes, Créditos, Vídeos, Providers)
const getSeriesDetail = (id) => `${base_url}/tv/${id}?language=${lang}`;
const getSeriesCredits = (id) => `${base_url}/tv/${id}/credits?language=${lang}`;
const getSeriesVideos = (id) => `${base_url}/tv/${id}/videos?language=${lang}&include_video_language=${langShort},en,null`;
const getSeriesProviders = (id) => `${base_url}/tv/${id}/watch/providers`;

const movieID = 'movieId';
const serieID = 'serieId';

export { 
    api_key,
    ImageBaseURL,
    base_url,
    discover_movies,
    discover_series,
    discover_anime,
    topRatedMovies,
    topRatedSeries,
    searchMovie,
    searchSerie,
    trendingMovies,
    trendingSeries,
    getMovieDetail,
    getMovieCredits,
    getMovieVideos,
    getMovieProviders,
    getSeriesDetail,
    getSeriesCredits,
    getSeriesVideos,
    getSeriesProviders,
    trending,
    movieID,
    serieID
};
