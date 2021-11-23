export enum AppRoute {
  Main ='/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  devReview = '/user/:id/review'
}

export enum APIRoute {
  Films = '/films',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
  //SimilarFilms = '/films/:id/similar',
  PromoFilm = '/promo',
  FavoriteFilms = 'favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Genres {
  AllGenres = 'All genres',
  Comedy = 'Comedy',
  Action = 'Action',
  Adventure = 'Adventure',
  Crime = 'Crime',
  Drama = 'Drama',
  Fantasy = 'Fantasy',
  Thriller = 'Thriller',
}

export enum FavoriteStatus {
  addFilmMyList = 1,
  delFilmMyList = 0,
}

export const INITIAL_FILMS_COUNT = 8;
export const SHOW_MORE_STEP = 8;
export const MAX_SIMILAR_FILMS_COUNT = 4;
