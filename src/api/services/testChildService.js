import axios from "axios";
import {
  startLoading,
  stopLoading,
  setTests,
  setError,
  clearTests,
} from "../slices/testChildSlice";

// get tests for a specific course
export const getCourseTestsC = (testId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `http://localhost:9001/api/v1/test/c/get/${testId}`,
      {
        headers: {
          "Child-Token": token,
        },
      }
    );

    const test = response.data?.data?.test ?? null;
    dispatch(setTests(test));
    dispatch(stopLoading());
    return test;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Neuspelo učitavanje testova.";
    dispatch(setError(errorMessage));
    dispatch(clearTests());
    dispatch(stopLoading());
    throw error;
  }
};

// get all tests for a child
export const getAllCourseTestsC = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      "http://localhost:9001/api/v1/test/c/get/all",
      {
        headers: {
          "Child-Token": token,
        },
      }
    );

    const allTests = response.data?.data?.tests ?? [];
    dispatch(setTests(allTests));
    dispatch(stopLoading());
    return allTests;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Neuspelo učitavanje svih testova.";
    dispatch(setError(errorMessage));
    dispatch(clearTests());
    dispatch(stopLoading());
    throw error;
  }
};
