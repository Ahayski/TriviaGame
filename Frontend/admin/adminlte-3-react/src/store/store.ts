import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "@app/store/reducers/auth";
import { uiSlice } from "@app/store/reducers/ui";
import { createLogger } from "redux-logger";
import { useSliceAvatar } from "./reducers/avatar";
import { useSliceDiamon } from "./reducers/diamon";
import { useSliceQuiz } from "./reducers/quiz";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    avatar: useSliceAvatar.reducer,
    diamon: useSliceDiamon.reducer,
    quiz: useSliceQuiz.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()) as any,
});

export default store;
