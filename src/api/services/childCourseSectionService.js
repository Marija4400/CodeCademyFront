// services/childCourseSectionService.js
import axios from "axios";
import {
  startLoading,
  stopLoading,
  setSections,
  setError,
  clearSections,
} from "../slices/childCourseSectionSlice";

export const getChildCourseSections = (courseId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `http://localhost:9001/api/v1/course/c/get/${courseId}`,
      {
        headers: {
          "Child-Token": token,
        },
      }
    );

    const sections = Array.isArray(response.data?.data?.course?.sections)
      ? response.data.data.course.sections
      : [];

    dispatch(setSections(sections));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Neuspelo učitavanje sekcija kursa.";
    dispatch(setError(message));
    dispatch(clearSections());
  } finally {
    dispatch(stopLoading());
  }
};
