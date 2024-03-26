import axios from "axios";
import { IQuiz } from "./types";

export async function getQuiz(): Promise<IQuiz[]> {
  const response = await axios.get("http://127.0.0.1:8000/api/quizzes");
  return response.data.data;
}
