import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URLS = ["http://localhost:4000/", "https://premcalc.onrender.com/"]
const BASIC_URL = URLS[1]

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
  
        localStorage.setItem("token", JSON.stringify({token: data.token, email: data.email, id: data.id, name: data.name, image: data.image}))
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
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
          }
  
        const data = await response.json();
  
        localStorage.setItem("token", JSON.stringify({token: data.token, email: data.email, role: data.role, id: data.id, name: data.name, image: data.image}))
        dispatch(login(data));
  
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
        const response = await fetch(`${BASIC_URL}users`);

  
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
          body: JSON.stringify({name: userInfo.name, image: userInfo.image}),
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
    initialState: {user: null, status: null, error: null, token: null, listOfUsers: [], role: null},
    reducers: {
        signup: (state, action) => {
            state.user = action.payload
        },
        login: (state, action) => {
          state.user = action.payload;
          state.role = action.payload.role
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
      state.error = `Введен неправильный email или пароль`
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
},
  

})

export const { login, signup, logout, getToken, getAllUsers, updateUser } = usersSlice.actions

export default usersSlice.reducer