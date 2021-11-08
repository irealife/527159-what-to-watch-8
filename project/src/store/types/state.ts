import {Film} from '../../types/film';
import {Genres} from '../../const';

export type State = {
  films: Film[],
  genre: Genres,
};
