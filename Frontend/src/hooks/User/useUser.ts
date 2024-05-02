import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN } from "../../store/slices/tokenUser";
import {
  SET_ALL,
  SET_AVATAR,
  SET_AVATARID,
} from "../../store/slices/userSlices";
import { RootState } from "../../store/types/rootTypes";
import { ApiRockGo } from "../../utils/axios";

export const hendelUseUser = ({ navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [userAll, setUserAll] = useState([]);
  const [register, setRegister] = useState([]);
  const user = useSelector((state: RootState) => state.user.data);
  const tokenRidux = useSelector((state: RootState) => state.tokenUser.token);
  // console.log("token", tokenRidux);
  const dispatch = useDispatch();

  const UserLoginAll = async () => {
    try {
      const response = await ApiRockGo.get("/api/users");
      setUserAll(response.data.data);
      // console.log("tes", response.data.data);
      // console.log("tes", userAll);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async () => {
    try {
      const response = await ApiRockGo.post("/api/user/signup", {
        email: user.email,
      });
      dispatch(SET_ALL(response.data.data));
      dispatch(SET_AVATARID(response.data.data.avatar));
      dispatch(SET_TOKEN(response.data.token));
      setRegister(response.data.data);
      console.log("regis", response.data);
      if (response.data.data.email) {
        UpdateUser(
          response.data.data.avatar,
          response.data.data.name,
          response.data.data.email
        );

        navigation.navigate("Home");
      }
    } catch (err) {
      console.log("regis", err);
    }
  };

  const UpdateUser = async (id: any, name: string, email: string) => {
    console.log("clgTEs", id, name, email);
    try {
      const formData = new FormData();
      formData.append("avatarId", id);
      formData.append("name", name);
      formData.append("email", email);
      const response = await ApiRockGo.patch("/api/user", formData, {
        headers: {
          Authorization: `Bearer ${tokenRidux}`,
          "Content-Type": "multipart/form-data", // Tetapkan jenis konten sebagai form-data
        },
      });

      // dispatch(SET_ALL(response.data.data));
      dispatch(SET_AVATAR(response.data.data.avatar.avatarImage));
      dispatch(SET_AVATARID(response.data.data.avatar.id));
      console.log("updateUSER", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const UserLoginId = async (id: number) => {
    try {
      const response = await ApiRockGo.get(`/api/user/${id}`);
      // dispatch(SET_ALL(response.data.data));
      //  dispatch(SET_AVATAR(response.data.data.avatar.avatarImage));
      console.log("tesla", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleRegister,
    setName,
    UserLoginAll,
    UserLoginId,
    userAll,
    UpdateUser,
    register,
  };
};
