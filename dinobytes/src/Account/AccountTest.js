import React, { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/Main.css';
import profilePic from '../img/pfp.jpg';
import ImageCarousel from './ImageCarousel'; // Import the carousel component
import images from './images'; // Import the array of image paths
import ChangeProfileModal from './ChangeProfileModal';

function AccountTest({ onLogout, onDeleteAccount, userId }) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeProfile, setShowChangeProfile] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newProfile, setNewProfile] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
          />
        </div>

        <Card.Body>
          <h3 className="text-center">Username</h3>
          <Row>
            <Col>
              <Button className="account-button" onClick={onLogout}>
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
