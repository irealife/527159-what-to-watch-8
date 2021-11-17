import React, {useState, ChangeEvent, FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {State} from '../../store/types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useParams} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import Logo from '../logo/logo';
import {Film} from '../../types/film';
import UserRegistered from '../user-registered/user-registered';
import UserNotRegistered from '../user-not-registered/user-not-registered';

const mapStateToProps = ({films, authorizationStatus}: State) => ({
  films,
  authorizationStatus,
});

type AddReviewScreenProps = {
  film: Film;
  onReviewNew: (film: Film) => void;
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux & AddReviewScreenProps;

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


function AddReviewScreen({films, authorizationStatus, film, onReviewNew}: ConnectedComponentProps): JSX.Element {

  const {id, backgroundImg, name, posterImg} = useParams<{id: string, backgroundImg: string, name: string, posterImg: string}>();

  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  function ratingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.currentTarget.value);
  }

  function reviewTextChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(evt.target.value);
  }

  return (
    <section key={id} className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImg} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Logo />
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a href="/" className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          {authorizationStatus === AuthorizationStatus.Auth ? <UserRegistered /> : <UserNotRegistered />}

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImg} alt={name} width="218" height="327"/>
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

export {AddReviewScreen};

export default connector(AddReviewScreen);
