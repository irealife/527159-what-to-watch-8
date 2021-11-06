import React from 'react';
import ReviewItem from './tab-review-item';
import {Review} from '../../types/review';

type FilmReviewsProps = {
  reviews: Review[];
}

function FilmReviews({reviews}: FilmReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
}

export default FilmReviews;
