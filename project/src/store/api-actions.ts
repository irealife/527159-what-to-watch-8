import {ThunkActionResult} from './types/action';
import {
  loadFilms,
  loadPromoFilm,
  loadReviews,
  changeUser,
  loadSelectedFilm,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setFavoriteFilmList
} from './action';
import {dropToken, getToken, saveToken} from '../services/token';
import {toast} from 'react-toastify';
import {APIRoute, AppRoute, AuthorizationStatus, FavoriteStatus} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {AuthData} from '../types/auth-data';
import {adapterFromServer, adapterUserFromServer} from '../adapter-from-server';
import {User} from '../types/user';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';

const fetchFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    const adapterData = data.map((item) => adapterFromServer(item));
    dispatch(loadFilms(adapterData));
  };

const fetchSelectedFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
    const adapterData = adapterFromServer(data);
    dispatch(loadSelectedFilm(adapterData));
  };

const fetchSimilarFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    const adapterData = data.map((item) => adapterFromServer(item));
    dispatch(loadSimilarFilms(adapterData));
  };

const fetchPromoFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    const adapterData = adapterFromServer(data);
    dispatch(loadPromoFilm(adapterData));
  };

const fetchFavoriteFilmListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.FavoriteFilms);
    const adapterData = data.map((item) => adapterFromServer(item));
    dispatch(setFavoriteFilmList(adapterData));
  };

const setFavoriteFilmAction = (id: number, status: FavoriteStatus): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    if (getToken() !== '') {
      const state = _getState();
      const {data} = await api.post(`${APIRoute.FavoriteFilms}/${id}/${status}`);
      const adapterData = adapterFromServer(data);
      dispatch(loadSelectedFilm(adapterData));
      if (state.promoFilm?.id === id) {
        dispatch(loadPromoFilm(adapterData));
      }
    } else {
      dispatch(redirectToRoute(`${APIRoute.Login}`));
    }
  };

const fetchReviewsFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    dispatch(loadReviews(data));
  };

const sendReviewFilmAction = (id: number, rating: number, comment: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post<Review>(`${APIRoute.Reviews}/${id}`, {rating, comment});
    dispatch(redirectToRoute(`${APIRoute.Films}/${id}`));
  };

const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {status, data} = await api.get(APIRoute.Login);
      if (status) {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(changeUser(adapterUserFromServer(data)));
      }
    } catch {
      toast.warn(AUTH_FAIL_MESSAGE);
    }
  };

const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(changeUser(adapterUserFromServer(data)));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.MyList));
  };


const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export {
  fetchFilmAction,
  fetchSelectedFilmAction,
  fetchSimilarFilmAction,
  fetchPromoFilmAction,
  fetchFavoriteFilmListAction,
  setFavoriteFilmAction,
  fetchReviewsFilmAction,
  sendReviewFilmAction,
  checkAuthAction,
  loginAction,
  logoutAction
};
