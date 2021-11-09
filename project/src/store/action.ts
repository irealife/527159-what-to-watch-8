import {ActionType, LoadMoreAction} from './types/action';
import {Genres} from '../const';
import {Film} from '../types/film';

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
