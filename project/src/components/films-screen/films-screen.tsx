import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import TabsFilm from '../tabs/tabs-film';
import {State} from '../../store/reducer';
import {connect, ConnectedProps} from 'react-redux';
import {AuthorizationStatus, MAX_SIMILAR_FILMS_COUNT} from '../../const';
import UserRegistered from '../user-registered/user-registered';
import UserNotRegistered from '../user-not-registered/user-not-registered';
import {fetchSelectedFilmAction, fetchReviewsFilmAction, fetchSimilarFilmAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../store/types/action';
import FilmCard from '../film-card/film-card';
import FilmsButtons from '../films-button/films-button';

const mapStateToProps = ({film, similarFilms, authorizationStatus, reviews }: State) => ({
  film,
  similarFilms,
  reviews,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchSelectedFilm(id: number) {
    dispatch(fetchSelectedFilmAction(id));
  },
  fetchReviewsFilm(id: number) {
    dispatch(fetchReviewsFilmAction(id));
  },
  fetchSimilarFilm(id: number) {
    dispatch(fetchSimilarFilmAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux;

function FilmsScreen({film, fetchSelectedFilm, similarFilms, fetchSimilarFilm, reviews, fetchReviewsFilm, authorizationStatus}: ConnectedComponentProps): JSX.Element {

  const {id} = useParams<{id: string}>();

  useEffect(() => {
    fetchSelectedFilm(Number(id));
  }, [fetchSelectedFilm, id]);

  useEffect(() => {
    fetchReviewsFilm(Number(id));
  }, [fetchReviewsFilm, id]);

  useEffect(() => {
    fetchSimilarFilm(Number(id));
  }, [fetchSimilarFilm, id]);

  const [currentFilm, setCurrentFilm] = useState(0);
  const handleFilmCardMouseEnter = (filmId: number) => {
    setCurrentFilm(filmId);
  };
  const handleFilmCardMouseLeave = () => {
    setCurrentFilm(0);
  };

  return (
    <>
      {film &&
        <section key={film.id} className="film-card film-card--full">
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={film.backgroundImg} alt={film.name}/>
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header film-card__head">
              <div className="logo">
                <Logo/>
              </div>
              {authorizationStatus === AuthorizationStatus.Auth ? <UserRegistered/> : <UserNotRegistered/>}
            </header>
            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>
                <FilmsButtons film={film} isFavorite={film.isFavorite} />
              </div>
            </div>
          </div>
          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={film.posterImg} alt={film.name} width="218" height="327"/>
              </div>
              <TabsFilm film={film} reviews={reviews}/>
            </div>
          </div>
        </section>}
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {similarFilms.map((item) => (
              <FilmCard
                film={item}
                key={item.id}
                isPlaying={item.id === Number(currentFilm)}
                onMouseLeave={handleFilmCardMouseLeave}
                onMouseEnter={handleFilmCardMouseEnter}
              />
            )).slice(0, MAX_SIMILAR_FILMS_COUNT)}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export {FilmsScreen};
export default connector(FilmsScreen);
