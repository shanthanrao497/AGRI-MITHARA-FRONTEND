import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getResourceById } from "../../services/resourceService";

function ResourceDetails() {
  const { id } = useParams();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResource();
  }, [id]);

  const loadResource = async () => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "Getting resource:",
        id
      );

      const data = await getResourceById(id);

      console.log(
        "Resource response:",
        data
      );

      setResource(data);

    } catch (error) {
      console.error(
        "Resource details error:",
        error
      );

      setError(
        "Failed to load resource details."
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

    return "📦";
  };

  if (loading) {
    return (
      <Layout>
        <div className="resource-content">
          <h1>Resource Details 🧪</h1>
          <p>Loading resource details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="resource-content">

        <h1>Resource Details 🧪</h1>

        {error ? (

          <div className="resource-details-card">

            <h2>{error}</h2>

            <Link to="/resources">
              <button>
                Back to Resources
              </button>
            </Link>

          </div>

        ) : resource ? (

          <div className="resource-details-card">

            <div className="resource-large-icon">
              {getResourceIcon(resource.type)}
            </div>

            <h2>
              {resource.name}
            </h2>

            <p>
              <strong>Resource ID:</strong>{" "}
              {resource.id}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {resource.type}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              ₹{resource.price ?? 0}
            </p>

            <p>
              <strong>Availability:</strong>{" "}
              {resource.available
                ? "Available"
                : "Not Available"}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {resource.description ||
                "No description available"}
            </p>

            {resource.available && (
              <Link
                to={`/booking/confirm?resourceId=${resource.id}`}
              >
                <button>
                  Book Resource 📅
                </button>
              </Link>
            )}

            <br />
            <br />

            <Link to="/resources">
              <button>
                Back to Resources
              </button>
            </Link>

          </div>

        ) : (

          <div className="resource-details-card">

            <h2>
              Resource not found
            </h2>

            <Link to="/resources">
              <button>
                Back to Resources
              </button>
            </Link>

          </div>

        )}

      </div>
    </Layout>
  );
}

export default ResourceDetails;