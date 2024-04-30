import { useState } from "react";
import { ApiRockGo } from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/types/rootTypes";
import { hendelUseUser } from "../User/useUser";
import { SET_AVATAR } from "../../store/slices/userSlices";

export const UseAvatar = () => {
  const [avatarFre, setAvatarFre] = useState([]);
  const [selectAvatar, setSelectAvatar] = useState<number>(0);
  const { UpdateUser } = hendelUseUser({ navigator });
  const [avatarDiamon, setAvatarDiamon] = useState([]);
  const [avatarGETFre, setAvatarGETFre] = useState([]);
  const avatarUser = useSelector((state: RootState) => state.useravatar.data);
  const tokenRidux = useSelector((state: RootState) => state.tokenUser.token);
  const dispatch = useDispatch();

  const hendelGetAvatar = async () => {
    try {
      const response = await ApiRockGo.get("/api/avatars");
      setAvatarFre(response.data.data);
      setAvatarDiamon(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const GetAvatarFre = async () => {
    try {
      const response = await ApiRockGo.get("/api/avatars_zero");
      setAvatarGETFre(response.data.data);

      // console.log("hallo", response.data); // Assuming you want to log the response
    } catch (error) {
      console.error("tes", error);
    }
  };

  const UpdateAvatarImage = async (id: any, name: string, email: string) => {
    try {
      const formData = new FormData();
      formData.append("avatarId", id);
      formData.append("email", email);
      const response = await ApiRockGo.patch("/api/buyAvatar", formData);
      if (
        response.data.purchasedavatars.filter((item: any) => item.id === id)
      ) {
        UpdateUser(id, name, email);
      }
      dispatch(SET_AVATAR(response.data.avatar));
      console.log("avatarbuy", response.data);
    } catch (error: any) {
      if (error.message.code === 400) {
        console.log("ajshkajhfkjahks");
      }
      console.log("errornih", error);
    }
  };
  return {
    GetAvatarFre,
    hendelGetAvatar,
    avatarFre,
    avatarDiamon,
    avatarGETFre,
    UpdateAvatarImage,
    selectAvatar,
    setSelectAvatar,
  };
};
