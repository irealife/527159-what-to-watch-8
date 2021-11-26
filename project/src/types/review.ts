import {User} from './user';

type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: Date;
}

export type {Review};
