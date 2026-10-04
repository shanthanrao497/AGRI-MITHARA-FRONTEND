import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllCrops } from "../../services/cropService";

function RecommendedCrops() {
  const [crops, setCrops] = useState([]);
  const [conditions, setConditions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRecommendedCrops();
  }, []);

  const loadRecommendedCrops = async () => {
    try {
      setLoading(true);
      setError("");

      const savedConditions =
        localStorage.getItem("cropConditions");

      if (!savedConditions) {
        setError(
          "Crop conditions not found. Please select the conditions again."
        );
        return;
      }

      const selectedConditions =
        JSON.parse(savedConditions);

      setConditions(selectedConditions);

      console.log(
        "SELECTED CONDITIONS:",
        selectedConditions
      );

      const allCrops = await getAllCrops();

      console.log(
        "CROPS FROM DATABASE:",
        allCrops
      );

      const selectedSoil =
        selectedConditions.soilType
          ?.trim()
          .toLowerCase();

      const selectedSeason =
        selectedConditions.season
          ?.trim()
          .toLowerCase();

      const recommended = allCrops.filter((crop) => {

        const cropSoil =
          crop.soilType
            ?.trim()
            .toLowerCase();

        const cropSeason =
          crop.season
            ?.trim()
            .toLowerCase();

        console.log(
          "CHECKING:",
          crop.name,
          "DB Soil:",
          cropSoil,
          "Selected Soil:",
          selectedSoil,
          "DB Season:",
          cropSeason,
          "Selected Season:",
          selectedSeason
        );

        return (
          cropSoil === selectedSoil &&
          cropSeason === selectedSeason
        );
      });

      console.log(
        "FINAL RECOMMENDATIONS:",
        recommended
      );

      setCrops(recommended);

    } catch (err) {

      console.error(
        "Recommendation error:",
        err
      );

      setError(
        "Failed to load crops from backend."
      );

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="crop-content">
          <h1>Recommended Crops 🌱</h1>
          <p>Loading recommendations...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="crop-content">

        <h1>
          Recommended Crops 🌱
        </h1>

        {conditions && (
          <div className="crop-card">

            <h3>
              Your Selected Conditions
            </h3>

            <p>
              <strong>Soil:</strong>{" "}
              {conditions.soilType}
            </p>

            <p>
              <strong>Season:</strong>{" "}
              {conditions.season}
            </p>

            <p>
              <strong>Water:</strong>{" "}
              {conditions.waterAvailability}
            </p>

          </div>
        )}

        {error && (
          <div className="crop-card">

            <h2>{error}</h2>

            <Link to="/crop/recommendation">
              <button>
                Try Again
              </button>
            </Link>

          </div>
        )}

        {!error && crops.length === 0 && (
          <div className="crop-card">

            <h2>
              No matching crops found 🌱
            </h2>

            <p>
              No crop matches your selected
              soil type and season.
            </p>

            <Link to="/crop/recommendation">
              <button>
                Try Again
              </button>
            </Link>

          </div>
        )}

        {crops.length > 0 && (

          <div className="crop-grid">

            {crops.map((crop) => (

              <div
                className="crop-card"
                key={crop.id}
              >

                <div className="crop-icon">
                  🌱
                </div>

                <h2>
                  {crop.name}
                </h2>

                <p>
                  <strong>Season:</strong>{" "}
                  {crop.season}
                </p>

                <p>
                  <strong>Soil:</strong>{" "}
                  {crop.soilType}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {crop.description ||
                    "No description available"}
                </p>

                <Link to={`/crop/${crop.id}`}>
                  <button>
                    View Details
                  </button>
                </Link>

              </div>

            ))}

          </div>

        )}

      </div>

    </Layout>
  );
}

export default RecommendedCrops;