import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {films} from './mocks/films';

const InfoPromoFilm = {
  TITLE: 'The Grand Budapest Hotel',
  GENRE: 'Drama',
  RELEASE_DATE: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      title = {InfoPromoFilm.TITLE}
      genre = {InfoPromoFilm.GENRE}
      releaseDate = {InfoPromoFilm.RELEASE_DATE}
      films = {films}
    />
  </React.StrictMode>,
  document.getElementById('root'));
