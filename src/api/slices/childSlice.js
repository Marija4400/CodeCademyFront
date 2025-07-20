// slices/courseCSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coursesC: [],
  loading: false,
  error: null,
  success: false,
};

const courseCSlice = createSlice({
  name: "courseC",
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
    setCoursesC: (state, action) => {
      state.coursesC = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearCoursesC: (state) => {
      state.coursesC = [];
    },
    setSuccess: (state) => {
      state.success = true;
      state.loading = false;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setError,
  setCoursesC,
  clearCoursesC,
  setSuccess,
  clearSuccess,
} = courseCSlice.actions;

export default courseCSlice.reducer;
