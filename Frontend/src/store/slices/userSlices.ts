import { IUser } from "../../interfaces/UserInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialUser: { data: IUser } = {
    data: {
        id: 0,
        username: "",
        email: "",
        avatar: "",
        diamond: 0,
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {
        GET_USER: (state, action) => {
            const payload = action.payload
        },
        SET_EMAIL: (state, action) => {
            const payload = action.payload
            state.data.email = payload
        },
        SET_AVATAR: (state, action) => {
            const payload = action.payload
            state.data.avatar = payload
        },
        SET_USERNAME: (state, action) => {
            const payload = action.payload
            state.data.username = payload
        },
        SET_ADD_DIAMOND: (state, action) => {
            const payload = action.payload
            state.data.diamond = state.data.diamond + payload
        },
        SET_MIN_DIAMOND: (state, action) => {
            const payload = action.payload
            // const diamond = state.data.diamond
            if (state.data.diamond! == 0) {
                alert("Diamond Tidak Cukup")
            } else {
                state.data.diamond = (state.data.diamond ?? 0) - payload
            }
        },
    }
})

export const { GET_USER, SET_AVATAR, SET_USERNAME, SET_EMAIL, SET_ADD_DIAMOND, SET_MIN_DIAMOND } = userSlice.actions

export default userSlice.reducer