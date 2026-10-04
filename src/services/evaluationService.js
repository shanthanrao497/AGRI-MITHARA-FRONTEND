import api from "./api";

export const saveEvaluation = async (evaluationData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/evaluations",
      evaluationData,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Save evaluation error:", error);
    throw error;
  }
};

export const getEvaluationsByFarm = async (farmId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/evaluations/farm/" + farmId,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get evaluations error:", error);
    throw error;
  }
};