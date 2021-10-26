import React from 'react';
import {Film} from '../../types/film';

type FilmCardProps = {
  film: Film;
  onMouseEnter: (filmId: number) => void;
}

export function FilmCard({film, onMouseEnter}: FilmCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter(film.id);
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter}>
      <div className="small-film-card__image">
        <img src={film.posterImg} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{film.name}</a>
      </h3>
    </article>
  );
}
