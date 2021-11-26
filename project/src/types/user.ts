import {Token} from '../services/token';

type User = {
  id: number;
  email: string;
  avatarUrl: string;
  name: string;
  token: Token;
}

export type {User};
