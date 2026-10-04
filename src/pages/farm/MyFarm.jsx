import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { getFarmsByUser } from "../../services/farmService";

function MyFarm() {

  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {

    try {

      setLoading(true);
      setError("");

      // Logged-in user ID
      const userId = localStorage.getItem("userId");

      // JWT token
      const token = localStorage.getItem("token");

      if (!userId) {
        setError("User ID not found. Please login again.");
        return;
      }

      if (!token) {
        setError("Login token not found. Please login again.");
        return;
      }

      console.log("Getting farms for user:", userId);

      const response = await getFarmsByUser(userId, token);

      console.log("Farm response:", response);

      setFarms(response);

    } catch (error) {

      console.error("Failed to load farms:", error);

      if (error.response) {

        console.error(
          "Backend status:",
          error.response.status
        );

        console.error(
          "Backend response:",
          error.response.data
        );

        setError("Failed to load farm details.");

      } else {

        setError(
          "Cannot connect to the backend."
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="farm-content">

        {/* Header */}

        <div className="farm-header">

          <div>
            <h1>My Farm 🚜</h1>

            <p>
              Manage your farm information
            </p>
          </div>

          <Link to="/farm/add">

            <button className="add-farm-button">
              + Add Farm
            </button>

          </Link>

        </div>


        {/* Loading */}

        {loading && (

          <div className="farm-details-card">

            <h2>Loading...</h2>

            <p>
              Getting your farm details.
            </p>

          </div>

        )}


        {/* Error */}

        {!loading && error && (

          <div className="farm-details-card">

            <h2>Unable to load farm</h2>

            <p>
              {error}
            </p>

            <button onClick={loadFarms}>
              Try Again
            </button>

          </div>

        )}


        {/* No Farms */}

        {!loading &&
          !error &&
          farms.length === 0 && (

            <div className="farm-details-card">

              <h2>No Farm Added</h2>

              <p>
                Please add your farm details.
              </p>

              <br />

              <Link to="/farm/add">

                <button className="add-farm-button">
                  Add Farm
                </button>

              </Link>

            </div>
        )}


        {/* Farm List */}

        {!loading &&
          !error &&
          farms.length > 0 && (

            <div className="farm-list">

              {farms.map((farm) => (

                <div
                  className="farm-card"
                  key={farm.id}
                >

                  <div className="farm-card-icon">
                    🌾
                  </div>


                  <div className="farm-info">

                    <h2>
                      {farm.farmName}
                    </h2>

                    <p>
                      Location: {farm.location}
                    </p>

                    <p>
                      Area: {farm.area} Acres
                    </p>

                    <p>
                      Soil Type: {farm.soilType}
                    </p>

                  </div>


                  <Link to={`/farm/${farm.id}`}>

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

export default MyFarm;