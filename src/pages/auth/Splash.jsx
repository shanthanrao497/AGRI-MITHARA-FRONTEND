import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash-page">
      <div className="splash-content">
        <h1>🌾 Agri-Mitra</h1>

        <p>
          Smart farming assistance for better crop decisions
          and farm management.
        </p>

        <button onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Splash;