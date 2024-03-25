import { createSlice } from "@reduxjs/toolkit";

interface ITokenUser {
  token?: string;
}

const initialState: ITokenUser = {
  token: "",
};

export const tokenUserSlice = createSlice({
  name: "tokenUserSlice",
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { SET_TOKEN } = tokenUserSlice.actions;
export default tokenUserSlice.reducer;
