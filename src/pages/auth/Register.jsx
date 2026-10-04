import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Sending registration data:", user);

      const response = await registerUser(user);

      console.log("Registration response:", response);

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        console.error("Backend status:", error.response.status);
        console.error("Backend response:", error.response.data);

        alert(
          error.response.data?.message ||
          "Registration failed."
        );
      } else {
        alert(
          "Cannot connect to the backend. Make sure Spring Boot is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>🌾 Agri-Mitra</h1>
        <p>Create your account</p>

        <form
          className="auth-form"
          onSubmit={handleRegister}
        >

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={user.phone}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-link">
          <p>Already have an account?</p>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;