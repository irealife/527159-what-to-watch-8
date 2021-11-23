import {AuthorizationStatus} from '../../const';
import React from 'react';
import {State} from '../../store/reducer';
import {Film} from '../../types/film';
import {connect, ConnectedProps} from 'react-redux';
import ButtonPlay from './button-play';
import ButtonMyList from './button-my-list';
import ButtonAddReview from './button-add-review';

type FilmsButtonProps = {
  film: Film,
  isFavorite: boolean,
};

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFormRedux & FilmsButtonProps;

function FilmsButtons({film, authorizationStatus}: ConnectedComponentProps): JSX.Element {

  return (
    <div className="film-card__buttons">
      <ButtonPlay film={film}/>
      <ButtonMyList film={film} isFavorite={film.isFavorite} />
      {authorizationStatus === AuthorizationStatus.Auth && <ButtonAddReview film={film} />}
    </div>
  );
}

export {FilmsButtons};
export default connector(FilmsButtons);
