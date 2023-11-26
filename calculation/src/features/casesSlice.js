import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCases = createAsyncThunk(
    "cases/fetchCases",
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch("https://premcalc.onrender.com/cases")

            if(!response.ok) {
                throw new Error("Ошибка сервера")
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
    async function (id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://premcalc.onrender.com/cases/${id}`, {
                method: "DELETE"
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

export const toggleStatus = createAsyncThunk(
    "cases/toggleStatus",
    async function (id, {rejectWithValue, dispatch, getState}) {

        const CASE = getState().cases.cases.find(el => el._id === id)


        try {
            const response = await fetch(`https://premcalc.onrender.com/cases/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isPaid: !CASE.isPaid
                })
            })

            

            if(!response.ok) {
                throw new Error("Нельзя удалить несуществующее дело")
            }

            dispatch(toggleIsPaid({id}))
    
        } catch (error) {
           return rejectWithValue(error.message)
        }
    }
)

export const addNewCase = createAsyncThunk(
    "cases/addNewCase",
    async function (newCaseData, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch("https://premcalc.onrender.com/cases", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCaseData),
        });

  
        if (!response.ok) {
            const errorMessage = `Server Error: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
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




export const casesSlice = createSlice({
    name: "cases",
    initialState: {cases: [], status: null, error: null},
    reducers: {
        addCase: (state, action) => {
            state.cases.push(action.payload)
        },
        removeCase: (state, action) => {
            state.cases = state.cases.filter(el => el._id !== action.payload.id);
        },
        toggleIsPaid: (state, action) => {
            const { id } = action.payload;

      // Find the case with the specified id
      const caseToUpdate = state.cases.find((el) => el._id === id);

      // If found, update the isPaid property
      if (caseToUpdate) {
        caseToUpdate.isPaid = !caseToUpdate.isPaid;
      }
    },
  },
    extraReducers: {
        [fetchCases.pending]: (state) => {
            state.status = "loading"
            state.error = null
        },
        [fetchCases.fulfilled]: (state, action) => {
            state.status = "resolved"
            console.log(state);
            state.cases = action.payload
        },
        [fetchCases.rejected]: (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        },
        [deleteCase.fulfilled]: (state, action) => {
            state.cases = state.cases.filter(el => el.id !== action.payload.id);
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
    }
})

export const { addCase, removeCase, toggleIsPaid } = casesSlice.actions

export default casesSlice.reducer