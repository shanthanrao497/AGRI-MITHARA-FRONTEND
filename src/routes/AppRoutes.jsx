import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Splash from "../pages/auth/Splash";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Main
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

// Pattadhar
import Pattadhar from "../pages/pattadhar";

// Farm
import MyFarm from "../pages/farm/MyFarm";
import AddFarm from "../pages/farm/AddFarm";
import FarmDetails from "../pages/farm/FarmDetails";

// Crop
import CropRecommendation from "../pages/crop/CropRecommendation";
import RecommendedCrops from "../pages/crop/RecommendedCrops";
import CropDetails from "../pages/crop/CropDetails";
import SelectedCrop from "../pages/crop/SelectedCrop";

// Resources
import Resources from "../pages/resources/Resources";
import ResourceDetails from "../pages/resources/ResourceDetails";
import CropRequirements from "../pages/resources/CropRequirements";

// Booking
import BookingConfirmation from "../pages/booking/BookingConfirmation";
import MyBookings from "../pages/booking/MyBookings";

// Farming
import FarmingProcess from "../pages/farming/FarmingProcess";
import AddActivity from "../pages/farming/AddActivity";
import FarmingProgress from "../pages/farming/FarmingProgress";

// Evaluation
import CropEvaluation from "../pages/evaluation/CropEvaluation";
import ProductionReport from "../pages/evaluation/ProductionReport";

// Sensor
import SensorDashboard from "../pages/sensor/SensorDashboard";
import SensorDetails from "../pages/sensor/SensorDetails";
import SensorHistory from "../pages/sensor/SensorHistory";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route path="/" element={<Splash />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* MAIN */}

        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />


        {/* PATTADHAR */}

        <Route
          path="/add-pattadhar"
          element={<Pattadhar />}
        />


        {/* FARM */}

        <Route
          path="/farm"
          element={<MyFarm />}
        />

        <Route
          path="/farm/add"
          element={<AddFarm />}
        />

        <Route
          path="/farm/:id"
          element={<FarmDetails />}
        />


        {/* CROP */}

        {/* Main Crop page */}
        <Route
          path="/crop"
          element={<CropRecommendation />}
        />

        {/* Crop Recommendation */}
        <Route
          path="/crop/recommendation"
          element={<CropRecommendation />}
        />

        {/* Recommended Crops */}
        <Route
          path="/crop/recommended"
          element={<RecommendedCrops />}
        />

        {/* Crop Details */}
        <Route
          path="/crop/:id"
          element={<CropDetails />}
        />

        {/* Selected Crop */}
        <Route
          path="/crop/selected"
          element={<SelectedCrop />}
        />


        {/* RESOURCES */}

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/resources/requirements"
          element={<CropRequirements />}
        />

        <Route
          path="/resources/:id"
          element={<ResourceDetails />}
        />


        {/* BOOKING */}

        <Route
          path="/booking/confirm"
          element={<BookingConfirmation />}
        />

        <Route
          path="/booking"
          element={<MyBookings />}
        />


        {/* FARMING */}

        <Route
          path="/farming"
          element={<FarmingProcess />}
        />

        <Route
          path="/farming/add"
          element={<AddActivity />}
        />

        <Route
          path="/farming/progress"
          element={<FarmingProgress />}
        />


        {/* EVALUATION */}

        <Route
          path="/evaluation"
          element={<CropEvaluation />}
        />

        <Route
          path="/evaluation/report"
          element={<ProductionReport />}
        />


        {/* SENSOR */}

        <Route
          path="/sensor"
          element={<SensorDashboard />}
        />

        <Route
          path="/sensor/:id"
          element={<SensorDetails />}
        />

        <Route
          path="/sensor/history"
          element={<SensorHistory />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;