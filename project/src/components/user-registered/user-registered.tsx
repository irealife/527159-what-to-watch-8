import React, {MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../../store/api-actions';
import {Link} from 'react-router-dom';

function UserRegistered(): JSX.Element {
  const dispatch = useDispatch();
  const handlerButtonClickSignOut = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={'/myList'}>
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" href='/' onClick={handlerButtonClickSignOut}>Sign out</a>
      </li>
    </ul>
  );
}

export default UserRegistered;
