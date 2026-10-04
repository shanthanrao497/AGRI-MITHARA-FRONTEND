import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

function SensorDetails() {
  const { id } = useParams();

  return (
    <Layout>

      <div className="sensor-content">

        <h1>Sensor Details 📡</h1>

        <div className="sensor-details-card">

          <div className="sensor-icon">
            💧
          </div>

          <h2>Sensor ID: {id}</h2>

          <p>
            <strong>Sensor Name:</strong>{" "}
            Soil Moisture Sensor
          </p>

          <p>
            <strong>Current Value:</strong>{" "}
            65%
          </p>

          <p>
            <strong>Status:</strong>{" "}
            Normal
          </p>

          <p>
            <strong>Last Updated:</strong>{" "}
            Just now
          </p>

          <p>
            <strong>Farm:</strong>{" "}
            My Farm
          </p>

          <Link to="/sensor/history">
            <button>
              View History
            </button>
          </Link>

        </div>

      </div>

    </Layout>
  );
}

export default SensorDetails;