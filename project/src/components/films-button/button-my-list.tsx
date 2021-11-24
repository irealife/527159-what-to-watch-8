import {FavoriteStatus} from '../../const';
import React from 'react';
import {Film} from '../../types/film';
import {setFavoriteFilmAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../store/types/action';
import {connect, ConnectedProps} from 'react-redux';

type ButtonMyListProps = {
  film: Film,
  isFavorite: boolean;
};

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setFavoriteFilm(id: number, status: FavoriteStatus) {
    dispatch(setFavoriteFilmAction(id, status));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux & ButtonMyListProps;

function ButtonMyList({film, isFavorite, setFavoriteFilm}: ConnectedComponentProps): JSX.Element {

  const onFavoriteButtonClick = () => {
    const newStatus = isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite;
    setFavoriteFilm(film.id, newStatus);
  };

  const iconFavorite = isFavorite ? '#in-list' : '#add';

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={onFavoriteButtonClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={iconFavorite} />
      </svg>
      <span>My list</span>
    </button>
  );
}

export {ButtonMyList};
export default connector(ButtonMyList);
