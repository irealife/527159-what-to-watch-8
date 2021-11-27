import Logo from '../logo/logo';
import {AuthorizationStatus} from '../../const';
import UserRegistered from '../user-registered/user-registered';
import UserNotRegistered from '../user-not-registered/user-not-registered';
import React, {useEffect} from 'react';
import {State} from '../../store/reducer';
import {fetchPromoFilmAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../store/types/action';
import {connect, ConnectedProps} from 'react-redux';
import NotFoundScreen from '../not-found/not-found';
import ButtonPlay from '../button-play/button-play';
import ButtonMyList from '../button-my-list/button-my-list';

const mapStateToProps = ({promoFilm, authorizationStatus}: State) => ({
  promoFilm,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchPromoFilm() {
    dispatch(fetchPromoFilmAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux;

function FilmPromo({promoFilm, fetchPromoFilm, authorizationStatus}: ConnectedComponentProps): JSX.Element {

  useEffect(() => {
    fetchPromoFilm();
  }, [fetchPromoFilm]);

  return promoFilm !== undefined ? (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.backgroundImg} alt={promoFilm.name}/>
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
            <img src={promoFilm.posterImg} alt={promoFilm.name} width="218" height="327"/>
          </div>
          <div className="film-card__desc">
            <h2 className="film-card__title">{promoFilm.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm.genre}</span>
              <span className="film-card__year">{promoFilm.released}</span>
            </p>
            <div className="film-card__buttons">
              <ButtonPlay film={promoFilm} />
              <ButtonMyList film={promoFilm} isFavorite={promoFilm.isFavorite} />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : <NotFoundScreen />;
}

export {FilmPromo};
export default connector(FilmPromo);
