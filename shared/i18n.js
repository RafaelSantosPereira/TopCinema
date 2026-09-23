/**
 * --------------------------------------------------------------------------
 * TopCinema - Sistema de Internacionalização (i18n)
 * Idioma Padrão Oficial: Inglês (en-US)
 * Suporte Multi-idioma de Alta Performance com Dicionários Nativos e Cache
 * --------------------------------------------------------------------------
 */

export const SUPPORTED_LANGUAGES = {
  "en-US": {
    code: "en-US",
    short: "EN",
    name: "English",
    flag: "🇬🇧",
    translateCode: "en",
  },
  "pt-PT": {
    code: "pt-PT",
    short: "PT",
    name: "Português",
    flag: "🇵🇹",
    translateCode: "pt",
  },
  "es-ES": {
    code: "es-ES",
    short: "ES",
    name: "Español",
    flag: "🇪🇸",
    translateCode: "es",
  },
  "fr-FR": {
    code: "fr-FR",
    short: "FR",
    name: "Français",
    flag: "🇫🇷",
    translateCode: "fr",
  },
  "de-DE": {
    code: "de-DE",
    short: "DE",
    name: "Deutsch",
    flag: "🇩🇪",
    translateCode: "de",
  },
  "it-IT": {
    code: "it-IT",
    short: "IT",
    name: "Italiano",
    flag: "🇮🇹",
    translateCode: "it",
  },
};

export const DEFAULT_LANGUAGE = "en-US";

/**
 * Dicionário Mestre em Inglês (Todas as frases fixas do TopCinema)
 */
export const BASE_STRINGS = {
  // Navegação e Header
  nav_home: "Home",
  nav_library: "Library",
  nav_explore: "Explore",
  search_placeholder: "Search any movies or series...",

  // Perfil e Autenticação
  login_btn: "Log In",
  sign_in: "Sign In",
  sign_out: "Sign Out",
  sign_up: "Sign Up",
  create_account: "Create Account",
  manage_account: "Manage Account",
  username_label: "Username",
  email_label: "Email",
  password_label: "Password",
  confirm_password_label: "Confirm Password",
  close: "Close",
  hello_user: "Hello",
  session_ended: "Session ended",
  already_have_account: "Already have an account?",
  no_account_prompt: "Don't have an account?",
  fill_all_fields: "Please fill in all fields",
  username_min_length: "Please enter a username with at least 2 characters",
  password_min_length: "Please enter a password with at least 6 characters",
  password_max_length: "Please enter a password with fewer than 20 characters",
  passwords_dont_match: "Passwords do not match",
  invalid_email: "Please enter a valid email address",
  network_error: "Network error. Please check your connection and try again.",
  signup_failed: "Failed to create account. Please try again.",
  too_many_requests: "Too many attempts. Please try again later.",
  login_success: "Login successful!",
  login_failed: "Incorrect credentials. Please try again.",
  account_created_success: "Account created successfully!",
  user_already_exists: "This user already exists",
  continue_with_google: "Continue with Google",
  auth_divider_or: "OR",
  google_auth_failed: "Failed to authenticate with Google. Please try again.",

  // Seções da Página Inicial
  trending_movies: "Trending Movies",
  trending_series: "Trending Series",
  popular_movies: "Popular Movies",
  popular_series: "Popular Series",
  top_rated_movies: "Top Rated Movies",
  top_rated_series: "Top Rated Series",
  see_more: "See More",
  watch_now: "Watch now",
  watch_trailer: "Watch Trailer",
  details: "Details",

  // Página de Detalhes
  where_to_watch: "Where to Watch",
  trailers_clips: "Trailers and Clips",
  you_may_like: "You May Also Like",
  starring: "Starring",
  directed_by: "Directed by",
  add_to_playlist: "Add to Playlist",
  save_to_playlist: "Save to Playlist",
  select_playlist: "Select Playlist",
  auth_prompt_detail:
    "Log in to create custom playlists and save your favorite movies and TV shows.",

  // Página Explorar e Filtros
  genres_title: "Genres",
  movies: "Movies",
  series: "Series",
  anime: "Anime",
  sort_trending: "Trending",
  sort_popularity: "Popular",
  sort_top_rated: "Top Rating",
  sort_release_date: "New",
  all_providers: "All Providers",
  exclude_animations: "Exclude animations",

  // Gêneros Sidebar
  genre_action: "Action",
  genre_adventure: "Adventure",
  genre_animation: "Animation",
  genre_drama: "Drama",
  genre_romance: "Romance",
  genre_crime: "Crime",
  genre_comedy: "Comedy",
  genre_scifi: "Science Fiction",
  genre_fantasy: "Fantasy",
  genre_documentary: "Documentary",
  genre_history: "History",
  genre_thriller: "Thriller",
  genre_horror: "Horror",
  genre_western: "Western",
  genre_war: "War",

  // Página Biblioteca
  your_playlists: "Your Playlists",
  new_playlist: "New Playlist",
  create_playlist_title: "Create New Playlist",
  enter_playlist_name: "Enter playlist name",
  remove_from_playlist: "Remove from Playlist",
  confirm_remove_item:
    "Are you sure you want to remove this title from the playlist?",
  delete_playlist: "Delete Playlist",
  confirm_delete_playlist:
    "Are you sure you want to delete this playlist and all its movies and series? This action cannot be undone.",
  deleting: "Deleting...",
  cancel: "Cancel",
  remove: "Remove",
  create: "Create",
  delete: "Delete",
  library_auth_title: "Your Personal Library",
  library_auth_text:
    "Log in to create custom playlists, organize your favorite movies and TV series, and access your collection anywhere.",
  no_playlists_title: "No playlists yet",
  no_playlists_text:
    "You haven't created any playlists yet. Click 'New Playlist' to start organizing your favorites.",
  explore_catalog: "Explore Catalog",
  empty_playlist_title: "This playlist is empty",
  empty_playlist_text:
    "No movies or TV shows added to this playlist yet. Explore the catalog and click 'Add to Playlist' on any title.",
  explore_titles: "Explore Titles",

  // Página de Pesquisa
  search_results: "Search Results for",
  no_results_title: "No Results Found",
  no_results_text: "We couldn't find any movies or TV series matching",

  // Rodapé
  footer_navigation: "Navigation",
  footer_copyright: "All rights reserved.",
  footer_tmdb_disclaimer:
    "This product uses the TMDB API but is not endorsed or certified by TMDB.",
  footer_privacy: "Privacy Policy",

  // Privacy Policy
  privacy_title: "Privacy Policy",
  privacy_last_updated: "Last updated: September 2026",
  privacy_intro_title: "1. Introduction and Data Controller",
  privacy_intro_text:
    "TopCinema is an informational discovery platform for movies and TV series. We value your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR). For any inquiries or requests regarding your personal data, you may contact us directly at support@topcinema.fyi.",
  privacy_data_title: "2. Information We Collect",
  privacy_data_auth_subtitle: "Account and Authentication",
  privacy_data_auth_text:
    "When you register or sign in via email/password or Google Sign-In, we process your email address, display name, and unique user identifier (UID) through Google Firebase Authentication.",
  privacy_data_library_subtitle: "User Playlists and Library",
  privacy_data_library_text:
    "When you create custom playlists or save movies and TV shows, this information is stored securely in Google Cloud Firestore associated with your account.",
  privacy_data_local_subtitle: "Preferences and Local Storage",
  privacy_data_local_text:
    "We use browser local storage (localStorage) to remember your chosen language, filter preferences, and session state across page visits.",
  privacy_purpose_title: "3. How We Use Your Information",
  privacy_purpose_text:
    "Your data is used solely to authenticate your account, synchronize your playlists across devices, and maintain your interface preferences. We do not sell, rent, or monetize your personal data.",
  privacy_third_party_title: "4. Third-Party Services and External Links",
  privacy_third_party_intro:
    "TopCinema integrates with trusted third-party services to deliver its features:",
  privacy_third_party_firebase:
    "Google Firebase: Provides secure user authentication and Cloud Firestore database storage.",
  privacy_third_party_tmdb:
    "The Movie Database (TMDB): Supplies media metadata, posters, trailers, and cast details. This product uses the TMDB API but is not endorsed or certified by TMDB.",
  privacy_third_party_cloudflare:
    "Cloudflare: Provides content delivery, security protection, and serverless proxy routing.",
  privacy_third_party_streaming:
    "Streaming Platform Links: Our media detail pages display where titles can be streamed or rented (e.g. Netflix, Prime Video, Disney+). Clicking these links navigates you to third-party services with their own privacy policies.",
  privacy_third_party_analytics:
    "Google Analytics 4: Collects aggregated, privacy-conscious usage statistics to help us improve performance and navigation. Ad personalization and Google signals are completely disabled.",
  privacy_cookies_title: "5. Cookies and Tracking",
  privacy_cookies_text:
    "TopCinema uses essential local storage and security tokens strictly for user authentication via Google Firebase and interface preferences. With your consent, we also use Google Analytics cookies to analyze anonymous traffic trends. Advertising cookies and cross-site remarketing trackers are never used. You can accept or decline analytics cookies at any time via our cookie consent banner.",
  privacy_rights_title: "6. Your Rights under GDPR",
  privacy_rights_text:
    "Under the European General Data Protection Regulation (GDPR), you have the right to access, rectify, or request the permanent deletion of your account and personal playlists. To exercise any of these rights, please email support@topcinema.fyi. Requests are processed within 30 days.",
  privacy_security_title: "7. Security and Data Retention",
  privacy_security_text:
    "We maintain security rules on Google Cloud Firestore to ensure that your custom playlists are accessible exclusively by your authenticated account. Your data is retained as long as your account remains active.",
  privacy_contact_title: "8. Contact Us",
  privacy_contact_text:
    "If you have questions or concerns regarding this Privacy Policy or your personal data, please contact us directly at:",
  cookie_consent_text: "We use cookies to enhance your browsing experience. Learn more in our",
  cookie_consent_privacy: "Privacy Policy",
  cookie_consent_accept: "Accept",
  cookie_consent_decline: "Decline",
};

/**
 * Dicionários Nativos Oficiais para Garantir Tradução Precisa e Imediata
 */
export const DICTIONARIES = {
  "en-US": BASE_STRINGS,

  "pt-PT": {
    // Navegação e Header
    nav_home: "Início",
    nav_library: "Biblioteca",
    nav_explore: "Explorar",
    search_placeholder: "Pesquisar filmes ou séries...",

    // Perfil e Autenticação
    login_btn: "Iniciar Sessão",
    sign_in: "Iniciar Sessão",
    sign_out: "Terminar Sessão",
    sign_up: "Registar",
    create_account: "Criar Conta",
    manage_account: "Gerir Conta",
    username_label: "Nome de Utilizador",
    email_label: "Email",
    password_label: "Palavra-passe",
    confirm_password_label: "Confirmar Palavra-passe",
    close: "Fechar",
    hello_user: "Olá",
    session_ended: "Sessão terminada",
    already_have_account: "Já tem uma conta?",
    no_account_prompt: "Não tem uma conta?",
    fill_all_fields: "Por favor preencha todos os campos",
    username_min_length:
      "Por favor insira um nome de utilizador com pelo menos 2 caracteres",
    password_min_length:
      "Por favor insira uma palavra-passe com pelo menos 6 caracteres",
    password_max_length:
      "Por favor insira uma palavra-passe com menos de 20 caracteres",
    passwords_dont_match: "As palavras-passe não coincidem",
    invalid_email: "Por favor insira um email válido",
    network_error: "Erro de rede. Verifique a sua ligação e tente novamente.",
    signup_failed: "Não foi possível criar a conta. Por favor tente novamente.",
    too_many_requests: "Demasiadas tentativas. Por favor tente mais tarde.",
    login_success: "Sessão iniciada com sucesso!",
    login_failed: "Credenciais incorretas. Por favor tente novamente.",
    account_created_success: "Conta criada com sucesso!",
    user_already_exists: "Este utilizador já existe",
    continue_with_google: "Continuar com o Google",
    auth_divider_or: "OU",
    google_auth_failed:
      "Falha ao autenticar com o Google. Por favor tente novamente.",

    // Seções da Página Inicial
    trending_movies: "Filmes em Destaque",
    trending_series: "Séries em Destaque",
    popular_movies: "Filmes Populares",
    popular_series: "Séries Populares",
    top_rated_movies: "Filmes Mais Votados",
    top_rated_series: "Séries Mais Votadas",
    see_more: "Ver Mais",
    watch_now: "Assistir agora",
    watch_trailer: "Ver Trailer",
    details: "Detalhes",

    // Página de Detalhes
    where_to_watch: "Onde Assistir",
    trailers_clips: "Trailers e Vídeos",
    you_may_like: "Também Pode Gostar",
    starring: "Elenco",
    directed_by: "Realizado por",
    add_to_playlist: "Adicionar à Lista",
    save_to_playlist: "Guardar na Lista",
    select_playlist: "Selecionar Lista",
    auth_prompt_detail:
      "Inicie sessão para criar listas personalizadas e guardar os seus filmes e séries favoritos.",

    // Página Explorar e Filtros
    genres_title: "Géneros",
    movies: "Filmes",
    series: "Séries",
    anime: "Anime",
    sort_trending: "Em Destaque",
    sort_popularity: "Populares",
    sort_top_rated: "Mais Votados",
    sort_release_date: "Novos",
    all_providers: "Todos os Provedores",
    exclude_animations: "Excluir animações",

    // Gêneros Sidebar
    genre_action: "Ação",
    genre_adventure: "Aventura",
    genre_animation: "Animação",
    genre_drama: "Drama",
    genre_romance: "Romance",
    genre_crime: "Crime",
    genre_comedy: "Comédia",
    genre_scifi: "Ficção Científica",
    genre_fantasy: "Fantasia",
    genre_documentary: "Documentário",
    genre_history: "História",
    genre_thriller: "Thriller",
    genre_horror: "Terror",
    genre_western: "Western",
    genre_war: "Guerra",

    // Página Biblioteca
    your_playlists: "As Suas Listas",
    new_playlist: "Nova Lista",
    create_playlist_title: "Criar Nova Lista",
    enter_playlist_name: "Introduza o nome da lista",
    remove_from_playlist: "Remover da Lista",
    confirm_remove_item:
      "Tem a certeza que deseja remover este título da lista?",
    delete_playlist: "Eliminar Playlist",
    confirm_delete_playlist:
      "Tem a certeza de que deseja eliminar esta playlist e todos os seus filmes e séries? Esta ação não pode ser revertida.",
    deleting: "A eliminar...",
    cancel: "Cancelar",
    remove: "Remover",
    create: "Criar",
    delete: "Eliminar",
    library_auth_title: "A Sua Biblioteca Pessoal",
    library_auth_text:
      "Inicie sessão para criar listas personalizadas, organizar os seus filmes e séries favoritos e aceder à sua coleção em qualquer lugar.",
    no_playlists_title: "Ainda sem listas",
    no_playlists_text:
      "Ainda não criou nenhuma lista. Clique em 'Nova Lista' para começar a organizar os seus favoritos.",
    explore_catalog: "Explorar Catálogo",
    empty_playlist_title: "Esta lista está vazia",
    empty_playlist_text:
      "Nenhum filme ou série adicionado a esta lista. Explore o catálogo e clique em 'Adicionar à Lista' em qualquer título.",
    explore_titles: "Explorar Títulos",

    // Página de Pesquisa
    search_results: "Resultados da Pesquisa por",
    no_results_title: "Nenhum Resultado Encontrado",
    no_results_text: "Não encontramos filmes ou séries correspondentes a",

    // Rodapé
    footer_navigation: "Navegação",
    footer_copyright: "Todos os direitos reservados.",
    footer_tmdb_disclaimer:
      "Este produto utiliza a API do TMDB mas não é endossado ou certificado pelo TMDB.",
    footer_privacy: "Política de Privacidade",

    // Política de Privacidade
    privacy_title: "Política de Privacidade",
    privacy_last_updated: "Última atualização: Setembro de 2026",
    privacy_intro_title: "1. Introdução e Responsável pelo Tratamento",
    privacy_intro_text:
      "O TopCinema é uma plataforma informativa de descoberta de filmes e séries. Valorizamos a sua privacidade e estamos empenhados em proteger os seus dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD). Para quaisquer questões ou pedidos relacionados com a privacidade dos seus dados, pode contactar-nos diretamente através do email support@topcinema.fyi.",
    privacy_data_title: "2. Dados que Recolhemos",
    privacy_data_auth_subtitle: "Conta e Autenticação",
    privacy_data_auth_text:
      "Quando se regista ou inicia sessão através de email/palavra-passe ou Google Sign-In, processamos o seu endereço de email, nome de utilizador e identificador único de utilizador (UID) através do Google Firebase Authentication.",
    privacy_data_library_subtitle: "Listas Personalizadas e Biblioteca",
    privacy_data_library_text:
      "Quando cria listas de reprodução personalizadas ou guarda filmes e séries, essas informações são armazenadas de forma segura no Google Cloud Firestore associadas à sua conta.",
    privacy_data_local_subtitle: "Preferências e Armazenamento Local",
    privacy_data_local_text:
      "Utilizamos o armazenamento local do navegador (localStorage) para memorizar o seu idioma preferido, filtros de catálogo e estado da sessão entre visitas.",
    privacy_purpose_title: "3. Finalidade e Utilização dos Dados",
    privacy_purpose_text:
      "Os seus dados são utilizados exclusivamente para autenticar a sua conta, sincronizar as suas listas entre dispositivos e manter as suas preferências de navegação. Não vendemos, alugamos nem monetizamos os seus dados pessoais.",
    privacy_third_party_title: "4. Serviços de Terceiros e Ligações Externas",
    privacy_third_party_intro:
      "O TopCinema integra serviços de terceiros de confiança para disponibilizar as suas funcionalidades:",
    privacy_third_party_firebase:
      "Google Firebase: Fornece serviços de autenticação segura e armazenamento de base de dados Cloud Firestore.",
    privacy_third_party_tmdb:
      "The Movie Database (TMDB): Fornece metadados de filmes, posters, trailers e detalhes do elenco. Este produto utiliza a API do TMDB mas não é endossado nem certificado pelo TMDB.",
    privacy_third_party_cloudflare:
      "Cloudflare: Fornece distribuição de conteúdos, proteção contra ataques e proxy de servidor.",
    privacy_third_party_streaming:
      "Ligações a Plataformas de Streaming: As nossas páginas de detalhes exibem onde os títulos estão disponíveis (ex.: Netflix, Prime Video, Disney+). Ao clicar nestas ligações, será direcionado para serviços externos que possuem as suas próprias políticas de privacidade.",
    privacy_third_party_analytics:
      "Google Analytics 4: Recolhe estatísticas agregadas e anónimas de navegação para melhorar o desempenho do site. A personalização de anúncios e o Google Signals estão desativados.",
    privacy_cookies_title: "5. Cookies e Rastreamento",
    privacy_cookies_text:
      "O TopCinema utiliza armazenamento local essencial e tokens de segurança estritamente para autenticação via Google Firebase e preferências de interface. Com o seu consentimento, utilizamos também cookies do Google Analytics para analisar tendências anónimas de tráfego. Não são utilizados cookies publicitários ou de remarketing. Pode aceitar ou recusar cookies analíticos a qualquer momento através do nosso aviso de cookies.",
    privacy_rights_title: "6. Os seus Direitos ao abrigo do RGPD",
    privacy_rights_text:
      "Ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD), tem o direito de aceder, retificar ou solicitar a eliminação definitiva da sua conta e de todas as suas listas. Para exercer qualquer um destes direitos, envie um email para support@topcinema.fyi. Os pedidos são respondidos no prazo de 30 dias.",
    privacy_security_title: "7. Segurança e Retenção de Dados",
    privacy_security_text:
      "Aplicamos regras de segurança no Google Cloud Firestore para garantir que as suas listas personalizadas são acessíveis apenas pela sua conta autenticada. Os seus dados são mantidos enquanto a sua conta permanecer ativa.",
    privacy_contact_title: "8. Contacto",
    privacy_contact_text:
      "Se tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre os seus dados pessoais, contacte-nos diretamente através de:",
    cookie_consent_text: "Utilizamos cookies para melhorar a sua experiência de navegação. Saiba mais na nossa",
    cookie_consent_privacy: "Política de Privacidade",
    cookie_consent_accept: "Aceitar",
    cookie_consent_decline: "Recusar",
  },

  "es-ES": {
    nav_home: "Inicio",
    nav_library: "Biblioteca",
    nav_explore: "Explorar",
    search_placeholder: "Buscar películas o series...",
    login_btn: "Iniciar sesión",
    sign_in: "Iniciar sesión",
    sign_out: "Cerrar sesión",
    sign_up: "Registrarse",
    create_account: "Crear cuenta",
    manage_account: "Gestionar cuenta",
    username_label: "Nombre de Usuario",
    email_label: "Correo electrónico",
    password_label: "Contraseña",
    confirm_password_label: "Confirmar contraseña",
    close: "Cerrar",
    hello_user: "Hola",
    session_ended: "Sesión cerrada",
    already_have_account: "¿Ya tienes una cuenta?",
    no_account_prompt: "¿No tienes una cuenta?",
    fill_all_fields: "Por favor complete todos los campos",
    username_min_length:
      "Por favor introduzca un nombre de usuario con al menos 2 caracteres",
    password_min_length:
      "Por favor introduzca una contraseña con al menos 6 caracteres",
    password_max_length:
      "Por favor introduzca una contraseña con menos de 20 caracteres",
    passwords_dont_match: "Las contraseñas no coinciden",
    invalid_email: "Por favor introduzca un correo electrónico válido",
    network_error: "Error de red. Comprueba tu conexión e inténtalo de nuevo.",
    signup_failed: "No se pudo crear la cuenta. Inténtelo de nuevo.",
    too_many_requests: "Demasiados intentos. Por favor inténtalo más tarde.",
    login_success: "¡Inicio de sesión con éxito!",
    login_failed: "Credenciales incorrectas. Inténtelo de nuevo.",
    account_created_success: "¡Cuenta creada con éxito!",
    user_already_exists: "Este usuario ya existe",
    continue_with_google: "Continuar con Google",
    auth_divider_or: "O",
    google_auth_failed:
      "Error al autenticar con Google. Por favor inténtelo de nuevo.",
    trending_movies: "Películas en Tendencia",
    trending_series: "Series en Tendencia",
    popular_movies: "Películas Populares",
    popular_series: "Series Populares",
    top_rated_movies: "Películas Mejor Valoradas",
    top_rated_series: "Series Mejor Valoradas",
    see_more: "Ver más",
    watch_now: "Ver ahora",
    watch_trailer: "Ver Tráiler",
    details: "Detalles",
    where_to_watch: "Dónde ver",
    trailers_clips: "Tráilers y Vídeos",
    you_may_like: "También te puede interesar",
    starring: "Reparto",
    directed_by: "Dirigido por",
    add_to_playlist: "Añadir a la lista",
    save_to_playlist: "Guardar en lista",
    select_playlist: "Seleccionar lista",
    auth_prompt_detail:
      "Inicia sesión para crear listas personalizadas y guardar tus películas y series favoritas.",
    genres_title: "Géneros",
    movies: "Películas",
    series: "Series",
    anime: "Anime",
    sort_trending: "Tendencia",
    sort_popularity: "Populares",
    sort_top_rated: "Mejor Valorados",
    sort_release_date: "Nuevos",
    all_providers: "Todos los proveedores",
    exclude_animations: "Excluir animaciones",
    genre_action: "Acción",
    genre_adventure: "Aventura",
    genre_animation: "Animación",
    genre_drama: "Drama",
    genre_romance: "Romance",
    genre_crime: "Crimen",
    genre_comedy: "Comedia",
    genre_scifi: "Ciencia Ficción",
    genre_fantasy: "Fantasía",
    genre_documentary: "Documental",
    genre_history: "Historia",
    genre_thriller: "Suspense",
    genre_horror: "Terror",
    genre_western: "Western",
    genre_war: "Guerra",
    your_playlists: "Tus Listas",
    new_playlist: "Nueva Lista",
    create_playlist_title: "Crear Nueva Lista",
    enter_playlist_name: "Introduce el nombre de la lista",
    remove_from_playlist: "Eliminar de la lista",
    confirm_remove_item:
      "¿Seguro que quieres eliminar este título de la lista?",
    delete_playlist: "Eliminar Lista",
    confirm_delete_playlist:
      "¿Estás seguro de que deseas eliminar esta lista y todas sus películas y series? Esta acción no se puede deshacer.",
    deleting: "Eliminando...",
    cancel: "Cancelar",
    remove: "Eliminar",
    create: "Crear",
    delete: "Eliminar",
    library_auth_title: "Tu Biblioteca Personal",
    library_auth_text:
      "Inicia sesión para crear listas personalizadas, organizar tus películas y series favoritas y acceder a tu colección en cualquier lugar.",
    no_playlists_title: "Sin listas todavía",
    no_playlists_text:
      "Aún no has creado ninguna lista. Haz clic en 'Nueva Lista' para comenzar a organizar tus favoritos.",
    explore_catalog: "Explorar Catálogo",
    empty_playlist_title: "Esta lista está vacía",
    empty_playlist_text:
      "No hay películas o series en esta lista. Explora el catálogo y haz clic en 'Añadir a la lista'.",
    explore_titles: "Explorar Títulos",
    search_results: "Resultados de Búsqueda para",
    no_results_title: "No se encontraron resultados",
    no_results_text:
      "No pudimos encontrar películas o series que coincidan con",
    footer_navigation: "Navegación",
    footer_copyright: "Todos los derechos reservados.",
    footer_tmdb_disclaimer:
      "Este producto utiliza la API de TMDB pero no está respaldado ni certificado por TMDB.",
    footer_privacy: "Política de Privacidad",

    // Política de Privacidad
    privacy_title: "Política de Privacidad",
    privacy_last_updated: "Última actualización: Septiembre de 2026",
    privacy_intro_title: "1. Introducción y Responsable del Tratamiento",
    privacy_intro_text:
      "TopCinema es una plataforma informativa de descubrimiento de películas y series. Valoramos su privacidad y nos comprometemos a proteger sus datos personales de conformidad con el Reglamento General de Protección de Datos (RGPD). Para cualquier pregunta o solicitud sobre sus datos personales, puede contactarnos directamente en support@topcinema.fyi.",
    privacy_data_title: "2. Datos que Recopilamos",
    privacy_data_auth_subtitle: "Cuenta y Autenticación",
    privacy_data_auth_text:
      "Al registrarse o iniciar sesión mediante correo/contraseña o Google Sign-In, procesamos su dirección de correo electrónico, nombre de usuario e identificador único de usuario (UID) a través de Google Firebase Authentication.",
    privacy_data_library_subtitle: "Listas de Reproducción y Biblioteca",
    privacy_data_library_text:
      "Cuando crea listas personalizadas o guarda películas y series, esta información se almacena de forma segura en Google Cloud Firestore asociada a su cuenta.",
    privacy_data_local_subtitle: "Preferencias y Almacenamiento Local",
    privacy_data_local_text:
      "Utilizamos el almacenamiento local del navegador (localStorage) para recordar su idioma preferido, filtros de catálogo y estado de sesión entre visitas.",
    privacy_purpose_title: "3. Finalidad del Tratamiento",
    privacy_purpose_text:
      "Sus datos se utilizan exclusivamente para autenticar su cuenta, sincronizar sus listas entre dispositivos y mantener sus preferencias de interfaz. No vendemos ni monetizamos sus datos personales.",
    privacy_third_party_title: "4. Servicios de Terceros y Enlaces Externos",
    privacy_third_party_intro:
      "TopCinema se integra con servicios de terceros de confianza para ofrecer sus funciones:",
    privacy_third_party_firebase:
      "Google Firebase: Proporciona autenticación segura y base de datos Cloud Firestore.",
    privacy_third_party_tmdb:
      "The Movie Database (TMDB): Proporciona metadatos, carteles, trailers e información del elenco. Este producto utiliza la API de TMDB pero no está respaldado ni certificado por TMDB.",
    privacy_third_party_cloudflare:
      "Cloudflare: Proporciona distribución de contenido, proxy y protección de seguridad.",
    privacy_third_party_streaming:
      "Enlaces a Plataformas de Streaming: Nuestras páginas muestran dónde ver cada título (ej. Netflix, Prime Video, Disney+). Al hacer clic en estos enlaces, será redirigido a servicios externos sujetos a sus propias políticas de privacidad.",
    privacy_third_party_analytics:
      "Google Analytics 4: Recopila estadísticas de navegación agregadas y anónimas para mejorar el rendimiento del sitio. La personalización de anuncios y Google Signals están desactivados.",
    privacy_cookies_title: "5. Cookies y Seguimiento",
    privacy_cookies_text:
      "TopCinema utiliza almacenamiento local esencial y tokens de seguridad estrictamente para la autenticación a través de Google Firebase y preferencias de interfaz. Con su consentimiento, también utilizamos cookies de Google Analytics  para analizar tendencias de tráfico anónimas. Nunca se utilizan cookies publicitarias ni de remarketing. Puede aceptar o rechazar las cookies analíticas en cualquier momento mediante nuestro aviso de cookies.",
    privacy_rights_title: "6. Sus Derechos bajo el RGPD",
    privacy_rights_text:
      "De acuerdo con el Reglamento General de Protección de Datos (RGPD), tiene derecho a acceder, rectificar o solicitar la eliminación permanente de su cuenta y listas. Para ejercer sus derechos, escriba a support@topcinema.fyi. Las solicitudes se procesan en un plazo de 30 días.",
    privacy_security_title: "7. Seguridad y Conservación de Datos",
    privacy_security_text:
      "Mantenemos reglas de seguridad en Cloud Firestore para proteger sus listas contra accesos no autorizados. Sus datos se conservan mientras su cuenta permanezca activa.",
    privacy_contact_title: "8. Contacto",
    privacy_contact_text:
      "Si tiene preguntas sobre esta Política de Privacidad o sus datos personales, contáctenos directamente en:",
    cookie_consent_text: "Utilizamos cookies para mejorar su experiencia de navegación. Obtenga más información en nuestra",
    cookie_consent_privacy: "Política de Privacidad",
    cookie_consent_accept: "Aceptar",
    cookie_consent_decline: "Rechazar",
  },

  "fr-FR": {
    nav_home: "Accueil",
    nav_library: "Bibliothèque",
    nav_explore: "Explorer",
    search_placeholder: "Rechercher des films ou séries...",
    login_btn: "Connexion",
    sign_in: "Se connecter",
    sign_out: "Déconnexion",
    sign_up: "S'inscrire",
    create_account: "Créer un compte",
    manage_account: "Gérer le compte",
    username_label: "Nom d'utilisateur",
    email_label: "E-mail",
    password_label: "Mot de passe",
    confirm_password_label: "Confirmer le mot de passe",
    close: "Fermer",
    hello_user: "Bonjour",
    session_ended: "Session terminée",
    already_have_account: "Vous avez déjà un compte ?",
    no_account_prompt: "Vous n'avez pas de compte ?",
    fill_all_fields: "Veuillez remplir tous les champs",
    username_min_length:
      "Veuillez saisir un nom d'utilisateur d'au moins 2 caractères",
    password_min_length:
      "Veuillez saisir un mot de passe d'au moins 6 caractères",
    password_max_length:
      "Veuillez saisir un mot de passe de moins de 20 caractères",
    passwords_dont_match: "Les mots de passe ne correspondent pas",
    invalid_email: "Veuillez saisir une adresse e-mail valide",
    network_error:
      "Erreur réseau. Veuillez vérifier votre connexion et réessayer.",
    signup_failed: "Échec de la création du compte. Veuillez réessayer.",
    too_many_requests: "Trop de tentatives. Veuillez réessayer plus tard.",
    login_success: "Connexion réussie !",
    login_failed: "Identifiants incorrects. Veuillez réessayer.",
    account_created_success: "Compte créé avec succès !",
    user_already_exists: "Cet utilisateur existe déjà",
    continue_with_google: "Continuer avec Google",
    auth_divider_or: "OU",
    google_auth_failed:
      "Échec de l'authentification avec Google. Veuillez réessayer.",
    trending_movies: "Films Tendances",
    trending_series: "Séries Tendances",
    popular_movies: "Films Populaires",
    popular_series: "Séries Populaires",
    top_rated_movies: "Films les Mieux Notés",
    top_rated_series: "Séries les Mieux Notées",
    see_more: "Voir plus",
    watch_now: "Regarder",
    watch_trailer: "Voir la Bande-Annonce",
    details: "Détails",
    where_to_watch: "Où regarder",
    trailers_clips: "Bandes-annonces et Extraits",
    you_may_like: "Vous pourriez aussi aimer",
    starring: "Avec",
    directed_by: "Réalisé par",
    add_to_playlist: "Ajouter à la playlist",
    save_to_playlist: "Enregistrer dans la playlist",
    select_playlist: "Sélectionner une playlist",
    auth_prompt_detail:
      "Connectez-vous pour créer des playlists personnalisées et enregistrer vos films et séries préférés.",
    genres_title: "Genres",
    movies: "Films",
    series: "Séries",
    anime: "Anime",
    sort_trending: "Tendances",
    sort_popularity: "Populaires",
    sort_top_rated: "Mieux Notés",
    sort_release_date: "Nouveautés",
    all_providers: "Tous les fournisseurs",
    exclude_animations: "Exclure les animations",
    genre_action: "Action",
    genre_adventure: "Aventure",
    genre_animation: "Animation",
    genre_drama: "Drame",
    genre_romance: "Romance",
    genre_crime: "Crime",
    genre_comedy: "Comédie",
    genre_scifi: "Science-Fiction",
    genre_fantasy: "Fantastique",
    genre_documentary: "Documentaire",
    genre_history: "Histoire",
    genre_thriller: "Thriller",
    genre_horror: "Horreur",
    genre_western: "Western",
    genre_war: "Guerre",
    your_playlists: "Vos Playlists",
    new_playlist: "Nouvelle Playlist",
    create_playlist_title: "Créer une Nouvelle Playlist",
    enter_playlist_name: "Entrez le nom de la playlist",
    remove_from_playlist: "Retirer de la playlist",
    confirm_remove_item:
      "Voulez-vous vraiment retirer ce titre de la playlist ?",
    delete_playlist: "Supprimer la playlist",
    confirm_delete_playlist:
      "Voulez-vous vraiment supprimer cette playlist et tous ses films et séries ? Cette action est irréversible.",
    deleting: "Suppression...",
    cancel: "Annuler",
    remove: "Supprimer",
    create: "Créer",
    delete: "Supprimer",
    library_auth_title: "Votre Bibliothèque Personnelle",
    library_auth_text:
      "Connectez-vous pour créer des playlists personnalisées, organiser vos films et séries préférés et accéder à votre collection partout.",
    no_playlists_title: "Aucune playlist pour l'instant",
    no_playlists_text:
      "Vous n'avez pas encore créé de playlist. Cliquez sur 'Nouvelle Playlist' pour organiser vos favoris.",
    explore_catalog: "Explorer le Catalogue",
    empty_playlist_title: "Cette playlist est vide",
    empty_playlist_text:
      "Aucun film ou série ajouté à cette playlist. Explorez le catalogue et cliquez sur 'Ajouter à la playlist'.",
    explore_titles: "Explorer les Titres",
    search_results: "Résultats de Recherche pour",
    no_results_title: "Aucun Résultat Trouvé",
    no_results_text: "Nous n'avons trouvé aucun film ou série correspondant à",
    footer_navigation: "Navigation",
    footer_copyright: "Tous droits réservés.",
    footer_tmdb_disclaimer:
      "Ce produit utilise l'API TMDB mais n'est pas approuvé ou certifié par TMDB.",
    footer_privacy: "Politique de Confidentialité",

    // Politique de Confidentialité
    privacy_title: "Politique de Confidentialité",
    privacy_last_updated: "Dernière mise à jour : Septembre 2026",
    privacy_intro_title: "1. Introduction et Responsable du Traitement",
    privacy_intro_text:
      "TopCinema est une plateforme informative de découverte de films et séries. Nous accordons une grande importance à votre vie privée et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD). Pour toute question ou demande concernant vos données personnelles, contactez-nous directement à support@topcinema.fyi.",
    privacy_data_title: "2. Données Collectées",
    privacy_data_auth_subtitle: "Compte et Authentification",
    privacy_data_auth_text:
      "Lorsque vous vous inscrivez ou vous connectez avec email/mot de passe ou Google Sign-In, nous traitons votre adresse email, nom d'utilisateur et identifiant unique (UID) via Google Firebase Authentication.",
    privacy_data_library_subtitle: "Playlists et Bibliothèque",
    privacy_data_library_text:
      "Lorsque vous créez des playlists ou enregistrez des films et séries, ces informations sont stockées en toute sécurité sur Google Cloud Firestore associées à votre compte.",
    privacy_data_local_subtitle: "Préférences et Stockage Local",
    privacy_data_local_text:
      "Nous utilisons le stockage local du navigateur (localStorage) pour mémoriser votre langue préférée, vos filtres de catalogue et l'état de votre session entre les visites.",
    privacy_purpose_title: "3. Utilisation des Données",
    privacy_purpose_text:
      "Vos données sont utilisées exclusivement pour vous authentifier, synchroniser vos listes sur vos appareils et maintenir vos préférences d'interface. Nous ne vendons ni ne monétisons vos données personnelles.",
    privacy_third_party_title: "4. Services Tiers et Liens Externes",
    privacy_third_party_intro:
      "TopCinema s'intègre à des services tiers réputés pour assurer son fonctionnement :",
    privacy_third_party_firebase:
      "Google Firebase : Fournit les services d'authentification sécurisée et de base de données Cloud Firestore.",
    privacy_third_party_tmdb:
      "The Movie Database (TMDB) : Fournit les métadonnées de films, affiches, bandes-annonces et castings. Ce produit utilise l'API TMDB mais n'est pas approuvé ou certifié par TMDB.",
    privacy_third_party_cloudflare:
      "Cloudflare : Assure la distribution de contenu, la protection réseau et le proxy d'API.",
    privacy_third_party_streaming:
      "Liens vers les Plateformes de Streaming : Nos fiches détaillées affichent où visionner les œuvres (ex. Netflix, Prime Video, Disney+). En cliquant sur ces liens, vous êtes redirigé vers des services tiers dotés de leurs propres politiques de confidentialité.",
    privacy_third_party_analytics:
      "Google Analytics 4 : Collecte des statistiques de navigation agrégées et anonymes pour améliorer les performances. La personnalisation des annonces et Google Signals sont désactivés.",
    privacy_cookies_title: "5. Cookies et Traçage",
    privacy_cookies_text:
      "TopCinema utilise un stockage local essentiel et des jetons de sécurité strictement pour l'authentification via Google Firebase et les préférences d'interface. Avec votre consentement, nous utilisons également des cookies Google Analytics pour analyser les tendances de trafic anonymes. Aucun cookie publicitaire ou de reciblage n'est utilisé. Vous pouvez accepter ou refuser les cookies analytiques à tout moment via notre bandeau de consentement.",
    privacy_rights_title: "6. Vos Droits (RGPD)",
    privacy_rights_text:
      "Conformément au RGPD européen, vous disposez d'un droit d'accès, de rectification et de suppression définitive de votre compte et de vos playlists. Pour faire valoir vos droits, écrivez à support@topcinema.fyi. Les demandes sont traitées sous 30 jours.",
    privacy_security_title: "7. Sécurité et Conservation des Données",
    privacy_security_text:
      "Nous appliquons des règles de sécurité strictes sur Cloud Firestore pour protéger vos playlists contre tout accès non autorisé. Vos données sont conservées tant que votre compte est actif.",
    privacy_contact_title: "8. Nous Contacter",
    privacy_contact_text:
      "Pour toute question relative à cette Politique de Confidentialité ou à vos données personnelles, contactez-nous directement à :",
    cookie_consent_text: "Nous utilisons des cookies pour améliorer votre expérience de navigation. En savoir plus dans notre",
    cookie_consent_privacy: "Politique de Confidentialité",
    cookie_consent_accept: "Accepter",
    cookie_consent_decline: "Refuser",
  },

  "de-DE": {
    nav_home: "Startseite",
    nav_library: "Bibliothek",
    nav_explore: "Erkunden",
    search_placeholder: "Filme oder Serien suchen...",
    login_btn: "Anmelden",
    sign_in: "Anmelden",
    sign_out: "Abmelden",
    sign_up: "Registrieren",
    create_account: "Konto erstellen",
    manage_account: "Konto verwalten",
    username_label: "Benutzername",
    email_label: "E-Mail",
    password_label: "Passwort",
    confirm_password_label: "Passwort bestätigen",
    close: "Schließen",
    hello_user: "Hallo",
    session_ended: "Sitzung beendet",
    already_have_account: "Bereits ein Konto?",
    no_account_prompt: "Noch kein Konto?",
    fill_all_fields: "Bitte füllen Sie alle Felder aus",
    username_min_length:
      "Bitte geben Sie einen Benutzernamen mit mindestens 2 Zeichen ein",
    password_min_length:
      "Bitte geben Sie ein Passwort mit mindestens 6 Zeichen ein",
    password_max_length:
      "Bitte geben Sie ein Passwort mit weniger als 20 Zeichen ein",
    passwords_dont_match: "Passwörter stimmen nicht überein",
    invalid_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    network_error:
      "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
    signup_failed:
      "Konto konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
    too_many_requests:
      "Zu viele Versuche. Bitte versuchen Sie es später erneut.",
    login_success: "Erfolgreich angemeldet!",
    login_failed: "Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.",
    account_created_success: "Konto erfolgreich erstellt!",
    user_already_exists: "Dieser Benutzer existiert bereits",
    continue_with_google: "Weiter mit Google",
    auth_divider_or: "ODER",
    google_auth_failed:
      "Authentifizierung mit Google fehlgeschlagen. Bitte versuchen Sie es erneut.",
    trending_movies: "Angesagte Filme",
    trending_series: "Angesagte Serien",
    popular_movies: "Beliebte Filme",
    popular_series: "Beliebte Serien",
    top_rated_movies: "Bestbewertete Filme",
    top_rated_series: "Bestbewertete Serien",
    see_more: "Mehr anzeigen",
    watch_now: "Jetzt ansehen",
    watch_trailer: "Trailer ansehen",
    details: "Details",
    where_to_watch: "Wo streamen",
    trailers_clips: "Trailer und Clips",
    you_may_like: "Das könnte Ihnen auch gefallen",
    starring: "Besetzung",
    directed_by: "Regie von",
    add_to_playlist: "Zur Playlist hinzufügen",
    save_to_playlist: "In Playlist speichern",
    select_playlist: "Playlist auswählen",
    auth_prompt_detail:
      "Melden Sie sich an, um eigene Playlists zu erstellen und Ihre Lieblingsfilme und -serien zu speichern.",
    genres_title: "Genres",
    movies: "Filme",
    series: "Serien",
    anime: "Anime",
    sort_trending: "Im Trend",
    sort_popularity: "Beliebt",
    sort_top_rated: "Bestbewertet",
    sort_release_date: "Neu",
    all_providers: "Alle Anbieter",
    exclude_animations: "Animationen ausschließen",
    genre_action: "Action",
    genre_adventure: "Abenteuer",
    genre_animation: "Animation",
    genre_drama: "Drama",
    genre_romance: "Liebesfilm",
    genre_crime: "Krimi",
    genre_comedy: "Komödie",
    genre_scifi: "Sci-Fi",
    genre_fantasy: "Fantasy",
    genre_documentary: "Dokumentation",
    genre_history: "Historie",
    genre_thriller: "Thriller",
    genre_horror: "Horror",
    genre_western: "Western",
    genre_war: "Kriegsfilm",
    your_playlists: "Ihre Playlists",
    new_playlist: "Neue Playlist",
    create_playlist_title: "Neue Playlist erstellen",
    enter_playlist_name: "Playlist-Namen eingeben",
    remove_from_playlist: "Aus Playlist entfernen",
    confirm_remove_item:
      "Möchten Sie diesen Titel wirklich aus der Playlist entfernen?",
    delete_playlist: "Playlist löschen",
    confirm_delete_playlist:
      "Möchten Sie diese Playlist und alle ihre Filme und Serien wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
    deleting: "Wird gelöscht...",
    cancel: "Abbrechen",
    remove: "Entfernen",
    create: "Erstellen",
    delete: "Löschen",
    library_auth_title: "Ihre persönliche Bibliothek",
    library_auth_text:
      "Melden Sie sich an, um eigene Playlists zu erstellen, Ihre Lieblingsfilme und -serien zu organisieren und überall auf Ihre Sammlung zuzugreifen.",
    no_playlists_title: "Noch keine Playlists",
    no_playlists_text:
      "Sie haben noch keine Playlists erstellt. Klicken Sie auf 'Neue Playlist', um zu beginnen.",
    explore_catalog: "Katalog erkunden",
    empty_playlist_title: "Diese Playlist ist leer",
    empty_playlist_text:
      "Keine Filme oder Serien in dieser Playlist. Erkunden Sie den Katalog und fügen Sie Titel hinzu.",
    explore_titles: "Titel erkunden",
    search_results: "Suchergebnisse für",
    no_results_title: "Keine Ergebnisse gefunden",
    no_results_text: "Wir konnten keine Filme oder Serien finden für",
    footer_navigation: "Navigation",
    footer_copyright: "Alle Rechte vorbehalten.",
    footer_tmdb_disclaimer:
      "Dieses Produkt verwendet die TMDB-API, ist jedoch nicht von TMDB unterstützt oder zertifiziert.",
    footer_privacy: "Datenschutzerklärung",

    // Datenschutzerklärung
    privacy_title: "Datenschutzerklärung",
    privacy_last_updated: "Zuletzt aktualisiert: September 2026",
    privacy_intro_title: "1. Einführung und Verantwortlicher",
    privacy_intro_text:
      "TopCinema ist eine Plattform zur Entdeckung von Filmen und Serien. Wir schätzen Ihre Privatsphäre und schützen Ihre personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO). Bei Fragen zu Ihren Daten wenden Sie sich bitte direkt an support@topcinema.fyi.",
    privacy_data_title: "2. Erhobene Daten",
    privacy_data_auth_subtitle: "Konto und Authentifizierung",
    privacy_data_auth_text:
      "Wenn Sie sich mit E-Mail/Passwort oder Google Sign-In registrieren oder anmelden, verarbeiten wir Ihre E-Mail-Adresse, Ihren Benutzernamen und Ihre Benutzer-ID (UID) über Google Firebase Authentication.",
    privacy_data_library_subtitle: "Wiedergabelisten und Bibliothek",
    privacy_data_library_text:
      "Wenn Sie eigene Wiedergabelisten erstellen oder Filme und Serien speichern, werden diese Daten sicher in Google Cloud Firestore unter Ihrem Konto gespeichert.",
    privacy_data_local_subtitle: "Einstellungen und lokaler Speicher",
    privacy_data_local_text:
      "Wir nutzen den lokalen Browserspeicher (localStorage), um Ihre bevorzugte Sprache, Filter und den Sitzungsstatus zwischen den Besuchen zu speichern.",
    privacy_purpose_title: "3. Zweck der Datenverarbeitung",
    privacy_purpose_text:
      "Ihre Daten werden ausschließlich dazu verwendet, Ihr Konto zu authentifizieren, Ihre Listen geräteübergreifend zu synchronisieren und Ihre Benutzeroberfläche anzupassen. Wir verkaufen keine personenbezogenen Daten.",
    privacy_third_party_title: "4. Drittanbieter und externe Links",
    privacy_third_party_intro:
      "TopCinema bindet vertrauenswürdige Drittanbieter ein:",
    privacy_third_party_firebase:
      "Google Firebase: Bietet Authentifizierung und Cloud Firestore-Datenbankdienste.",
    privacy_third_party_tmdb:
      "The Movie Database (TMDB): Liefert Filmdaten, Poster, Trailer und Besetzungslisten. Dieses Produkt nutzt die TMDB-API, wird jedoch nicht von TMDB unterstützt oder zertifiziert.",
    privacy_third_party_cloudflare:
      "Cloudflare: Sorgt für Content Delivery, Netzwerksicherheit und API-Proxy.",
    privacy_third_party_streaming:
      "Streaming-Plattform-Links: Unsere Detailseiten zeigen Links zu Streaming-Anbietern (z. B. Netflix, Prime Video, Disney+). Bei Anklicken gelten die Datenschutzrichtlinien der jeweiligen Drittanbieter.",
    privacy_third_party_analytics:
      "Google Analytics 4: Erfasst anonyme und aggregierte Nutzungsstatistiken zur Verbesserung der Website. Anzeigenpersonalisierung und Google-Signale sind vollständig deaktiviert.",
    privacy_cookies_title: "5. Cookies und Tracking",
    privacy_cookies_text:
      "TopCinema verwendet essenziellen lokalen Speicher und Sicherheitstoken ausschließlich für die Authentifizierung über Google Firebase und Benutzereinstellungen. Mit Ihrer Einwilligung verwenden wir zudem Google Analytics-Cookies, um anonyme Nutzungstrends zu analysieren. Werbe- oder Remarketing-Cookies werden niemals eingesetzt. Sie können Analyse-Cookies jederzeit über unser Cookie-Banner akzeptieren oder ablehnen.",
    privacy_rights_title: "6. Ihre Rechte gemäß DSGVO",
    privacy_rights_text:
      "Gemäß der europäischen DSGVO haben Sie das Recht auf Auskunft, Berichtigung und vollständige Löschung Ihres Kontos und Ihrer Listen. Wenden Sie sich hierzu an support@topcinema.fyi. Anfragen werden innerhalb von 30 Tagen bearbeitet.",
    privacy_security_title: "7. Datensicherheit und Aufbewahrung",
    privacy_security_text:
      "Wir setzen Cloud Firestore-Sicherheitsregeln ein, um Ihre Listen vor unbefugtem Zugriff zu schützen. Ihre Daten bleiben erhalten, solange Ihr Konto aktiv ist.",
    privacy_contact_title: "8. Kontakt",
    privacy_contact_text:
      "Bei Fragen zu dieser Datenschutzerklärung oder zu Ihren Daten wenden Sie sich bitte direkt an uns unter:",
    cookie_consent_text: "Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern. Erfahren Sie mehr in unserer",
    cookie_consent_privacy: "Datenschutzerklärung",
    cookie_consent_accept: "Akzeptieren",
    cookie_consent_decline: "Ablehnen",
  },

  "it-IT": {
    nav_home: "Home",
    nav_library: "Libreria",
    nav_explore: "Esplora",
    search_placeholder: "Cerca film o serie...",
    login_btn: "Accedi",
    sign_in: "Accedi",
    sign_out: "Esci",
    sign_up: "Registrati",
    create_account: "Crea account",
    manage_account: "Gestisci account",
    username_label: "Nome utente",
    email_label: "E-mail",
    password_label: "Password",
    confirm_password_label: "Conferma password",
    close: "Chiudi",
    hello_user: "Ciao",
    session_ended: "Sessione terminata",
    already_have_account: "Hai già un account?",
    no_account_prompt: "Non hai un account?",
    fill_all_fields: "Si prega di compilare tutti i campi",
    username_min_length: "Inserisci un nome utente di almeno 2 caratteri",
    password_min_length: "Inserisci una password di almeno 6 caratteri",
    password_max_length: "Inserisci una password con meno di 20 caratteri",
    passwords_dont_match: "Le password non coincidono",
    invalid_email: "Inserisci un indirizzo e-mail valido",
    network_error: "Errore di rete. Controlla la tua connessione e riprova.",
    signup_failed: "Impossibile creare l'account. Riprova.",
    too_many_requests: "Troppi tentativi. Riprova più tardi.",
    login_success: "Accesso effettuato con successo!",
    login_failed: "Credenziali errate. Riprova.",
    account_created_success: "Account creato con successo!",
    user_already_exists: "Questo utente esiste già",
    continue_with_google: "Continua con Google",
    auth_divider_or: "OPPURE",
    google_auth_failed: "Autenticazione con Google non riuscita. Riprova.",
    trending_movies: "Film di Tendenza",
    trending_series: "Serie di Tendenza",
    popular_movies: "Film Popolari",
    popular_series: "Serie Popolari",
    top_rated_movies: "Film Più Votati",
    top_rated_series: "Serie Più Votate",
    see_more: "Vedi altro",
    watch_now: "Guarda ora",
    watch_trailer: "Guarda Trailer",
    details: "Dettagli",
    where_to_watch: "Dove guardare",
    trailers_clips: "Trailer e Clip",
    you_may_like: "Potrebbero interessarti anche",
    starring: "Con",
    directed_by: "Diretto da",
    add_to_playlist: "Aggiungi alla playlist",
    save_to_playlist: "Salva nella playlist",
    select_playlist: "Seleziona playlist",
    auth_prompt_detail:
      "Accedi per creare playlist personalizzate e salvare i tuoi film e le tue serie preferite.",
    genres_title: "Generi",
    movies: "Film",
    series: "Serie",
    anime: "Anime",
    sort_trending: "Di Tendenza",
    sort_popularity: "Popolari",
    sort_top_rated: "Più Votati",
    sort_release_date: "Nuovi",
    all_providers: "Tutti i provider",
    exclude_animations: "Escludi animazioni",
    genre_action: "Azione",
    genre_adventure: "Avventura",
    genre_animation: "Animazione",
    genre_drama: "Dramma",
    genre_romance: "Romantico",
    genre_crime: "Crime",
    genre_comedy: "Commedia",
    genre_scifi: "Fantascienza",
    genre_fantasy: "Fantasy",
    genre_documentary: "Documentario",
    genre_history: "Storia",
    genre_thriller: "Thriller",
    genre_horror: "Horror",
    genre_western: "Western",
    genre_war: "Guerra",
    your_playlists: "Le Tue Playlist",
    new_playlist: "Nuova Playlist",
    create_playlist_title: "Crea Nuova Playlist",
    enter_playlist_name: "Inserisci il nome della playlist",
    remove_from_playlist: "Rimuovi dalla playlist",
    confirm_remove_item:
      "Sei sicuro di voler rimuovere questo titolo dalla playlist?",
    delete_playlist: "Elimina playlist",
    confirm_delete_playlist:
      "Sei sicuro di voler eliminare questa playlist e tutti i suoi film e serie? Questa azione non può essere annullata.",
    deleting: "Eliminazione...",
    cancel: "Annulla",
    remove: "Rimuovi",
    create: "Crea",
    delete: "Elimina",
    library_auth_title: "La Tua Libreria Personale",
    library_auth_text:
      "Accedi per creare playlist personalizzate, organizzare i tuoi film e serie preferiti e accedere alla tua collezione ovunque.",
    no_playlists_title: "Ancora nessuna playlist",
    no_playlists_text:
      "Non hai ancora creato alcuna playlist. Fai clic su 'Nuova Playlist' per iniziare.",
    explore_catalog: "Esplora Catalogo",
    empty_playlist_title: "Questa playlist è vuota",
    empty_playlist_text:
      "Nessun film o serie aggiunto a questa playlist. Esplora il catalogo e fai clic su 'Aggiungi alla playlist'.",
    explore_titles: "Esplora Titoli",
    search_results: "Risultati di Ricerca per",
    no_results_title: "Nessun Risultato Trovato",
    no_results_text:
      "Non siamo riusciti a trovare film o serie corrispondenti a",
    footer_navigation: "Navigazione",
    footer_copyright: "Tutti i diritti riservati.",
    footer_tmdb_disclaimer:
      "Questo prodotto utilizza l'API di TMDB ma non è approvato o certificato da TMDB.",
    footer_privacy: "Informativa sulla Privacy",

    // Informativa sulla Privacy
    privacy_title: "Informativa sulla Privacy",
    privacy_last_updated: "Ultimo aggiornamento: Settembre 2026",
    privacy_intro_title: "1. Introduzione e Titolare del Trattamento",
    privacy_intro_text:
      "TopCinema è una piattaforma informativa per scoprire film e serie TV. Teniamo alla tua privacy e proteggiamo i tuoi dati personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR). Per qualsiasi richiesta o domanda relativa ai tuoi dati personali, puoi contattarci direttamente all'indirizzo support@topcinema.fyi.",
    privacy_data_title: "2. Dati che Raccogliamo",
    privacy_data_auth_subtitle: "Account e Autenticazione",
    privacy_data_auth_text:
      "Quando ti registri o accedi con email/password o Google Sign-In, elaboriamo il tuo indirizzo email, nome utente e identificatore univoco (UID) tramite Google Firebase Authentication.",
    privacy_data_library_subtitle: "Playlist e Libreria",
    privacy_data_library_text:
      "Quando crei playlist personalizzate o salvi film e serie TV, queste informazioni vengono memorizzate in modo sicuro in Google Cloud Firestore associate al tuo account.",
    privacy_data_local_subtitle: "Preferenze e Archiviazione Locale",
    privacy_data_local_text:
      "Utilizziamo l'archiviazione locale del browser (localStorage) per memorizzare la lingua preferita, i filtri del catalogo e lo stato della sessione tra le visite.",
    privacy_purpose_title: "3. Finalità del Trattamento",
    privacy_purpose_text:
      "I tuoi dati vengono utilizzati esclusivamente per autenticare il tuo account, sincronizzare le tue playlist tra i dispositivi e mantenere le tue preferenze d'interfaccia. Non vendiamo né monetizziamo i tuoi dati personali.",
    privacy_third_party_title: "4. Servizi di Terze Parti e Link Esterni",
    privacy_third_party_intro:
      "TopCinema si integra con servizi terzi affidabili per erogare le proprie funzionalità:",
    privacy_third_party_firebase:
      "Google Firebase: Fornisce autenticazione sicura e database Cloud Firestore.",
    privacy_third_party_tmdb:
      "The Movie Database (TMDB): Fornisce metadati, locandine, trailer e dettagli del cast. Questo prodotto utilizza l'API TMDB ma non è approvato o certificato da TMDB.",
    privacy_third_party_cloudflare:
      "Cloudflare: Gestisce distribuzione dei contenuti, proxy di rete e sicurezza.",
    privacy_third_party_streaming:
      "Link a Piattaforme di Streaming: Le nostre pagine mostrano dove guardare ciascun titolo (es. Netflix, Prime Video, Disney+). Cliccando su questi link si accede a servizi terzi regolati dalle proprie informative sulla privacy.",
    privacy_third_party_analytics:
      "Google Analytics 4: Raccoglie statistiche di navigazione aggregate e anonime per migliorare le prestazioni. La personalizzazione degli annunci e i Google Signals sono disattivati.",
    privacy_cookies_title: "5. Cookie e Tracciamento",
    privacy_cookies_text:
      "TopCinema utilizza lo storage locale essenziale e token di sicurezza esclusivamente per l'autenticazione tramite Google Firebase e le preferenze d'interfaccia. Con il tuo consenso, utilizziamo anche cookie di Google Analytics per analizzare in modo anonimo le tendenze del traffico. Non vengono mai utilizzati cookie pubblicitari o di remarketing. Puoi accettare o rifiutare i cookie analitici in qualsiasi momento tramite il nostro banner dei cookie.",
    privacy_rights_title: "6. I Tuoi Diritti (GDPR)",
    privacy_rights_text:
      "Ai sensi del GDPR europeo, hai il diritto di accedere, rettificare o richiedere la cancellazione permanente del tuo account e delle playlist. Per esercitare i tuoi diritti, scrivi a support@topcinema.fyi. Le richieste vengono elaborate entro 30 giorni.",
    privacy_security_title: "7. Sicurezza e Conservazione dei Dati",
    privacy_security_text:
      "Applichiamo regole di sicurezza su Cloud Firestore per proteggere le tue playlist da accessi non autorizzati. I tuoi dati vengono conservati finché il tuo account rimane attivo.",
    privacy_contact_title: "8. Contatti",
    privacy_contact_text:
      "Per domande relative a questa Informativa sulla Privacy o ai tuoi dati personali, contattaci direttamente all'indirizzo:",
    cookie_consent_text: "Utilizziamo i cookie per migliorare la tua esperienza di navigazione. Scopri di più nella nostra",
    cookie_consent_privacy: "Informativa sulla Privacy",
    cookie_consent_accept: "Accetta",
    cookie_consent_decline: "Rifiuta",
  },
};

/**
 * Obtém o código do idioma ativo (ex: 'en-US', 'pt-PT')
 */
export function getLanguage() {
  if (typeof localStorage === "undefined") return DEFAULT_LANGUAGE;
  const saved = localStorage.getItem("topcinema_lang");
  if (saved && SUPPORTED_LANGUAGES[saved]) {
    return saved;
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Obtém a tradução de uma chave síncrona para o idioma atual
 */
export function getTranslation(key, lang = getLanguage()) {
  const dict =
    DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANGUAGE] || BASE_STRINGS;
  return dict[key] || BASE_STRINGS[key] || key;
}

export const t = getTranslation;

/**
 * Obtém o código curto de tradução (ex: 'en', 'pt', 'es')
 */
export function getTranslateCode(langCode = getLanguage()) {
  return SUPPORTED_LANGUAGES[langCode]?.translateCode || "en";
}

/**
 * Carrega as traduções da interface para o idioma ativo.
 * - Usa o dicionário nativo como fonte de verdade imediata e ultra-rápida.
 * - Suporta cache no localStorage e fallback suave.
 */
export async function loadTranslations(targetLang = getLanguage()) {
  if (targetLang === DEFAULT_LANGUAGE) {
    return { ...BASE_STRINGS };
  }

  const nativeDict = DICTIONARIES[targetLang] || {};
  const merged = { ...BASE_STRINGS, ...nativeDict };

  // Verifica se há novas chaves dinâmicas não mapeadas
  const missingKeys = Object.keys(BASE_STRINGS).filter((k) => !nativeDict[k]);
  if (missingKeys.length === 0) {
    return merged;
  }

  // Se houver chaves em falta, verifica se existem no localStorage
  const cacheKey = `topcinema_i18n_${targetLang}`;
  const hasStorage = typeof localStorage !== "undefined";
  const cached = hasStorage ? localStorage.getItem(cacheKey) : null;
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return { ...merged, ...parsed };
    } catch (e) {
      if (hasStorage) localStorage.removeItem(cacheKey);
    }
  }

  return merged;
}

/**
 * Aplica as traduções no DOM aos elementos com data-i18n, data-i18n-placeholder e data-i18n-title
 */
export async function applyI18n(translations) {
  if (!translations) {
    translations = await loadTranslations();
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[key]) {
      el.setAttribute("placeholder", translations[key]);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (translations[key]) {
      el.setAttribute("title", translations[key]);
      if (el.hasAttribute("aria-label")) {
        el.setAttribute("aria-label", translations[key]);
      }
    }
  });
}

/**
 * Muda o idioma ativo, atualiza o storage e recarrega a página
 */
export async function setLanguage(newLang) {
  if (!SUPPORTED_LANGUAGES[newLang]) return;
  const current = getLanguage();
  if (current === newLang) return;

  const hasStorage = typeof localStorage !== "undefined";
  if (hasStorage) {
    localStorage.setItem("topcinema_lang", newLang);
  }

  if (typeof window !== "undefined" && window.location) {
    window.location.reload();
  }
}

/**
 * Inicializa o Seletor de Idioma e aplica as traduções
 */
export async function initI18n() {
  const currentLang = getLanguage();
  const langConfig =
    SUPPORTED_LANGUAGES[currentLang] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];

  // Inserir seletor no header, movie-detail ou auth-container
  const header = document.querySelector("header.header");
  const movieDetail = document.querySelector(".movie-detail");
  const authContainer = document.querySelector(".auth-container");
  const mountTarget = header || movieDetail || authContainer || document.body;

  if (mountTarget && !document.getElementById("langSwitcher")) {
    const switcher = document.createElement("div");
    switcher.className = "lang-switcher";
    switcher.id = "langSwitcher";

    switcher.innerHTML = `
      <button class="lang-btn" id="langBtn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Change language">
        <i class="bi bi-globe"></i>
        <span class="lang-btn-current">${langConfig.short}</span>
        <i class="bi bi-chevron-down lang-arrow"></i>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        ${Object.values(SUPPORTED_LANGUAGES)
          .map(
            (lang) => `
          <button type="button" class="lang-item${lang.code === currentLang ? " active" : ""}" data-lang="${lang.code}">
            <span class="lang-flag">${lang.flag}</span>
            <span class="lang-name">${lang.name}</span>
          </button>
        `,
          )
          .join("")}
      </div>
    `;

    if (header) {
      const userBtn =
        header.querySelector(".user-btn") ||
        header.querySelector("#account-btn") ||
        header.querySelector(".account-btn");
      if (userBtn) {
        header.insertBefore(switcher, userBtn);
      } else {
        header.appendChild(switcher);
      }
    } else if (movieDetail) {
      movieDetail.appendChild(switcher);
    } else if (authContainer) {
      document.body.appendChild(switcher);
    } else {
      document.body.appendChild(switcher);
    }

    // Toggle dropdown
    const btn = switcher.querySelector("#langBtn");
    const dropdown = switcher.querySelector("#langDropdown");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("show");
      dropdown.classList.toggle("show", !isOpen);
      btn.setAttribute("aria-expanded", !isOpen);
    });

    // Selecionar idioma
    dropdown.querySelectorAll(".lang-item").forEach((item) => {
      item.addEventListener("click", () => {
        const selectedLang = item.getAttribute("data-lang");
        setLanguage(selectedLang);
      });
    });

    // Fechar ao clicar fora
    document.addEventListener("click", (e) => {
      if (!switcher.contains(e.target)) {
        dropdown.classList.remove("show");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Aplica as traduções aos elementos marcados
  await applyI18n();
}
