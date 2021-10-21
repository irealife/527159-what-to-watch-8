export type DataUser = {
  id: number;
  name: string;
}

export type DataReview = {
  id: number;
  user: DataUser;
  rating: number;
  comment: string;
  date: Date;
}
