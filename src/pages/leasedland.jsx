```jsx
import React, { useEffect, useState } from "react";
import { getUserLand } from "../services/landService";

function LeasedLand() {
  const [land, setLand] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLeasedLand();
  }, []);

  const loadLeasedLand = async () => {
    try {
      const farms = await getUserLand();

      const leasedLand = farms.filter(
        (farm) => farm.landOwnership === "LEASED"
      );

      setLand(leasedLand);
    } catch (error) {
      console.error("Leased land error:", error);
      setError("Failed to load leased land");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Leased Land</h1>
      <p>My Leased Land Details</p>

      {error && <p>{error}</p>}

      {land.length === 0 ? (
        <p>No leased land found.</p>
      ) : (
        land.map((farm) => (
          <div style={styles.card} key={farm.id}>
            <h2>{farm.farmName}</h2>

            <h3>Location</h3>
            <p><b>Location:</b> {farm.location}</p>
            <p><b>District:</b> {farm.district}</p>
            <p><b>Mandal:</b> {farm.mandal}</p>
            <p><b>Village:</b> {farm.village}</p>

            <h3>Land Information</h3>
            <p><b>Area:</b> {farm.area} acres</p>
            <p><b>Total Land:</b> {farm.totalLand} acres</p>
            <p><b>Soil Type:</b> {farm.soilType}</p>
            <p><b>Land Type:</b> {farm.landType}</p>
            <p><b>Nature:</b> {farm.natureOfLand}</p>
            <p><b>Water:</b> {farm.waterAvailability}</p>
            <p><b>Status:</b> {farm.landStatus}</p>

            <h3>Lease Details</h3>
            <p><b>Lease Owner:</b> {farm.leaseOwnerName}</p>
            <p><b>Lease Start:</b> {farm.leaseStartDate}</p>
            <p><b>Lease End:</b> {farm.leaseEndDate}</p>

            <h3>Documents</h3>
            <p><b>Katha Number:</b> {farm.kathaNumber}</p>
            <p><b>Passbook Number:</b> {farm.passbookNumber}</p>
            <p><b>Survey Number:</b> {farm.surveyNumber}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background: "#f5f7f5",
  },

  card: {
    maxWidth: "750px",
    margin: "25px auto",
    padding: "25px",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
  },
};

export default LeasedLand;
```