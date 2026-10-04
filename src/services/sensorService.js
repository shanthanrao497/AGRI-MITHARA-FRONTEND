import API_BASE_URL from "./api";

export const saveSensorData = async (sensorData, token) => {
  const response = await fetch(`${API_BASE_URL}/sensors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sensorData),
  });

  if (!response.ok) {
    throw new Error("Sensor data save failed");
  }

  return response.json();
};

export const getSensorDataByFarm = async (farmId, token) => {
  const response = await fetch(
    `${API_BASE_URL}/sensors/farm/${farmId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get sensor data");
  }

  return response.json();
};