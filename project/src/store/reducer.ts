import {Actions, ActionType} from './types/action';
import {State} from './types/state';
import {AuthorizationStatus, Genres, SHOW_MORE_STEP} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';

const initialState = {
  films: [],
  reviews: [],
  genre: Genres.AllGenres,
  step: SHOW_MORE_STEP,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.FilterFilms:
      return {...state, films: action.payload as Film[]};
    case ActionType.LoadMore:
      return {...state, step: action.payload as number};
    case ActionType.LoadFilms:
      return {...state, films: action.payload as Film[], isDataLoaded: true};
    case ActionType.ShowReviews:
      return {...state, reviews: action.payload as Review[]};
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload as AuthorizationStatus,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return {...initialState};
  }
}

export {reducer};
