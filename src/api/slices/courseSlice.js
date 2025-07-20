import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: false,
  error: null,
  success: false,
  selectedCourse: null,
};

const courseSlice = createSlice({
  name: "course",
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
    setCourses: (state, action) => {
      state.courses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
    setSuccess: (state) => {
      state.success = true;
      state.loading = false;
      state.error = null;
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
  clearError,
  setCourses,
  setSelectedCourse,
  clearSelectedCourse,
  setSuccess,
  clearSuccess,
} = courseSlice.actions;

export default courseSlice.reducer;
