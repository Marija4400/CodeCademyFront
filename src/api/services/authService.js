import axios from "axios";
import {
  logout,
  setError,
  setUser,
  startLoading,
  stopLoading,
} from "../slices/authSlice";

// ------------------------------------- Async thunk for user registration ---------------------------------
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.post(
      "http://localhost:9001/api/v1/auth/register",
      userData
    );

    if (response.data && response.data.data) {
      dispatch(stopLoading());
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Registration error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Registration failed";
    dispatch(setError(errorMessage));
    throw error;
  }
};

// ------------------------------------- Async thunk for user login---------------------------------
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.post(
      `http://localhost:9001/api/v1/auth/login/${credentials.role}`,
      credentials
    );

    if (response.data && response.data.data) {
      const { token, user, type } = response.data.data;
      console.log("Login response:", response.data);
      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("type", type);
      // Set user data in Redux store
      dispatch(setUser(user));

      return user;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    dispatch(setError(errorMessage));
    throw error;
  }
};

// -------------------------------------------Function to make API call for loading user data ----------------------
export const loadUser = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:9001/api/v1/user/userdetails",
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    if (response.data && response.data.data && response.data.data.user) {
      dispatch(setUser(response.data.data.user));
    } else {
      throw new Error("Invalid user data format");
    }
  } catch (error) {
    console.error("Load user error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to load user";
    dispatch(setError(errorMessage));
    throw error;
  }
};

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      "http://localhost:9001/api/v1/user/update",
      passwords,
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    if (response.data && response.data.data) {
      dispatch(stopLoading());
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Update password error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to update password";
    dispatch(setError(errorMessage));
    throw error;
  }
};

// --------------------------- Async thunk for user logout ---------------------------
export const logoutUser = () => (dispatch) => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Clear user data from Redux store
    dispatch(logout());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const authService = {
  login,
  register,
  loadUser,
  logoutUser,
  updatePassword,
};
