import api from "./api";

export const createEmi = async (emiData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/emis",
      emiData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Create EMI error:", error);
    throw error;
  }
};

export const getEmisByLoan = async (loanId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/emis/loan/" + loanId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get EMI error:", error);
    throw error;
  }
};

export const payEmi = async (emiId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `/emis/${emiId}/pay`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Pay EMI error:", error);
    throw error;
  }
};