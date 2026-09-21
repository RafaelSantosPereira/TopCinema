/**
 * --------------------------------------------------------------------------
 * TopCinema - Skeleton & Loading Components Generator
 * --------------------------------------------------------------------------
 */

/**
 * Generates HTML string for a collection of skeleton movie cards.
 * @param {number} count Number of skeleton cards to render (default: 8)
 * @returns {string} HTML markup string
 */
export function getMovieCardSkeletons(count = 8) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="movie-card skeleton-card" aria-hidden="true">
        <div class="poster-box card-banner skeleton skeleton-poster"></div>
        <div class="card-wrapper">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton-meta">
            <div class="skeleton skeleton-badge"></div>
            <div class="skeleton skeleton-year"></div>
          </div>
        </div>
      </div>
    `;
  }
  return html;
}

/**
 * Generates HTML string for the Hero Banner skeleton.
 * Matches exact positioning, dimensions, and aspect ratio of real banner slides.
 * @returns {string} HTML markup string
 */
export function getHeroBannerSkeleton() {
  return `
    <div class="slider-item active skeleton-banner" id="bannerSkeleton" aria-hidden="true">
      <div class="skeleton skeleton-banner-backdrop"></div>
      <div class="banner-content skeleton-banner-content">
        <div class="skeleton skeleton-banner-title"></div>
        <div class="skeleton-banner-meta">
          <div class="skeleton skeleton-badge" style="width: 48px; height: 22px;"></div>
          <div class="skeleton skeleton-badge" style="width: 36px; height: 22px;"></div>
        </div>
        <div class="skeleton skeleton-banner-desc"></div>
        <div class="skeleton skeleton-banner-desc short"></div>
        <div class="skeleton skeleton-banner-btn"></div>
      </div>
    </div>
  `;
}

/**
 * Generates HTML string for the Library loading spinner.
 * @returns {string} HTML markup string
 */
export function getLibrarySpinner() {
  return `
    <div class="library-loading-state" role="status" aria-live="polite">
      <div class="loading-spinner"></div>
    </div>
  `;
}

/**
 * Generates HTML string for infinite scroll loader at the bottom of grids.
 * @returns {string} HTML markup string
 */
export function getPaginationLoader() {
  return `
    <div class="grid-pagination-loader" id="gridPaginationLoader" role="status" aria-live="polite">
      <div class="loading-spinner"></div>
    </div>
  `;
}

/**
 * Generates HTML string for skeleton video cards (trailers & clips).
 * @param {number} count Number of skeleton video cards to render (default: 4)
 * @returns {string} HTML markup string
 */
export function getVideoSkeletons(count = 4) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="video-card skeleton skeleton-video-card" style="cursor: default;" aria-hidden="true"></div>
    `;
  }
  return html;
}
