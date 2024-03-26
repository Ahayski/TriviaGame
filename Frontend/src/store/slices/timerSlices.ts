import { createSlice } from "@reduxjs/toolkit";
import { IWaitingTime } from "../../interfaces/WaitingRoomInterface";

const initialTime: IWaitingTime = {
    timerWaiting: 10,
    timerGame: 15,
}

export const waitingSlice = createSlice({
    name: "waitingSlice",
    initialState: initialTime,
    reducers: {
        SET_WAITING_TIMER: (state, action) => {
            const payload = action.payload
            state.timerWaiting = payload
        },
        SET_INGAME_TIMER: (state, action) => {
            const payload = action.payload
            state.timerGame = payload
        }
    }
})

export const { SET_WAITING_TIMER, SET_INGAME_TIMER } = waitingSlice.actions
export default waitingSlice.reducer

