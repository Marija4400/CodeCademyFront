import axios from "axios";
import {
  startLoading,
  stopLoading,
  setError,
  setSuccess,
} from "@/api/slices/createCourseSlice";

// Kreiraj novi kurs
export const createCourse = (courseData, imageFile) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const formData = new FormData();

    // Dodaj JSON kao string
    formData.append("course", JSON.stringify(courseData));

    // Dodaj sliku ako postoji
    if (imageFile) {
      formData.append("file", imageFile); // ključevi moraju da odgovaraju backend očekivanjima
    }

    const response = await axios.post(
      "http://localhost:9001/api/v1/course/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      }
    );

    if (response.data.code === 200) {
      dispatch(setSuccess("Kurs uspešno kreiran."));
      dispatch(stopLoading());
      return response.data;
    } else {
      throw new Error("Greška prilikom kreiranja kursa");
    }
  } catch (error) {
    console.error("Greška:", error);
    dispatch(setError(error.response?.data?.message || error.message));
    dispatch(stopLoading());
    throw error;
  }
};
