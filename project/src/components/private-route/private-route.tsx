import {Route, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../store/reducer';
import {History} from 'history';

type RenderFuncProps = {
  history: History<unknown>;
}

type PrivateRouteProps = RouteProps & {
    render: (props: RenderFuncProps) => JSX.Element;
    authorizationStatus: AuthorizationStatus;
  }

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute({exact, path, render, authorizationStatus}: ConnectedComponentProps): JSX.Element {

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.SignIn}/>
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
