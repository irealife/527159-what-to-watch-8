import Logo from '../logo/logo';
import {Link} from 'react-router-dom';
import React from 'react';

function NotFoundScreen(): JSX.Element {
  return (
    <section>
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
            <a href="/" className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="film__screen">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </section>
  );
}

export default NotFoundScreen;
