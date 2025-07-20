import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
  loading: false,
  error: null,
};

const testChildSlice = createSlice({
  name: "testChild",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setTests: (state, action) => {
      state.tests = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTests: (state) => {
      state.tests = [];
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setTests,
  setError,
  clearError,
  clearTests,
} = testChildSlice.actions;

export default testChildSlice.reducer;
