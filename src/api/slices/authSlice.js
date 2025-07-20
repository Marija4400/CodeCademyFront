import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  activeSessions: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("User set in state:", action.payload);
      state.isAuthenticated = action.payload !== null;
      state.loading = false;
      state.error = null;
    },
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.activeSessions = null;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const {
  setUser,
  startLoading,
  stopLoading,
  setError,
  clearError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;

export const updatePassword = createAsyncThunk(
  "/auth/update-password",
  async (data, thunkAPI) => {
    try {
      return authService.updatePassword(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
