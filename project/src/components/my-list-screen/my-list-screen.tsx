import React from 'react';
import Logo from '../logo/logo';
import {FilmList} from '../film-list/film-list';
import {Footer} from '../footer/footer';
import {State} from '../../store/types/state';
import {connect, ConnectedProps} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import UserRegistered from "../user-registered/user-registered";
import UserNotRegistered from "../user-not-registered/user-not-registered";

const mapStateToProps = ({films, authorizationStatus}: State) => ({
  films,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux;


function MyListScreen({films, authorizationStatus}: ConnectedComponentProps): JSX.Element {
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
          <FilmList films={films} />
        </div>
      </section>

      <Footer />

    </div>
  );
}

export {MyListScreen};

export default connector(MyListScreen);
