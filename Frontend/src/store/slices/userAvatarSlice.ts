import { createSlice } from "@reduxjs/toolkit";
import { AvatarUser } from "../../interfaces/UserInterface";

const initialState: { data: AvatarUser } = {
  data: {
    id: 0,
    email: "",
    name: "",
    purchasedavatars: [
      {
        id: 0,
        avatarImage: "",
        price: 0,
        purchase: false,
      },
    ],
  },
};

const userAvatarSlice = createSlice({
  name: "userAvatar",
  initialState,
  reducers: {
    SET_USERAVATAR: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { SET_USERAVATAR } = userAvatarSlice.actions;
export default userAvatarSlice.reducer;
