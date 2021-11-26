import React, {MouseEvent} from 'react';
import {Genres} from '../../const';

type GenreListProps = {
  genres: Genres[],
  activeGenre: Genres,
  onChangeGenre: (genre: Genres) => void,
}

function GenreList({genres, activeGenre, onChangeGenre}: GenreListProps): JSX.Element {

  const genresItemClass = 'catalog__genres-item';
  const genresItemClassActive = 'catalog__genres-item--active';

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={[genresItemClass, genre === activeGenre ? genresItemClassActive : ''].join(' ')} key={genre}>
          <a href="/" className="catalog__genres-link"
            onClick={(evt:MouseEvent<HTMLAnchorElement>) => {evt.preventDefault(); onChangeGenre(genre);}}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
