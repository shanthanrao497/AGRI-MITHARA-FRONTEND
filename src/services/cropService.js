import api from "./api";

export const getAllCrops = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/crops",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Get crops error:", error);
    throw error;
  }
};

export const getCropById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/crops/" + id,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Get crop by ID error:", error);
    throw error;
  }
};

export const createCrop = async (cropData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/crops",
      cropData,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Create crop error:", error);
    throw error;
  }
};