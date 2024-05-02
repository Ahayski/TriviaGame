import { IScore } from "../../interfaces/QuestionInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialScore: IScore = {
    score: 0
}

export const scoreSlice = createSlice({
    name: "scoreSlice",
    initialState: initialScore,
    reducers: {
        SET_SCORE: (state, action) => {
            const payload = action.payload
            state.score += payload
        }
    }
})

export const { SET_SCORE } = scoreSlice.actions
export default scoreSlice.reducer