import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const URLS = ["http://localhost:4000/", "https://premcalc.onrender.com/", "https://premiumcalculator.site/"]
const BASIC_URL = URLS[2]


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
  
       
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteConsumer = createAsyncThunk(
    "cases/deleteConsumer",
    async function (id, {rejectWithValue, dispatch, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}consumers/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            })

            

            if(!response.ok) {
                throw new Error("Нельзя удалить несуществующее дело")
            }
    
            dispatch(removeConsumer({id}))
            
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const deleteSession = createAsyncThunk(
  "cases/deleteSession",
  async function (id, {rejectWithValue, dispatch, getState}) {

      const userToken = getState().users.user.token

      try {
          const response = await fetch(`${BASIC_URL}sessions/${id}`, {
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${userToken}`
              }
          })

          

          if(!response.ok) {
              throw new Error("Нельзя удалить несуществующее дело")
          }
  
          dispatch(removeSession(id))
          
      } catch (error) {
         return rejectWithValue(error.message)
      }
  }
)

export const checkCourtSessionsForConsumers = createAsyncThunk(
  "sessions/checkCourtSessionsForConsumers",
  async function (id, {rejectWithValue, getState}) {

      const userToken = getState().users.user.token
      const check = `${BASIC_URL}consumers/${id}`
      try {
          const response = await fetch(`${BASIC_URL}consumers/${id}`, {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${userToken}`,
                  "Content-Type": "application/json"
              },
              credentials: "include",


          }
          )

          if(!response.ok) {
              throw new Error(`Ошибка сервера ${JSON.stringify(userToken)}`)
          };
          const data = await response.json()
          return data
          
      } catch (error) {
          return rejectWithValue(error.message)
      }
  }
);


export const sessionsSlice = createSlice({
    name: "sessions",
    initialState: {courtSessions: [], consumerList: [], sessionStaus: null},
    reducers: { addTheConsumer: (state, action) => {
      state.consumerList.push(action?.meta?.arg)
    },
    removeConsumer: (state, action) => {
      state.consumerList.filter(el => el._id !== action?.meta?.arg)
    },
    removeSession: (state, action) => {
      state.courtSessions.filter(el => el._id !== action?.meta?.arg)
    },
   }, extraReducers: {
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
    state.consumerList.push(action?.meta?.arg)
},
[addConsumer.rejected]: (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
},
[deleteConsumer.pending]: (state) => {
  state.status = "loading"
  state.error = null
},
[deleteConsumer.fulfilled]: (state, action) => {
  state.status = "resolved"
  state.consumerList = state.consumerList.filter(el => el._id !== action?.meta?.arg);
},
[deleteConsumer.rejected]: (state, action) => {
state.status = "rejected";
state.error = action.payload;
},
[deleteSession.pending]: (state) => {
  state.status = "loading"
  state.error = null
},
[deleteSession.fulfilled]: (state, action) => {
  state.status = "resolved"
  state.courtSessions = state.courtSessions.filter(el => el._id !== action?.meta?.arg);
},
[deleteSession.rejected]: (state, action) => {
state.status = "rejected";
state.error = action.payload;
},
[checkCourtSessionsForConsumers.pending]: (state) => {
  state.sessionStatus = "loading"
  state.error = null
},
[checkCourtSessionsForConsumers.fulfilled]: (state, action) => {
  state.sessionStatus = "resolved";
  const addedSessions = action?.payload?.added;
  const arrayLength = addedSessions.length;

  if (arrayLength === 0) {
    toast.info("Новых дел не найдено");
  } else if (arrayLength === 1) {
    state.courtSessions = [...state.courtSessions, addedSessions[0]];
    toast.success(`${addedSessions[0].name} к ${addedSessions[0].liabelee} успешно добавлено`);
  } else if (arrayLength >= 2) {
    state.courtSessions = [...state.courtSessions, ...addedSessions];
    const info = [...addedSessions].map((el, index) => {
      return `${index + 1}) ${el.name} к ${el.liabelee}\n`
    }).join('\n');
    toast.success(` Успешно добавлены дела:\n${info}`);
  }
},
[checkCourtSessionsForConsumers.rejected]: (state, action) => {
  state.sessionStatus = "rejected";
  state.error = action.payload;
}
}})

export const { addTheConsumer, removeConsumer, removeSession } = sessionsSlice.actions

export default sessionsSlice.reducer