import { useState } from "react";
import { ApiRockGo } from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/types/rootTypes";

export const UseAvatar = () => {
  const [avatarFre, setAvatarFre] = useState([]);
  const [selectAvatar, setSelectAvatar] = useState<number>(0);
  const [avatarDiamon, setAvatarDiamon] = useState([]);
  const [avatarGETFre, setAvatarGETFre] = useState([]);
  const tokenRidux = useSelector((state: RootState) => state.tokenUser.token);
  const dispatch = useDispatch();

  const hendelGetAvatar = async () => {
    try {
      const response = await ApiRockGo.get("/api/avatars");
      setAvatarFre(response.data.data);
      setAvatarDiamon(response.data.data);
      console.log(response.data.data);
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

  const UpdateAvatar = async (id: any) => {
    console.log("idbroo", id);
    try {
      const token = tokenRidux || (await AsyncStorage.getItem("token"));
      const formData = new FormData();
      formData.append("avatarId", id);
      const response = await ApiRockGo.patch("/api/user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Tetapkan jenis konten sebagai form-data
        },
      });

      console.log("update", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    GetAvatarFre,
    hendelGetAvatar,
    avatarFre,
    avatarDiamon,
    avatarGETFre,
    UpdateAvatar,
    selectAvatar,
    setSelectAvatar,
  };
};
