import React, { useState, useEffect } from 'react';
import { getDb } from '../services/db.mjs';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Auth methods
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../../styles/Main.css';
import profilePic from '../../img/jake.jpg';
import ImageCarousel from './ImageCarousel'; // Import the carousel component
import images from './imagesMap'; // Import the array of image paths
import ChangeProfileModal from './ChangeProfileModal';

function AccountTest({ onDeleteAccount, userId }) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [username, setUsername] = useState('');
  const [showChangeProfile, setShowChangeProfile] = useState(false);
  const [newProfile, setNewProfile] = useState('');

  const db = getDb();
  const auth = getAuth(); // Initialize Firebase Auth

  useEffect(() => {
    // Fetch username from Firestore based on userId
    const fetchUsername = async () => {
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "accountInfo", userId));
          if (userDoc.exists()) {
            setUsername(userDoc.data().userId); // Set the username from Firestore
          } else {
            console.error("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };
    fetchUsername();
  }, [userId, db]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      console.log("User logged out successfully.");
      // redirect to le home
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
      setPasswordError("Password must be at least 8 characters long, contain one uppercase letter, and one special character.");
      return;
    }
    alert("Password updated successfully!");
    setShowChangePassword(false);
    setNewPassword('');
    setPasswordError('');
  };

  const handleProfileChange = async () => {
    alert("Profile updated successfully!");
    setShowChangeProfile(false);
    setNewProfile('');
  };

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
            <button className="button-primary" onClick={handlePasswordChange}>Submit</button>
            <button className="button-secondary" onClick={() => setShowChangePassword(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showChangeProfile && (
        <ChangeProfileModal
          handleProfileChange={(image) => {
            setNewProfile(image); // Save the image URL here
            setShowChangeProfile(false);
          }}
          setShowChangeProfile={setShowChangeProfile}
        />
      )}
    </Container>
  );
}

export default AccountTest;
