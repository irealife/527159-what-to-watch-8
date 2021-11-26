import {FavoriteStatus} from '../../const';
import React from 'react';
import {setFavoriteFilmAction, fetchFavoriteFilmListAction, fetchSelectedFilmAction, fetchPromoFilmAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../store/types/action';
import {connect, ConnectedProps} from 'react-redux';
import {Film} from '../../types/film';

type ButtonMyListProps = {
  film: Film,
  isFavorite: boolean;
};

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setFavoriteFilm(id: number, status: FavoriteStatus) {
    dispatch(setFavoriteFilmAction(id, status));
  },
  fetchFavoriteFilmList() {
    dispatch(fetchFavoriteFilmListAction());
  },
  fetchSelectedFilm(id: number) {
    dispatch(fetchSelectedFilmAction(id));
  },
  fetchPromoFilm() {
    dispatch(fetchPromoFilmAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux & ButtonMyListProps;

function ButtonMyList({film, isFavorite, setFavoriteFilm, fetchSelectedFilm, fetchFavoriteFilmList, fetchPromoFilm} : ConnectedComponentProps): JSX.Element {

  const onFavoriteButtonClick = () => {
    const newStatus = isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite;
    setFavoriteFilm(film.id, newStatus);
    fetchSelectedFilm(film.id);
    fetchPromoFilm();
    fetchFavoriteFilmList();
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
