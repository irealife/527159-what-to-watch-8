import React, {MouseEvent} from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import VideoPlayerPreview from '../video-player/video-player';

type FilmCardProps = {
  film: Film;
  isPlaying: boolean;
  onMouseOver: (evt: MouseEvent) => void;
  onMouseEnter: (filmId: number) => void;
}

export function FilmCard({film, isPlaying, onMouseOver, onMouseEnter}: FilmCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter(film.id);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={onMouseOver} onMouseEnter={handleMouseEnter} key={film.id}>
      <div className="small-film-card__image">
        <VideoPlayerPreview isPlaying={isPlaying} src={film.previewVideoLink} poster={film.previewImg} />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link" href="film-page.html">{film.name}</Link>
      </h3>
    </article>
  );
}
