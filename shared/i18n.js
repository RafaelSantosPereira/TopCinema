/**
 * --------------------------------------------------------------------------
 * TopCinema - Sistema de Internacionalização (i18n)
 * Idioma Padrão Oficial: Inglês (en-US)
 * Suporte Multi-idioma de Alta Performance com Dicionários Nativos e Cache
 * --------------------------------------------------------------------------
 */

export const SUPPORTED_LANGUAGES = {
  'en-US': { code: 'en-US', short: 'EN', name: 'English', flag: '🇬🇧', translateCode: 'en' },
  'pt-PT': { code: 'pt-PT', short: 'PT', name: 'Português', flag: '🇵🇹', translateCode: 'pt' },
  'es-ES': { code: 'es-ES', short: 'ES', name: 'Español', flag: '🇪🇸', translateCode: 'es' },
  'fr-FR': { code: 'fr-FR', short: 'FR', name: 'Français', flag: '🇫🇷', translateCode: 'fr' },
  'de-DE': { code: 'de-DE', short: 'DE', name: 'Deutsch', flag: '🇩🇪', translateCode: 'de' },
  'it-IT': { code: 'it-IT', short: 'IT', name: 'Italiano', flag: '🇮🇹', translateCode: 'it' }
};

export const DEFAULT_LANGUAGE = 'en-US';

/**
 * Dicionário Mestre em Inglês (Todas as frases fixas do TopCinema)
 */
export const BASE_STRINGS = {
  // Navegação e Header
  nav_home: "Home",
  nav_library: "Library",
  nav_explore: "Explore",
  search_placeholder: "Search any movies...",
  
  // Perfil e Autenticação
  login_btn: "Log In",
  sign_in: "Sign In",
  sign_out: "Sign Out",
  sign_up: "Sign Up",
  create_account: "Create Account",
  manage_account: "Manage Account",
  email_label: "Email",
  password_label: "Password",
  confirm_password_label: "Confirm Password",
  close: "Close",
  hello_user: "Hello",
  session_ended: "Session ended",
  already_have_account: "Already have an account?",
  no_account_prompt: "Don't have an account?",
  fill_all_fields: "Please fill in all fields",
  password_min_length: "Please enter a password with at least 4 characters",
  password_max_length: "Please enter a password with fewer than 20 characters",
  passwords_dont_match: "Passwords do not match",
  login_success: "Login successful!",
  login_failed: "Incorrect credentials. Please try again.",
  account_created_success: "Account created successfully!",
  user_already_exists: "This user already exists",
  
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
  auth_prompt_detail: "Log in to create custom playlists and save your favorite movies and TV shows.",
  
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
  confirm_remove_item: "Are you sure you want to remove this title from the playlist?",
  cancel: "Cancel",
  remove: "Remove",
  create: "Create",
  delete: "Delete",
  library_auth_title: "Your Personal Library",
  library_auth_text: "Log in to create custom playlists, organize your favorite movies and TV series, and access your collection anywhere.",
  no_playlists_title: "No playlists yet",
  no_playlists_text: "You haven't created any playlists yet. Click 'New Playlist' to start organizing your favorites.",
  explore_catalog: "Explore Catalog",
  empty_playlist_title: "This playlist is empty",
  empty_playlist_text: "No movies or TV shows added to this playlist yet. Explore the catalog and click 'Add to Playlist' on any title.",
  explore_titles: "Explore Titles",

  // Página de Pesquisa
  search_results: "Search Results for",
  no_results_title: "No Results Found",
  no_results_text: "We couldn't find any movies or TV series matching",

  // Rodapé
  footer_navigation: "Navigation",
  footer_copyright: "All rights reserved.",
  footer_developed_by: "Developed by",
  footer_tmdb_disclaimer: "This product uses the TMDB API but is not endorsed or certified by TMDB."
};

/**
 * Dicionários Nativos Oficiais para Garantir Tradução Precisa e Imediata
 */
export const DICTIONARIES = {
  'en-US': BASE_STRINGS,

  'pt-PT': {
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
    email_label: "Email",
    password_label: "Palavra-passe",
    confirm_password_label: "Confirmar Palavra-passe",
    close: "Fechar",
    hello_user: "Olá",
    session_ended: "Sessão terminada",
    already_have_account: "Já tem uma conta?",
    no_account_prompt: "Não tem uma conta?",
    fill_all_fields: "Por favor preencha todos os campos",
    password_min_length: "Por favor insira uma palavra-passe com pelo menos 4 caracteres",
    password_max_length: "Por favor insira uma palavra-passe com menos de 20 caracteres",
    passwords_dont_match: "As palavras-passe não coincidem",
    login_success: "Sessão iniciada com sucesso!",
    login_failed: "Credenciais incorretas. Por favor tente novamente.",
    account_created_success: "Conta criada com sucesso!",
    user_already_exists: "Este utilizador já existe",
    
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
    auth_prompt_detail: "Inicie sessão para criar listas personalizadas e guardar os seus filmes e séries favoritos.",
    
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
    confirm_remove_item: "Tem a certeza que deseja remover este título da lista?",
    cancel: "Cancelar",
    remove: "Remover",
    create: "Criar",
    delete: "Eliminar",
    library_auth_title: "A Sua Biblioteca Pessoal",
    library_auth_text: "Inicie sessão para criar listas personalizadas, organizar os seus filmes e séries favoritos e aceder à sua coleção em qualquer lugar.",
    no_playlists_title: "Ainda sem listas",
    no_playlists_text: "Ainda não criou nenhuma lista. Clique em 'Nova Lista' para começar a organizar os seus favoritos.",
    explore_catalog: "Explorar Catálogo",
    empty_playlist_title: "Esta lista está vazia",
    empty_playlist_text: "Nenhum filme ou série adicionado a esta lista. Explore o catálogo e clique em 'Adicionar à Lista' em qualquer título.",
    explore_titles: "Explorar Títulos",

    // Página de Pesquisa
    search_results: "Resultados da Pesquisa por",
    no_results_title: "Nenhum Resultado Encontrado",
    no_results_text: "Não encontramos filmes ou séries correspondentes a",

    // Rodapé
    footer_navigation: "Navegação",
    footer_copyright: "Todos os direitos reservados.",
    footer_developed_by: "Desenvolvido por",
    footer_tmdb_disclaimer: "Este produto utiliza a API do TMDB mas não é endossado ou certificado pelo TMDB."
  },

  'es-ES': {
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
    email_label: "Correo electrónico",
    password_label: "Contraseña",
    confirm_password_label: "Confirmar contraseña",
    close: "Cerrar",
    hello_user: "Hola",
    session_ended: "Sesión cerrada",
    already_have_account: "¿Ya tienes una cuenta?",
    no_account_prompt: "¿No tienes una cuenta?",
    fill_all_fields: "Por favor complete todos los campos",
    password_min_length: "Por favor introduzca una contraseña con al menos 4 caracteres",
    password_max_length: "Por favor introduzca una contraseña con menos de 20 caracteres",
    passwords_dont_match: "Las contraseñas no coinciden",
    login_success: "¡Inicio de sesión con éxito!",
    login_failed: "Credenciales incorrectas. Inténtelo de nuevo.",
    account_created_success: "¡Cuenta creada con éxito!",
    user_already_exists: "Este usuario ya existe",
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
    auth_prompt_detail: "Inicia sesión para crear listas personalizadas y guardar tus películas y series favoritas.",
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
    confirm_remove_item: "¿Seguro que quieres eliminar este título de la lista?",
    cancel: "Cancelar",
    remove: "Eliminar",
    create: "Crear",
    delete: "Eliminar",
    library_auth_title: "Tu Biblioteca Personal",
    library_auth_text: "Inicia sesión para crear listas personalizadas, organizar tus películas y series favoritas y acceder a tu colección en cualquier lugar.",
    no_playlists_title: "Sin listas todavía",
    no_playlists_text: "Aún no has creado ninguna lista. Haz clic en 'Nueva Lista' para comenzar a organizar tus favoritos.",
    explore_catalog: "Explorar Catálogo",
    empty_playlist_title: "Esta lista está vacía",
    empty_playlist_text: "No hay películas o series en esta lista. Explora el catálogo y haz clic en 'Añadir a la lista'.",
    explore_titles: "Explorar Títulos",
    search_results: "Resultados de Búsqueda para",
    no_results_title: "No se encontraron resultados",
    no_results_text: "No pudimos encontrar películas o series que coincidan con",
    footer_navigation: "Navegación",
    footer_copyright: "Todos los derechos reservados.",
    footer_developed_by: "Desarrollado por",
    footer_tmdb_disclaimer: "Este producto utiliza la API de TMDB pero no está respaldado ni certificado por TMDB."
  },

  'fr-FR': {
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
    email_label: "E-mail",
    password_label: "Mot de passe",
    confirm_password_label: "Confirmer le mot de passe",
    close: "Fermer",
    hello_user: "Bonjour",
    session_ended: "Session terminée",
    already_have_account: "Vous avez déjà un compte ?",
    no_account_prompt: "Vous n'avez pas de compte ?",
    fill_all_fields: "Veuillez remplir tous les champs",
    password_min_length: "Veuillez saisir un mot de passe d'au moins 4 caractères",
    password_max_length: "Veuillez saisir un mot de passe de moins de 20 caractères",
    passwords_dont_match: "Les mots de passe ne correspondent pas",
    login_success: "Connexion réussie !",
    login_failed: "Identifiants incorrects. Veuillez réessayer.",
    account_created_success: "Compte créé avec succès !",
    user_already_exists: "Cet utilisateur existe déjà",
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
    auth_prompt_detail: "Connectez-vous pour créer des playlists personnalisées et enregistrer vos films et séries préférés.",
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
    confirm_remove_item: "Voulez-vous vraiment retirer ce titre de la playlist ?",
    cancel: "Annuler",
    remove: "Supprimer",
    create: "Créer",
    delete: "Supprimer",
    library_auth_title: "Votre Bibliothèque Personnelle",
    library_auth_text: "Connectez-vous pour créer des playlists personnalisées, organiser vos films et séries préférés et accéder à votre collection partout.",
    no_playlists_title: "Aucune playlist pour l'instant",
    no_playlists_text: "Vous n'avez pas encore créé de playlist. Cliquez sur 'Nouvelle Playlist' pour organiser vos favoris.",
    explore_catalog: "Explorer le Catalogue",
    empty_playlist_title: "Cette playlist est vide",
    empty_playlist_text: "Aucun film ou série ajouté à cette playlist. Explorez le catalogue et cliquez sur 'Ajouter à la playlist'.",
    explore_titles: "Explorer les Titres",
    search_results: "Résultats de Recherche pour",
    no_results_title: "Aucun Résultat Trouvé",
    no_results_text: "Nous n'avons trouvé aucun film ou série correspondant à",
    footer_navigation: "Navigation",
    footer_copyright: "Tous droits réservés.",
    footer_developed_by: "Développé par",
    footer_tmdb_disclaimer: "Ce produit utilise l'API TMDB mais n'est pas approuvé ou certifié par TMDB."
  },

  'de-DE': {
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
    email_label: "E-Mail",
    password_label: "Passwort",
    confirm_password_label: "Passwort bestätigen",
    close: "Schließen",
    hello_user: "Hallo",
    session_ended: "Sitzung beendet",
    already_have_account: "Bereits ein Konto?",
    no_account_prompt: "Noch kein Konto?",
    fill_all_fields: "Bitte füllen Sie alle Felder aus",
    password_min_length: "Bitte geben Sie ein Passwort mit mindestens 4 Zeichen ein",
    password_max_length: "Bitte geben Sie ein Passwort mit weniger als 20 Zeichen ein",
    passwords_dont_match: "Passwörter stimmen nicht überein",
    login_success: "Erfolgreich angemeldet!",
    login_failed: "Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.",
    account_created_success: "Konto erfolgreich erstellt!",
    user_already_exists: "Dieser Benutzer existiert bereits",
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
    auth_prompt_detail: "Melden Sie sich an, um eigene Playlists zu erstellen und Ihre Lieblingsfilme und -serien zu speichern.",
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
    confirm_remove_item: "Möchten Sie diesen Titel wirklich aus der Playlist entfernen?",
    cancel: "Abbrechen",
    remove: "Entfernen",
    create: "Erstellen",
    delete: "Löschen",
    library_auth_title: "Ihre persönliche Bibliothek",
    library_auth_text: "Melden Sie sich an, um eigene Playlists zu erstellen, Ihre Lieblingsfilme und -serien zu organisieren und überall auf Ihre Sammlung zuzugreifen.",
    no_playlists_title: "Noch keine Playlists",
    no_playlists_text: "Sie haben noch keine Playlists erstellt. Klicken Sie auf 'Neue Playlist', um zu beginnen.",
    explore_catalog: "Katalog erkunden",
    empty_playlist_title: "Diese Playlist ist leer",
    empty_playlist_text: "Keine Filme oder Serien in dieser Playlist. Erkunden Sie den Katalog und fügen Sie Titel hinzu.",
    explore_titles: "Titel erkunden",
    search_results: "Suchergebnisse für",
    no_results_title: "Keine Ergebnisse gefunden",
    no_results_text: "Wir konnten keine Filme oder Serien finden für",
    footer_navigation: "Navigation",
    footer_copyright: "Alle Rechte vorbehalten.",
    footer_developed_by: "Entwickelt von",
    footer_tmdb_disclaimer: "Dieses Produkt verwendet die TMDB-API, ist jedoch nicht von TMDB unterstützt oder zertifiziert."
  },

  'it-IT': {
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
    email_label: "E-mail",
    password_label: "Password",
    confirm_password_label: "Conferma password",
    close: "Chiudi",
    hello_user: "Ciao",
    session_ended: "Sessione terminata",
    already_have_account: "Hai già un account?",
    no_account_prompt: "Non hai un account?",
    fill_all_fields: "Si prega di compilare tutti i campi",
    password_min_length: "Inserisci una password di almeno 4 caratteri",
    password_max_length: "Inserisci una password con meno di 20 caratteri",
    passwords_dont_match: "Le password non coincidono",
    login_success: "Accesso effettuato con successo!",
    login_failed: "Credenziali errate. Riprova.",
    account_created_success: "Account creato con successo!",
    user_already_exists: "Questo utente esiste già",
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
    auth_prompt_detail: "Accedi per creare playlist personalizzate e salvare i tuoi film e le tue serie preferite.",
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
    confirm_remove_item: "Sei sicuro di voler rimuovere questo titolo dalla playlist?",
    cancel: "Annulla",
    remove: "Rimuovi",
    create: "Crea",
    delete: "Elimina",
    library_auth_title: "La Tua Libreria Personale",
    library_auth_text: "Accedi per creare playlist personalizzate, organizzare i tuoi film e serie preferiti e accedere alla tua collezione ovunque.",
    no_playlists_title: "Ancora nessuna playlist",
    no_playlists_text: "Non hai ancora creato alcuna playlist. Fai clic su 'Nuova Playlist' per iniziare.",
    explore_catalog: "Esplora Catalogo",
    empty_playlist_title: "Questa playlist è vuota",
    empty_playlist_text: "Nessun film o serie aggiunto a questa playlist. Esplora il catalogo e fai clic su 'Aggiungi alla playlist'.",
    explore_titles: "Esplora Titoli",
    search_results: "Risultati di Ricerca per",
    no_results_title: "Nessun Risultato Trovato",
    no_results_text: "Non siamo riusciti a trovare film o serie corrispondenti a",
    footer_navigation: "Navigazione",
    footer_copyright: "Tutti i diritti riservati.",
    footer_developed_by: "Sviluppato da",
    footer_tmdb_disclaimer: "Questo prodotto utilizza l'API di TMDB ma non è approvato o certificato da TMDB."
  }
};

/**
 * Obtém o código do idioma ativo (ex: 'en-US', 'pt-PT')
 */
export function getLanguage() {
  if (typeof localStorage === 'undefined') return DEFAULT_LANGUAGE;
  const saved = localStorage.getItem('topcinema_lang');
  if (saved && SUPPORTED_LANGUAGES[saved]) {
    return saved;
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Obtém a tradução de uma chave síncrona para o idioma atual
 */
export function getTranslation(key, lang = getLanguage()) {
  const dict = DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANGUAGE] || BASE_STRINGS;
  return dict[key] || BASE_STRINGS[key] || key;
}

/**
 * Obtém o código curto de tradução (ex: 'en', 'pt', 'es')
 */
export function getTranslateCode(langCode = getLanguage()) {
  return SUPPORTED_LANGUAGES[langCode]?.translateCode || 'en';
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
  const missingKeys = Object.keys(BASE_STRINGS).filter(k => !nativeDict[k]);
  if (missingKeys.length === 0) {
    return merged;
  }

  // Se houver chaves em falta, verifica se existem no localStorage
  const cacheKey = `topcinema_i18n_${targetLang}`;
  const hasStorage = typeof localStorage !== 'undefined';
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

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key]) {
      el.setAttribute('placeholder', translations[key]);
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (translations[key]) {
      el.setAttribute('title', translations[key]);
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

  const hasStorage = typeof localStorage !== 'undefined';
  if (hasStorage) {
    localStorage.setItem('topcinema_lang', newLang);
  }

  if (typeof window !== 'undefined' && window.location) {
    window.location.reload();
  }
}

/**
 * Inicializa o Seletor de Idioma e aplica as traduções
 */
export async function initI18n() {
  const currentLang = getLanguage();
  const langConfig = SUPPORTED_LANGUAGES[currentLang] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];

  // Inserir seletor no header, movie-detail ou auth-container
  const header = document.querySelector('header.header');
  const movieDetail = document.querySelector('.movie-detail');
  const authContainer = document.querySelector('.auth-container');
  const mountTarget = header || movieDetail || authContainer || document.body;

  if (mountTarget && !document.getElementById('langSwitcher')) {
    const switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.id = 'langSwitcher';

    switcher.innerHTML = `
      <button class="lang-btn" id="langBtn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Change language">
        <i class="bi bi-globe"></i>
        <span class="lang-btn-current">${langConfig.short}</span>
        <i class="bi bi-chevron-down lang-arrow"></i>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        ${Object.values(SUPPORTED_LANGUAGES).map(lang => `
          <button type="button" class="lang-item${lang.code === currentLang ? ' active' : ''}" data-lang="${lang.code}">
            <span class="lang-flag">${lang.flag}</span>
            <span class="lang-name">${lang.name}</span>
          </button>
        `).join('')}
      </div>
    `;

    if (header) {
      const userBtn = header.querySelector('.user-btn') || header.querySelector('#account-btn') || header.querySelector('.account-btn');
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
    const btn = switcher.querySelector('#langBtn');
    const dropdown = switcher.querySelector('#langDropdown');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('show');
      dropdown.classList.toggle('show', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });

    // Selecionar idioma
    dropdown.querySelectorAll('.lang-item').forEach(item => {
      item.addEventListener('click', () => {
        const selectedLang = item.getAttribute('data-lang');
        setLanguage(selectedLang);
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!switcher.contains(e.target)) {
        dropdown.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Aplica as traduções aos elementos marcados
  await applyI18n();
}
