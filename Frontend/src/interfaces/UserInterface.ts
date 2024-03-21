export interface IUser {
    id?: number,
    username?: string,
    email?: string,
    avatar?: string | undefined,
    diamond?: number,
}

export interface IUsersLoby {
    id: string;
    username: string;
    room: string;
}