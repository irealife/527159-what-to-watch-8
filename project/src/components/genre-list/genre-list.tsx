import React from 'react';
import {Genres} from '../../const';

type GenreListProps = {
  genres: Genres[],
  activeGenre: Genres,
  onChangeGenre: (genre: Genres) => void,
}

export function GenreList({genres, activeGenre, onChangeGenre}: GenreListProps): JSX.Element {

  const genresItemClass = 'catalog__genres-item';
  const genresItemClassActive = 'catalog__genres-item--active';

  const handleGenreMouseEnter = () => {
    onChangeGenre(activeGenre);
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => {
        <li className={[genresItemClass, genre === activeGenre ? genresItemClassActive : ''].join(' ')} key={genre}>
          <a href="/" className="catalog__genres-link" onClick={handleGenreMouseEnter}>{genre}</a>
        </li>;
      })}
    </ul>
  );
}
