import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {logoutAction} from '../../store/api-actions';
import {Link} from 'react-router-dom';
import {State} from '../../store/reducer';
import {ThunkAppDispatch} from '../../store/types/action';
import {AppRoute, AuthorizationStatus} from '../../const';
import NotFoundScreen from '../not-found/not-found';

const mapStateToProps = ({authorizationStatus, user}: State) => ({
  authorizationStatus,
  user,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux;

function UserRegistered({authorizationStatus, user, onLogout}: ConnectedComponentProps): JSX.Element {

  return user !== undefined ? (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MyList}>
            <img src={user.avatarUrl} alt="имя" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        {authorizationStatus === AuthorizationStatus.Auth ?
          <Link to={AppRoute.Main} className="user-block__link" onClick={() => onLogout()}>Sign out</Link>
          : <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>}
      </li>
    </ul>
  ) : <NotFoundScreen />;
}

export {UserRegistered};
export default connector(UserRegistered);
