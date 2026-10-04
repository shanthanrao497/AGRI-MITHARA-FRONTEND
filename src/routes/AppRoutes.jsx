import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "../pages/auth/Splash";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/home/Home";

import MyFarm from "../pages/farm/MyFarm";
import AddFarm from "../pages/farm/AddFarm.jsx";
import FarmDetails from "../pages/farm/FarmDetails";
import SensorDashboard from "../pages/sensor/SensorDashboard";
import SensorDetails from "../pages/sensor/SensorDetails";
import SensorHistory from "../pages/sensor/SensorHistory";
import CropRecommendation from "../pages/crop/CropRecommendation";
import RecommendedCrops from "../pages/crop/RecommendedCrops";
import CropDetails from "../pages/crop/CropDetails";
import SelectedCrop from "../pages/crop/SelectedCrop";
import CropRequirements from "../pages/resources/CropRequirements";
import Resources from "../pages/resources/Resources";
import ResourceDetails from "../pages/resources/ResourceDetails";
import BookingConfirmation from "../pages/booking/BookingConfirmation";
import MyBookings from "../pages/booking/MyBookings";
import FarmingProcess from "../pages/farming/FarmingProcess";
import AddActivity from "../pages/farming/AddActivity";
import FarmingProgress from "../pages/farming/FarmingProgress";
import CropEvaluation from "../pages/evaluation/CropEvaluation";
import ProductionReport from "../pages/evaluation/ProductionReport";
import Profile from "../pages/profile/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        {/* Farm */}
        <Route path="/farm" element={<MyFarm />} />
        <Route path="/farm/add" element={<AddFarm />} />
        <Route path="/farm/:id" element={<FarmDetails />} />
         {/* Sensors */}
          <Route path="/sensor" element={<SensorDashboard />} />
          <Route path="/sensor/:id" element={<SensorDetails />} />
          <Route path="/sensor/history" element={<SensorHistory />} />
         {/* Crop Recommendation */}
         <Route
           path="/crop"
           element={<CropRecommendation />}
         />

         <Route
           path="/crop/recommended"
           element={<RecommendedCrops />}
         />

         <Route
           path="/crop/:id"
           element={<CropDetails />}
         />

         <Route
           path="/crop/selected"
           element={<SelectedCrop />}
         />
         {/* Resources */}

         <Route
           path="/resources/requirements"
           element={<CropRequirements />}
         />

         <Route
           path="/resources"
           element={<Resources />}
         />

         <Route
           path="/resources/:id"
           element={<ResourceDetails />}
         />
         {/* Booking */}

         <Route
           path="/booking"
           element={<MyBookings />}
         />

         <Route
           path="/booking/confirm"
           element={<BookingConfirmation />}
         />
         {/* Farming */}

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
         {/* Evaluation */}
         <Route path="/evaluation" element={<CropEvaluation />} />
         <Route
           path="/evaluation/report"
           element={<ProductionReport />}
         />

    </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;