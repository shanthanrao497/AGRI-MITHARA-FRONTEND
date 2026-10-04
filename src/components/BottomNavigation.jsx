import { Link } from "react-router-dom";

function BottomNavigation() {
  return (
    <div className="bottom-navigation">

      <Link to="/home">
        <span>🏠</span>
        <small>Home</small>
      </Link>

      <Link to="/farm">
        <span>🚜</span>
        <small>Farm</small>
      </Link>

      <Link to="/crop">
        <span>🌱</span>
        <small>Crops</small>
      </Link>

      <Link to="/booking">
        <span>📅</span>
        <small>Booking</small>
      </Link>

      <Link to="/profile">
        <span>👤</span>
        <small>Profile</small>
      </Link>

    </div>
  );
}

export default BottomNavigation;