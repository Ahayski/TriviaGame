import { useDispatch, useSelector } from "react-redux";
import { ApiRockGo } from "../../utils/axios";
import { RootState } from "../../store/types/rootTypes";
import { useState } from "react";
import { SET_ALL } from "../../store/slices/userSlices";
import { SET_TOKEN } from "../../store/slices/tokenUser";
import { UseAvatar } from "../Avatar/UseAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const hendelUseUser = ({ navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [userAll, setUserAll] = useState([]);
  const { UpdateAvatar, selectAvatar } = UseAvatar();
  const userEmail = useSelector((state: RootState) => state.user.data.email);
  const dispatch = useDispatch();
  const handleRegister = async () => {
    try {
      const response = await ApiRockGo.post("/api/user/signup", {
        name: name,
        email: userEmail,
      });
      dispatch(SET_ALL(response.data.data));
      dispatch(SET_TOKEN(response.data.token));
      const token = await AsyncStorage.setItem("token", response.data.token); //set token ke localstorage
      console.log("regis", response.data);
      if (response.data.data.email) {
        UpdateAvatar(selectAvatar);
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log("regis", err);
    }
  };

  const UserLoginAll = async () => {
    try {
      const response = await ApiRockGo.get("/api/users");
      setUserAll(response.data.data);
      console.log("userall", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleRegister,
    setName,
    UserLoginAll,
    userAll,
  };
};
