import React, {useCallback} from 'react';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeGenre, loadMore} from '../../store/action';
import {Genres, SHOW_MORE_STEP} from '../../const';
import {State} from '../../store/reducer';
import {Actions} from '../../store/types/action';
import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import GenreList from '../genre-list/genre-list';
import {filteredFilms} from '../../utils';
import FilmPromo from '../film-promo/film-promo';
import ShowMore from '../show-more/show-more';
import LoadingScreen from '../loading-screen/loading-screen';

const mapStateToProps = ({films, activeGenre, loadedFilmsCount, isDataLoaded, authorizationStatus}: State) => ({
  films: filteredFilms(films, activeGenre).slice(0, loadedFilmsCount),
  activeGenre,
  isDataLoaded,
  authorizationStatus,
  totalFilmsCount: films.length,
  loadedFilmsCount,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: Genres) {
    dispatch(changeGenre(genre));
  },
  onLoadMoreStep(step: number) {
    dispatch(loadMore(step));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function MainScreen({films, activeGenre, loadedFilmsCount, totalFilmsCount, isDataLoaded, onChangeGenre, onLoadMoreStep}: ConnectedComponentProps): JSX.Element {

  const genres = Object.values(Genres) as Genres[];

  const handleShowMoreButton = () => {
    onLoadMoreStep(loadedFilmsCount + SHOW_MORE_STEP);
  };

  const changeGenreCallBack = useCallback((genreActive) => {
    onChangeGenre(genreActive);
  }, [onChangeGenre]);

  return (
    <>
      <FilmPromo />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList genres={genres} activeGenre={activeGenre} onChangeGenre={changeGenreCallBack} />
          {isDataLoaded ? <FilmList films={films} /> : <LoadingScreen />}
          {loadedFilmsCount < totalFilmsCount && <ShowMore onLoadMore={handleShowMoreButton} />}
        </section>
        <Footer />
      </div>
    </>
  );
}

export {MainScreen};
export default connector(MainScreen);
