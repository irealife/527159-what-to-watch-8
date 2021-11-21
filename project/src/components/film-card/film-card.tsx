import React from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import VideoPlayerPreview from '../video-player/video-player';

type FilmCardProps = {
  film: Film;
  isPlaying: boolean;
  onMouseLeave: () => void;
  onMouseEnter: (filmId: number) => void;
}

export function FilmCard({film, isPlaying, onMouseLeave, onMouseEnter}: FilmCardProps): JSX.Element {

  const handleMouseEnter = () => {
    onMouseEnter(film.id);
  };

  return (
    <article className="small-film-card catalog__films-card"
      onMouseLeave={onMouseLeave}
      onMouseEnter={handleMouseEnter}
      id={String(film.id)}
    >
      <div className="small-film-card__image">
        <VideoPlayerPreview
          isPlaying={isPlaying}
          src={film.previewVideoLink}
          poster={film.previewImg}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${film.id}`} className="small-film-card__link" href="/">{film.name}</Link>
      </h3>
    </article>
  );
}
