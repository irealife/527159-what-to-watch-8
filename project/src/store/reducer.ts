import {Actions, ActionType} from './types/action';
import {State} from './types/state';
import {films} from '../mocks/films';
import {Film} from '../types/film';
import {Genres} from '../const';

const initialState = {
  genre: Genres.AllGenres,
  films: films,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.changeGenreFilm:
      return {...state, genre: action.payload as Genres};
    case ActionType.filterFilmsToGenre:
      return {...state, films: action.payload as Film[]};
    default:
      return {...initialState};
  }
};

export {reducer};
