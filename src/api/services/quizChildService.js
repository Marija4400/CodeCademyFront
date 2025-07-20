import axios from "axios";
import {
  startLoading,
  stopLoading,
  setQuizzes,
  setError,
  clearQuizzes,
} from "../slices/quizChildSlice";

// get quizzes for a specific course
export const getCourseQuizzesC = (courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `http://localhost:9001/api/v1/quiz/c/get/${courseId}`,
      {
        headers: {
          "Child-Token": token,
        },
      }
    );

    const quiz = response.data?.data?.quiz ?? null;
    dispatch(setQuizzes(quiz));
    dispatch(stopLoading());
    return quiz;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Neuspelo učitavanje kvizova.";
    dispatch(setError(errorMessage));
    dispatch(clearQuizzes());
    dispatch(stopLoading());
    throw error;
  }
};
