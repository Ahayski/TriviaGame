import { QuizType } from "@app/types/InterfaceType";
import { createSlice } from "@reduxjs/toolkit";

const data: { data: QuizType[] } = {
  data: [],
};

const initialState = {
  data,
};

export const useSliceQuiz = createSlice({
  name: "useSliceQuiz",
  initialState,
  reducers: {
    Get_Quiz: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { Get_Quiz } = useSliceQuiz.actions;
export default useSliceQuiz.reducer;
