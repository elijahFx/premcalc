import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkCourtSessionsForConsumers } from "./sessionsSlice";
const URLS = ["http://localhost:4000/", "https://premcalc.onrender.com/", "https://premiumcalculator.site/"]
const BASIC_URL = URLS[2]

export const signupUser = createAsyncThunk(
    "users/signupUser",
    async function (user, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`${BASIC_URL}users/signup`, {
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
  
        localStorage.setItem("token", JSON.stringify({token: data.token, email: data.email, id: data.id, name: data.name, image: data.image, userOklad: data.oklad}))
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
        const response = await fetch(`${BASIC_URL}users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          credentials: "include"
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
         
          
        localStorage.setItem("token", JSON.stringify({token: data.token, email: data.email, role: data.role, id: data.id, name: data.name, image: data.image, userOklad: data.userOklad}))
        dispatch(login(data));

        dispatch(checkCourtSessionsForConsumers(data.id))
  
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const forgotPassword = createAsyncThunk(
    "users/forgotPassword",
    async function (auth, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`${BASIC_URL}users/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auth),
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
  
        console.log(data);
   
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const verifyPassword = createAsyncThunk(
    "users/verifyPassword",
    async function (auth, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`${BASIC_URL}users/reset-password/${auth.id}/${auth.token}`, {
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
  
       
   
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const resetPassword = createAsyncThunk(
    "users/resetPassword",
    async function (auth, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`${BASIC_URL}users/reset-password/${auth.id}/${auth.token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auth),
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
  
       
   
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const getUsers = createAsyncThunk(
    "users/getUsers",
    async function (user, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`${BASIC_URL}users`, {
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
  
        dispatch(getAllUsers(data));
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const updateOneUser = createAsyncThunk(
    "users/updateOneUser",
    async function (userInfo, { rejectWithValue, dispatch, getState }) {
      const userToken = getState().users.user.token
     
      try {
        const response = await fetch(`${BASIC_URL}users/${userInfo.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify(userInfo),
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
  
        dispatch(updateUser(data));
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


export const usersSlice = createSlice({
    name: "users",
    initialState: {user: null, status: null, error: null, token: null, listOfUsers: [], role: null, isVerified: false},
    reducers: {
        signup: (state, action) => {
            state.user = action.payload
        },
        login: (state, action) => {
          state.user = action.payload;
          state.role = action.payload.role
          state.user.userOklad = action.payload.userOklad
        },
        logout: (state) => {
            state.user = null
        },
        getAllUsers: (state, action) => {
          state.listOfUsers = action.payload
        },
        updateUser: (state, action) => {
          state.user = { ...state.user, ...action.payload}
        }
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
      state.user = action.payload;
      state.role = action.payload.role
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "rejected"
      state.error = `${action.payload}`
    },
    [getUsers.pending]: (state) => {
    state.status = "loading"
    state.error = null
    },
    [getUsers.fulfilled]: (state, action) => {
    state.status = "resolved"
    state.listOfUsers = action.payload
    },
    [getUsers.rejected]: (state, action) => {
    state.status = "rejected"
    state.error = action.payload
    },
    [updateOneUser.rejected]: (state, action) => {
      state.status = "rejected"
      state.error = action.payload
    },
    [updateOneUser.pending]: (state, action) => {
      state.status = "pending"
    },
    [updateOneUser.fulfilled]: (state, action) => {
      state.status = "resolved"
    },
    [verifyPassword.rejected]: (state, action) => {
      state.status = "rejected"
      state.error = action.payload
      state.isVerified = false
    },
    [verifyPassword.pending]: (state, action) => {
      state.status = "pending"
      state.isVerified = false
    },
    [verifyPassword.fulfilled]: (state, action) => {
      state.status = "resolved"
      state.isVerified = action.payload
    },
},
  

})

export const { login, signup, logout, getToken, getAllUsers, updateUser } = usersSlice.actions

export default usersSlice.reducer