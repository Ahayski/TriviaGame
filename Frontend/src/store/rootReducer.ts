import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import sizeRoomReducer from "./slices/sizeRoomSlices";
import usersInRoomReducer from "./slices/usersInRoomSlices";
import timerReducer from "./slices/timerSlices";

const rootReducer = combineReducers({
    user: userReducer,
    sizeRoom: sizeRoomReducer,
    usersInRoom: usersInRoomReducer,
    timerReducer: timerReducer,
});

export default rootReducer;
