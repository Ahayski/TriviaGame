import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import sizeRoomReducer from "./slices/sizeRoomSlices";
import usersInRoomReducer from "./slices/usersInRoomSlices";

const rootReducer = combineReducers({
    user: userReducer,
    sizeRoom: sizeRoomReducer,
    usersInRoom: usersInRoomReducer,
});

export default rootReducer;
