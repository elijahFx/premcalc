import { configureStore } from "@reduxjs/toolkit"
import casesReducer from "./features/casesSlice"

export const store = configureStore({
    reducer: {
        cases: casesReducer
    }
})