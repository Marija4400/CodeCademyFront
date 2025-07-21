import axios from "axios";
import {
  startLoading,
  stopLoading,
  setUsers,
  setError,
  clearUsers,
} from "../slices/adminSlice";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get("http://localhost:9001/api/v1/user/all", {
      headers: {
        "Auth-Token": token,
      },
    });

    const users = response.data?.data ?? [];
    dispatch(setUsers(users));
    dispatch(stopLoading());
    return users;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Greška pri učitavanju korisnika.";
    dispatch(setError(errorMessage));
    dispatch(clearUsers());
    dispatch(stopLoading());
    throw error;
  }
};

// Delete user by admin
export const deleteUserByAdmin = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.delete(
      `http://localhost:9001/api/v1/user/delete/${id}`,
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    if (response.data && response.data.code === 200) {
      dispatch(stopLoading());
      await dispatch(getAllUsers()); // osveži listu korisnika
      return response.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Delete user error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete user account";
    dispatch(setError(errorMessage));
    throw error;
  }
};
