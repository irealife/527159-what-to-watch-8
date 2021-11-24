import {Film} from './types/film';
import {Genres} from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function filteredFilms(films: Film[], activeGenre: Genres): Film[] {
  if (activeGenre === Genres.AllGenres) {
    return films;
  }
  return films.filter((film) => film.genre === activeGenre);
}

export const getRatingToString = (rating: number): string => rating.toFixed(1).replace('.', ',');

type StarFilm = {
  [key: number]: string;
};

export const starsFilm: StarFilm =  {
  0: 'Bad',
  1: 'Bad',
  2: 'Bad',
  3: 'Normal',
  4: 'Normal',
  5: 'Normal',
  6: 'Good',
  7: 'Good',
  8: 'Very Good',
  9: 'Very Good',
  10: 'Awesome',
};

export const getStarFilmToUser = (star: number): string => {
  if (starsFilm[star]) {
    return starsFilm[star];
  } return '';
};

export const getDateFormat = (date: Date): string => dayjs(date).format('YYYY-MM-DD');
export const getUserDateFormat = (date: Date): string => dayjs(date).format('MMMM D, YYYY');

const ONE_HOUR = 3600;

export const getTimePlayerFormat = (time: number) => {
  const timeFormat = time >= ONE_HOUR ? '-HH:mm:ss' : '-mm:ss';
  return dayjs.duration(time, 'seconds').format(timeFormat);
};
