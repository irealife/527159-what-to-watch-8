import React, {useEffect, useState, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeGenre, loadMore} from '../../store/action';
import {AppRoute, Genres, SHOW_MORE_STEP} from '../../const';
import {State} from '../../store/types/state';
import {Actions} from '../../store/types/action';
import Logo from '../logo/logo';
import {FilmList} from '../film-list/film-list';
import {Footer} from '../footer/footer';
import {GenreList} from '../genre-list/genre-list';
import {FilmPromo} from '../../types/film';
import {getFilterFilm} from '../../utils';
import ShowMore from '../show-more/show-more';

const mapStateToProps = ({films, genre, step}: State) => ({
  filmsToGenre: films,
  activeGenre: genre,
  stepMore: step,
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
type ConnectedComponentProps = PropsFromRedux & FilmPromo;

function MainScreen({genre, activeGenre, filmsToGenre, stepMore, onChangeGenre, onLoadMoreStep, release, name}: ConnectedComponentProps): JSX.Element {

  const history = useHistory();

  const genres = Object.values(Genres) as Genres[];

  const filteredFilms = getFilterFilm(filmsToGenre, activeGenre);

  const handleShowMoreButton = () => {
    onLoadMoreStep(stepMore + SHOW_MORE_STEP);
  };

  const [filterFilm, setFilterFilm] = useState(filteredFilms);

  useEffect(() => {
    setFilterFilm(filteredFilms);
  }, [activeGenre, filmsToGenre]);

  const changeGenreCallBack = useCallback((genreActive) => {
    onChangeGenre(genreActive);
  }, [onChangeGenre]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Logo />
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <Link to="/login" className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{release}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => history.push(AppRoute.Player)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref={'#play-s'}/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={() => history.push(AppRoute.Film)}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={'#add'}/>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={genres} activeGenre={activeGenre} onChangeGenre={changeGenreCallBack} />

          <FilmList films={filterFilm} />

          {filterFilm.length > SHOW_MORE_STEP ? filterFilm.slice(0, SHOW_MORE_STEP) && <ShowMore onLoadMore={handleShowMoreButton} /> : ''}

        </section>

        <Footer />

      </div>
    </>
  );
}

export {MainScreen};
export default connector(MainScreen);
