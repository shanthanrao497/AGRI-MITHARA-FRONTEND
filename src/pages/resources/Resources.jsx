import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllResources } from "../../services/resourceService";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllResources();

      console.log("Resources from database:", data);

      // Remove duplicate resources
      const uniqueResources = Array.from(
        new Map(
          (data || []).map((resource) => [
            `${resource.name?.trim().toLowerCase()}-${resource.type?.trim().toLowerCase()}`,
            resource
          ])
        ).values()
      );

      console.log("Unique resources:", uniqueResources);

      setResources(uniqueResources);

    } catch (error) {
      console.error("Failed to load resources:", error);

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );
      }

      setError(
        "Failed to load resources from the backend."
      );

    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type) => {
    const resourceType = type?.toLowerCase();

    if (resourceType?.includes("seed")) {
      return "🌱";
    }

    if (resourceType?.includes("fertilizer")) {
      return "🧪";
    }

    if (resourceType?.includes("equipment")) {
      return "🚜";
    }

    if (
      resourceType?.includes("pesticide") ||
      resourceType?.includes("protection")
    ) {
      return "🧴";
    }

    if (resourceType?.includes("irrigation")) {
      return "💧";
    }

    if (resourceType?.includes("harvesting")) {
      return "🌾";
    }

    return "📦";
  };

  if (loading) {
    return (
      <Layout>
        <div className="resource-content">
          <h1>Farming Resources 🧪</h1>
          <p>Loading resources...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="resource-content">

        <h1>Farming Resources 🧪</h1>

        <p>
          Find the resources required for your farming activities.
        </p>

        {error && (
          <div className="no-resource-card">
            <h2>{error}</h2>

            <button
              className="resource-button"
              onClick={loadResources}
            >
              Try Again
            </button>
          </div>
        )}

        {!error && resources.length === 0 && (
          <div className="no-resource-card">
            <h2>No Resources Available</h2>

            <p>
              No farming resources are currently available.
            </p>
          </div>
        )}

        {!error && resources.length > 0 && (
          <div className="resource-grid">

            {resources.map((resource) => (

              <div
                className="resource-card"
                key={resource.id}
              >

                <div className="resource-icon">
                  {getResourceIcon(resource.type)}
                </div>

                <h2>
                  {resource.name}
                </h2>

                <p>
                  <strong>Type:</strong>{" "}
                  {resource.type}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {resource.description ||
                    "No description available"}
                </p>

                <p>
                  <strong>Price:</strong>{" "}
                  ₹{resource.price ?? 0}
                </p>

                <p className="resource-status">
                  {resource.available
                    ? "✓ Available"
                    : "✕ Not Available"}
                </p>

                <Link
                  to={`/resources/${resource.id}`}
                >
                  <button>
                    View Details
                  </button>
                </Link>

              </div>

            ))}

          </div>
        )}

      </div>
    </Layout>
  );
}

export default Resources;