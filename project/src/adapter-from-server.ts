import {Film} from './types/film';
import {User} from './types/user';

function adapterFromServer(data: {[key: string]: unknown}): Film {
  const adaptedFilm = Object.assign({}, data, {
    posterImg: data['poster_image'],
    previewImg: data['preview_image'],
    backgroundImg: data['background_image'],
    backgroundColor: data['background_color'],
    videoLink: data['video_link'],
    previewVideoLink: data['preview_video_link'],
    scoresCount: data['scores_count'],
    runTime: data['run_time'],
    isFavorite: data['is_favorite'],
  });

  delete adaptedFilm['poster_image'];
  delete adaptedFilm['preview_image'];
  delete adaptedFilm['background_image'];
  delete adaptedFilm['background_color'];
  delete adaptedFilm['video_link'];
  delete adaptedFilm['preview_video_link'];
  delete adaptedFilm['scores_count'];
  delete adaptedFilm['run_time'];
  delete adaptedFilm['is_favorite'];

  return adaptedFilm as Film;
}

function adapterUserFromServer(data: {[key: string]: unknown}): User {
  const adaptedUser = Object.assign({}, data, {
    avatarUrl: data['avatar_url'],
  });
  delete adaptedUser['avatar_url'];
  return adaptedUser as User;
}

export {
  adapterFromServer,
  adapterUserFromServer
};
