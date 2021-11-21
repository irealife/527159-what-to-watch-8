import React, {ChangeEvent, useEffect, useState} from 'react';
import {fetchSelectedFilmAction, sendReviewFilmAction} from '../../store/api-actions';
import {State} from '../../store/reducer';
import {ThunkAppDispatch} from '../../store/types/action';
import {connect, ConnectedProps} from 'react-redux';
import {useParams, Redirect} from 'react-router-dom';
import NotFoundScreen from '../not-found/not-found';
import {AuthorizationStatus, AppRoute} from '../../const';

const TEXT_LENGTH_MIN = 50;
const TEXT_LENGTH_MAX = 400;
const STARS_COUNT = 10;

const mapStateToProps = ({film, authorizationStatus}: State) => ({
  film,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchSelectedFilm(id: number) {
    dispatch(fetchSelectedFilmAction(id));
  },
  sendReviewFilm(id: number, star: number, text: string) {
    dispatch(sendReviewFilmAction(id, star, text));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function AddReviewForm({film, fetchSelectedFilm, sendReviewFilm, authorizationStatus}: ConnectedComponentProps): JSX.Element {

  const {id} = useParams<{id: string}>();

  useEffect(() => {
    fetchSelectedFilm(Number(id));
  }, [id]);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [formReview, setFormReview] = useState(false);

  function ratingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(Number(evt.currentTarget.value));
  }

  function reviewTextChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(evt.target.value);
  }

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.SignIn} />;
  }

  const checkingForm = () => (
    reviewText.length >= TEXT_LENGTH_MIN && reviewText.length <= TEXT_LENGTH_MAX
  );

  const onDisabledButtonSendForm = () => (
    !checkingForm() || formReview
  );

  const onSubmitForm = async (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      setFormReview(true);
      sendReviewFilm(Number(id), rating, reviewText);
    } catch (error) {
      setFormReview(false);
    }
  };

  return film !== undefined ? (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmitForm}>
        <div className="rating">
          <div className="rating__stars">
            {new Array(STARS_COUNT).fill(null).map((star, index) => (
              <>
                <input className="rating__input" key={star} id={`star-${index}`} type="radio" name="rating" value={index} checked={rating === index} onChange={ratingChange}/>
                <label className="rating__label" htmlFor={`star-${index}`}>Rating {index}</label>
              </>
            ))}
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            minLength={TEXT_LENGTH_MIN}
            maxLength={TEXT_LENGTH_MAX}
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={reviewText}
            onChange={reviewTextChange}
            disabled={formReview}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={onDisabledButtonSendForm()}>Post</button>
          </div>
        </div>
      </form>
    </div>
  ) : <NotFoundScreen />;
}

export {AddReviewForm};
export default connector(AddReviewForm);
