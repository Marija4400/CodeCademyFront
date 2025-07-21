import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },
    resetStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const { startLoading, stopLoading, setError, setSuccess, resetStatus } =
  courseSlice.actions;

export default courseSlice.reducer;
