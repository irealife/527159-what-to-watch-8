import {Genres} from '../const';

type Film = {
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
  starring: [];
  runTime: number;
  genre: Genres;
  released: number;
  isFavorite: boolean;
}

export type {Film};
