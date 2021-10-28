import React, {useState, ChangeEvent, FormEvent} from 'react';
import Logo from '../logo/logo';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';

type AddReviewScreenProps = {
  film: Film;
  onReviewNew: (film: Film) => void;
}

const selectedRating = [
  {
    title: 'Bad',
  },
  {
    title: 'Normal',
  },
  {
    title: 'Good',
  },
  {
    title: 'Very good',
  },
  {
    title: 'Awesome',
  },
];


function AddReviewScreen({film, onReviewNew}: AddReviewScreenProps): JSX.Element {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  function ratingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.currentTarget.value);
  }

  function reviewTextChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(evt.target.value);
  }

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
          onReviewNew(film);
        }}
        >
          <div className="rating">
            <div className="rating__stars">

              {selectedRating.map((star, index) => (
                <>
                  <input className="rating__input" key={star.title} id={`star-${index}`} type="radio" name="rating" value={index} checked={rating === index.toString()} onChange={ratingChange}/>
                  <label className="rating__label" htmlFor={`star-${index}`}>Rating {index}</label>
                </>
              ))}

            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={reviewText} onChange={reviewTextChange}></textarea>
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
