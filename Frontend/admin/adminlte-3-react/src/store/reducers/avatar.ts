import { AvatarType } from "@app/types/InterfaceType";
import { createSlice } from "@reduxjs/toolkit";

const data: { data: AvatarType[] } = {
  data: [],
};
const initialState = {
  data,
};

export const useSliceAvatar = createSlice({
  name: "useSliceAvatar",
  initialState,
  reducers: {
    Get_Avatar: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { Get_Avatar } = useSliceAvatar.actions;
export default useSliceAvatar.reducer;
