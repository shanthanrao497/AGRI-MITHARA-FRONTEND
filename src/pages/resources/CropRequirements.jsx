import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function CropRequirements() {
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);

  useEffect(() => {
    const selectedCrop = localStorage.getItem("selectedCrop");

    if (!selectedCrop) {
      alert("No crop selected. Please select a crop first.");
      navigate("/crop/recommendation");
      return;
    }

    setCrop(JSON.parse(selectedCrop));
  }, [navigate]);

  if (!crop) {
    return (
      <Layout>
        <div className="resource-content">
          <h1>Crop Requirements 🌱</h1>
          <p>Loading crop requirements...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="resource-content">

        <h1>Crop Requirements 🌱</h1>

        <p>
          Check the resources required for your selected crop.
        </p>

        <div className="requirements-card">

          <h2>{crop.name} 🌱</h2>

          <p>
            <strong>Season:</strong> {crop.season}
          </p>

          <p>
            <strong>Soil Type:</strong> {crop.soilType}
          </p>

          <div className="requirement-item">
            <span>💧 Water</span>
            <strong>High</strong>
          </div>

          <div className="requirement-item">
            <span>🌱 Seeds</span>
            <strong>25 kg / Acre</strong>
          </div>

          <div className="requirement-item">
            <span>🧪 Fertilizer</span>
            <strong>100 kg / Acre</strong>
          </div>

          <div className="requirement-item">
            <span>🚜 Equipment</span>
            <strong>Tractor</strong>
          </div>

          <Link to="/resources">
            <button className="resource-button">
              View Available Resources
            </button>
          </Link>

        </div>

      </div>
    </Layout>
  );
}

export default CropRequirements;