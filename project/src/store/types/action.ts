import {changeGenre, filterFilms} from '../action';

export enum ActionType {
  ChangeGenre = 'film/changeGenre',
  FilterFilms = 'film/filterFilmsToGenre',
  LoadMore = 'film/loadMore,'
}

export type LoadMoreAction = {
  type: ActionType.LoadMore,
  payload: number,
}

export function loadMore(step: number): LoadMoreAction {
  return ({
    type: ActionType.LoadMore,
    payload: step,
  }) as const;
}

export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof filterFilms>
  | LoadMoreAction;
