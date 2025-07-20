import axios from "axios";
import {
  setError,
  startLoading,
  stopLoading,
  setChildren,
} from "../slices/parentSLice";

// Get all children accounts
export const getChildren = () => async (dispatch) => {
  dispatch(startLoading());

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      "http://localhost:9001/api/v1/user/children",
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    console.log("Children response:", response.data);

    const rawData = response.data?.data;

    const childrenArray = Array.isArray(rawData)
      ? rawData
      : Array.isArray(rawData?.children)
      ? rawData.children
      : [];

    console.log("Children array:", childrenArray);
    dispatch(setChildren(childrenArray));
  } catch (error) {
    console.error("Get children error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch children accounts";

    dispatch(setError(errorMessage));
    dispatch(setChildren([])); // Clear any old data
  } finally {
    dispatch(stopLoading());
  }
};

// Update child account
export const updateChild = (childId, updateData) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `http://localhost:9001/api/v1/child/update/${childId}`,
      {
        id: childId,
        ...updateData,
      },
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    if (response.data && response.data.data) {
      dispatch(stopLoading());
      // Refresh the children list to get updated data
      await dispatch(getChildren());
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Update child error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to update child account";
    dispatch(setError(errorMessage));
    throw error;
  }
};

// Delete child account
export const deleteChild = (childId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.delete(
      `http://localhost:9001/api/v1/child/delete/${childId}`,
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    if (response.data && response.data.data) {
      dispatch(stopLoading());
      // Refresh the children list to get updated data
      await dispatch(getChildren());
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Delete child error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete child account";
    dispatch(setError(errorMessage));
    throw error;
  }
};

// Add course to child
export const addCourseToChild = (childId, courseId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      "http://localhost:9001/api/v1/user/addCourse",
      {
        childId,
        courseId,
      },
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    if (response.data && response.data.data) {
      dispatch(stopLoading());
      // Refresh the children list to get updated data
      await dispatch(getChildren());
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Add course error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to add course to child";
    dispatch(setError(errorMessage));
    throw error;
  }
};

// Create children profile
export const createChildrenProfile = (childData) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      "http://localhost:9001/api/v1/user/create",
      childData,
      {
        headers: {
          "Auth-Token": token,
        },
      }
    );

    if (response.data && response.data.data) {
      dispatch(stopLoading());
      // After creating a child, fetch the updated list
      await dispatch(getChildren());
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Create child profile error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to create child profile";
    dispatch(setError(errorMessage));
    throw error;
  }
};
