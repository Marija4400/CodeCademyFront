import axios from "../axiosInstance";

let apiUrl = "http://localhost:9001/api/v1/";

const apiService = {
  postData: async (endpoint, data) => {
    try {
      const response = await axios.post(`${apiUrl}/${endpoint}`, data);

      if (response.statusText !== "OK") {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      throw new Error("Error during API request");
    }
  },
  putData: async (endpoint, data) => {
    try {
      const response = await axios.put(`${apiUrl}/${endpoint}`, data);

      if (response.statusText !== "OK") {
        throw new Error("Network response was not ok");
      }

      return response.data;
    } catch (error) {
      throw new Error("Error during API request");
    }
  },
  postFormData: async (endpoint, formData) => {
    try {
      const response = await axios.post(`${apiUrl}/${endpoint}`, formData);
      if (response.statusText !== "OK") {
        throw new Error("Network response was not ok");
      }

      return response.data;
    } catch (error) {
      throw new Error("Error during API request");
    }
  },
  getData: async (endpoint, params = {}) => {
    try {
      const queryString = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");

      const url = `${apiUrl}/${endpoint}`;

      const response = await axios.get(url, {
        params: {
          queryString,
        },
      });

      if (response.statusText !== "OK") {
        throw new Error("Network response was not ok");
      }

      return response.data;
    } catch (error) {
      throw new Error("Error during API request");
    }
  },
  deleteData: async (endpoint, data) => {
    // try {
    //   const response = await fetch(`${apiUrl}/${endpoint}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   return await response.json();
    // } catch (error) {
    //   throw new Error("Error during API request");
    // }
    try {
      const response = await axios.delete(`${apiUrl}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      if (response.statusText !== "OK") {
        throw new Error("Network response was not ok");
      }

      return response.data;
    } catch (error) {
      throw new Error("Error during API request");
    }
  },
};

export default apiService;
