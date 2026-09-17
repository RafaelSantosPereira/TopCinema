# 🤖 GEMINI.md - AI Developer Guide for TopCinema

> **Context Document for Gemini & Autonomous Coding Agents**  
> This document outlines the architecture, code conventions, core workflows, data patterns, and best practices for developing and maintaining the **TopCinema** codebase.

---

## 1. Project Overview & Scope

- **Application Name**: TopCinema (Repo: `TopCinema`)
- **Type**: Multi-Page Vanilla Web Application with Feature-Based Colocation Architecture
- **Primary Goal**: Movie & TV Series discovery platform offering catalog exploration, rich media details (trailers, credits, recommendations), user authentication, and personalized cloud-synced playlists.
- **Tech Stack**:
  - **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+ Native Modules)
  - **Build Step**: Zero-build (runs natively in modern browsers via HTTP server)
  - **APIs**: The Movie Database (TMDB) API v3
  - **Backend & Auth**: Google Firebase v11.7.1 (Firebase Auth via CDN + Cloud Firestore via REST API)
  - **Styling**: Custom CSS design system with CSS custom properties (`:root`), Bootstrap Icons (`bi`), Google Fonts

---

## 2. Directory & Feature-Based Architecture

The codebase organizes files by **domain feature** (_Colocation_), placing HTML and page controller scripts alongside their feature-specific styles, while shared services and design tokens remain centralized:

```text
TopCinema/
├── assets/
│   ├── css/
│   │   └── style.css                 # Primary stylesheet and design system tokens (:root)
│   └── images/                       # App icons, logos, and UI graphics
├── pages/
│   ├── auth/                         # 🔐 Authentication module
│   │   ├── create.html               # User sign-up view
│   │   ├── create.js                 # Registration controller & Firebase Auth
│   │   ├── login.css                 # Dedicated auth styling
│   │   ├── login.html                # User sign-in view
│   │   └── login.js                  # Login controller & client validation
│   ├── detail/                       # 🎬 Media details module
│   │   ├── detail.html               # Movie & series detail view
│   │   └── detail.js                 # Deep-dive metadata, YouTube trailer embed, cast & recommendations
│   ├── explore/                      # 🧭 Catalog explorer module
│   │   ├── movie-list.html           # Catalog explorer view
│   │   └── movie-list.js             # Genre sidebar filtering, category selector & scroll caching
│   ├── library/                      # 📚 User library & playlists module
│   │   ├── library.html              # Custom playlists & library view
│   │   └── library.js                # Playlists CRUD & items management via Firestore REST
│   └── search/                       # 🔍 Search module
│       ├── search.html               # Search results view
│       └── search.js                 # Concurrent search across movies and TV shows
├── shared/                           # ⚙️ Shared services & utilities
│   ├── api.js                        # TMDB API base endpoints, URL builders, and query constants
│   ├── config.example.js             # Configuration template (actual config.js is gitignored)
│   └── firebase.js                   # Firebase SDK initialization & Auth singleton export
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Pages CI/CD with secret injection
├── index.html                        # 🏠 Homepage entry point (hero banner, carousels)
├── index.js                          # Homepage carousel controllers & auth popup
├── .gitignore                        # Git ignore rules (ignores config.js, .env)
├── GEMINI.md                         # This file
└── README.md                         # Public project documentation
```

### Page & Script Relationships

| HTML Page                                                                             | Script Entry Point                                                                | Main Responsibility                                       | Relative Shared Path |
| :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------- | :-------------------------------------------------------- | :------------------- |
| [`index.html`](file:///c:/TopCinema/index.html)                                       | [`index.js`](file:///c:/TopCinema/index.js)                                       | Hero banner slider, trending carousels, account modal.    | `./shared/...`       |
| [`pages/explore/movie-list.html`](file:///c:/TopCinema/pages/explore/movie-list.html) | [`pages/explore/movie-list.js`](file:///c:/TopCinema/pages/explore/movie-list.js) | Genre filtering, media type switch, scroll restoration.   | `../../shared/...`   |
| [`pages/search/search.html`](file:///c:/TopCinema/pages/search/search.html)           | [`pages/search/search.js`](file:///c:/TopCinema/pages/search/search.js)           | Dual-query search (movies & series), horizontal sliders.  | `../../shared/...`   |
| [`pages/detail/detail.html`](file:///c:/TopCinema/pages/detail/detail.html)           | [`pages/detail/detail.js`](file:///c:/TopCinema/pages/detail/detail.js)           | Metadata, trailers, cast, recommendations, playlist add.  | `../../shared/...`   |
| [`pages/library/library.html`](file:///c:/TopCinema/pages/library/library.html)       | [`pages/library/library.js`](file:///c:/TopCinema/pages/library/library.js)       | User playlists CRUD, sorting, and deletion via Firestore. | `../../shared/...`   |
| [`pages/auth/login.html`](file:///c:/TopCinema/pages/auth/login.html)                 | [`pages/auth/login.js`](file:///c:/TopCinema/pages/auth/login.js)                 | Email/password sign-in with Firebase Auth.                | `../../shared/...`   |
| [`pages/auth/create.html`](file:///c:/TopCinema/pages/auth/create.html)               | [`pages/auth/create.js`](file:///c:/TopCinema/pages/auth/create.js)               | Email/password sign-up with client-side validation.       | `../../shared/...`   |

---

## 3. Core Data Flow & Integration Patterns

### 3.1. TMDB API Integration & Cloudflare Proxy (`shared/api.js`)

- All catalog queries route through a dedicated serverless Cloudflare Worker proxy.
- **Zero Client-Side Key & URL Exposure in Git**: The raw TMDB API key and proxy base URL are completely absent from Git tracking. In production, the URL is injected via GitHub Secrets (`PROXY_URL`) during deployment. Locally, it is loaded from a gitignored `shared/config.js` file.
- Base constants, endpoints, and query parameters are centrally exported from [`shared/api.js`](file:///c:/TopCinema/shared/api.js).
- Image assets use standard TMDB image base URLs:
  - Posters: `https://image.tmdb.org/t/p/w500` or `w780`
  - Backdrops: `https://image.tmdb.org/t/p/w1280` or `original`
- Content routing convention:
  - URLs pass either `?movieId=<id>` or `?serieId=<id>`.
  - Constants `movieID = 'movieId'` and `serieID = 'serieId'` determine the active media type.

> [!NOTE]
> When consuming TMDB data, fields vary between media types:
>
> - Movies use `item.title`, `item.release_date`.
> - TV Shows use `item.name`, `item.first_air_date`.
>   Always use fallback pattern: `const title = item.title || item.name;`

### 3.2. Firebase Authentication (`shared/firebase.js`)

- Imported via official Google CDN:
  ```javascript
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
  ```
- Observer pattern: Use `onAuthStateChanged(auth, user => { ... })` to dynamically toggle UI elements (e.g., account profile vs. login links).

### 3.3. Cloud Firestore via REST API (`pages/library/library.js`, `pages/detail/detail.js`)

Instead of importing the full Firestore client SDK, the app communicates with Firestore using standard `fetch` calls with Firebase Auth ID tokens:

- **Authentication Header**: `Authorization: Bearer ${await user.getIdToken()}`
- **Query Endpoint**: `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`
- **Document CRUD Endpoint**: `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/...`
- **Firestore Data Format**: Values must be wrapped in typed JSON keys (e.g. `{ stringValue: "..." }`, `{ integerValue: 123 }`, `{ timestampValue: "..." }`).

### 3.4. State Management (URL Query Parameters & Deep Linking)

The catalog explorer ([`pages/explore/movie-list.js`](file:///c:/TopCinema/pages/explore/movie-list.js)) uses **URL Query Parameters** (`URLSearchParams`) as its single source of truth, enabling link sharing and robust browser history navigation:

- `type`: Media type identifier (`movies`, `series`, or `anime`).
- `sort`: Active sort criteria (`popularity.desc`, `vote_average.desc`, `primary_release_date.desc`, `first_air_date.desc`).
- `provider`: Streaming provider ID filter (e.g., `8` for Netflix, `all` for all).
- `genres`: Comma-separated genre IDs (e.g., `genres=28,878`).
- `exclude_animations`: Boolean toggle (`true`/`false`).
- **History Strategy**: `history.pushState` is used for major shifts (`type`, `sort`), while `history.replaceState` is used for rapid adjustments (`genres`, `provider`, `exclude_animations`). Navigation via browser Back/Forward is handled natively with `window.addEventListener('popstate')`.

---

## 4. Development & Running Guidelines

### Local HTTP Server Requirement

The codebase uses native JavaScript ES modules (`<script type="module">` and `import`/`export`).

- **Do not open files via `file:///`**, as browsers block module imports under the `file://` protocol due to CORS security policies.
- **Run locally with any HTTP server**:

  ```bash
  # Python 3
  python -m http.server 8000

  # Node.js
  npx serve .
  ```

---

## 5. Coding Conventions & Best Practices

### JavaScript Guidelines

1. **Module Syntax**: Always use standard ES6 `import`/`export`. Ensure all relative imports include the `.js` file extension (e.g., `import { auth } from '../../shared/firebase.js';`).
2. **Defensive Coding**: When handling TMDB responses:
   - Check if posters or backdrops are `null` before building image tags; provide fallbacks.
   - Guard against empty arrays in results (`results.length === 0`).
3. **Async / Await**: Prefer `async/await` over promise chains (`.then()`) for readability and uniform `try/catch` error handling.
4. **DOM Safety**: Prefer `textContent` or controlled template literals; avoid unsanitized user strings in `innerHTML` to prevent XSS vulnerabilities.
5. **Event Delegation**: Use `.closest()` or event delegation when handling dynamically rendered list items (e.g. playlist item delete buttons, movie cards).

### CSS & Styling Conventions

1. **Design Tokens**: Always consume variables defined in `:root` in [`assets/css/style.css`](file:///c:/TopCinema/assets/css/style.css):
   - Backgrounds: `var(--background)`, `var(--background-base)`
   - Primary accents: `var(--primary)` (`#DC0E35` / `hsla(349, 100%, 43%, 1)`), `var(--primary-variant)`
   - Ratings: `var(--rating-color)` (Gold)
   - Typography: `var(--ff-dm-sans)`
   - Radii: `var(--radius-4)`, `var(--radius-8)`, `var(--radius-16)`, `var(--radius-24)`
2. **Responsive Design**: Follow the established breakpoints:
   - Extra Small / Mobile: `< 575px`
   - Small: `>= 575px`
   - Medium: `>= 768px`
   - Large: `>= 992px`
   - Extra Large / Desktop: `>= 1200px`
3. **Icons**: Use Bootstrap Icons class pattern: `<i class="bi bi-<icon-name>"></i>`.

---

## 6. Security & Credentials Policy

1. **API Keys & Proxy Endpoints**:
   - The TMDB API key is completely isolated inside the Cloudflare Worker serverless proxy as an encrypted secret.
   - The proxy endpoint URL is never committed to Git and is loaded dynamically via `shared/config.js` (locally) or GitHub Secrets (in CI/CD).
   - `firebaseConfig` is public in `shared/firebase.js` as standard client-side project identifiers.
2. **Firestore Security Rules**:
   - Ensure playlists and items are strictly scoped to `request.auth.uid == resource.data.userId` or subcollections owned by the authenticated user.
3. **Client-Side Form Validation**:
   - Both `pages/auth/login.js` and `pages/auth/create.js` enforce basic length validation (4 to 20 characters) and password equality checks before firing Firebase requests.

---

## 7. Evolution & Modern Tooling Roadmap

- **Bundler Adoption**: Introducing Vite would provide hot module replacement (HMR), TypeScript support, environment variable loading (`import.meta.env`), and automated asset optimization.
- **PWA & Offline Mode**: Adding a Service Worker and manifest file would allow offline catalog caching and installability.
