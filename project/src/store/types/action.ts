import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../reducer';
import {changeGenre, filterFilms, loadFilms, loadSelectedFilm, loadSimilarFilms, loadPromoFilm, setFavoriteFilmList, setFavoriteFilmStatus, loadReviews, requireAuthorization, requireLogout, redirectToRoute} from '../action';

export enum ActionType {
  ChangeGenre = 'film/changeGenre',
  FilterFilms = 'film/filterFilmsToGenre',
  LoadMore = 'film/loadMore,',
  LoadFilms = 'data/loadFilms',
  LoadSelectedFilm = 'data/LoadSelectedFilm',
  LoadSimilarFilms = 'data/LoadSimilarFilms',
  LoadPromoFilm = 'data/LoadPromoFilm',
  SetFavoriteFilmList = 'data/SetFavoriteFilmList',
  SetFaviroteFilmStatus = 'data/SetFaviroteFilmStatus',
  LoadReviews = 'film/loadReviews',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'film/redirectToRoute',
}

export type LoadMoreAction = {
  type: ActionType.LoadMore,
  payload: number,
}

export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof filterFilms>
  | ReturnType<typeof loadFilms>
  | ReturnType<typeof loadSelectedFilm>
  | ReturnType<typeof loadSimilarFilms>
  | ReturnType<typeof loadPromoFilm>
  | ReturnType<typeof setFavoriteFilmList>
  | ReturnType<typeof setFavoriteFilmStatus>
  | ReturnType<typeof loadReviews>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | LoadMoreAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
