import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../main-screen/main-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import FilmsScreen from '../films-screen/films-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import PlayerScreen from '../player-screen/player-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import NotFoundScreen from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import FilmReviewScreen from '../film-review-screen/film-review-screen';
import {Film} from '../../types/film';
import {films} from '../../mocks/films';

type AppScreenProps = {
  filmsAll: Film[];
}

function App({filmsAll}:AppScreenProps): JSX.Element {
  const [firstFilm] = filmsAll;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen
            film={firstFilm}
          />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList} render={() => <MyListScreen />} authorizationStatus={AuthorizationStatus.NoAuth}>
        </PrivateRoute>
        <Route exact path={AppRoute.Film}>
          <FilmsScreen
            film={films[4]}
          />
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReviewScreen
            film={films[6]}
            onReviewNew={() => {
              throw new Error('Function \'onReviewNew\' isn\'t implemented.');
            }}
          />
        </Route>
        <Route exact path={AppRoute.Player}>
          <PlayerScreen />
        </Route>
        <Route exact path={AppRoute.devReview}>
          <FilmReviewScreen film={films[2]} />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
