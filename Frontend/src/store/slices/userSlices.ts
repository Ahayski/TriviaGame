import { IUser } from "../../interfaces/UserInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialUser: { data: IUser } = {
  data: {
    id: 0,
    name: "", // di ubah karna di samakan response backend
    email: "",
    avatar: "",
    avatarId: 0,
    diamond: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    GET_USER: (state, action) => {
      const payload = action.payload;
    },
    SET_ALL: (state, action) => {
      state.data.id = action.payload.id;
      state.data.name = action.payload.name;
      state.data.email = action.payload.email;
      state.data.diamond = action.payload.diamond;
    },
    SET_ID: (state, action) => {
      state.data.id = action.payload;
    },
    SET_AVATARID: (state, action) => {
      state.data.avatarId = action.payload;
    },
    SET_EMAIL: (state, action) => {
      const payload = action.payload;
      state.data.email = payload;
    },
    SET_AVATAR: (state, action) => {
      const payload = action.payload;
      state.data.avatar = payload;
    },

    SET_USERNAME: (state, action) => {
      const payload = action.payload;
      state.data.name = payload;
    },
    SET_ADD_DIAMOND: (state, action) => {
      const payload = action.payload;
      state.data.diamond = state.data.diamond + payload;
    },
    SET_MIN_DIAMOND: (state, action) => {
      const payload = action.payload;
      // const diamond = state.data.diamond
      if (state.data.diamond! == 0) {
        alert("Diamond Tidak Cukup");
      } else {
        state.data.diamond = (state.data.diamond ?? 0) - payload;
      }
    },
  },
});

export const {
  GET_USER,
  SET_AVATAR,
  SET_USERNAME,
  SET_EMAIL,
  SET_ADD_DIAMOND,
  SET_MIN_DIAMOND,
  SET_ALL,
  SET_ID,
  SET_AVATARID,
} = userSlice.actions;

export default userSlice.reducer;
