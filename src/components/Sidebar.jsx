import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Agri-Mitra</h2>

      <Link to="/home">🏠 Home</Link>
      <Link to="/farm">🚜 My Farm</Link>
      <Link to="/sensor">📡 Sensors</Link>
      <Link to="/crop">🌱 Crops</Link>
      <Link to="/resources">🧪 Resources</Link>
      <Link to="/booking">📅 Bookings</Link>
      <Link to="/farming">🌾 Farming</Link>
      <Link to="/evaluation">📊 Evaluation</Link>
      <Link to="/profile">👤 Profile</Link>
    </aside>
  );
}

export default Sidebar;