import { IUserInRoomSize } from "../../interfaces/WaitingRoomInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialRoomSize: IUserInRoomSize = {
    size: 0
}

export const sizeRoomSlice = createSlice({
    name: "roomSize",
    initialState: initialRoomSize,
    reducers: {
        GET_SIZE: (state, action) => {
            const payload = action.payload
        },
        SET_SIZE: (state, action) => {
            state.size = action.payload
        }
    }
})

export const { SET_SIZE } = sizeRoomSlice.actions
export default sizeRoomSlice.reducer