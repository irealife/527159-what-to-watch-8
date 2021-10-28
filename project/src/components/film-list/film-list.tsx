import React, {useState} from 'react';
import {FilmCard} from '../film-card/film-card';
import {Film} from '../../types/film';

type FilmListProps = {
  films: Film[];
}

export function FilmList({films}: FilmListProps): JSX.Element {
  const [, setActiveFilmId] = useState(0);
  const handleActiveFilm = (id: number) => {
    setActiveFilmId(id);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard film={film} key={film.id} onMouseEnter={handleActiveFilm} />
      ))}
    </div>
  );
}

// <FilmCard film={film} key={film.id} onMouseEnter={setActiveFilmId} />
