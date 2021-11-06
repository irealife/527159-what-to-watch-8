import React, {useState, MouseEvent} from 'react';
import {FilmCard} from '../film-card/film-card';
import {Film} from '../../types/film';

type FilmListProps = {
  films: Film[];
}

export function FilmList({films}: FilmListProps): JSX.Element {
  const [currentFilm, setCurrentFilm] = useState(0);
  const handleActiveFilm = (filmId: number) => {
    setCurrentFilm(filmId);
  };
  const handleHoverPreviewFilm = (evt: MouseEvent) => {
    setCurrentFilm(Number(evt.currentTarget.id));
  };
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard film={film} key={film.id} isPlaying={film.id === currentFilm} onMouseOver={handleHoverPreviewFilm} onMouseEnter={handleActiveFilm} />
      ))}
    </div>
  );
}
