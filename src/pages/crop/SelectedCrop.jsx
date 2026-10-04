import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { saveRecommendation } from "../../services/recommendationService";
import { getFarmsByUser } from "../../services/farmService";

function SelectedCrop() {
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [farm, setFarm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const selectedCrop = localStorage.getItem("selectedCrop");
      const userId = localStorage.getItem("userId");

      if (!selectedCrop) {
        alert("No crop selected. Please select a crop first.");
        navigate("/crop/recommendation");
        return;
      }

      if (!userId) {
        alert("User ID not found. Please login again.");
        navigate("/login");
        return;
      }

      const cropData = JSON.parse(selectedCrop);

      console.log("Selected crop:", cropData);
      console.log("User ID:", userId);

      setCrop(cropData);

      // Get farms of logged-in user
      const farms = await getFarmsByUser(userId);

      console.log("User farms:", farms);

      if (!farms || farms.length === 0) {
        setError(
          "No farm found. Please add a farm before selecting a crop."
        );
        return;
      }

      // Use first farm
      setFarm(farms[0]);

      console.log("Selected farm:", farms[0]);

    } catch (error) {
      console.error("Load selected crop error:", error);

      setError(
        "Failed to load farm information."
      );
    }
  };

  const handleSaveRecommendation = async () => {
    try {
      if (!crop) {
        alert("Crop not found.");
        return;
      }

      if (!farm) {
        alert("Farm not found. Please add a farm first.");
        return;
      }

      setSaving(true);
      setError("");

      const recommendationData = {
        farm: {
          id: Number(farm.id),
        },

        crop: {
          id: Number(crop.id),
        },

        reason:
          "Crop recommended based on selected soil type, season and water availability.",

        recommendedAt: new Date().toISOString(),
      };

      console.log(
        "Saving recommendation:",
        recommendationData
      );

      const response =
        await saveRecommendation(
          recommendationData
        );

      console.log(
        "Recommendation saved:",
        response
      );

      // Save locally also
      localStorage.setItem(
        "selectedCrop",
        JSON.stringify(crop)
      );

      alert(
        `${crop.name} recommendation saved successfully!`
      );

      navigate("/resources/requirements");

    } catch (error) {
      console.error(
        "Save recommendation error:",
        error
      );

      if (error.response) {
        console.error(
          "Backend status:",
          error.response.status
        );

        console.error(
          "Backend response:",
          error.response.data
        );

        setError(
          error.response.data?.message ||
          "Failed to save crop recommendation."
        );
      } else {
        setError(
          "Cannot connect to backend."
        );
      }

    } finally {
      setSaving(false);
    }
  };

  if (!crop) {
    return (
      <Layout>
        <div className="crop-content">
          <h1>Selected Crop 🌱</h1>
          <p>Loading selected crop...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="crop-content">

        <h1>Selected Crop 🌱</h1>

        {error && (
          <div className="crop-card">
            <h3>{error}</h3>

            <Link to="/farm/add">
              <button>Add Farm</button>
            </Link>
          </div>
        )}

        {farm && (
          <div className="crop-card">

            <h3>Farm</h3>

            <p>
              <strong>Farm:</strong>{" "}
              {farm.farmName}
            </p>

            <p>
              <strong>Farm ID:</strong>{" "}
              {farm.id}
            </p>

          </div>
        )}

        <div className="selected-crop-card">

          <div className="crop-large-icon">
            🌱
          </div>

          <h2>{crop.name}</h2>

          <p>
            <strong>Crop ID:</strong>{" "}
            {crop.id}
          </p>

          <p>
            <strong>Season:</strong>{" "}
            {crop.season}
          </p>

          <p>
            <strong>Soil Type:</strong>{" "}
            {crop.soilType}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {crop.description ||
              "No description available"}
          </p>

          {farm && (
            <button
              onClick={handleSaveRecommendation}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Recommendation 🌱"}
            </button>
          )}

        </div>

      </div>

    </Layout>
  );
}

export default SelectedCrop;