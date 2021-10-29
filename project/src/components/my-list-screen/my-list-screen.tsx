import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import {FilmList} from '../film-list/film-list';
import {films} from '../../mocks/films';
import {Footer} from '../footer/footer';

function MyListScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Logo />
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to="/login">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </Link>
            </div>
          </li>
          <li className="user-block__item">
            <Link to="/login" className="user-block__link">Sign out</Link>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList films={films} />
        </div>
      </section>

      <footer className="page-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default MyListScreen;
