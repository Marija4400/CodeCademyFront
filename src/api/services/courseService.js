import axios from "axios";
import { setError, startLoading, stopLoading, setCourses, setSelectedCourse } from "../slices/courseSlice";

// Get all courses
export const getAllCourses = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      "http://localhost:9001/api/v1/course/all",
      {
        headers: {
          "Auth-Token": token
        }
      }
    );

    if (response.data && response.data.data && response.data.data.courses) {
      const coursesArray = Array.isArray(response.data.data.courses) 
        ? response.data.data.courses 
        : [];
        
      dispatch(setCourses(coursesArray));
      dispatch(stopLoading());
      return coursesArray;
    } else {
      dispatch(setCourses([]));
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Get courses error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch courses";
    dispatch(setError(errorMessage));
    dispatch(setCourses([]));
    throw error;
  }
};

// Get course by ID
export const getCourseById = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `http://localhost:9001/api/v1/course/${courseId}`,
      {
        headers: {
          "Auth-Token": token
        }
      }
    );

    if (response.data && response.data.data) {
      dispatch(setSelectedCourse(response.data.data));
      dispatch(stopLoading());
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Get course error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch course";
    dispatch(setError(errorMessage));
    throw error;
  }
};

export const courseService = {
  getAllCourses,
  getCourseById
};
