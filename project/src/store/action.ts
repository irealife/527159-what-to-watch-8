import {ActionType} from './types/action';
import {Genres} from '../const';
import {Film} from '../types/film';

export const changeGenre = (genre: Genres) => ({
  type: ActionType.changeGenreFilm,
  payload: genre,
} as const);

export const filterFilms = (film: Film[]) => ({
  type: ActionType.filterFilmsToGenre,
  payload: film,
} as const);
