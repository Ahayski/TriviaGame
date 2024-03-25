export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string | number;
  diamond?: number;
}

export interface IUsersLoby {
  id: string;
  username: string;
  room: string;
}
