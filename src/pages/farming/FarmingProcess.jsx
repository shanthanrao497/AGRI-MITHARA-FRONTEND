import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getFarmsByUser } from "../../services/farmService";
import { getActivitiesByFarm } from "../../services/farmingService";

function FarmingProcess() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [activities, setActivities] = useState([]);

  const [selectedFarmId, setSelectedFarmId] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const farmData = await getFarmsByUser(userId);

      console.log("Farms:", farmData);

      setFarms(farmData || []);

      if (farmData && farmData.length > 0) {
        setSelectedFarmId(String(farmData[0].id));

        await loadActivities(farmData[0].id);
      }

    } catch (error) {
      console.error("Failed to load farms:", error);
      alert("Failed to load farms.");
    } finally {
      setLoading(false);
    }
  };

  const loadActivities = async (farmId) => {
    try {
      const data = await getActivitiesByFarm(farmId);

      console.log(
        "Farming activities:",
        data
      );

      setActivities(data || []);

    } catch (error) {
      console.error(
        "Failed to load activities:",
        error
      );

      setActivities([]);
    }
  };

  const handleFarmChange = async (e) => {
    const farmId = e.target.value;

    setSelectedFarmId(farmId);

    if (farmId) {
      await loadActivities(farmId);
    } else {
      setActivities([]);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="farming-content">
          <h1>Farming Process 🌾</h1>
          <p>Loading farming activities...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="farming-content">

        <div className="farming-header">

          <div>
            <h1>Farming Process 🌾</h1>

            <p>
              Manage and track your farming activities.
            </p>
          </div>

          <Link to="/farming/add">
            <button className="farming-button">
              + Add Activity
            </button>
          </Link>

        </div>


        {farms.length > 0 && (
          <div className="farm-selection">

            <label>
              Select Farm
            </label>

            <select
              value={selectedFarmId}
              onChange={handleFarmChange}
            >
              {farms.map((farm) => (
                <option
                  key={farm.id}
                  value={farm.id}
                >
                  {farm.farmName}
                </option>
              ))}
            </select>

          </div>
        )}


        {activities.length > 0 ? (

          <div className="activity-list">

            {activities.map((activity) => (

              <div
                className="activity-card"
                key={activity.id}
              >

                <div className="activity-icon">
                  🌱
                </div>

                <div className="activity-info">

                  <h2>
                    {activity.activityName}
                  </h2>

                  <p>
                    <strong>Date:</strong>{" "}
                    {activity.activityDate}
                  </p>

                  <p>
                    <strong>Crop:</strong>{" "}
                    {activity.crop?.name ||
                      "Not available"}
                  </p>

                  <p>
                    <strong>Description:</strong>{" "}
                    {activity.description ||
                      "No description"}
                  </p>

                  <p className="activity-status">
                    ✓ {activity.status}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="no-activity-card">

            <h2>
              No Activities Added
            </h2>

            <p>
              Add your first farming activity.
            </p>

            <Link to="/farming/add">

              <button className="farming-button">
                Add Activity
              </button>

            </Link>

          </div>

        )}


        <div className="progress-link">

          <Link to="/farming/progress">

            <button className="farming-button">
              View Farming Progress
            </button>

          </Link>

        </div>

      </div>
    </Layout>
  );
}

export default FarmingProcess;