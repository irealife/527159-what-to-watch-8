import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import {FilmList} from '../film-list/film-list';
import {Footer} from '../footer/footer';
import TabsFilm from '../tabs/tabs-film';
import {State} from '../../store/types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useParams} from 'react-router';
import {AuthorizationStatus} from '../../const';
import UserRegistered from '../user-registered/user-registered';
import UserNotRegistered from '../user-not-registered/user-not-registered';

const mapStateToProps = ({films, authorizationStatus, reviews}: State) => ({
  films,
  reviews,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux;

function FilmsScreen({films, authorizationStatus, reviews}: ConnectedComponentProps): JSX.Element {

  const {id, backgroundImg, name, genre, released, posterImg} = useParams<{id: string, backgroundImg: string, name: string, genre: string, released: string, posterImg: string}>();

  return (
    <>
      <section key={id} className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImg} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Logo />
            </div>

            {authorizationStatus === AuthorizationStatus.Auth ? <UserRegistered /> : <UserNotRegistered />}

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <Link
                  to={`/player/${id}`}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <Link
                  to={'/myList'}
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </Link>

                {authorizationStatus === AuthorizationStatus.Auth ? <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link> : ''}

              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImg} alt={name} width="218" height="327"/>
            </div>

            <TabsFilm film={films[0]} reviews={reviews} />

          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={films.filter((item) => item.genre === films[0].genre).slice(0, 4)} />

        </section>

        <Footer />

      </div>
    </>
  );
}

export {FilmsScreen};

export default connector(FilmsScreen);
