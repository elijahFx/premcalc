import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URLS = [
  "http://localhost:4000/",
  "https://premcalc.onrender.com/",
  "https://premiumcalculator.site/",
];
const BASIC_URL = URLS[2];

export const makeNewSuite = createAsyncThunk(
  "suites/makeNewSuite",
  async function (newSuiteData, { rejectWithValue, getState }) {
    const userToken = getState().users.user.token;

    try {
      const response = await fetch(`${BASIC_URL}suites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(newSuiteData),
      });

      if (!response.ok) {
        const errorMessage = `Server Error: ${response.status} - ${response.statusText} - ${userToken}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      addSuite(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const suitesSlice = createSlice({
  name: "suites",
  initialState: { url: "" },
  reducers: {
    addSuite: (state, action) => {
      state.SUITES = action.payload;
    },
  },
  extraReducers: {
    [makeNewSuite.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [makeNewSuite.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.url = action.payload;
    },
    [makeNewSuite.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { addSuite } = suitesSlice.actions;
export default suitesSlice.reducer;
