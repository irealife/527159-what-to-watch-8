import {Link} from 'react-router-dom';
import React from 'react';
import {Film} from '../../types/film';

type ButtonPlayProps = {
  film: Film,
};

function ButtonPlay({film}: ButtonPlayProps): JSX.Element {

  return (
    <Link
      to={`/player/${film.id}`}
      className="btn btn--play film-card__button"
      type="button"
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </Link>
  );
}

export default (ButtonPlay);
