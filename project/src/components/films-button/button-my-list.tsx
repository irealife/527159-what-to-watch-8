import {FavoriteStatus} from '../../const';
import React from 'react';
import {Film} from '../../types/film';
import {setFavoriteFilmAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../store/types/action';
import {connect, ConnectedProps} from 'react-redux';

type ButtonMyListProps = {
  film: Film,
  isFavorite: boolean,
};

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setFavoriteFilm(id: number, status: FavoriteStatus) {
    dispatch(setFavoriteFilmAction(id, status));
  },
});

const connector = connect(mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux & ButtonMyListProps;

function ButtonMyList({film, isFavorite, setFavoriteFilm}: ConnectedComponentProps): JSX.Element {

  const onFavoriteButtonClick = () => {
    const newStatus = isFavorite ? FavoriteStatus.delFilmMyList : FavoriteStatus.addFilmMyList;
    setFavoriteFilm(film.id, newStatus);
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={onFavoriteButtonClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavorite ? '#in-list' : '#add'} />
      </svg>
      <span>My list</span>
    </button>
  );
}

export {ButtonMyList};
export default connector(ButtonMyList);
