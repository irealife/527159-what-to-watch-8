import React, {useEffect, useState} from 'react';
import Logo from '../logo/logo';
import {Footer} from '../footer/footer';
import {State} from '../../store/reducer';
import {connect, ConnectedProps} from 'react-redux';
import {fetchFavoriteFilmListAction} from '../../store/api-actions';
import {AuthorizationStatus} from '../../const';
import UserRegistered from '../user-registered/user-registered';
import UserNotRegistered from '../user-not-registered/user-not-registered';
import {ThunkAppDispatch} from '../../store/types/action';
import {FilmCard} from '../film-card/film-card';

const mapStateToProps = ({favoriteFilmList, authorizationStatus}: State) => ({
  favoriteFilmList,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchFavoriteFilmList() {
    dispatch(fetchFavoriteFilmListAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux;


function MyListScreen({favoriteFilmList, fetchFavoriteFilmList, authorizationStatus}: ConnectedComponentProps): JSX.Element {

  useEffect(() => {
    fetchFavoriteFilmList();
  }, [fetchFavoriteFilmList]);

  const [currentFilm, setCurrentFilm] = useState(0);
  const handleFilmCardMouseEnter = (filmId: number) => {
    setCurrentFilm(filmId);
  };
  const handleFilmCardMouseLeave = () => {
    setCurrentFilm(0);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Logo />
        </div>
        <h1 className="page-title user-page__title">My list</h1>
        {authorizationStatus === AuthorizationStatus.Auth ? <UserRegistered /> : <UserNotRegistered />}
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          {favoriteFilmList && favoriteFilmList.map((item) => (
            <FilmCard
              film={item}
              key={item.id}
              isPlaying={item.id === Number(currentFilm)}
              onMouseLeave={handleFilmCardMouseLeave}
              onMouseEnter={handleFilmCardMouseEnter}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export {MyListScreen};
export default connector(MyListScreen);
