import React from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: Film;
  onMouseOver: (filmId: number) => void;
  play: number;
}

export function FilmCard({film, onMouseOver, play}: FilmCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseOver(film.id);
  };
  if(play) {
    <p>ghbdtn</p>;
  }
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={handleMouseEnter}>
      <div className="small-film-card__image">
        <img src={film.posterImg} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link" href="film-page.html">{film.name}</Link>
      </h3>
    </article>
  );
}
