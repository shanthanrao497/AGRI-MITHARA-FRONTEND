import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { getFarmsByUser } from "../../services/farmService";
import { getAllCrops } from "../../services/cropService";
import { addFarmingActivity } from "../../services/farmingService";

function AddActivity() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);

  const [activity, setActivity] = useState({
    farmId: "",
    cropId: "",
    activityName: "",
    activityDate: "",
    description: "",
    status: "PLANNED"
  });

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const [farmData, cropData] = await Promise.all([
        getFarmsByUser(userId),
        getAllCrops()
      ]);

      console.log("Farms:", farmData);
      console.log("Crops:", cropData);

      setFarms(farmData || []);
      setCrops(cropData || []);

    } catch (error) {
      console.error("Loading farming data error:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response:", error.response.data);
      }

      alert("Failed to load farms or crops.");
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login session expired. Please login again.");
      navigate("/login");
      return;
    }

    if (!activity.farmId) {
      alert("Please select a farm.");
      return;
    }

    if (!activity.cropId) {
      alert("Please select a crop.");
      return;
    }

    try {
      setLoading(true);

      const activityData = {
        farm: {
          id: Number(activity.farmId)
        },

        crop: {
          id: Number(activity.cropId)
        },

        activityName: activity.activityName,

        activityDate: activity.activityDate,

        description: activity.description,

        status: activity.status
      };

      console.log(
        "Sending farming activity:",
        activityData
      );

      const response = await addFarmingActivity(
        activityData
      );

      console.log(
        "Farming activity saved:",
        response
      );

      alert("Farming activity saved successfully!");

      navigate("/farming");

    } catch (error) {
      console.error(
        "Farming activity creation error:",
        error
      );

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );

        alert(
          error.response.data?.message ||
          "Failed to save farming activity."
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

  if (loadingData) {
    return (
      <Layout>
        <div className="farming-content">
          <h1>Add Farming Activity 🌱</h1>
          <p>Loading farms and crops...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="farming-content">

        <h1>Add Farming Activity 🌱</h1>

        <p>
          Add an activity for your farm and crop.
        </p>

        <form
          className="farming-form"
          onSubmit={handleSubmit}
        >

          <label>Farm</label>

          <select
            name="farmId"
            value={activity.farmId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Farm
            </option>

            {farms.map((farm) => (
              <option
                key={farm.id}
                value={farm.id}
              >
                {farm.farmName}
              </option>
            ))}
          </select>


          <label>Crop</label>

          <select
            name="cropId"
            value={activity.cropId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Crop
            </option>

            {crops.map((crop) => (
              <option
                key={crop.id}
                value={crop.id}
              >
                {crop.name}
              </option>
            ))}
          </select>


          <label>Activity Name</label>

          <input
            type="text"
            name="activityName"
            placeholder="Example: Land Preparation"
            value={activity.activityName}
            onChange={handleChange}
            required
          />


          <label>Activity Date</label>

          <input
            type="date"
            name="activityDate"
            value={activity.activityDate}
            onChange={handleChange}
            required
          />


          <label>Description</label>

          <textarea
            name="description"
            placeholder="Enter activity details"
            value={activity.description}
            onChange={handleChange}
            rows="4"
          />


          <label>Status</label>

          <select
            name="status"
            value={activity.status}
            onChange={handleChange}
          >
            <option value="PLANNED">
              Planned
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="COMPLETED">
              Completed
            </option>
          </select>


          <button
            type="submit"
            className="farming-button"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Activity 🌱"}
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default AddActivity;