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
const getMovieProviders = `${base_url}/movie/{movie_id}/watch/providers?language=en-US`;
const getSeriesProviders = `${base_url}/tv/{tv_id}/watch/providers?language=en-US`;
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
    getMovieProviders,
    getSeriesProviders,
    trending,
    movieID,
    serieID
};
