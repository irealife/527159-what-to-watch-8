import React from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: Film;
  onMouseEnter: (filmId: number) => void;
}

export function FilmCard({film, onMouseEnter}: FilmCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter(film.id);
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} >
      <div className="small-film-card__image">
        <img src={film.posterImg} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link" href="film-page.html">{film.name}</Link>
      </h3>
    </article>
  );
}
