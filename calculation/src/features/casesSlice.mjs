import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URLS = ["http://localhost:4000/", "https://premcalc.onrender.com/", "https://premiumcalculator.site/"]
const BASIC_URL = URLS[2]


export const fetchCases = createAsyncThunk(
    "cases/fetchCases",
    async function (_, {rejectWithValue, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases`, {
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
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
)

export const fetchAllCases = createAsyncThunk(
    "cases/fetchAllCases",
    async function (_, {rejectWithValue, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/all`, {
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
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
)

export const deleteCase = createAsyncThunk(
    "cases/deleteCase",
    async function (id, {rejectWithValue, dispatch, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
            })

            if(!response.ok) {
                throw new Error("Нельзя удалить несуществующее дело")
            }
    
            dispatch(removeCase({id}))
            
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const trashBinCase = createAsyncThunk(
    "cases/trashBinCase",
    async function (id, {rejectWithValue, dispatch, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/trashbin/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
            })

            if(!response.ok) {
                throw new Error("Нельзя удалить несуществующее дело")
            }
    
            dispatch(removeCase({id}))
            
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

// DELETE ALL PAID CASES

export const deleteAllTheCases = createAsyncThunk(
    "cases/deleteAllTheCases",
    async function (id, {rejectWithValue, dispatch, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/deleteall`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
            })

            if(!response.ok) {
                throw new Error("Нельзя удалить несуществующее дело")
            }
    
            dispatch(deleteAllPaidCases())
            
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    "cases/toggleStatus",
    async function (id, {rejectWithValue, dispatch, getState}) {

        const CASE = getState().cases.cases.find(el => el._id === id)
        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    isPaid: !CASE.isPaid
                }),
            })

            const data = await response.json()
            

            if(!response.ok) {
                throw new Error(JSON.stringify(data))
            }

            dispatch(toggleIsPaid({id}))
    
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const alterTakes = createAsyncThunk(
    "cases/alterTakes",
    async function (newTake, {rejectWithValue, dispatch, getState}) {

        const CASE = getState().cases.cases.find(el => el._id === newTake.id)
        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/${newTake.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    takes: newTake.takes
                }),
            })

            const data = await response.json()
            

            if(!response.ok) {
                throw new Error(JSON.stringify(data))
            }

            dispatch(changeTakes(newTake))
    
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const alterMyTakes = createAsyncThunk(
    "cases/alterMyTakes",
    async function (newTake, {rejectWithValue, dispatch, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/${newTake.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    myTakes: newTake.myTakes
                }),
            })

            const data = await response.json()
            

            if(!response.ok) {
                throw new Error(JSON.stringify(data))
            }

            dispatch(changeMyTakes(newTake))
    
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const addNewCase = createAsyncThunk(
    "cases/addNewCase",
    async function (newCaseData, { rejectWithValue, dispatch, getState }) {

        const userToken = getState().users.user.token
        const user_id = getState().users.user
        const finalCase = {...newCaseData, user_id: user_id}


      try {
        const response = await fetch(`${BASIC_URL}cases`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify(newCaseData),
        });
        
  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText} - ${userToken}`;
            throw new Error(JSON.stringify(user_id));
          }
  
        const data = await response.json();
  
        // Assuming the response contains the newly added case
        dispatch(addCase(data));
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const editCase = createAsyncThunk(
    "cases/editCase",
    async function (edit, {rejectWithValue, dispatch, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/${edit.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    expenses: edit.expenses,
                    name: edit.name
                }),
            })

            const data = await response.json()

            if(!response.ok) {
                throw new Error(JSON.stringify(data))
            }
            dispatch(editTheCase({id: edit.id, name: edit.name, expenses: edit.expenses}))
    
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const returnCase = createAsyncThunk(
    "cases/returnCase",
    async function (edit, {rejectWithValue, dispatch, getState}) {

        const userToken = getState().users.user.token

        try {
            const response = await fetch(`${BASIC_URL}cases/${edit.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    isDeleted: false
                }),
            })

            const data = await response.json()

            if(!response.ok) {
                throw new Error(JSON.stringify(data))
            }
            dispatch(returnTheCase({id: edit.id}))
    
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)




export const casesSlice = createSlice({
    name: "cases",
    initialState: {cases: [], status: null, error: null, myTake: 0, myPureMoney: 0, rozpMoney: 0, showDialog: false},
    reducers: {
        addCase: (state, action) => {
            state.cases.push(action.payload)
        },
        removeCase: (state, action) => {
            state.cases = state.cases.filter(el => el._id !== action.payload.id);
        },
        toggleIsPaid: (state, action) => {
            const { id } = action.payload;

      const caseToUpdate = state.cases.find((el) => el._id === id);

      if (caseToUpdate) {
        caseToUpdate.isPaid = !caseToUpdate.isPaid;
      }
    },
        changeTakes: (state, action) => {
            const { id } = action.payload;

      const caseToUpdate = state.cases.find((el) => el._id === id);

      if (caseToUpdate) {
        caseToUpdate.takes = action.payload.takes;
      }
        },
        changeMyTakes: (state, action) => {
            const { id } = action.payload;

      const caseToUpdate = state.cases.find((el) => el._id === id);

      if (caseToUpdate) {
        caseToUpdate.myTakes = action.payload.myTakes;
      }
        },
        updateMoney: (state, action) => {
            state.myTake = action.payload.myTake
            state.myPureMoney = action.payload.myPureMoney
            state.rozpMoney = action.payload.rozpMoney
        },
        setState: (state, action) => {
            state.cases = action.payload
        },
        deleteAllPaidCases: (state) => {
            const allButNotPaid = state.cases.filter((el) => {
                return el.isPaid !== true
            })
            state.cases = allButNotPaid
        },
        changeDialog: (state, action) => {
            if(action.payload === "show") {
                state.showDialog = true
            } else {
                state.showDialog = false
            }
        },
        editTheCase: (state, action) => {
            const { id, name, expenses } = action.payload;
            const caseToUpdate = state.cases.find((el) => el._id === id);
        
            if (caseToUpdate) {
                caseToUpdate.expenses = expenses;
                caseToUpdate.name = name;
            }
    },
        returnTheCase: (state, action) => {
            const { id } = action.payload;

            const caseToUpdate = state.cases.find((el) => el._id === id);
      
            if (caseToUpdate) {
              caseToUpdate.isDeleted = false;
            }
      }  
  },
    extraReducers: {
        [fetchCases.pending]: (state) => {
            state.status = "loading"
            state.error = null
        },
        [fetchCases.fulfilled]: (state, action) => {
            state.status = "resolved"
            state.cases = action.payload
        },
        [fetchCases.rejected]: (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        },
        [deleteCase.fulfilled]: (state, action) => {
            //state.cases = state.cases.filter(el => el.id !== action.payload.id);
        },
        [addNewCase.pending]: (state) => {
            state.status = "loading";
            state.error = null;
          },
        [addNewCase.fulfilled]: (state, action) => {
            state.status = "resolved";
          },
        [addNewCase.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
          },
        [toggleStatus.fulfilled]: (state, action) => {
            state.status = "fullfilled";
          },
        [toggleStatus.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
          },
          [alterTakes.fulfilled]: (state, action) => {
            state.status = "fullfilled";
            state.error = null;
          },
          [alterMyTakes.fulfilled]: (state, action) => {
            state.status = "fullfilled";
            state.error = null;
          },
          [alterMyTakes.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
          },
          [alterTakes.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
          },
          [fetchAllCases.fulfilled]: (state, action) => {
            state.status = "fullfilled";
            state.allCases = action.payload
          },
          [fetchAllCases.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
          },
          [fetchAllCases.pending]: (state, action) => {
            state.status = "loading";
            state.error = null;
          },
          [editCase.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            const { id, name, expenses } = action.meta.arg;
            const caseToUpdate = state.cases.find((el) => el._id === id);
        
            if (caseToUpdate) {
                caseToUpdate.expenses = expenses;
                caseToUpdate.name = name;
            }
          },
    }
})

export const { addCase, removeCase, toggleIsPaid, updateCases, updateMoney, changeTakes, changeMyTakes, setState, deleteAllPaidCases, changeDialog, editTheCase, returnTheCase } = casesSlice.actions

export default casesSlice.reducer