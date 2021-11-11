import React from 'react';
import {Film} from '../../types/film';
import {getRatingToString, getStarFilmToUser} from '../../utils';

type TabFilmOverviewProps ={
  film: Film;
}

function TabFilmOverview({film}: TabFilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{getRatingToString(film.rating)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getStarFilmToUser(Number(Math.round(film.rating)))}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {film.starring.slice(0, 3).join(', ')} and others</strong></p>
      </div>
    </>
  );
}

export default TabFilmOverview;
