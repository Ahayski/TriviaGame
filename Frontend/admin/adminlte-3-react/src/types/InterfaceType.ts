export interface AvatarType {
  id: number;
  name: string;
  avatarImage: string;
  price: number | string;
}

export interface DiamonType {
  id: number;
  amount: string;
  image: string;
  price: number | string;
}

export interface QuizType {
  id?: number;
  question: string;
  answer: string;
  options: string[]; // Perbaiki tipe data options menjadi string[]
}
