import { API } from "@app/lib/axios";
import { Get_Avatar } from "@app/store/reducers/avatar";
import { useDispatch } from "react-redux";

export const useAvatar = () => {
  const dispatch = useDispatch();
  const handleGetAvatars = async () => {
    try {
      const response = await API.get("/avatars");
      // Update state with fetched avatars
      //   console.log("hallo", response);
      dispatch(Get_Avatar({ data: response.data.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const hendelDeleteAvatar = async (id: number) => {
    try {
      const response = await API.delete(`/avatar/${id}`);
      // Update state with fetched avatars
      console.log("tes", response);
      handleGetAvatars();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleGetAvatars,
    hendelDeleteAvatar,
  };
};
