import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import FilmsScreen from '../films-screen/films-screen';
import PlayerScreen from '../player-screen/player-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import NotFoundScreen from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {FilmList} from '../film-list/film-list';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../film';
import {State} from '../../store/types/state';
import browserHistory from '../../browser-history';

const mapStateToProps = ({films, authorizationStatus, isDataLoaded}:State) => ({
  films,
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function App({authorizationStatus, isDataLoaded, films}:ConnectedComponentProps): JSX.Element {

  if(isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList} render={() => <FilmList films={films} />}>
        </PrivateRoute>
        <Route exact path={AppRoute.Film}>
          <FilmsScreen />
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
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
