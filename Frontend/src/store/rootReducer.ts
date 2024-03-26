import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import sizeRoomReducer from "./slices/sizeRoomSlices";
import usersInRoomReducer from "./slices/usersInRoomSlices";
import timerReducer from "./slices/timerSlices";
import { tokenUserSlice } from "./slices/tokenUser";

const rootReducer = combineReducers({
  user: userReducer,
  sizeRoom: sizeRoomReducer,
  usersInRoom: usersInRoomReducer,
  timerReducer: timerReducer,
  tokenUser: tokenUserSlice.reducer,
});

export default rootReducer;
