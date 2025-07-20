import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  children: [],
  loading: false,
  error: null,
  success: false
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
      if (action.payload) {
        state.children.push(action.payload);
      }
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  startLoading,
  stopLoading,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  setChildren
} = parentSlice.actions;

export default parentSlice.reducer;
