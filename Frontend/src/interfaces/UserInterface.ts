export interface IUser {
  id?: number | undefined;
  name?: string;
  email?: string;
  avatar?: string | number;
  avatarId?: string | number;
  diamond?: number;
}

export interface IUsersLoby {
  id: string;
  username: string;
  room: string;
}

export interface AvatarUser {
  id: number;
  email: string;
  name: string;
  purchasedavatars: [
    {
      id?: number;
      avatarImage?: string;
      price?: number;
      purchase?: boolean;
    }
  ];
}
