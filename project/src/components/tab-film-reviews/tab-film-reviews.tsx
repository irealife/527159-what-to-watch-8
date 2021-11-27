import React from 'react';
import ReviewItem from '../tab-review-item/tab-review-item';
import {Review} from '../../types/review';

type TabFilmReviewsProps = {
  reviews: Review[];
}

function TabFilmReviews({reviews}: TabFilmReviewsProps): JSX.Element {

  const halfReviews = reviews.length/2;

  const leftColumns: Review[] = reviews.slice(0, Math.ceil(halfReviews));
  const rightColumns: Review[] = reviews.slice(-Math.ceil(halfReviews));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {leftColumns.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {rightColumns.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
}

export default TabFilmReviews;
