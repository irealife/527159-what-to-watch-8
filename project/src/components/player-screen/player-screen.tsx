import {connect, ConnectedProps} from 'react-redux';
import {APIRoute} from '../../const';
import {Link} from 'react-router-dom';
import {State} from '../../store/reducer';
import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router';
import {ThunkAppDispatch} from '../../store/types/action';
import {fetchSelectedFilmAction} from '../../store/api-actions';
import NotFoundScreen from '../not-found/not-found';
import {getTimePlayerFormat} from '../../utils';
import LoadingScreen from '../loading-screen/loading-screen';

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

  const ref = useRef<HTMLVideoElement>(null);

  const [isReady, setReady] = useState(false);
  const [isPlay, setPlay] = useState(false);
  const [isDuration, setDuration] = useState(0);
  const [isPercent, setPercent] = useState(0);
  const [passTime, setPassTime] = useState(0);

  const play = async (unit: HTMLVideoElement) => {
    try {
      await unit.play();
    } catch {
      setPlay(false);
    }
  };

  useEffect(() => {
    if (!isReady || !ref.current) {
      return;
    }
    const totalDuration = Math.round(ref.current.duration);
    setDuration(totalDuration);
    setPassTime(totalDuration);
    setPlay(true);
  }, [isReady]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const unit = ref.current;
    if (isPlay) {
      play(unit);
      return;
    }
    unit.pause();
  }, [isPlay]);

  const onLoadedData =() => {
    setReady(true);
  };

  const onLoadTime = () => {
    if (!ref.current) {
      return;
    }
    const unit = ref.current;
    const currentPercent = unit.currentTime / isDuration * 100;
    const currentPassTime = Math.round(isDuration * (100 - currentPercent) / 100);

    setPercent(currentPercent);
    setPassTime(currentPassTime);
  };

  const togglePlay = () => {
    setPlay((prevValue) => !prevValue);
  };

  const handleFullScreen = () => {
    if (!ref.current) {
      return;
    }
    ref.current.requestFullscreen();
  };

  const onPlay = () => {
    setPlay(true);
  };

  const onPause = () => {
    setPlay(false);
  };

  const handlePlayButtonClick = () => {
    togglePlay();
  };

  const leftToggler = `${Math.round(isPercent)}%`;
  const iconPlay = isPlay ? '#pause' : '#play-s';
  const timeVideo = isReady ? getTimePlayerFormat(passTime) : <LoadingScreen />;

  return film !== undefined ? (
    <div className="player">
      <video
        ref={ref}
        className="player__video"
        src={film.videoLink}
        poster={film.previewImg}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onLoadTime}
        onLoadedData={onLoadedData}
      />
      <Link
        to={`${APIRoute.Films}/${id}`}
        className="player__exit"
      >
        Exit
      </Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={isDuration - passTime} max={isDuration} />
            <div className="player__toggler" style={{left: leftToggler}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeVideo}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" disabled={!isReady} onClick={handlePlayButtonClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={iconPlay} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>
          <button type="button" className="player__full-screen" disabled={!isReady} onClick={handleFullScreen}>
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
