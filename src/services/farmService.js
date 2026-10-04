import api from "./api";

export const createFarm = async (farmData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/farms",
      farmData,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Create farm error:", error);
    throw error;
  }
};

export const getFarmsByUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/farms/user/" + userId,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Get farms error:", error);
    throw error;
  }
};