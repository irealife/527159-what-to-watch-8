import {ActionType, LoadMoreAction} from './types/action';
import {Genres, AuthorizationStatus, AppRoute} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';

type Action<T> = {
  type: string,
  payload: T,
}

export function changeGenre(genre: Genres): Action<Genres> {
  return ({
    type: ActionType.ChangeGenre,
    payload: genre,
  }) as const;
}

export function filterFilms(films: Film[]): Action<Film[]> {
  return ({
    type: ActionType.FilterFilms,
    payload: films,
  }) as const;
}

export function loadMore(step: number): LoadMoreAction {
  return ({
    type: ActionType.LoadMore,
    payload: step,
  }) as const;
}

export function loadFilms(films: Film[]) {
  return ({
    type: ActionType.LoadFilms,
    payload: films,
  }) as const;
}

export function showReviews(reviews: Review[]) {
  return ({
    type: ActionType.ShowReviews,
    payload: reviews,
  }) as const;
}

export function requireAuthorization(authStatus: AuthorizationStatus) {
  return ({
    type: ActionType.RequireAuthorization,
    payload: authStatus,
  }) as const;
}

export function requireLogout() {
  return ({
    type: ActionType.RequireLogout,
  }) as const;
}

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
