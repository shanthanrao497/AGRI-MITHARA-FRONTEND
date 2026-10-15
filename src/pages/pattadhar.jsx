import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Pattadhar() {
  const navigate = useNavigate();

  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    pattadharName: "",
    pattadharFatherOrHusbandName: "",
    pattadharAadhaarNumber: "",
    pattadharPhoneNumber: "",
    district: "",
    mandal: "",
    village: "",
    kathaNumber: "",
    passbookNumber: "",
  });

  useEffect(() => {
    loadFarm();
  }, []);

  const loadFarm = async () => {
    try {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      console.log("Pattadhar User ID:", userId);
      console.log("Pattadhar Token:", !!token);

      if (!userId) {
        setError("User ID not found. Please login again.");
        return;
      }

      if (!token) {
        setError("Login token not found. Please login again.");
        return;
      }

      const response = await api.get(
        `/farms/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Pattadhar farms response:",
        response.data
      );

      if (
        !Array.isArray(response.data) ||
        response.data.length === 0
      ) {
        setError(
          `No farm returned for User ID ${userId}.`
        );
        return;
      }

      // Use the first existing farm
      const existingFarm = response.data[0];

      console.log(
        "Selected farm:",
        existingFarm
      );

      setFarm(existingFarm);

      setFormData({
        pattadharName:
          existingFarm.pattadharName || "",

        pattadharFatherOrHusbandName:
          existingFarm.pattadharFatherOrHusbandName || "",

        pattadharAadhaarNumber:
          existingFarm.pattadharAadhaarNumber || "",

        pattadharPhoneNumber:
          existingFarm.pattadharPhoneNumber || "",

        district:
          existingFarm.district || "",

        mandal:
          existingFarm.mandal || "",

        village:
          existingFarm.village || "",

        kathaNumber:
          existingFarm.kathaNumber || "",

        passbookNumber:
          existingFarm.passbookNumber || "",
      });

    } catch (error) {
      console.error(
        "Pattadhar load error:",
        error
      );

      if (error.response) {
        setError(
          `Backend error: ${error.response.status}`
        );
      } else if (error.request) {
        setError(
          "Cannot connect to backend. Make sure Spring Boot is running."
        );
      } else {
        setError(
          "Unable to load farm details."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!farm) {
      setError("Farm details are not available.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const updatedFarm = {
        ...farm,

        pattadharName:
          formData.pattadharName,

        pattadharFatherOrHusbandName:
          formData.pattadharFatherOrHusbandName,

        pattadharAadhaarNumber:
          formData.pattadharAadhaarNumber,

        pattadharPhoneNumber:
          formData.pattadharPhoneNumber,

        district:
          formData.district,

        mandal:
          formData.mandal,

        village:
          formData.village,

        kathaNumber:
          formData.kathaNumber,

        passbookNumber:
          formData.passbookNumber,
      };

      console.log(
        "Updating farm:",
        farm.id
      );

      console.log(
        "Updated data:",
        updatedFarm
      );

      const response = await api.put(
        `/farms/${farm.id}`,
        updatedFarm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Save response:",
        response.data
      );

      setSuccess(
        "Pattadhar details updated successfully!"
      );

      // Update local farm state
      setFarm(response.data);

      setTimeout(() => {
        navigate("/profile");
      }, 1200);

    } catch (error) {
      console.error(
        "Pattadhar save error:",
        error
      );

      if (error.response) {
        console.error(
          "Backend response:",
          error.response.data
        );

        setError(
          `Save failed. Backend error: ${error.response.status}`
        );
      } else if (error.request) {
        setError(
          "Cannot connect to backend."
        );
      } else {
        setError(
          "Unable to save Pattadhar details."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>
          Loading Pattadhar Details...
        </h2>
      </div>
    );
  }

  if (error && !farm) {
    return (
      <div style={styles.center}>

        <h2>
          {error}
        </h2>

        <p>
          Your existing farm should be loaded here.
        </p>

        <button
          onClick={loadFarm}
          style={styles.retryButton}
        >
          Retry
        </button>

        <button
          onClick={() => navigate("/profile")}
          style={styles.backButton}
        >
          Back to Profile
        </button>

      </div>
    );
  }

  return (
    <div style={styles.container}>

      <div style={styles.header}>

        <button
          onClick={() => navigate("/profile")}
          style={styles.backButton}
        >
          ← Back
        </button>

        <div>
          <h1 style={styles.title}>
            Edit Pattadhar Details
          </h1>

          <p style={styles.subtitle}>
            Update Pattadhar land ownership details
          </p>
        </div>

      </div>

      {farm && (
        <div style={styles.farmInfo}>

          <h3>
            Farm: {farm.farmName || "My Farm"}
          </h3>

          <p>
            Farm ID: {farm.id}
          </p>

          <p>
            Location: {farm.location || "-"}
          </p>

        </div>
      )}

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {success && (
        <div style={styles.success}>
          {success}
        </div>
      )}

      <form onSubmit={handleSave}>

        {/* PATTADHAR DETAILS */}

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
            Pattadhar Details
          </h2>

          <div style={styles.grid}>

            <div style={styles.field}>
              <label>
                Pattadhar Name *
              </label>

              <input
                type="text"
                name="pattadharName"
                value={
                  formData.pattadharName
                }
                onChange={handleChange}
                placeholder="Enter Pattadhar name"
                required
              />
            </div>

            <div style={styles.field}>
              <label>
                Father / Husband Name *
              </label>

              <input
                type="text"
                name="pattadharFatherOrHusbandName"
                value={
                  formData.pattadharFatherOrHusbandName
                }
                onChange={handleChange}
                placeholder="Enter father / husband name"
                required
              />
            </div>

            <div style={styles.field}>
              <label>
                Aadhaar Number *
              </label>

              <input
                type="text"
                name="pattadharAadhaarNumber"
                value={
                  formData.pattadharAadhaarNumber
                }
                onChange={handleChange}
                placeholder="Enter Aadhaar number"
                maxLength={12}
                required
              />
            </div>

            <div style={styles.field}>
              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="pattadharPhoneNumber"
                value={
                  formData.pattadharPhoneNumber
                }
                onChange={handleChange}
                placeholder="Enter phone number"
                maxLength={10}
                required
              />
            </div>

          </div>

        </div>

        {/* ADDRESS DETAILS */}

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
            Address Details
          </h2>

          <div style={styles.grid}>

            <div style={styles.field}>
              <label>
                District
              </label>

              <input
                type="text"
                name="district"
                value={
                  formData.district
                }
                onChange={handleChange}
                placeholder="Enter district"
              />
            </div>

            <div style={styles.field}>
              <label>
                Mandal
              </label>

              <input
                type="text"
                name="mandal"
                value={
                  formData.mandal
                }
                onChange={handleChange}
                placeholder="Enter mandal"
              />
            </div>

            <div style={styles.field}>
              <label>
                Village
              </label>

              <input
                type="text"
                name="village"
                value={
                  formData.village
                }
                onChange={handleChange}
                placeholder="Enter village"
              />
            </div>

          </div>

        </div>

        {/* LAND DOCUMENT DETAILS */}

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
            Land Document Details
          </h2>

          <div style={styles.grid}>

            <div style={styles.field}>
              <label>
                Khata Number
              </label>

              <input
                type="text"
                name="kathaNumber"
                value={
                  formData.kathaNumber
                }
                onChange={handleChange}
                placeholder="Enter Khata number"
              />
            </div>

            <div style={styles.field}>
              <label>
                Patta Passbook Number
              </label>

              <input
                type="text"
                name="passbookNumber"
                value={
                  formData.passbookNumber
                }
                onChange={handleChange}
                placeholder="Enter passbook number"
              />
            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div style={styles.buttonContainer}>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            style={styles.cancelButton}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            style={styles.saveButton}
          >
            {saving
              ? "Saving..."
              : "Save Pattadhar Details"}
          </button>

        </div>

      </form>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px 20px",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    textAlign: "center",
  },

  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "25px",
  },

  title: {
    color: "#2e7d32",
    margin: "0 0 5px 0",
  },

  subtitle: {
    color: "#666",
    margin: 0,
  },

  farmInfo: {
    backgroundColor: "#e8f5e9",
    padding: "15px 20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "25px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0, 0, 0, 0.08)",
  },

  sectionTitle: {
    color: "#2e7d32",
    marginTop: 0,
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "20px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  retryButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2e7d32",
    color: "#ffffff",
    cursor: "pointer",
  },

  backButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#eeeeee",
    color: "#333333",
    cursor: "pointer",
    fontSize: "15px",
  },

  error: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  success: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "10px",
  },

  cancelButton: {
    padding: "12px 24px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#333333",
    cursor: "pointer",
    fontSize: "15px",
  },

  saveButton: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2e7d32",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default Pattadhar;
