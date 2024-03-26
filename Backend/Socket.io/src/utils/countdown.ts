import { io, waitingRoomOne } from "..";
import { getQuiz } from "./getQuiz";
import { IQuiz } from "./types";

let counter = 0;
let shuffled: IQuiz[];

let quizzes: IQuiz[];
getQuiz().then((val: IQuiz[]) => (quizzes = val));

function shuffle() {
  shuffled = quizzes
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);
}

let seconds = 10; // timer matching
export const countdown = (room: string) => {
  io.to(room).emit("AllQuestion", quizzes)
  shuffle();
  const interval = setInterval(() => {
    io.to(room).emit("matching", seconds);
    seconds--;

    if (seconds === -1) {
      clearInterval(interval);

      setTimeout(() => {
        io.to(waitingRoomOne).emit("question", shuffled[0]);
        shuffled.splice(0, 1);

        timer(waitingRoomOne);
        counter++;

        io.to(waitingRoomOne).emit("counter", counter);
        console.log(counter);
      }, 3000);
      seconds = 10;
    }
  }, 1000);
};

let secondsQuiz = 15;
const timer = (room: string) => {
  const interval = setInterval(() => {
    io.to(room).emit("timer", secondsQuiz);
    secondsQuiz--;

    if (secondsQuiz === -1) {
      clearInterval(interval);

      if (counter < 5) {
        setTimeout(() => {
          io.to(waitingRoomOne).emit("question", shuffled[0]);
          shuffled.splice(0, 1);

          timer(waitingRoomOne);
          counter++;

          io.to(waitingRoomOne).emit("counter", counter);
          console.log(counter);
        }, 4000);
      }
      if (counter === 5) {
        counter = 0;
      }
      secondsQuiz = 15;
    }
  }, 1000);
};
