import { configureStore } from "@reduxjs/toolkit"
import casesReducer from "./features/casesSlice.mjs"
import usersReducer from "./features/usersSlice.js"

export const store = configureStore({
    reducer: {
        cases: casesReducer,
        users: usersReducer
    }
})