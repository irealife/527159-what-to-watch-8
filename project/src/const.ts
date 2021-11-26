enum AppRoute {
  Main ='/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  devReview = '/user/:id/review'
}

enum APIRoute {
  Films = '/films',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
  PromoFilm = '/promo',
  FavoriteFilms = 'favorite',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum Genres {
  AllGenres = 'All genres',
  Comedy = 'Comedy',
  Action = 'Action',
  Adventure = 'Adventure',
  Crime = 'Crime',
  Drama = 'Drama',
  Fantasy = 'Fantasy',
  Thriller = 'Thriller',
}

enum FavoriteStatus {
  Favorite = 1,
  NotFavorite = 0,
}

const INITIAL_FILMS_COUNT = 8;
const SHOW_MORE_STEP = 8;
const MAX_SIMILAR_FILMS_COUNT = 4;

export {
  AppRoute,
  APIRoute,
  AuthorizationStatus,
  Genres,
  FavoriteStatus,
  INITIAL_FILMS_COUNT,
  SHOW_MORE_STEP,
  MAX_SIMILAR_FILMS_COUNT
};
