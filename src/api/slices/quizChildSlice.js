import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
};

const quizChildSlice = createSlice({
  name: "quizChild",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearQuizzes: (state) => {
      state.quizzes = [];
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setQuizzes,
  setError,
  clearError,
  clearQuizzes,
} = quizChildSlice.actions;

export default quizChildSlice.reducer;
