import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URLS = ["http://localhost:4000/", "https://premcalc.onrender.com/"]
const BASIC_URL = URLS[1]


export const getSessions = createAsyncThunk(
    "sessions/getSessions",
    async function (_, {rejectWithValue, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}sessions`, {
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            }
            )

            if(!response.ok) {
                throw new Error(`Ошибка сервера ${JSON.stringify(userToken)}`)
            }
    
            const data = await response.json()
            return data
            
        } catch (error) {
            return rejectWithValue(error.message)
        }

       
    }
  );


export const sessionsSlice = createSlice({
    name: "sessions",
    initialState: {courtSessions: []},
    reducers: { addSuite: (state, action) => {
      state.SUITES = action.payload
    } }, extraReducers: {
  [getSessions.pending]: (state) => {
      state.status = "loading"
      state.error = null
  },
  [getSessions.fulfilled]: (state, action) => {
      state.status = "resolved"
      state.courtSessions = action.payload
  },
  [getSessions.rejected]: (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
  }}})



export default sessionsSlice.reducer