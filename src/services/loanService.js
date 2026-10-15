import api from "./api";

export const applyLoan = async (loanData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/loans",
      loanData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Apply loan error:", error);
    throw error;
  }
};

export const getLoansByFarm = async (farmId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/loans/farm/" + farmId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get loans error:", error);
    throw error;
  }
};

export const updateLoanStatus = async (loanId, status) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `/loans/${loanId}/status?status=${encodeURIComponent(status)}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update loan status error:", error);
    throw error;
  }
};