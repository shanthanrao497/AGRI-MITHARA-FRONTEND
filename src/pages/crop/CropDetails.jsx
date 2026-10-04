import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getCropById } from "../../services/cropService";

function CropDetails() {
  const { id } = useParams();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCrop();
  }, [id]);

  const loadCrop = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Getting crop:", id);

      const data = await getCropById(id);

      console.log("Crop response:", data);

      setCrop(data);

    } catch (error) {
      console.error("Crop details error:", error);

      setError(
        "Failed to load crop details."
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="crop-content">
          <h1>Crop Details 🌱</h1>
          <p>Loading crop details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="crop-content">

        <h1>Crop Details 🌱</h1>

        {error ? (

          <div className="crop-details-card">
            <h2>{error}</h2>
          </div>

        ) : crop ? (

          <div className="crop-details-card">

            <div className="crop-large-icon">
              🌱
            </div>

            <h2>
              {crop.name}
            </h2>

            <p>
              <strong>Crop ID:</strong>{" "}
              {crop.id}
            </p>

            <p>
              <strong>Season:</strong>{" "}
              {crop.season}
            </p>

            <p>
              <strong>Suitable Soil:</strong>{" "}
              {crop.soilType}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {crop.description}
            </p>

            <Link
              to="/crop/selected"
              onClick={() => {
                localStorage.setItem(
                  "selectedCrop",
                  JSON.stringify(crop)
                );
              }}
            >
              <button>Select This Crop 🌱</button>
            </Link>

          </div>

        ) : (

          <div className="crop-details-card">
            <h2>Crop not found</h2>
          </div>

        )}

      </div>

    </Layout>
  );
}

export default CropDetails;