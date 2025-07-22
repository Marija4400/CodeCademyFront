// services/quizService.js
import axios from "axios";

export const createQuiz = (quizData) => async (dispatch) => {
  try {
    // dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const response = await axios.post(
      "http://localhost:9001/api/v1/quiz/create",
      quizData,
      {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": token,
        },
      }
    );

    if (response.data.code === 200) {
      // dispatch(setSuccess("Kviz uspešno dodat."));
      // dispatch(stopLoading());
      return response.data;
    } else {
      throw new Error("Greška prilikom kreiranja kviza");
    }
  } catch (error) {
    console.error("Greška pri kreiranju kviza:", error);
    // dispatch(setError(error.response?.data?.message || error.message));
    // dispatch(stopLoading());
    throw error;
  }
};
