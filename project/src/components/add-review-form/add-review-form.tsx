import React, {Fragment, ChangeEvent, useEffect, useState, FormEvent} from 'react';
import {fetchSelectedFilmAction, sendReviewFilmAction} from '../../store/api-actions';
import {State} from '../../store/reducer';
import {ThunkAppDispatch} from '../../store/types/action';
import {connect, ConnectedProps} from 'react-redux';
import {useParams, Redirect} from 'react-router-dom';
import NotFoundScreen from '../not-found/not-found';
import {AuthorizationStatus, AppRoute} from '../../const';

enum TextLength {
  Min = 50,
  Max = 400,
}

const STARS_COUNT = 10;

const mapStateToProps = ({film, authorizationStatus}: State) => ({
  film,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchSelectedFilm(id: number) {
    dispatch(fetchSelectedFilmAction(id));
  },
  sendReviewFilm(id: number, rating: number, comment: string) {
    dispatch(sendReviewFilmAction(id, rating, comment));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function AddReviewForm({film, fetchSelectedFilm, sendReviewFilm, authorizationStatus}: ConnectedComponentProps): JSX.Element {

  const {id} = useParams<{id: string}>();

  useEffect(() => {
    fetchSelectedFilm(Number(id));
  }, [fetchSelectedFilm, id]);

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isDisabled, setDisabled] = useState(false);

  function ratingChange(evt: ChangeEvent<HTMLInputElement>) {
    setSelectedRating(Number(evt.currentTarget.value));
  }

  function reviewTextChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(evt.target.value);
  }

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.SignIn} />;
  }

  const isValidForm = () => (
    !isDisabled && reviewText.length >= TextLength.Min && reviewText.length <= TextLength.Max
  );

  const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      setDisabled(true);
      sendReviewFilm(Number(id), selectedRating, reviewText);
    } catch (error) {
      setDisabled(false);
    }
  };

  return film !== undefined ? (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmitForm}>
        <div className="rating">
          <div className="rating__stars">
            {new Array(STARS_COUNT).fill(null).map((star, index) => {
              const rating = index + 1;
              return (
                <Fragment key={rating}>
                  <input className="rating__input" key={star} id={`star-${rating}`} type="radio" name="rating" value={rating} checked={selectedRating === rating} onChange={ratingChange}/>
                  <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                </Fragment>
              );
            }).reverse()}
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            minLength={TextLength.Min}
            maxLength={TextLength.Max}
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={reviewText}
            onChange={reviewTextChange}
            disabled={isDisabled}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!isValidForm()}>Post</button>
          </div>
        </div>
      </form>
    </div>
  ) : <NotFoundScreen />;
}

export {AddReviewForm};
export default connector(AddReviewForm);
