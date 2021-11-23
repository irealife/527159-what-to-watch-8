import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {State} from '../../store/reducer';
import {connect, ConnectedProps} from 'react-redux';
import {useParams} from 'react-router-dom';
import {ThunkAppDispatch} from '../../store/types/action';
import {fetchSelectedFilmAction} from '../../store/api-actions';
import {AuthorizationStatus} from '../../const';
import Logo from '../logo/logo';
import AddReviewForm from '../add-review-form/add-review-form';
import UserRegistered from '../user-registered/user-registered';
import UserNotRegistered from '../user-not-registered/user-not-registered';
import NotFoundScreen from '../not-found/not-found';

const mapStateToProps = ({film, authorizationStatus}: State) => ({
  film,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchSelectedFilm(id: number) {
    dispatch(fetchSelectedFilmAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function AddReviewScreen({authorizationStatus, film, fetchSelectedFilm}: ConnectedComponentProps): JSX.Element {

  const {id} = useParams<{id: string}>();

  useEffect(() => {
    fetchSelectedFilm(Number(id));
  }, [fetchSelectedFilm, id]);

  return film !== undefined ? (
    <section key={film.id} className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImg} alt={film.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Logo/>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a href="/" className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          {authorizationStatus === AuthorizationStatus.Auth ? <UserRegistered/> : <UserNotRegistered/>}
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImg} alt={film.name} width="218" height="327"/>
        </div>
      </div>
      <AddReviewForm />
    </section>
  ) : <NotFoundScreen />;
}

export {AddReviewScreen};

export default connector(AddReviewScreen);
