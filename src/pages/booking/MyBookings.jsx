import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

function MyBookings() {
  const savedBooking = localStorage.getItem("booking");

  const booking = savedBooking
    ? JSON.parse(savedBooking)
    : null;

  return (
    <Layout>
      <div className="booking-content">
        <div className="booking-header">
          <div>
            <h1>My Bookings 📅</h1>

            <p>
              Manage your farming resource bookings.
            </p>
          </div>

          <Link to="/booking/confirm">
            <button className="booking-button">
              + New Booking
            </button>
          </Link>
        </div>

        {booking ? (
          <div className="booking-card">
            <div className="booking-icon">
              📦
            </div>

            <div className="booking-info">
              <h2>{booking.resource}</h2>

              <p>
                <strong>Booking ID:</strong>{" "}
                {booking.id}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {booking.date}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {booking.quantity}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {booking.address}
              </p>

              <p className="booking-status">
                ✓ {booking.status}
              </p>
            </div>
          </div>
        ) : (
          <div className="no-booking-card">
            <h2>No Bookings Yet 📅</h2>

            <p>
              You have not booked any farming
              resources yet.
            </p>

            <Link to="/booking/confirm">
              <button className="booking-button">
                Make a Booking
              </button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyBookings;