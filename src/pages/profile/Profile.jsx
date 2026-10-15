import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { getFarmsByUser } from "../../services/farmService";
import {
  applyLoan,
  getLoansByFarm,
  updateLoanStatus,
} from "../../services/loanService";
import {
  createEmi,
  getEmisByLoan,
  payEmi,
} from "../../services/emiService";
import "../../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [loadingFarms, setLoadingFarms] = useState(true);

  const [loans, setLoans] = useState([]);
  const [emis, setEmis] = useState([]);

  const [loadingLoans, setLoadingLoans] = useState(false);
  const [loadingEmis, setLoadingEmis] = useState(false);

  const [openSection, setOpenSection] = useState("pattadhar");

  const [showLoanForm, setShowLoanForm] = useState(false);
  const [showEmiForm, setShowEmiForm] = useState(false);

  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState("");

  const [loanForm, setLoanForm] = useState({
    loanAmount: "",
    loanType: "",
    bankName: "",
    approvedAmount: "",
    interestRate: "",
    tenure: "",
  });

  const [emiForm, setEmiForm] = useState({
    emiAmount: "",
    dueDate: "",
  });

  const [savingLoan, setSavingLoan] = useState(false);
  const [savingEmi, setSavingEmi] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  // =====================================================
  // LOAD FARMS
  // =====================================================

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage");
      setLoadingFarms(false);
      return;
    }

    const loadFarms = async () => {
      try {
        console.log("Getting farms for user:", userId);

        const response = await getFarmsByUser(userId);

        console.log("Farm response:", response);

        const farmData = Array.isArray(response) ? response : [];

        setFarms(farmData);
      } catch (error) {
        console.error("Failed to load farms:", error);
        setFarms([]);
      } finally {
        setLoadingFarms(false);
      }
    };

    loadFarms();
  }, []);

  // =====================================================
  // LOAD LOANS
  // =====================================================

  useEffect(() => {
    if (farms.length === 0) {
      setLoans([]);
      return;
    }

    const loadLoans = async () => {
      setLoadingLoans(true);

      try {
        const loanResponses = await Promise.all(
          farms
            .filter((farm) => farm.id)
            .map((farm) => getLoansByFarm(farm.id))
        );

        const allLoans = loanResponses.flat();

        console.log("All loans:", allLoans);

        setLoans(allLoans);

        if (!selectedFarmId && farms[0]?.id) {
          setSelectedFarmId(String(farms[0].id));
        }
      } catch (error) {
        console.error("Failed to load loans:", error);
        setLoans([]);
      } finally {
        setLoadingLoans(false);
      }
    };

    loadLoans();
  }, [farms]);

  // =====================================================
  // LOAD EMIS
  // =====================================================

  useEffect(() => {
    if (loans.length === 0) {
      setEmis([]);
      return;
    }

    const loadEmis = async () => {
      setLoadingEmis(true);

      try {
        const emiResponses = await Promise.all(
          loans
            .filter((loan) => loan.id)
            .map((loan) => getEmisByLoan(loan.id))
        );

        const allEmis = emiResponses.flat();

        console.log("All EMIs:", allEmis);

        setEmis(allEmis);

        if (!selectedLoanId && loans[0]?.id) {
          setSelectedLoanId(String(loans[0].id));
        }
      } catch (error) {
        console.error("Failed to load EMIs:", error);
        setEmis([]);
      } finally {
        setLoadingEmis(false);
      }
    };

    loadEmis();
  }, [loans]);

  // =====================================================
  // OWN LAND
  // =====================================================

  const ownLand = farms.filter(
    (farm) =>
      farm.landOwnership &&
      farm.landOwnership.toUpperCase() === "OWNED"
  );

  // =====================================================
  // LEASED LAND
  // =====================================================

  const leasedLand = farms.filter(
    (farm) =>
      farm.landOwnership &&
      farm.landOwnership.toUpperCase() === "LEASED"
  );

  // =====================================================
  // PROFILE FARM
  // =====================================================

  const profileFarm = farms.length > 0 ? farms[0] : null;

  // =====================================================
  // LOAN CHANGE
  // =====================================================

  const handleLoanChange = (event) => {
    const { name, value } = event.target;

    setLoanForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // EMI CHANGE
  // =====================================================

  const handleEmiChange = (event) => {
    const { name, value } = event.target;

    setEmiForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // APPLY LOAN
  // =====================================================

  const handleApplyLoan = async (event) => {
    event.preventDefault();

    if (!selectedFarmId) {
      alert("Please select a farm.");
      return;
    }

    if (!loanForm.loanAmount) {
      alert("Please enter loan amount.");
      return;
    }

    if (!loanForm.loanType) {
      alert("Please select loan type.");
      return;
    }

    setSavingLoan(true);

    try {
      const loanData = {
        loanAmount: Number(loanForm.loanAmount),
        loanType: loanForm.loanType,
        bankName: loanForm.bankName,
        approvedAmount: loanForm.approvedAmount
          ? Number(loanForm.approvedAmount)
          : null,
        interestRate: loanForm.interestRate
          ? Number(loanForm.interestRate)
          : null,
        tenure: loanForm.tenure
          ? Number(loanForm.tenure)
          : null,
        farm: {
          id: Number(selectedFarmId),
        },
      };

      console.log("Sending loan:", loanData);

      const savedLoan = await applyLoan(loanData);

      console.log("Saved loan:", savedLoan);

      setLoans((previous) => [...previous, savedLoan]);

      setSelectedLoanId(String(savedLoan.id));

      setLoanForm({
        loanAmount: "",
        loanType: "",
        bankName: "",
        approvedAmount: "",
        interestRate: "",
        tenure: "",
      });

      setShowLoanForm(false);

      alert("Loan application submitted successfully.");
    } catch (error) {
      console.error("Loan application failed:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to apply for loan."
      );
    } finally {
      setSavingLoan(false);
    }
  };

  // =====================================================
  // CREATE EMI
  // =====================================================

  const handleCreateEmi = async (event) => {
    event.preventDefault();

    if (!selectedLoanId) {
      alert("Please select a loan.");
      return;
    }

    if (!emiForm.emiAmount) {
      alert("Please enter EMI amount.");
      return;
    }

    if (!emiForm.dueDate) {
      alert("Please select EMI due date.");
      return;
    }

    setSavingEmi(true);

    try {
      const emiData = {
        emiAmount: Number(emiForm.emiAmount),
        dueDate: emiForm.dueDate,
        loan: {
          id: Number(selectedLoanId),
        },
      };

      console.log("Sending EMI:", emiData);

      const savedEmi = await createEmi(emiData);

      console.log("Saved EMI:", savedEmi);

      setEmis((previous) => [...previous, savedEmi]);

      setEmiForm({
        emiAmount: "",
        dueDate: "",
      });

      setShowEmiForm(false);

      alert("EMI added successfully.");
    } catch (error) {
      console.error("EMI creation failed:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to add EMI."
      );
    } finally {
      setSavingEmi(false);
    }
  };

  // =====================================================
  // PAY EMI
  // =====================================================

  const handlePayEmi = async (emiId) => {
    const confirmPayment = window.confirm(
      "Are you sure you want to mark this EMI as paid?"
    );

    if (!confirmPayment) {
      return;
    }

    try {
      const updatedEmi = await payEmi(emiId);

      setEmis((previous) =>
        previous.map((emi) =>
          emi.id === emiId ? updatedEmi : emi
        )
      );

      alert("EMI marked as paid.");
    } catch (error) {
      console.error("Pay EMI failed:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to pay EMI."
      );
    }
  };

  // =====================================================
  // UPDATE LOAN STATUS
  // =====================================================

  const handleLoanStatusChange = async (loanId, status) => {
    try {
      const updatedLoan = await updateLoanStatus(
        loanId,
        status
      );

      setLoans((previous) =>
        previous.map((loan) =>
          loan.id === loanId ? updatedLoan : loan
        )
      );

      alert("Loan status updated.");
    } catch (error) {
      console.error("Loan status update failed:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to update loan status."
      );
    }
  };

  return (
    <Layout>
      <div className="profile-page">

        {/* PAGE TITLE */}

        <div className="profile-title">
          <h1>Farmer Profile</h1>

          <p>
            Manage your personal, land and financial details
          </p>
        </div>


        {/* =====================================================
            1. PATTADHAR DETAILS
        ====================================================== */}

        <div className="profile-card">

          <div
            className="accordion-header"
            onClick={() => toggleSection("pattadhar")}
          >
            <div>
              <h2>👤 Pattadhar Details</h2>

              <p>
                Land owner / pattadhar information
              </p>
            </div>

            <div className="accordion-arrow">
              {openSection === "pattadhar" ? "▲" : "▼"}
            </div>
          </div>

          {openSection === "pattadhar" && (
            <div className="accordion-content">

              <div className="section-action">

                <button
                  className="add-land-button"
                  onClick={() =>
                    navigate("/add-pattadhar")
                  }
                >
                  + Add Pattadhar
                </button>

              </div>

              {loadingFarms ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    ⏳
                  </div>

                  <h3>
                    Loading Pattadhar Details...
                  </h3>

                  <p>
                    Please wait while we fetch your
                    details.
                  </p>

                </div>
              ) : !profileFarm ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    👤
                  </div>

                  <h3>
                    No Pattadhar Details
                  </h3>

                  <p>
                    Add your pattadhar details to
                    see them here.
                  </p>

                  <button
                    className="add-land-button"
                    onClick={() =>
                      navigate("/add-pattadhar")
                    }
                  >
                    + Add Pattadhar
                  </button>

                </div>
              ) : (
                <div className="profile-grid">

                  <div className="profile-field">
                    <label>Name</label>

                    <input
                      type="text"
                      value={
                        profileFarm.user?.name || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>District</label>

                    <input
                      type="text"
                      value={
                        profileFarm.district || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Mandal</label>

                    <input
                      type="text"
                      value={
                        profileFarm.mandal || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Village</label>

                    <input
                      type="text"
                      value={
                        profileFarm.village || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>
                      Pattadhar / Authorized
                    </label>

                    <input
                      type="text"
                      value={
                        profileFarm
                          .aadhaarOrAuthorizedPerson ||
                        "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>
                      Father / Husband Name
                    </label>

                    <input
                      type="text"
                      value={
                        profileFarm
                          .fatherOrHusbandName ||
                        "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Khata Number</label>

                    <input
                      type="text"
                      value={
                        profileFarm.kathaNumber || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>
                      Patta Passbook Number
                    </label>

                    <input
                      type="text"
                      value={
                        profileFarm.passbookNumber || "-"
                      }
                      readOnly
                    />
                  </div>

                </div>
              )}

            </div>
          )}
        </div>


        {/* =====================================================
            2. LAND DETAILS
        ====================================================== */}

        <div className="profile-card">

          <div
            className="accordion-header"
            onClick={() => toggleSection("land")}
          >
            <div>

              <h2>🌾 Land Details</h2>

              <p>
                General information about your
                agricultural land
              </p>

            </div>

            <div className="accordion-arrow">
              {openSection === "land" ? "▲" : "▼"}
            </div>
          </div>

          {openSection === "land" && (
            <div className="accordion-content">

              {/* ADD LAND BUTTON */}

              <div className="section-action">

                <button
                  className="add-land-button"
                  onClick={() =>
                    navigate("/add-farm")
                  }
                >
                  + Add Land
                </button>

              </div>


              {loadingFarms ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    ⏳
                  </div>

                  <h3>
                    Loading Land Details...
                  </h3>

                  <p>
                    Please wait while we fetch
                    the land details.
                  </p>

                </div>
              ) : !profileFarm ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    🌱
                  </div>

                  <h3>
                    No Land Details
                  </h3>

                  <p>
                    Add your land details to see
                    them here.
                  </p>

                  <button
                    className="add-land-button"
                    onClick={() =>
                      navigate("/add-farm")
                    }
                  >
                    + Add Land
                  </button>

                </div>
              ) : (
                <div className="profile-grid">

                  <div className="profile-field">
                    <label>Total Land</label>

                    <input
                      type="text"
                      value={
                        profileFarm.totalLand != null
                          ? profileFarm.totalLand
                          : "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Survey Number</label>

                    <input
                      type="text"
                      value={
                        profileFarm.surveyNumber || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Land Status</label>

                    <input
                      type="text"
                      value={
                        profileFarm.landStatus || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Nature of Land</label>

                    <input
                      type="text"
                      value={
                        profileFarm.natureOfLand || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Land Type</label>

                    <input
                      type="text"
                      value={
                        profileFarm.landType || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Type of Soil</label>

                    <input
                      type="text"
                      value={
                        profileFarm.soilType || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Water</label>

                    <input
                      type="text"
                      value={
                        profileFarm.waterAvailability || "-"
                      }
                      readOnly
                    />
                  </div>

                  <div className="profile-field">
                    <label>Land Ownership</label>

                    <input
                      type="text"
                      value={
                        profileFarm.landOwnership || "-"
                      }
                      readOnly
                    />
                  </div>

                </div>
              )}

            </div>
          )}
        </div>


        {/* =====================================================
            3. OWN LAND DETAILS
        ====================================================== */}

        <div className="profile-card">

          <div
            className="accordion-header"
            onClick={() =>
              toggleSection("ownLand")
            }
          >
            <div>

              <h2>🏡 Own Land Details</h2>

              <p>
                Details of land owned by you
              </p>

            </div>

            <div className="accordion-arrow">
              {openSection === "ownLand" ? "▲" : "▼"}
            </div>
          </div>

          {openSection === "ownLand" && (
            <div className="accordion-content">

              <div className="section-action">

                <button
                  className="add-land-button"
                  onClick={() =>
                    navigate("/add-farm")
                  }
                >
                  + Add Land
                </button>

              </div>

              {loadingFarms ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    ⏳
                  </div>

                  <h3>
                    Loading Land Details...
                  </h3>

                  <p>
                    Please wait while we fetch
                    your land details.
                  </p>

                </div>
              ) : ownLand.length === 0 ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    🌱
                  </div>

                  <h3>
                    No Own Land Added
                  </h3>

                  <p>
                    Add your own land details to
                    see them here.
                  </p>

                  <button
                    className="add-land-button"
                    onClick={() =>
                      navigate("/add-farm")
                    }
                  >
                    + Add Land
                  </button>

                </div>
              ) : (
                <div className="land-list">

                  {ownLand.map((farm, index) => (
                    <div
                      className="land-item"
                      key={farm.id || index}
                    >

                      <div className="land-item-header">

                        <h3>
                          🌾{" "}
                          {farm.farmName ||
                            `Land ${index + 1}`}
                        </h3>

                        <span className="land-status">
                          Own Land
                        </span>

                      </div>

                      <div className="land-details-grid">

                        <div>
                          <span>Location</span>

                          <strong>
                            {farm.location || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Area</span>

                          <strong>
                            {farm.area != null
                              ? farm.area
                              : "-"}
                          </strong>
                        </div>

                        <div>
                          <span>District</span>

                          <strong>
                            {farm.district || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Mandal</span>

                          <strong>
                            {farm.mandal || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Village</span>

                          <strong>
                            {farm.village || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Survey Number</span>

                          <strong>
                            {farm.surveyNumber || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Patta Passbook Number
                          </span>

                          <strong>
                            {farm.passbookNumber || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Soil Type</span>

                          <strong>
                            {farm.soilType || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Water</span>

                          <strong>
                            {farm.waterAvailability || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Farm ID</span>

                          <strong>
                            {farm.id || "-"}
                          </strong>
                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          )}
        </div>


        {/* =====================================================
            4. LEASED LAND DETAILS
        ====================================================== */}

        <div className="profile-card">

          <div
            className="accordion-header"
            onClick={() =>
              toggleSection("leasedLand")
            }
          >
            <div>

              <h2>🤝 Leased Land Details</h2>

              <p>
                Details of agricultural land
                taken on lease
              </p>

            </div>

            <div className="accordion-arrow">
              {openSection === "leasedLand" ? "▲" : "▼"}
            </div>
          </div>

          {openSection === "leasedLand" && (
            <div className="accordion-content">

              <div className="section-action">

                <button
                  className="add-land-button"
                  onClick={() =>
                    navigate("/add-leased-land")
                  }
                >
                  + Add Leased Land
                </button>

              </div>

              {loadingFarms ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    ⏳
                  </div>

                  <h3>
                    Loading Leased Land...
                  </h3>

                  <p>
                    Please wait while we fetch
                    your land details.
                  </p>

                </div>
              ) : leasedLand.length === 0 ? (
                <div className="land-message">

                  <div className="no-land-icon">
                    🤝
                  </div>

                  <h3>
                    No Leased Land Added
                  </h3>

                  <p>
                    Add your leased land details
                    to see them here.
                  </p>

                  <button
                    className="add-land-button"
                    onClick={() =>
                      navigate("/add-leased-land")
                    }
                  >
                    + Add Leased Land
                  </button>

                </div>
              ) : (
                <div className="land-list">

                  {leasedLand.map((farm, index) => (
                    <div
                      className="land-item"
                      key={farm.id || index}
                    >

                      <div className="land-item-header">

                        <h3>
                          🤝{" "}
                          {farm.farmName ||
                            `Leased Land ${
                              index + 1
                            }`}
                        </h3>

                        <span className="land-status">
                          Leased Land
                        </span>

                      </div>

                      <div className="land-details-grid">

                        <div>
                          <span>Location</span>

                          <strong>
                            {farm.location || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Area</span>

                          <strong>
                            {farm.area != null
                              ? farm.area
                              : "-"}
                          </strong>
                        </div>

                        <div>
                          <span>District</span>

                          <strong>
                            {farm.district || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Mandal</span>

                          <strong>
                            {farm.mandal || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Village</span>

                          <strong>
                            {farm.village || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Survey Number</span>

                          <strong>
                            {farm.surveyNumber || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Soil Type</span>

                          <strong>
                            {farm.soilType || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Water</span>

                          <strong>
                            {farm.waterAvailability || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Lease Owner</span>

                          <strong>
                            {farm.leaseOwnerName || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Lease Start Date
                          </span>

                          <strong>
                            {farm.leaseStartDate || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Lease End Date
                          </span>

                          <strong>
                            {farm.leaseEndDate || "-"}
                          </strong>
                        </div>

                        <div>
                          <span>Farm ID</span>

                          <strong>
                            {farm.id || "-"}
                          </strong>
                        </div>

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>
          )}
        </div>


        {/* =====================================================
            5. EMI / LOAN PROCESS
        ====================================================== */}

        <div className="profile-card">

          <div
            className="accordion-header"
            onClick={() =>
              toggleSection("finance")
            }
          >
            <div>

              <h2>💰 EMI / LOAN Process</h2>

              <p>
                Manage your EMI and loan
                information
              </p>

            </div>

            <div className="accordion-arrow">
              {openSection === "finance" ? "▲" : "▼"}
            </div>
          </div>

          {openSection === "finance" && (
            <div className="accordion-content">

              {/* LOAN */}

              <div className="finance-subsection">

                <div className="finance-subtitle">

                  <div>

                    <h3>🏦 Loan Details</h3>

                    <span>
                      Apply and manage your farm
                      loans
                    </span>

                  </div>

                  <button
                    className="add-land-button"
                    onClick={() =>
                      setShowLoanForm(!showLoanForm)
                    }
                  >
                    {showLoanForm
                      ? "✕ Close"
                      : "+ Apply Loan"}
                  </button>

                </div>


                {showLoanForm && (
                  <form
                    onSubmit={handleApplyLoan}
                    className="finance-form"
                  >

                    <div className="profile-grid">

                      <div className="profile-field">

                        <label>
                          Select Farm
                        </label>

                        <select
                          value={selectedFarmId}
                          onChange={(event) =>
                            setSelectedFarmId(
                              event.target.value
                            )
                          }
                          required
                        >
                          <option value="">
                            Select farm
                          </option>

                          {farms.map((farm) => (
                            <option
                              key={farm.id}
                              value={farm.id}
                            >
                              {farm.farmName ||
                                `Farm ${farm.id}`}
                            </option>
                          ))}
                        </select>

                      </div>


                      <div className="profile-field">

                        <label>
                          Loan Type
                        </label>

                        <select
                          name="loanType"
                          value={loanForm.loanType}
                          onChange={handleLoanChange}
                          required
                        >
                          <option value="">
                            Select loan type
                          </option>

                          <option value="Agriculture Loan">
                            Agriculture Loan
                          </option>

                          <option value="Crop Loan">
                            Crop Loan
                          </option>

                          <option value="Equipment Loan">
                            Equipment Loan
                          </option>

                          <option value="Farm Development Loan">
                            Farm Development Loan
                          </option>

                        </select>

                      </div>


                      <div className="profile-field">

                        <label>
                          Loan Amount
                        </label>

                        <input
                          type="number"
                          name="loanAmount"
                          value={loanForm.loanAmount}
                          onChange={handleLoanChange}
                          placeholder="Enter loan amount"
                          required
                        />

                      </div>


                      <div className="profile-field">

                        <label>
                          Bank Name
                        </label>

                        <input
                          type="text"
                          name="bankName"
                          value={loanForm.bankName}
                          onChange={handleLoanChange}
                          placeholder="Enter bank name"
                        />

                      </div>


                      <div className="profile-field">

                        <label>
                          Approved Amount
                        </label>

                        <input
                          type="number"
                          name="approvedAmount"
                          value={loanForm.approvedAmount}
                          onChange={handleLoanChange}
                          placeholder="Enter approved amount"
                        />

                      </div>


                      <div className="profile-field">

                        <label>
                          Interest Rate (%)
                        </label>

                        <input
                          type="number"
                          step="0.01"
                          name="interestRate"
                          value={loanForm.interestRate}
                          onChange={handleLoanChange}
                          placeholder="Enter interest rate"
                        />

                      </div>


                      <div className="profile-field">

                        <label>
                          Tenure
                        </label>

                        <input
                          type="number"
                          name="tenure"
                          value={loanForm.tenure}
                          onChange={handleLoanChange}
                          placeholder="Enter tenure"
                        />

                      </div>

                    </div>


                    <div className="section-action">

                      <button
                        type="submit"
                        className="add-land-button"
                        disabled={savingLoan}
                      >
                        {savingLoan
                          ? "Saving..."
                          : "Submit Loan Application"}
                      </button>

                    </div>

                  </form>
                )}


                {loadingLoans ? (
                  <div className="land-message">

                    <div className="no-land-icon">
                      ⏳
                    </div>

                    <h3>
                      Loading Loans...
                    </h3>

                    <p>
                      Please wait while we fetch
                      your loan details.
                    </p>

                  </div>
                ) : loans.length === 0 ? (
                  <div className="land-message">

                    <div className="no-land-icon">
                      🏦
                    </div>

                    <h3>
                      No Loan Applications
                    </h3>

                    <p>
                      Apply for a loan to see
                      your loan details here.
                    </p>

                  </div>
                ) : (
                  <div className="land-list">

                    {loans.map((loan) => (

                      <div
                        className="land-item"
                        key={loan.id}
                      >

                        <div className="land-item-header">

                          <h3>
                            🏦{" "}
                            {loan.loanType ||
                              "Farm Loan"}
                          </h3>

                          <span className="land-status">
                            {loan.status ||
                              "PENDING"}
                          </span>

                        </div>


                        <div className="land-details-grid">

                          <div>
                            <span>
                              Loan Amount
                            </span>

                            <strong>
                              ₹ {loan.loanAmount ?? "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Bank Name
                            </span>

                            <strong>
                              {loan.bankName || "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Application Date
                            </span>

                            <strong>
                              {loan.applicationDate || "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Approved Amount
                            </span>

                            <strong>
                              ₹{" "}
                              {loan.approvedAmount ?? "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Interest Rate
                            </span>

                            <strong>
                              {loan.interestRate != null
                                ? `${loan.interestRate}%`
                                : "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Tenure
                            </span>

                            <strong>
                              {loan.tenure != null
                                ? loan.tenure
                                : "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Farm ID
                            </span>

                            <strong>
                              {loan.farm?.id || "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Loan ID
                            </span>

                            <strong>
                              {loan.id}
                            </strong>
                          </div>

                        </div>


                        <div className="section-action">

                          <label>
                            Loan Status
                          </label>

                          <select
                            value={
                              loan.status || "PENDING"
                            }
                            onChange={(event) =>
                              handleLoanStatusChange(
                                loan.id,
                                event.target.value
                              )
                            }
                          >
                            <option value="PENDING">
                              Pending
                            </option>

                            <option value="APPROVED">
                              Approved
                            </option>

                            <option value="REJECTED">
                              Rejected
                            </option>

                          </select>

                        </div>

                      </div>

                    ))}

                  </div>
                )}

              </div>


              {/* EMI */}

              <div className="finance-subsection loan-section">

                <div className="finance-subtitle">

                  <div>

                    <h3>💳 EMI Details</h3>

                    <span>
                      Manage EMI payments for
                      your loans
                    </span>

                  </div>

                  <button
                    className="add-land-button"
                    disabled={loans.length === 0}
                    onClick={() =>
                      setShowEmiForm(!showEmiForm)
                    }
                  >
                    {showEmiForm
                      ? "✕ Close"
                      : "+ Add EMI"}
                  </button>

                </div>


                {showEmiForm && (
                  <form
                    onSubmit={handleCreateEmi}
                    className="finance-form"
                  >

                    <div className="profile-grid">

                      <div className="profile-field">

                        <label>
                          Select Loan
                        </label>

                        <select
                          value={selectedLoanId}
                          onChange={(event) =>
                            setSelectedLoanId(
                              event.target.value
                            )
                          }
                          required
                        >
                          <option value="">
                            Select loan
                          </option>

                          {loans.map((loan) => (
                            <option
                              key={loan.id}
                              value={loan.id}
                            >
                              {loan.loanType || "Loan"} - ₹
                              {loan.loanAmount}
                            </option>
                          ))}

                        </select>

                      </div>


                      <div className="profile-field">

                        <label>
                          EMI Amount
                        </label>

                        <input
                          type="number"
                          name="emiAmount"
                          value={emiForm.emiAmount}
                          onChange={handleEmiChange}
                          placeholder="Enter EMI amount"
                          required
                        />

                      </div>


                      <div className="profile-field">

                        <label>
                          Due Date
                        </label>

                        <input
                          type="date"
                          name="dueDate"
                          value={emiForm.dueDate}
                          onChange={handleEmiChange}
                          required
                        />

                      </div>

                    </div>


                    <div className="section-action">

                      <button
                        type="submit"
                        className="add-land-button"
                        disabled={savingEmi}
                      >
                        {savingEmi
                          ? "Saving..."
                          : "Save EMI"}
                      </button>

                    </div>

                  </form>
                )}


                {loadingEmis ? (
                  <div className="land-message">

                    <div className="no-land-icon">
                      ⏳
                    </div>

                    <h3>
                      Loading EMI Details...
                    </h3>

                    <p>
                      Please wait while we fetch
                      your EMI details.
                    </p>

                  </div>
                ) : emis.length === 0 ? (
                  <div className="land-message">

                    <div className="no-land-icon">
                      💳
                    </div>

                    <h3>
                      No EMI Added
                    </h3>

                    <p>
                      Add an EMI after applying
                      for a loan.
                    </p>

                  </div>
                ) : (
                  <div className="land-list">

                    {emis.map((emi) => (

                      <div
                        className="land-item"
                        key={emi.id}
                      >

                        <div className="land-item-header">

                          <h3>
                            💳 EMI #{emi.id}
                          </h3>

                          <span className="land-status">
                            {emi.status || "PENDING"}
                          </span>

                        </div>


                        <div className="land-details-grid">

                          <div>
                            <span>
                              EMI Amount
                            </span>

                            <strong>
                              ₹ {emi.emiAmount ?? "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Due Date
                            </span>

                            <strong>
                              {emi.dueDate || "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Paid Date
                            </span>

                            <strong>
                              {emi.paidDate || "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              Loan ID
                            </span>

                            <strong>
                              {emi.loan?.id || "-"}
                            </strong>
                          </div>


                          <div>
                            <span>
                              EMI ID
                            </span>

                            <strong>
                              {emi.id}
                            </strong>
                          </div>

                        </div>


                        {emi.status !== "PAID" && (
                          <div className="section-action">

                            <button
                              className="add-land-button"
                              onClick={() =>
                                handlePayEmi(emi.id)
                              }
                            >
                              💰 Pay EMI
                            </button>

                          </div>
                        )}

                      </div>

                    ))}

                  </div>
                )}

              </div>

            </div>
          )}
        </div>


        {/* BOTTOM BUTTONS */}

        <div className="profile-buttons">

          <button
            className="edit-profile-button"
            onClick={() =>
              navigate("/edit-profile")
            }
          >
            ✏️ Edit Profile
          </button>

          <button
            className="back-button"
            onClick={() =>
              navigate("/home")
            }
          >
            ← Back
          </button>

        </div>

      </div>
    </Layout>
  );
}

export default Profile;