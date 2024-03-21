import { DiamonType } from "@app/types/InterfaceType";
import { createSlice } from "@reduxjs/toolkit";

const data: { data: DiamonType[] } = {
  data: [],
};
const initialState = {
  data,
};

export const useSliceDiamon = createSlice({
  name: "useSliceDiamon",
  initialState,
  reducers: {
    Get_Diamon: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { Get_Diamon } = useSliceDiamon.actions;
export default useSliceDiamon.reducer;
