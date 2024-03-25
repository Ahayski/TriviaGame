import axios from "axios";
import { IQuiz } from "./types";

export async function getQuiz(): Promise<IQuiz[]> {
  const response = await axios.get("http://localhost:9000/api/quizzes");
  return response.data.data;
}
