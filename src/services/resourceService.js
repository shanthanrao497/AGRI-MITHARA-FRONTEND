import api from "./api";

export const getAllResources = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/resources",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get resources error:", error);
    throw error;
  }
};

export const getResourceById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/resources/" + id,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get resource by ID error:",
      error
    );

    throw error;
  }
};