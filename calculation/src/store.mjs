import { configureStore } from "@reduxjs/toolkit"
import casesReducer from "./features/casesSlice.mjs"

export const store = configureStore({
    reducer: {
        cases: casesReducer
    }
})