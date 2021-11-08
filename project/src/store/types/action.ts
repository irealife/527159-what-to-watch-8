import {changeGenre, filterFilms} from '../action';

export enum ActionType {
  changeGenreFilm = 'film/changeGenre',
  filterFilmsToGenre = 'film/filterFilmsToGenre',
}

export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof filterFilms>;
