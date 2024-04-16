import { configureStore } from "@reduxjs/toolkit"
import casesReducer from "./features/casesSlice.mjs"
import usersReducer from "./features/usersSlice.js"
import suitesReducer from "./features/suitesSlice.js"

export const store = configureStore({
    reducer: {
        cases: casesReducer,
        users: usersReducer,
        suites: suitesReducer
    }
})