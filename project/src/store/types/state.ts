import {Film} from '../../types/film';
import {Review} from '../../types/review';
import {Genres, AuthorizationStatus} from '../../const';

export type State = {
  films: Film[],
  reviews: Review[],
  genre: Genres,
  step: number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
