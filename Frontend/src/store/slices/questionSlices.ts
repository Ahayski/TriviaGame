import { IQuestion } from "../../interfaces/QuestionInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialQuestion: IQuestion = {
    id: 0,
    question: "",
    answer: "",
    options: []
}

export const questionSlice = createSlice({
    name: "question",
    initialState: initialQuestion,
    reducers: {
        SET_QUESTION: (state, action) => {
            const payload = action.payload
            state.id = payload.id
            state.question = payload.question
            state.answer = payload.answer
            state.options = payload.options
        }
    }
})

export const { SET_QUESTION } = questionSlice.actions
export default questionSlice.reducer