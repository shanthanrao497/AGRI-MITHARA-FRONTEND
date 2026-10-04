import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../components/Layout";

function CropRecommendation() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    soilType: "",
    season: "",
    waterAvailability: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "cropConditions",
      JSON.stringify(form)
    );

    navigate("/crop/recommended");
  };

  return (
    <Layout>

      <div className="crop-content">

        <h1>Crop Recommendation 🌱</h1>

        <p>
          Enter your farm conditions to find suitable crops.
        </p>

        <form
          className="crop-form"
          onSubmit={handleSubmit}
        >

          <label>Soil Type</label>

          <select
            name="soilType"
            value={form.soilType}
            onChange={handleChange}
            required
          >
            <option value="">
              Select soil type
            </option>

            <option value="Black Soil">
              Black Soil
            </option>

            <option value="Red Soil">
              Red Soil
            </option>

            <option value="Alluvial Soil">
              Alluvial Soil
            </option>
          </select>


          <label>Season</label>

          <select
            name="season"
            value={form.season}
            onChange={handleChange}
            required
          >
            <option value="">
              Select season
            </option>

            <option value="Kharif">
              Kharif
            </option>

            <option value="Rabi">
              Rabi
            </option>

            <option value="Summer">
              Summer
            </option>
          </select>


          <label>Water Availability</label>

          <select
            name="waterAvailability"
            value={form.waterAvailability}
            onChange={handleChange}
            required
          >
            <option value="">
              Select water availability
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>


          <button type="submit">
            Get Recommendations 🌱
          </button>

        </form>

      </div>

    </Layout>
  );
}

export default CropRecommendation;