import React, {useState, ChangeEvent, FormEvent} from 'react';
import Logo from '../logo/logo';
import {Film} from '../../types/film';
import {Review} from '../../types/review';
import {Link} from 'react-router-dom';

type AddReviewScreenProps = {
  film: Film;
  review: Review;
  reviews: Review[];
  onReview: (review: Review) => void;
  onChange: (starChange: any) => void;
}


function AddReviewScreen({film, review, reviews, onReview, onChange}: AddReviewScreenProps): JSX.Element {
  const [userReviews, setUserReviews] = useState([false, false, false, false, false, false, false, false, false, false]);
  const handleChangeStar = () => {
    onChange=({target}:ChangeEvent<HTMLInputElement>) => {
      const value = target.checked;
      setUserReviews([...userReviews.slice(0, review.rating), value]);
    };
  };
  return (
    <section key={film.id} className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImg} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Logo />
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{film.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a href="/" className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <Link to="/login">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </Link>
              </div>
            </li>
            <li className="user-block__item">
              <Link to="/login" className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImg} alt={film.name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          onReview(review);
        }}
        >
          <div className="rating">
            <div className="rating__stars">

              {reviews.map(() => (
                <>
                  <input className="rating__input" id={`star-${review.rating}`} type="radio" name="rating" value={`star-${review.rating}`} checked={userReviews[review.user.id]} onChange={handleChangeStar}/>
                  <label className="rating__label" htmlFor={`star-${review.rating}`}>Rating {review.rating}</label>
                </>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReviewScreen;
