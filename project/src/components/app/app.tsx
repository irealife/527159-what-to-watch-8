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

type AppScreenProps = {
  films: Film[];
}

function App({films}:AppScreenProps): JSX.Element {
  const [firstFilm] = films;
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
            film={firstFilm}
          />
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReviewScreen
            film={firstFilm}
          />
        </Route>
        <Route exact path={AppRoute.Player}>
          <PlayerScreen />
        </Route>
        <Route exact path={AppRoute.devReview}>
          <FilmReviewScreen film={firstFilm} />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
