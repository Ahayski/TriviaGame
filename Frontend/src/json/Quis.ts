import { UserGame } from "./User";

type UserPlay = UserGame;
interface QuisData {
  id: number;
  questionTitle: string;
  question: string[] | number[];
  answer: string;
  user?: UserPlay;
}

export const QuisJson: QuisData[] = [
  {
    id: 1,
    questionTitle: ` Budi memiliki uang 30k lalu budi membeli kopi 10k dan menaiki
    bus ke sekolahan 5k pertanyaan nya adalah siapa nama supir bus
    sekolah budi ?`,
    question: ["Yono", "Budi", "Dewi", "Yanto"],
    answer: "Yono",
    user: {
      id: 1,
      avatar: require("../../assets/avatar/AvatarD4.png"),
      name: "Dimasheru",
    },
  },

  {
    id: 2,
    questionTitle: `Nasi yang enak buat sarapan, biasanya nasi?`,
    question: ["Nasi Goreng", "Nasi Uduk", "Nasi Matang", "Nasi Kuning"],
    answer: "Nasi Matang",
    user: {
      id: 1,
      avatar: require("../../assets/avatar/AvatarD4.png"),
      name: "Dimasheru",
    },
  },
  {
    id: 3,
    questionTitle: `Koruptor di Wakanda harusnya di beri hukuman? `,
    question: [
      "Hukuman Mati",
      "Penjara Seumur hidup",
      "Di Miskinkan",
      "Di Bebaskan",
    ],
    answer: "Di Bebaskan",
    user: {
      id: 1,
      avatar: require("../../assets/avatar/AvatarD4.png"),
      name: "Dimasheru",
    },
  },
];
