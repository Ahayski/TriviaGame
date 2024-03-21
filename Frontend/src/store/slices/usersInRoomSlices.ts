import { IUsersInRoom } from "../../interfaces/WaitingRoomInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { data: IUsersInRoom[] } = {
    data: []
}

export const usersInRoomSlice = createSlice({
    name: "usersInRoom",
    initialState: initialState,
    reducers: {
        SET_USERS_ROOM: (state, action) => {
            const payload = action.payload

            const usersInRoom = payload.map((data: IUsersInRoom) => {
                return {
                    id: data.id,
                    username: data.username,
                    avatar: data.avatar,
                }
            })

            state.data = usersInRoom
        }
    }
})

export const { SET_USERS_ROOM } = usersInRoomSlice.actions
export default usersInRoomSlice.reducer