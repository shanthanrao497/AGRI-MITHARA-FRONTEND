import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Login data:", loginData);

      const response = await loginUser(loginData);

      console.log("Login response:", response);

      // Save JWT token
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      // Save user ID
      if (response.userId) {
        localStorage.setItem("userId", String(response.userId));
      }

      // Save complete login response
      localStorage.setItem("user", JSON.stringify(response));

      console.log(
        "Saved userId:",
        localStorage.getItem("userId")
      );

      alert("Login successful!");

      navigate("/home");

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.error("Backend status:", error.response.status);
        console.error("Backend response:", error.response.data);

        alert(
          error.response.data?.message ||
          "Invalid email or password."
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

        <p>Login to your account</p>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-link">

          <p>Don't have an account?</p>

          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;