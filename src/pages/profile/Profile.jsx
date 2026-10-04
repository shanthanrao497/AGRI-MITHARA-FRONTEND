import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Profile() {
  const savedProfile = localStorage.getItem("profile");

  const [profile, setProfile] = useState(
    savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "",
          email: "",
          mobile: "",
          address: "",
          city: ""
        }
  );

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setEditing(false);

    alert("Profile updated successfully!");
  };

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main className="profile-content">

          <div className="profile-header">
            <div>
              <h1>My Profile 👤</h1>
              <p>Manage your personal information.</p>
            </div>

            {!editing && (
              <button
                className="profile-button"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form
              className="profile-form"
              onSubmit={handleSave}
            >
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <label>Mobile Number</label>

              <input
                type="tel"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
              />

              <label>Address</label>

              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />

              <label>City</label>

              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />

              <button
                type="submit"
                className="profile-button"
              >
                Save Profile
              </button>

            </form>
          ) : (
            <div className="profile-card">

              <div className="profile-icon">
                👨‍🌾
              </div>

              <h2>
                {profile.name || "Farmer"}
              </h2>

              <div className="profile-item">
                <span>Email</span>
                <strong>
                  {profile.email || "Not provided"}
                </strong>
              </div>

              <div className="profile-item">
                <span>Mobile</span>
                <strong>
                  {profile.mobile || "Not provided"}
                </strong>
              </div>

              <div className="profile-item">
                <span>Address</span>
                <strong>
                  {profile.address || "Not provided"}
                </strong>
              </div>

              <div className="profile-item">
                <span>City</span>
                <strong>
                  {profile.city || "Not provided"}
                </strong>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Profile;