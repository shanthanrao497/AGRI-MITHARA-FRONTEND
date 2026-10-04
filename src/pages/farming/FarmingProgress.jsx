import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

function FarmingProgress() {
  const progress = [
    {
      id: 1,
      activity: "Land Preparation",
      date: "01/10/2026",
      status: "Completed",
      icon: "🚜",
    },
    {
      id: 2,
      activity: "Seed Sowing",
      date: "03/10/2026",
      status: "In Progress",
      icon: "🌱",
    },
    {
      id: 3,
      activity: "Irrigation",
      date: "05/10/2026",
      status: "Pending",
      icon: "💧",
    },
    {
      id: 4,
      activity: "Fertilizer Application",
      date: "08/10/2026",
      status: "Pending",
      icon: "🧪",
    },
  ];

  return (
    <Layout>
      <div className="farming-content">
        <h1>Farming Progress 📊</h1>

        <p>
          Track the progress of your farming activities.
        </p>

        <div className="progress-card">
          {progress.map((item) => (
            <div
              className="progress-item"
              key={item.id}
            >
              <div className="progress-icon">
                {item.icon}
              </div>

              <div className="progress-info">
                <h3>{item.activity}</h3>

                <p>
                  <strong>Date:</strong> {item.date}
                </p>

                <p
                  className={
                    item.status === "Completed"
                      ? "status-completed"
                      : item.status === "In Progress"
                      ? "status-progress"
                      : "status-pending"
                  }
                >
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="progress-link">
          <Link to="/farming">
            <button className="farming-button">
              Back to Farming Process
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default FarmingProgress;