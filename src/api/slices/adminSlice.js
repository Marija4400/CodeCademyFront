import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { startLoading, stopLoading, setUsers, setError, clearUsers } =
  adminSlice.actions;

export default adminSlice.reducer;
