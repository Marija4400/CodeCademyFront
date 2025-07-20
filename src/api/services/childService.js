import axios from "axios";
import {
  startLoading,
  stopLoading,
  setCoursesC,
  setError,
} from "../slices/childSlice";

// Get all courses assigned to the child
export const getAllCoursesC = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      "http://localhost:9001/api/v1/course/c/all",
      {
        headers: {
          "Child-Token": token,
        },
      }
    );

    const courses = Array.isArray(response.data?.data?.courses)
      ? response.data.data.courses
      : [];

    dispatch(setCoursesC(courses));
    dispatch(stopLoading());
    return courses;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Neuspelo učitavanje dodeljenih kurseva.";
    dispatch(setError(errorMessage));
    dispatch(setCoursesC([])); // Clear old data
    dispatch(stopLoading());
    throw error;
  }
};

// Login user as a child
export const loginChild = (credentials) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.post(
      "http://localhost:9001/api/v1/auth/loginChild",
      credentials
    );

    if (response.data && response.data.data) {
      const { token, user } = response.data.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

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

export const childService = {
  loginChild,
};
