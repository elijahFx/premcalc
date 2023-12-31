import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const signupUser = createAsyncThunk(
    "users/signupUser",
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
  
        localStorage.setItem("token", JSON.stringify({token: data.token, email: data.email}))
        dispatch(signup(data));
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const loginUser = createAsyncThunk(
    "users/loginUser",
    async function (user, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch("https://premcalc.onrender.com/users/login", {
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
  
        localStorage.setItem("token", JSON.stringify({token: data.token, email: data.email}))
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
        signup: (state, action) => {
            state.user = action.payload
        },
        login: (state, action) => {
          state.user = action.payload;
      },
        logout: (state) => {
            state.user = null
        },
}, extraReducers: {
    [signupUser.pending]: (state) => {
        state.status = "loading"
        state.error = null
    },
    [signupUser.fulfilled]: (state, action) => {
        state.status = "resolved"
        state.user = action.payload
    },
    [signupUser.rejected]: (state, action) => {
        state.status = "rejected"
        state.error = action.payload
    },[loginUser.pending]: (state) => {
      state.status = "loading"
      state.error = null
  },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "resolved"
      state.user = action.payload
  },
    [loginUser.rejected]: (state, action) => {
      state.status = "rejected"
      state.error = `Введен неправильный email или пароль`
  }},})

export const { login, signup, logout, getToken } = usersSlice.actions

export default usersSlice.reducer