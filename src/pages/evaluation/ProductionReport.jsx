import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getFarmsByUser } from "../../services/farmService";
import { getEvaluationsByFarm } from "../../services/evaluationService";

function ProductionReport() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const farmData = await getFarmsByUser(userId);

      console.log("Farms:", farmData);

      setFarms(farmData || []);

      if (farmData && farmData.length > 0) {
        const firstFarmId = farmData[0].id;

        setSelectedFarmId(String(firstFarmId));

        await loadReport(firstFarmId);
      }

    } catch (error) {
      console.error(
        "Failed to load farms:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const loadReport = async (farmId) => {
    try {
      const evaluations =
        await getEvaluationsByFarm(farmId);

      console.log(
        "Evaluations:",
        evaluations
      );

      if (
        evaluations &&
        evaluations.length > 0
      ) {
        // Show the latest evaluation
        const latestEvaluation =
          evaluations[evaluations.length - 1];

        setReport(latestEvaluation);
      } else {
        setReport(null);
      }

    } catch (error) {
      console.error(
        "Failed to load evaluation:",
        error
      );

      setReport(null);
    }
  };

  const handleFarmChange = async (e) => {
    const farmId = e.target.value;

    setSelectedFarmId(farmId);

    if (farmId) {
      await loadReport(farmId);
    } else {
      setReport(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="evaluation-content">
          <h1>Production Report 📊</h1>
          <p>Loading production report...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="evaluation-content">

        <h1>Production Report 📊</h1>

        <p>
          View your crop evaluation and production results.
        </p>

        {farms.length > 0 && (
          <div className="farm-selection">

            <label>
              Select Farm
            </label>

            <select
              value={selectedFarmId}
              onChange={handleFarmChange}
            >
              {farms.map((farm) => (
                <option
                  key={farm.id}
                  value={farm.id}
                >
                  {farm.farmName}
                </option>
              ))}
            </select>

          </div>
        )}

        {report ? (

          <div className="report-card">

            <div className="report-icon">
              📈
            </div>

            <h2>
              {report.crop?.name ||
                "Selected Crop"}
            </h2>

            <div className="report-item">
              <span>Farm</span>

              <strong>
                {report.farm?.farmName ||
                  "Selected Farm"}
              </strong>
            </div>

            <div className="report-item">
              <span>Farm Area</span>

              <strong>
                {report.farm?.area ?? "-"} Acres
              </strong>
            </div>

            <div className="report-item">
              <span>Total Production</span>

              <strong>
                {report.production ?? 0} Kg
              </strong>
            </div>

            <div className="report-item">
              <span>Total Cost</span>

              <strong>
                ₹{report.totalCost ?? 0}
              </strong>
            </div>

            <div className="report-item">
              <span>Profit</span>

              <strong>
                ₹{report.profit ?? 0}
              </strong>
            </div>

            <div className="report-item">
              <span>Remarks</span>

              <strong>
                {report.remarks ||
                  "No remarks"}
              </strong>
            </div>

            <p className="evaluation-status">
              ✓ Evaluation Completed
            </p>

            <Link to="/evaluation">

              <button className="evaluation-button">
                Evaluate Another Crop
              </button>

            </Link>

          </div>

        ) : (

          <div className="no-report-card">

            <h2>
              No Report Available
            </h2>

            <p>
              Please evaluate a crop first.
            </p>

            <Link to="/evaluation">

              <button className="evaluation-button">
                Start Evaluation
              </button>

            </Link>

          </div>

        )}

      </div>
    </Layout>
  );
}

export default ProductionReport;