// slices/childCourseSectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: [],
  loading: false,
  error: null,
};

const childCourseSectionSlice = createSlice({
  name: "childCourseSection",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSections: (state) => {
      state.sections = [];
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setSections,
  setError,
  clearSections,
} = childCourseSectionSlice.actions;

export default childCourseSectionSlice.reducer;
