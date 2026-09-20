// Importa a URL base do proxy configurada localmente ou injetada pelo GitHub Actions
import { base_url } from './config.js';

const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';
const api_key = ''; // Chave mantida em segredo na Cloudflare (já não é necessária no frontend)

const discover_movies = `${base_url}/discover/movie?include_adult=false&language=en-US`;
const discover_series = `${base_url}/discover/tv?language=en-US`;
const discover_anime = `${base_url}/discover/tv?language=en-US&with_original_language=ja&with_genres=16`;
const topRatedMovies = `${base_url}/discover/movie?sort_by=vote_average.desc&vote_count.gte=300`;
const topRatedSeries = `${base_url}/discover/tv?sort_by=vote_average.desc&vote_count.gte=300`;
const searchMovie = `${base_url}/search/movie?include_adult=false&language=en-US&page=1&query=`;
const searchSerie = `${base_url}/search/tv?include_adult=false&language=en-US&page=1&query=`;
const trendingMovies = `${base_url}/trending/movie/week?language=en-US`;
const trendingSeries = `${base_url}/trending/tv/week?language=en-US`;
const trending = `${base_url}/trending/all/week?language=en-US`;
// URL Builders para Filmes (Detalhes, Créditos, Vídeos, Providers)
const getMovieDetail = (id) => `${base_url}/movie/${id}`;
const getMovieCredits = (id) => `${base_url}/movie/${id}/credits?language=en-US`;
const getMovieVideos = (id) => `${base_url}/movie/${id}/videos?language=en-US`;
const getMovieProviders = (id) => `${base_url}/movie/${id}/watch/providers`;

// URL Builders para Séries (Detalhes, Créditos, Vídeos, Providers)
const getSeriesDetail = (id) => `${base_url}/tv/${id}`;
const getSeriesCredits = (id) => `${base_url}/tv/${id}/credits?language=en-US`;
const getSeriesVideos = (id) => `${base_url}/tv/${id}/videos?language=en-US`;
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
