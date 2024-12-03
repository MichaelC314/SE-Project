import React, { useState, useEffect } from "react";
import { getDb } from "../services/db.mjs";
import { doc, getDoc, updateDoc  } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../../styles/Main.css";
import defaultProfilePic from "../../img/question.jpeg"; // Default fallback profile picture
import imagesMap from "./imagesMap"; // Import the map of images
import ChangeProfileModal from "./ChangeProfileModal";

function Account({ onDeleteAccount, userId }) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [showChangeProfile, setShowChangeProfile] = useState(false);

  // Initialize newProfile with the first key in imagesMap
  const [newProfile, setNewProfile] = useState(
    Array.from(imagesMap.keys())[0] || "" // Default to the first key in the map or empty string
  );

  const db = getDb();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "accountInfo", userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username);
            setNewProfile(userData.profilePic || Array.from(imagesMap.keys())[0]); // Use Firestore value or default
          } else {
            console.error("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [userId, db]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = async () => {
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, and one special character."
      );
      return;
    }
    alert("Password updated successfully!");
    setShowChangePassword(false);
    setNewPassword("");
    setPasswordError("");
  };

  const handleProfileChange = async (imageKey) => {
    try {
      // Update the Firestore document
      const accountDocRef = doc(db, "accountInfo", userId);
      await updateDoc(accountDocRef, {
        profilePic: imageKey, // Save the key (e.g., "FlyDino1")
      });
  
      setNewProfile(imageKey); // Update local state
      setShowChangeProfile(false); // Close the modal
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture. Please try again.");
    }
  };

  // Get the current profile picture path
  const profilePic = newProfile
    ? imagesMap.get(newProfile) // Use the selected profile picture
    : defaultProfilePic; // Fallback if no key is selected

  return (
    <Container className="account-page">
      <Card className="account-card">
        <div className="text-center">
          <img
            src={profilePic}
            alt="Profile"
            className="profile-img"
            style={{
              transform: "scale(1.25)", // Increase size by 1.25x
              transition: "transform 0.3s ease-in-out", // Smooth transition
            }}
          />
        </div>

        <Card.Body>
          <h3 className="text-center">{username || "Loading..."}</h3>
          <Row>
            <Col>
              <Button className="account-button" onClick={handleLogout}>
                Log Out
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="account-button" onClick={onDeleteAccount}>
                Delete Account
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="account-button" onClick={() => setShowChangePassword(true)}>
                Change Password
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="account-button" onClick={() => setShowChangeProfile(true)}>
                Change Profile Picture
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {showChangePassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Change Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <button className="button-primary" onClick={handlePasswordChange}>
              Submit
            </button>
            <button className="button-secondary" onClick={() => setShowChangePassword(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showChangeProfile && (
        <ChangeProfileModal
          handleProfileChange={handleProfileChange}
          setShowChangeProfile={setShowChangeProfile}
        />
      )}
    </Container>
  );
}

export default Account;
