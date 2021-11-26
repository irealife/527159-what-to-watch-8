import {ActionType, LoadMoreAction} from './types/action';
import {Genres, AuthorizationStatus, FavoriteStatus} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {User} from '../types/user';

type Action<T> = {
  type: string,
  payload: T,
}

function changeGenre(genre: Genres): Action<Genres> {
  return ({
    type: ActionType.ChangeGenre,
    payload: genre,
  }) as const;
}

function filterFilms(films: Film[]): Action<Film[]> {
  return ({
    type: ActionType.FilterFilms,
    payload: films,
  }) as const;
}

function loadMore(step: number): LoadMoreAction {
  return ({
    type: ActionType.LoadMore,
    payload: step,
  }) as const;
}

function loadFilms(films: Film[]): Action<Film[]> {
  return ({
    type: ActionType.LoadFilms,
    payload: films,
  }) as const;
}

function loadSelectedFilm(film: Film): Action<Film> {
  return ({
    type: ActionType.LoadSelectedFilm,
    payload: film,
  }) as const;
}

function loadSimilarFilms(films: Film[]): Action<Film[]> {
  return ({
    type: ActionType.LoadSimilarFilms,
    payload: films,
  }) as const;
}

function loadPromoFilm(promoFilm: Film): Action<Film> {
  return ({
    type: ActionType.LoadPromoFilm,
    payload: promoFilm,
  }) as const;
}

function setFavoriteFilmList(films: Film[]): Action<Film[]> {
  return ({
    type: ActionType.SetFavoriteFilmList,
    payload: films,
  }) as const;
}

function setFavoriteFilmStatus(status: FavoriteStatus) {
  return ({
    type: ActionType.SetFaviroteFilmStatus,
    payload: status,
  }) as const;
}

function loadReviews(reviews: Review[]): Action<Review[]> {
  return ({
    type: ActionType.LoadReviews,
    payload: reviews,
  }) as const;
}

function changeUser(user: User): Action<User> {
  return ({
    type: ActionType.ChangeUser,
    payload: user,
  }) as const;
}

function requireAuthorization(authStatus: AuthorizationStatus) {
  return ({
    type: ActionType.RequireAuthorization,
    payload: authStatus,
  }) as const;
}

function requireLogout() {
  return ({
    type: ActionType.RequireLogout,
  }) as const;
}

const redirectToRoute = (url: string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export {
  changeGenre,
  filterFilms,
  loadMore,
  loadFilms,
  loadSelectedFilm,
  loadSimilarFilms,
  loadPromoFilm,
  setFavoriteFilmList,
  setFavoriteFilmStatus,
  loadReviews,
  changeUser,
  requireAuthorization,
  requireLogout,
  redirectToRoute
};
