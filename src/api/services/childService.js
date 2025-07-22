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

// mark section as finished
export const markSectionAsFinished = (sectionId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const response = await axios.post(
      "http://localhost:9001/api/v1/section/finished",
      { sectionId },
      {
        headers: {
          "Child-Token": token,
        },
      }
    );

    // Opcionalno: možeš vratiti poruku ili response ako ti treba dalje
    return response.data;
  } catch (error) {
    console.error("Greška prilikom obeležavanja sekcije kao završene:", error);
    dispatch(
      setError(
        error.response?.data?.message || error.message || "Došlo je do greške"
      )
    );

    throw error;
  }
};

// mark course as finished
export const markCourseAsFinished = (courseId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      "http://localhost:9001/api/v1/course/c/finished/course",
      { courseId },
      {
        headers: {
          "Child-Token": token,
        },
      }
    );

    if (response.data && response.data.code === 200) {
      console.log("Course marked as finished:", response.data);
      // Ako želiš da sačuvaš status u Redux store:
      // dispatch({ type: "COURSE_MARKED_AS_FINISHED", payload: response.data });

      return response.data;
    } else {
      console.error("Unexpected response:", response.data);
      throw new Error("Failed to mark course as finished");
    }
  } catch (error) {
    console.error("Error marking course as finished:", error);
    // Ako želiš da sačuvaš grešku u Redux store:
    // dispatch({ type: "COURSE_FINISH_ERROR", payload: error.message });
    throw error;
  }
};

//generate certificate for the course
export const generateCertificate = (courseId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `http://localhost:9001/api/v1/child/create-cert/${courseId}`,
      {
        headers: {
          "Child-Token": token,
        },
        responseType: "blob", // Za PDF fajl
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error generating certificate:", error);
    throw error;
  }
};

//get image for assigned course
export const fetchFileAsBlob = async (fileName) => {
  if (!fileName) throw new Error("File name is missing");

  const encodedName = encodeURIComponent(fileName.trim());
  const url = `http://localhost:9001/api/v1/file/download/${encodedName}`;

  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });

    return response.data; // Blob objekat
  } catch (error) {
    console.error("Error fetching file:", error.response || error);
    throw error;
  }
};
export const childService = {
  loginChild,
};
