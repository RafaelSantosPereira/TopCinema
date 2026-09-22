/**
 * Centralized SEO & Structured Data Management Utility for TopCinema.
 * Manages document titles, descriptions, canonical links, Open Graph, Twitter Cards, and JSON-LD schemas.
 */

/**
 * Updates dynamic meta tags and social preview tags.
 * @param {Object} options
 * @param {string} [options.title] - Document title
 * @param {string} [options.description] - Meta description
 * @param {string} [options.canonicalUrl] - Canonical URL
 * @param {string} [options.imageUrl] - Open Graph & Twitter preview image URL
 * @param {string} [options.type='website'] - Open Graph type ('website', 'video.movie', 'video.tv_show')
 */
export function updateSEO({
  title,
  description,
  canonicalUrl,
  imageUrl,
  type = 'website'
} = {}) {
  // 1. Title
  if (title) {
    document.title = title;
    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);
  }

  // 2. Description
  if (description) {
    setMeta('name', 'description', description);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:description', description);
  }

  // 3. Canonical URL
  if (canonicalUrl) {
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:url', canonicalUrl);
  }

  // 4. Social Preview Image
  if (imageUrl) {
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:image', imageUrl);
  }

  // 5. Open Graph Type
  setMeta('property', 'og:type', type);
  setMeta('name', 'twitter:card', 'summary_large_image');
}

/**
 * Helper to update or create a <meta> element in document head.
 * @param {string} attrName - Attribute name ('name' or 'property')
 * @param {string} attrValue - Attribute value (e.g. 'description', 'og:title')
 * @param {string} content - Meta content string
 */
function setMeta(attrName, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Injects or updates Schema.org JSON-LD structured data for a Movie or TV Series.
 * @param {Object} item - Movie or TV Show data from TMDB
 * @param {Object} [credits] - Credits object with cast and crew from TMDB
 */
export function injectMovieSchema(item, credits) {
  if (!item) return;

  const isMovie = Boolean(item.title);
  const title = item.title || item.name || 'Untitled';
  const releaseDate = item.release_date || item.first_air_date;

  // Extract director from crew (for movies)
  const directors = credits?.crew
    ? credits.crew
        .filter(c => c.job === 'Director')
        .map(d => ({ '@type': 'Person', name: d.name }))
    : [];

  // Extract top 5 actors
  const actors = credits?.cast
    ? credits.cast.slice(0, 5).map(a => ({ '@type': 'Person', name: a.name }))
    : [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': isMovie ? 'Movie' : 'TVSeries',
    name: title,
    description: item.overview || undefined,
    image: item.poster_path ? `https://image.tmdb.org/t/p/w780${item.poster_path}` : undefined,
    datePublished: releaseDate || undefined,
    genre: item.genres?.map(g => g.name),
    inLanguage: item.original_language || 'en'
  };

  if (item.vote_count > 0 && typeof item.vote_average === 'number') {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: item.vote_average.toFixed(1),
      bestRating: '10',
      worstRating: '1',
      ratingCount: item.vote_count
    };
  }

  if (directors.length > 0) {
    schema.director = directors;
  }

  if (actors.length > 0) {
    schema.actor = actors;
  }

  // Remove existing detail schema if present
  const existing = document.getElementById('schema-movie-detail');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = 'schema-movie-detail';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

/**
 * Injects BreadcrumbList JSON-LD structured data.
 * @param {Array<{ name: string, url: string }>} items
 */
export function injectBreadcrumbSchema(items = []) {
  if (!items.length) return;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  const existing = document.getElementById('schema-breadcrumbs');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = 'schema-breadcrumbs';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

