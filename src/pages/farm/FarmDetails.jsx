import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

function FarmDetails() {
  const { id } = useParams();

  const savedFarm = localStorage.getItem("farm");

  const farm = savedFarm
    ? JSON.parse(savedFarm)
    : null;

  return (
    <Layout>

      <div className="farm-content">

        <h1>Farm Details 🚜</h1>

        {farm ? (
          <div className="farm-details-card">

            <div className="farm-card-icon">
              🌾
            </div>

            <h2>{farm.name}</h2>

            <p>
              <strong>Farm ID:</strong> {id}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {farm.location}
            </p>

            <p>
              <strong>Area:</strong>{" "}
              {farm.area} Acres
            </p>

            <p>
              <strong>Soil Type:</strong>{" "}
              {farm.soilType}
            </p>

            <p>
              <strong>Current Crop:</strong>{" "}
              {farm.crop || "Not specified"}
            </p>

          </div>
        ) : (
          <div className="farm-details-card">
            <h2>Farm not found</h2>
          </div>
        )}

      </div>

    </Layout>
  );
}

export default FarmDetails;