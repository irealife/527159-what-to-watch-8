import {connect, ConnectedProps} from 'react-redux';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {State} from '../../store/reducer';
import {useEffect} from 'react';
import {useParams} from 'react-router';
import {ThunkAppDispatch} from '../../store/types/action';
import {fetchSelectedFilmAction} from '../../store/api-actions';
import NotFoundScreen from '../not-found/not-found';
import {getTimePlayerFormat} from '../../utils';

const mapStateToProps = ({film}: State) => ({
  film,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchSelectedFilm(id: number) {
    dispatch(fetchSelectedFilmAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function PlayerScreen({film, fetchSelectedFilm}: ConnectedComponentProps): JSX.Element {

  const {id} = useParams<{id: string}>();

  useEffect(() => {
    fetchSelectedFilm(Number(id));
  }, [fetchSelectedFilm, id]);

  const progressFilm = Math.random();
  const playerProgress = Number((progressFilm * 100).toFixed(2));

  return film !== undefined ? (
    <div className="player">
      <video
        className="player__video"
        src={film.videoLink}
        poster={film.previewImg}
      />
      <Link
        to={AppRoute.Film}
        className="player__exit"
      >
        Exit
      </Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playerProgress} max="100" />
            <div className="player__toggler" style={{left: `${playerProgress}`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimePlayerFormat(film.runTime * (1 - progressFilm))}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>
          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  ) : <NotFoundScreen />;
}

export {PlayerScreen};
export default connector(PlayerScreen);
