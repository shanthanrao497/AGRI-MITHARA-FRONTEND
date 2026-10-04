import api from "./api";

export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/bookings",
      bookingData,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Create booking error:", error);
    throw error;
  }
};

export const getBookingsByFarm = async (farmId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(
      "/bookings/farm/" + farmId,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Get bookings error:", error);
    throw error;
  }
};