import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './state';
import {changeGenre, filterFilms, loadFilms, showReviews, requireAuthorization, requireLogout, redirectToRoute} from '../action';

export enum ActionType {
  ChangeGenre = 'film/changeGenre',
  FilterFilms = 'film/filterFilmsToGenre',
  LoadMore = 'film/loadMore,',
  LoadFilms = 'data/loadFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'film/redirectToRoute',
  ShowReviews = 'film/showReviews',
}

export type LoadMoreAction = {
  type: ActionType.LoadMore,
  payload: number,
}

export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof filterFilms>
  | LoadMoreAction
  | ReturnType<typeof loadFilms>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof showReviews>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
