import { API } from "@app/lib/axios";
import { Get_Quiz } from "@app/store/reducers/quiz";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const useQuiz = () => {
  const dispatch = useDispatch();
  const hendelGetQuiz = async () => {
    try {
      const response = await API.get("/quizzes");
      console.log(response);
      dispatch(Get_Quiz({ data: response.data.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const hendelDeleteQuiz = async (id: any) => {
    try {
      const response = await API.delete(`/quizzes/${id}`);
      hendelGetQuiz();
      toast.info("Delete Quiz succeed!");
      window.location.reload();
      response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    hendelGetQuiz,
    hendelDeleteQuiz,
  };
};
