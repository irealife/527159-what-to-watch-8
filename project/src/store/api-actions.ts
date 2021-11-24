import {ThunkActionResult} from './types/action';
import {
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSelectedFilm,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setFavoriteFilmList
} from './action';
import {dropToken, getToken, saveToken, Token} from '../services/token';
import {toast} from 'react-toastify';
import {APIRoute, AppRoute, AuthorizationStatus, FavoriteStatus} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {AuthData} from '../types/auth-data';
import {adapterFromServer} from '../adapter-from-server';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';

export const fetchFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    const adapterData = data.map((item) => adapterFromServer(item));
    dispatch(loadFilms(adapterData));
  };

export const fetchSelectedFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
    const adapterData = adapterFromServer(data);
    dispatch(loadSelectedFilm(adapterData));
  };

export const fetchSimilarFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    const adapterData = data.map((item) => adapterFromServer(item));
    dispatch(loadSimilarFilms(adapterData));
  };

export const fetchPromoFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    const adapterData = adapterFromServer(data);
    dispatch(loadPromoFilm(adapterData));
  };

export const fetchFavoriteFilmListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.FavoriteFilms);
    const adapterData = data.map((item) => adapterFromServer(item));
    dispatch(setFavoriteFilmList(adapterData));
  };

export const setFavoriteFilmAction = (id: number, status: FavoriteStatus): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    if (getToken() !== '') {
      await api.post(`${APIRoute.FavoriteFilms}/${id}/${status}`);
    } else {
      dispatch(redirectToRoute(`${APIRoute.Login}`));
    }
  };

export const fetchReviewsFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    dispatch(loadReviews(data));
  };

export const sendReviewFilmAction = (id: number, rating: number, comment: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post<Review>(`${APIRoute.Reviews}/${id}`, {rating, comment});
    dispatch(redirectToRoute(`${APIRoute.Films}/${id}`));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.warn(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
