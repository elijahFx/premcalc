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

  export const getConsumers = createAsyncThunk(
    "sessions/getConsumers",
    async function (_, {rejectWithValue, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}consumers`, {
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

  export const addConsumer = createAsyncThunk(
    "cases/addConsumer",
    async function (newConsumer, { rejectWithValue, dispatch, getState }) {

        const userToken = getState().users.user.token
        const user_id = getState().users.user



      try {
        const response = await fetch(`${BASIC_URL}consumers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify(newConsumer),
        });
        
  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText} - ${userToken}`;
            throw new Error(JSON.stringify(user_id));
          }
  
        const data = await response.json();
  
        // Assuming the response contains the newly added case
        dispatch(addTheConsumer(newConsumer));
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


export const sessionsSlice = createSlice({
    name: "sessions",
    initialState: {courtSessions: [], consumerList: []},
    reducers: { addTheConsumer: (state, action) => {
      state.consumerList.push(action.payload)
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
  },
  [getConsumers.pending]: (state) => {
    state.status = "loading"
    state.error = null
},
[getConsumers.fulfilled]: (state, action) => {
    state.status = "resolved"
    state.consumerList = action.payload
},
[getConsumers.rejected]: (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
},[addConsumer.pending]: (state) => {
    state.status = "loading"
    state.error = null
},
[addConsumer.fulfilled]: (state, action) => {
    state.status = "resolved"
    state.consumerList.push(action.payload)
},
[addConsumer.rejected]: (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
}}})

export const { addTheConsumer } = sessionsSlice.actions

export default sessionsSlice.reducer