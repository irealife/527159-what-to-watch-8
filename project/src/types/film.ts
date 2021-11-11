import {Genres} from '../const';

export type Film = {
  id: number;
  name: string;
  posterImg: string;
  previewImg: string;
  backgroundImg: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: Genres;
  released: number;
  isFavorite: boolean;
}

export type FilmPromo = {
  name: string,
  genre: string,
  release: number,
}
