import { configureStore } from "@reduxjs/toolkit"
import casesReducer from "./features/casesSlice.js"

export const store = configureStore({
    reducer: {
        cases: casesReducer
    }
})