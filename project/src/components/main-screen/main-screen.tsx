import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeGenre, loadMore} from '../../store/action';
import {AuthorizationStatus, Genres, SHOW_MORE_STEP} from '../../const';
import {State} from '../../store/reducer';
import {Actions} from '../../store/types/action';
import Logo from '../logo/logo';
import {FilmList} from '../film-list/film-list';
import {Footer} from '../footer/footer';
import {GenreList} from '../genre-list/genre-list';
import {filteredFilms} from '../../utils';
import ShowMore from '../show-more/show-more';
import LoadingScreen from '../loading-screen/loading-screen';
import UserRegistered from '../user-registered/user-registered';
import UserNotRegistered from '../user-not-registered/user-not-registered';

const mapStateToProps = ({films, activeGenre, loadedFilmsCount, isDataLoaded, authorizationStatus}: State) => ({
  films: filteredFilms(films, activeGenre).slice(0, loadedFilmsCount),
  activeGenre,
  isDataLoaded,
  authorizationStatus,
  totalFilmsCount: films.length,
  loadedFilmsCount,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: Genres) {
    dispatch(changeGenre(genre));
  },
  onLoadMoreStep(step: number) {
    dispatch(loadMore(step));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function MainScreen({films, activeGenre, loadedFilmsCount, totalFilmsCount, isDataLoaded, authorizationStatus, onChangeGenre, onLoadMoreStep}: ConnectedComponentProps): JSX.Element {

  const genres = Object.values(Genres) as Genres[];

  const handleShowMoreButton = () => {
    onLoadMoreStep(loadedFilmsCount + SHOW_MORE_STEP);
  };

  const changeGenreCallBack = useCallback((genreActive) => {
    onChangeGenre(genreActive);
  }, [onChangeGenre]);

  return (
    <>
      {films[0] &&
        <section className="film-card">
          <div className="film-card__bg">
            <img src={films[0].backgroundImg} alt={films[0].name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <div className="logo">
              <Logo/>
            </div>
            {authorizationStatus === AuthorizationStatus.Auth ? <UserRegistered/> : <UserNotRegistered/>}
          </header>
          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <img src={films[0].posterImg} alt={films[0].name} width="218" height="327"/>
              </div>
              <div className="film-card__desc">
                <h2 className="film-card__title">{films[0].name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{films[0].genre}</span>
                  <span className="film-card__year">{films[0].released}</span>
                </p>
                <div className="film-card__buttons">
                  <Link
                    to={`/player/${films[0].id}`}
                    className="btn btn--play film-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref={'#play-s'}/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <Link
                    to={'/myList'}
                    className="btn btn--list film-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={'#add'}/>
                    </svg>
                    <span>My list</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>}
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList genres={genres} activeGenre={activeGenre} onChangeGenre={changeGenreCallBack} />
          {isDataLoaded ? <FilmList films={films} /> : <LoadingScreen />}
          {loadedFilmsCount < totalFilmsCount && <ShowMore onLoadMore={handleShowMoreButton} />}
        </section>
        <Footer />
      </div>
    </>
  );
}

export {MainScreen};
export default connector(MainScreen);
