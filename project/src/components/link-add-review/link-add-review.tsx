import {Link} from 'react-router-dom';
import React from 'react';
import {Film} from '../../types/film';

type LinkAddReviewProps = {
  film: Film,
};

function LinkAddReview({film}: LinkAddReviewProps): JSX.Element {

  return <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>;
}

export default (LinkAddReview);
