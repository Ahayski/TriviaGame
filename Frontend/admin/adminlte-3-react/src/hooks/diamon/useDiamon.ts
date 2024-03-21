import { API } from "@app/lib/axios";
import { Get_Diamon } from "@app/store/reducers/diamon";
import { useDispatch } from "react-redux";

export const useDiamon = () => {
  const dispatch = useDispatch();

  const hendelGetDiamon = async () => {
    try {
      const response = await API.get("/diamonds");
      dispatch(Get_Diamon({ data: response.data.data }));
      console.log("diamon", response);
    } catch (error) {
      console.log(error);
    }
  };

  const hendelDeleteDiamon = async (id: number) => {
    try {
      const response = await API.delete(`/diamond/${id}`);
      hendelGetDiamon();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    hendelGetDiamon,
    hendelDeleteDiamon,
  };
};
