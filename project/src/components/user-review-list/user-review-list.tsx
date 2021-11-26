import React from 'react';
import UserReviewCard from '../user-review-card/user-review-card';
import {Review} from '../../types/review';

type UserReviewListProps = {
  reviews: Review[];
}

function UserReviewList({reviews}: UserReviewListProps): JSX.Element {
  return (
    <div className="film-card__reviews-col">
      {reviews.map((review) => (
        <UserReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
}

export default UserReviewList;
