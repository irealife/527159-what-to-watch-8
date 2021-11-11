import {Review} from '../../types/review';
import {getDateFormat, getUserDateFormat} from '../../utils';

type TabReviewItemProps = {
  review: Review;
}

function TabReviewItem({review}: TabReviewItemProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={getDateFormat(review.date)}>{getUserDateFormat(review.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default TabReviewItem;
