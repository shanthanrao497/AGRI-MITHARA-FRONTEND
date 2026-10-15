import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../components/Layout";
import { createFarm } from "../../services/farmService";

function AddFarm() {
  const navigate = useNavigate();

  const [farm, setFarm] = useState({
    name: "",
    surveyNumber: "",
    pattaPassbookNumber: "",
    location: "",
    area: "",
    soilType: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFarm({
      ...farm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
      alert("User ID not found. Please login again.");
      navigate("/login");
      return;
    }

    if (!token) {
      alert("Login token not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const farmData = {
        farmName: farm.name,
        surveyNumber: farm.surveyNumber,
        pattaPassbookNumber: farm.pattaPassbookNumber,
        location: farm.location,
        area: Number(farm.area),
        soilType: farm.soilType,
        user: {
          id: Number(userId)
        }
      };

      console.log("Sending farm data:", farmData);

      const response = await createFarm(farmData);

      console.log("Farm created successfully:", response);

      alert("Farm saved successfully!");

      navigate("/farm");

    } catch (error) {
      console.error("Farm creation error:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response:", error.response.data);

        alert(
          error.response.data?.message ||
          "Failed to save farm."
        );
      } else {
        alert(
          "Cannot connect to backend. Make sure Spring Boot is running."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="farm-content">

        <h1>Add Farm 🚜</h1>

        <form className="farm-form" onSubmit={handleSubmit}>

          <label>Farm Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter farm name"
            value={farm.name}
            onChange={handleChange}
            required
          />

          <label>Survey Number</label>
          <input
            type="text"
            name="surveyNumber"
            placeholder="Enter survey number"
            value={farm.surveyNumber}
            onChange={handleChange}
            required
          />

          <label>Patta Passbook Number</label>
          <input
            type="text"
            name="pattaPassbookNumber"
            placeholder="Enter patta passbook number"
            value={farm.pattaPassbookNumber}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={farm.location}
            onChange={handleChange}
            required
          />

          <label>Farm Area (Acres)</label>
          <input
            type="number"
            name="area"
            placeholder="Enter area"
            value={farm.area}
            onChange={handleChange}
            required
          />

          <label>Soil Type</label>
          <select
            name="soilType"
            value={farm.soilType}
            onChange={handleChange}
            required
          >
            <option value="">Select soil type</option>
            <option value="Black Soil">Black Soil</option>
            <option value="Red Soil">Red Soil</option>
            <option value="Alluvial Soil">Alluvial Soil</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Farm"}
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default AddFarm;