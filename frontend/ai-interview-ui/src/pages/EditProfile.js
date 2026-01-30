import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // names start empty (explicit edit only)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // show current image
  const [profileImage, setProfileImage] = useState(
    storedUser?.profile_image || null
  );

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setConfirmRemove(false);
    };
    reader.readAsDataURL(file);
  };

  /* ---------- SAVE PROFILE ---------- */
  const handleSave = async () => {
    // ❌ rule: last name alone not allowed
    if (firstName.trim() === "" && lastName.trim() !== "") {
      alert("Fill out the first name first");
      return;
    }

    // determine update intent
    let nameUpdateMode = "none";
    if (firstName.trim() !== "" && lastName.trim() === "") {
      nameUpdateMode = "first_only";
    }
    if (firstName.trim() !== "" && lastName.trim() !== "") {
      nameUpdateMode = "full";
    }

    setLoading(true);
    try {
      const payload = {};

      if (firstName.trim() !== "") {
        payload.first_name = firstName;
      }

      if (lastName.trim() !== "") {
        payload.last_name = lastName;
      }

      // image logic
      // null → confirmed remove
      // base64 → update
      if (profileImage === null) {
        payload.profile_image = "";
      } else if (profileImage !== storedUser?.profile_image) {
        payload.profile_image = profileImage;
      }

      const res = await axios.put(
        "http://127.0.0.1:8000/profile",
        payload,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      // 🔴 IMPORTANT: merge + store intent
      const existingUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...existingUser,
          ...res.data.user,
          name_update_mode: nameUpdateMode
        })
      );

      alert("Profile updated");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "420px", margin: "auto" }}>
      <h2>Edit Profile</h2>

      {/* ---------- CURRENT IMAGE ---------- */}
      <div style={{ marginBottom: "20px" }}>
        {profileImage ? (
          <>
            <img
              src={profileImage}
              alt="profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                marginBottom: "10px"
              }}
            />

            {!confirmRemove ? (
              <button
                onClick={() => setConfirmRemove(true)}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Remove Profile Image
              </button>
            ) : (
              <div>
                <p style={{ fontSize: "14px" }}>
                  Are you sure you want to remove the profile image?
                </p>

                <button
                  onClick={() => {
                    setProfileImage(null);
                    setConfirmRemove(false);
                  }}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    marginRight: "10px",
                    cursor: "pointer"
                  }}
                >
                  Confirm
                </button>

                <button
                  onClick={() => setConfirmRemove(false)}
                  style={{
                    background: "#ccc",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        ) : (
          <p style={{ fontSize: "14px", color: "#666" }}>
            Default profile image
          </p>
        )}
      </div>

      {/* ---------- UPLOAD ---------- */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <br /><br />

      {/* ---------- FIRST NAME ---------- */}
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <br /><br />

      {/* ---------- LAST NAME ---------- */}
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <br /><br />

      {/* ---------- SAVE ---------- */}
      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          padding: "10px",
          width: "100%",
          background: "#4b6cb7",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

export default EditProfile;
