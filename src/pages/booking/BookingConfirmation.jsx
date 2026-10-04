import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { createBooking } from "../../services/bookingService";
import { getAllResources } from "../../services/resourceService";
import { getFarmsByUser } from "../../services/farmService";

function BookingConfirmation() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [resources, setResources] = useState([]);

  const [booking, setBooking] = useState({
    farmId: "",
    resourceId: "",
    date: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const [farmData, resourceData] = await Promise.all([
        getFarmsByUser(userId),
        getAllResources()
      ]);

      console.log("Farms:", farmData);
      console.log("Resources:", resourceData);

      setFarms(farmData || []);
      setResources(resourceData || []);

    } catch (error) {
      console.error("Loading booking data error:", error);

      alert(
        "Failed to load farms or resources."
      );

    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login session expired. Please login again.");
      navigate("/login");
      return;
    }

    if (!booking.farmId) {
      alert("Please select a farm.");
      return;
    }

    if (!booking.resourceId) {
      alert("Please select a resource.");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        farm: {
          id: Number(booking.farmId)
        },

        resource: {
          id: Number(booking.resourceId)
        },

        bookingDate: booking.date,

        quantity: booking.quantity,

        status: "CONFIRMED"
      };

      console.log(
        "Sending booking data:",
        bookingData
      );

      const response = await createBooking(
        bookingData
      );

      console.log(
        "Booking saved successfully:",
        response
      );

      alert(
        "Booking confirmed and saved successfully!"
      );

      navigate("/booking");

    } catch (error) {
      console.error(
        "Booking creation error:",
        error
      );

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );

        alert(
          error.response.data?.message ||
          "Failed to save booking."
        );
      } else {
        alert(
          "Cannot connect to backend. Make sure Spring Boot is running."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Layout>
        <div className="booking-content">
          <h1>Book Resource 📅</h1>
          <p>Loading farms and resources...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="booking-content">

        <h1>Book Resource 📅</h1>

        <p>
          Select your farm and the resource you want to book.
        </p>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          {/* FARM */}

          <label>Farm</label>

          <select
            name="farmId"
            value={booking.farmId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Farm
            </option>

            {farms.map((farm) => (
              <option
                key={farm.id}
                value={farm.id}
              >
                {farm.farmName}
              </option>
            ))}
          </select>


          {/* RESOURCE */}

          <label>Resource</label>

          <select
            name="resourceId"
            value={booking.resourceId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Resource
            </option>

            {resources.map((resource) => (
              <option
                key={resource.id}
                value={resource.id}
              >
                {resource.name}
              </option>
            ))}
          </select>


          {/* DATE */}

          <label>Booking Date</label>

          <input
            type="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
            required
          />


          {/* QUANTITY */}

          <label>Quantity</label>

          <input
            type="text"
            name="quantity"
            placeholder="Example: 25 kg"
            value={booking.quantity}
            onChange={handleChange}
            required
          />


          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Booking..."
              : "Confirm Booking 📅"}
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default BookingConfirmation;