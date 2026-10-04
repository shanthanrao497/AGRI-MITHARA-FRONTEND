import api from "./api";

export const saveRecommendation = async (recommendationData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/recommendations/predict",
      recommendationData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Save recommendation error:", error);
    throw error;
  }
};

export const getRecommendationsByFarm = async (farmId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/recommendations/farm/" + farmId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get recommendations error:", error);
    throw error;
  }
};