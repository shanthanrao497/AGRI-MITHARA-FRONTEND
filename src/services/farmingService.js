import api from "./api";

export const addFarmingActivity = async (activityData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/farming",
      activityData,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Add farming activity error:", error);
    throw error;
  }
};

export const getActivitiesByFarm = async (farmId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/farming/farm/" + farmId,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get farming activities error:", error);
    throw error;
  }
};