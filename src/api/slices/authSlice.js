// userSlice.js
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
    builder
      .addCase(getActiveSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSessions = action.payload;
      })
      .addCase(getActiveSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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

// Async thunks
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

export const getActiveSessions = createAsyncThunk(
  "/auth/get-active-sessions",
  async (thunkAPI) => {
    try {
      return authService.getActiveSessions();
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

export const resetSessions = createAsyncThunk(
  "/auth/reset-sessions",
  async (thunkAPI) => {
    try {
      return authService.resetSessions();
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

export const updateUser = createAsyncThunk(
  "/auth/update-user",
  async (data, thunkAPI) => {
    try {
      return authService.updateUser(data);
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

export const updateUserByAdmin = createAsyncThunk(
  "/auth/update-user-by-admin",
  async (data, thunkAPI) => {
    const { userId, userData } = data;
    try {
      return authService.updateUserByAdmin(userId, userData);
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

export const removeUser = createAsyncThunk(
  "/auth/delete-user",
  async (data, thunkAPI) => {
    const { id } = data;
    try {
      return authService.deleteUser(id);
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

export const getUserDetails = createAsyncThunk(
  "/auth/get-user-details",
  async (data, thunkAPI) => {
    const { id } = data;
    try {
      return authService.getUserDetails(id);
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

export const getAllUsers = createAsyncThunk(
  "/auth/get-all-users",
  async (data, thunkAPI) => {
    const { companyId } = data;
    try {
      return authService.getAllUsers(companyId);
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
