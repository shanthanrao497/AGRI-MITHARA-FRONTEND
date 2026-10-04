import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

function SensorDashboard() {
  const sensors = [
    {
      id: 1,
      name: "Soil Moisture Sensor",
      value: "65%",
      status: "Normal",
      icon: "💧"
    },
    {
      id: 2,
      name: "Temperature Sensor",
      value: "28°C",
      status: "Normal",
      icon: "🌡️"
    },
    {
      id: 3,
      name: "Humidity Sensor",
      value: "72%",
      status: "Normal",
      icon: "💨"
    },
    {
      id: 4,
      name: "Soil pH Sensor",
      value: "6.5",
      status: "Good",
      icon: "🧪"
    }
  ];

  return (
    <Layout>

      <div className="sensor-content">

        <div className="sensor-header">
          <h1>Sensor Dashboard 📡</h1>
          <p>Monitor your farm sensor data</p>
        </div>

        <div className="sensor-grid">

          {sensors.map((sensor) => (

            <div
              className="sensor-card"
              key={sensor.id}
            >

              <div className="sensor-icon">
                {sensor.icon}
              </div>

              <h2>{sensor.name}</h2>

              <h3>{sensor.value}</h3>

              <p className="sensor-status">
                {sensor.status}
              </p>

              <Link to={`/sensor/${sensor.id}`}>
                <button>
                  View Details
                </button>
              </Link>

            </div>

          ))}

        </div>

        <div className="sensor-history-link">

          <Link to="/sensor/history">
            <button>
              View Sensor History
            </button>
          </Link>

        </div>

      </div>

    </Layout>
  );
}

export default SensorDashboard;