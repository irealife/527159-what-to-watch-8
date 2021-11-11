import {Actions, ActionType} from './types/action';
import {State} from './types/state';
import {films} from '../mocks/films';
import {Genres, SHOW_MORE_STEP} from '../const';
import {Film} from '../types/film';

const initialState = {
  films: films,
  genre: Genres.AllGenres,
  step: SHOW_MORE_STEP,
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.FilterFilms:
      return {...state, films: action.payload as Film[]};
    case ActionType.LoadMore:
      return {...state, step: action.payload as number};
    default:
      return {...initialState};
  }
}

export {reducer};
