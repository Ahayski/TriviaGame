export interface JoinRoomData {
  username: string;
  avatar: string;
}

export interface IUsers {
  id: string;
  username: string;
  avatar: string;
  room: string;
}

export interface IQuiz {
  id: string;
  question: string;
  answer: string;
  option: string;
}
