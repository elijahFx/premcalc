import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    "users/loginUser",
    async function (user, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch("https://premcalc.onrender.com/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
  
        // Assuming the response contains the newly added case
        dispatch(login(data));
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


export const usersSlice = createSlice({
    name: "users",
    initialState: {user: null, status: null, error: null, token: null},
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
}, extraReducers: {
    [loginUser.pending]: (state) => {
        state.status = "loading"
        state.error = null
    },
    [loginUser.fulfilled]: (state, action) => {
        state.status = "resolved"
        state.user = action.payload
    },
    [loginUser.rejected]: (state, action) => {
        state.status = "rejected"
        state.error = action.payload
    }},})

export const { login, logout } = usersSlice.actions

export default usersSlice.reducer