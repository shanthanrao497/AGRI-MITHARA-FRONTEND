import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/farm.css";
import "./styles/sensor.css";
import "./styles/crop.css";
import "./styles/resource.css";
import "./styles/booking.css";
import "./styles/farming.css";
import "./styles/evaluation.css";
import "./styles/profile.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);