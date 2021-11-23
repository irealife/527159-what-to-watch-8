import {Link} from 'react-router-dom';
import React from 'react';
import {Film} from '../../types/film';

type ButtonAddReviewProps = {
  film: Film,
};

function ButtonAddReview({film}: ButtonAddReviewProps): JSX.Element {

  return <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>;
}

export default (ButtonAddReview);
