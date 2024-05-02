import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import sizeRoomReducer from "./slices/sizeRoomSlices";
import usersInRoomReducer from "./slices/usersInRoomSlices";
import timerReducer from "./slices/timerSlices";
import { tokenUserSlice } from "./slices/tokenUser";

import userAvatarSlice from "./slices/userAvatarSlice";

import questionSlices from "./slices/questionSlices";
import scoreSlices from "./slices/scoreSlices";


const rootReducer = combineReducers({
  user: userReducer,
  sizeRoom: sizeRoomReducer,
  usersInRoom: usersInRoomReducer,
  timerReducer: timerReducer,
  tokenUser: tokenUserSlice.reducer,

  useravatar: userAvatarSlice,

  question: questionSlices,
  score: scoreSlices,

});

export default rootReducer;
