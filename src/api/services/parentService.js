import axios from "axios";
import {
  setError,
  startLoading,
  stopLoading,
  setChildren,
} from "../slices/parentSLice";

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

// Get all children accounts
export const getChildren = () => async (dispatch) => {
  try {
    dispatch(startLoading());

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

    if (response.data && response.data.data && response.data.data.children) {
      // Get the children array from the nested structure
      const childrenArray = Array.isArray(response.data.data.children)
        ? response.data.data.children
        : [];

      dispatch(setChildren(childrenArray));
      dispatch(stopLoading());
      return childrenArray;
    } else {
      dispatch(setChildren([]));
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Get children error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch children accounts";
    dispatch(setError(errorMessage));
    dispatch(setChildren([])); // Set empty array on error
    throw error;
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
      "http://localhost:9001/api/v1/user/update",
      {
        id: childId,
        ...updateData
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
        courseId
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

export const parentService = {
  createChildrenProfile,
  getChildren,
  addCourseToChild,
  updateChild,
  deleteChild
};
