import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

function Home() {
  return (
    <Layout>

      <div className="home-content">

        {/* Hero Section */}

        <section className="hero-section">

          <div>

            <h1>
              Welcome to Agri-Mitra 🌾
            </h1>

            <p>
              Smart farming assistance for better crop
              decisions and farm management.
            </p>

            <Link to="/farm">
              <button>
                View My Farm
              </button>
            </Link>

          </div>

        </section>

        {/* Quick Access */}

        <section className="quick-section">

          <h2>Quick Access</h2>

          <div className="quick-grid">

            <Link to="/farm" className="quick-card">
              <div className="quick-icon">🚜</div>
              <h3>My Farm</h3>
              <p>Manage your farm</p>
            </Link>

            <Link to="/sensor" className="quick-card">
              <div className="quick-icon">📡</div>
              <h3>Sensor Data</h3>
              <p>Monitor your farm</p>
            </Link>

            <Link to="/crop" className="quick-card">
              <div className="quick-icon">🌱</div>
              <h3>Crop Recommendation</h3>
              <p>Find suitable crops</p>
            </Link>

            <Link to="/resources" className="quick-card">
              <div className="quick-icon">🧪</div>
              <h3>Resources</h3>
              <p>Find farming resources</p>
            </Link>

          </div>

        </section>

        {/* More Features */}

        <section className="quick-section">

          <h2>More Features</h2>

          <div className="quick-grid">

            <Link to="/booking" className="quick-card">
              <div className="quick-icon">📅</div>
              <h3>Bookings</h3>
              <p>Manage resource bookings</p>
            </Link>

            <Link to="/farming" className="quick-card">
              <div className="quick-icon">🌾</div>
              <h3>Farming Process</h3>
              <p>Track farming activities</p>
            </Link>

            <Link to="/evaluation" className="quick-card">
              <div className="quick-icon">📊</div>
              <h3>Crop Evaluation</h3>
              <p>Check production details</p>
            </Link>

            <Link to="/profile" className="quick-card">
              <div className="quick-icon">👤</div>
              <h3>Profile</h3>
              <p>Manage your profile</p>
            </Link>

          </div>

        </section>

      </div>

    </Layout>
  );
}

export default Home;