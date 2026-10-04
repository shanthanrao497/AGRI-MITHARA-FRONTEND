import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { getFarmsByUser } from "../../services/farmService";
import { getAllCrops } from "../../services/cropService";
import { saveEvaluation } from "../../services/evaluationService";

function CropEvaluation() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);

  const [evaluation, setEvaluation] = useState({
    farmId: "",
    cropId: "",
    production: "",
    totalCost: "",
    profit: "",
    remarks: ""
  });

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

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

      const [farmData, cropData] = await Promise.all([
        getFarmsByUser(userId),
        getAllCrops()
      ]);

      setFarms(farmData || []);
      setCrops(cropData || []);

    } catch (error) {
      console.error("Loading evaluation data error:", error);
      alert("Failed to load farms or crops.");
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setEvaluation({
      ...evaluation,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!evaluation.farmId) {
      alert("Please select a farm.");
      return;
    }

    if (!evaluation.cropId) {
      alert("Please select a crop.");
      return;
    }

    try {
      setLoading(true);

      const evaluationData = {
        farm: {
          id: Number(evaluation.farmId)
        },
        crop: {
          id: Number(evaluation.cropId)
        },
        production: Number(evaluation.production),
        totalCost: Number(evaluation.totalCost),
        profit: Number(evaluation.profit),
        remarks: evaluation.remarks
      };

      console.log(
        "Sending evaluation:",
        evaluationData
      );

      const response = await saveEvaluation(
        evaluationData
      );

      console.log(
        "Evaluation saved:",
        response
      );

      alert("Evaluation saved successfully!");

      navigate("/evaluation/report");

    } catch (error) {
      console.error(
        "Evaluation save error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data?.message ||
          "Failed to save evaluation."
        );
      } else {
        alert(
          "Cannot connect to backend."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Layout>
        <div className="evaluation-content">
          <h1>Crop Evaluation 📊</h1>
          <p>Loading farms and crops...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="evaluation-content">

        <h1>Crop Evaluation 📊</h1>

        <p>
          Evaluate your crop production and financial results.
        </p>

        <form
          className="evaluation-form"
          onSubmit={handleSubmit}
        >

          <label>Farm</label>

          <select
            name="farmId"
            value={evaluation.farmId}
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


          <label>Crop</label>

          <select
            name="cropId"
            value={evaluation.cropId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Crop
            </option>

            {crops.map((crop) => (
              <option
                key={crop.id}
                value={crop.id}
              >
                {crop.name}
              </option>
            ))}
          </select>


          <label>Production</label>

          <input
            type="number"
            name="production"
            placeholder="Example: 2500 kg"
            value={evaluation.production}
            onChange={handleChange}
            step="0.01"
            required
          />


          <label>Total Cost</label>

          <input
            type="number"
            name="totalCost"
            placeholder="Example: 50000"
            value={evaluation.totalCost}
            onChange={handleChange}
            step="0.01"
            required
          />


          <label>Profit</label>

          <input
            type="number"
            name="profit"
            placeholder="Example: 75000"
            value={evaluation.profit}
            onChange={handleChange}
            step="0.01"
            required
          />


          <label>Remarks</label>

          <textarea
            name="remarks"
            placeholder="Enter your remarks"
            value={evaluation.remarks}
            onChange={handleChange}
            rows="4"
          />


          <button
            type="submit"
            className="evaluation-button"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Evaluation 📊"}
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default CropEvaluation;