import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button, Card, Navbar, Container, Row, Col, Nav } from 'react-bootstrap';
import '../styles/Main.css';
import Login from './components/Login.js';
import AccountInfoList from './components/accountInfo-list.js';
import LoginOverlay from './components/LoginOverlay.js';
import SignUp from './components/SignUp';
import CppCourse from '../CppCourse/CppCourse';
import AboutUs from '../AboutUs/AboutUs'; // Import About Us component
import Account from './components/Account';

import { getDb } from './services/db.mjs'; 
import { doc, deleteDoc } from "firebase/firestore";

import cplusplusLogo from '../img/cpp_logo.png';
import pythonLogo from '../img/python_logo.png';
import javaLogo from '../img/java_logo.png';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //trakcs user's login status
  const navigate = useNavigate();
  const db = getDb();
  const [userId, setUserId] = useState(null);

  const openSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const openLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const closeAllModals = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login status
    navigate('/'); // Redirect to the homepage
    setTimeout(() => navigate('/'), 0);
  };

  const deleteAccount = async () => {
    if (userId) {
      try {
        console.log("Attempting to delete user with userId:", userId);
        await deleteDoc(doc(db, "accountInfo", userId)); // Delete user document
        handleLogout(); // Log out after deletion
      } catch (error) {
        console.error("Error deleting account: ", error);
        alert("Failed to delete account. Please try again.");
      }
    } else {
      alert("No user ID found.");
    }
  };

  const handleLoginSuccess = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
    closeAllModals();
};

  return (
    <div className="Home">
      {/* Navbar */}
      <Navbar bg="dark" className="fixed-top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Dinobytes</Navbar.Brand>
          <Nav className="navbar-nav">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/lessons">Lessons</Nav.Link>
            {isLoggedIn ? (
              <Nav.Link as={Link} to="/account">Account</Nav.Link> 
            ) : (
              <Nav.Link onClick={openLogin}>Login/Signup</Nav.Link>
            )}
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link> {/* Added About Us link */}
          </Nav>
        </Container>
      </Navbar>

      {/* Modals */}
      {showLogin && (
        <Login
        onClose={closeAllModals}
        onSwitchToSignUp={openSignUp}
        onLoginSuccess={(userId) => {
          setIsLoggedIn(true);
          setUserId(userId);
          closeAllModals();
        }}
        />
      )}
      {showSignUp && (
                <SignUp
                    onClose={closeAllModals}
                    onLoginSuccess={handleLoginSuccess} // Pass login success handler to SignUp
                />
       )}

      {/* Routes */}
      <div className="d-flex justify-content-center main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <Row className="justify-content-center">
                  <Col md="auto" className="text-center">
                    <h1>Welcome to Dinobytes</h1>
                    <p>A site to learn programming and improve your skills.</p>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="auto">
                    <Card style={{ width: '18rem', marginTop: '20px' }}>
                      <Card.Img variant="top" src={cplusplusLogo} className="card-img-top" />
                      <Card.Body>
                        <Card.Title>C++ Course</Card.Title>
                        <Card.Text>
                          C++ is a powerful general-purpose programming language used in many domains.
                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate('/cpp-course')}>
                          Go to Course
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="auto">
                    <Card style={{ width: '18rem', marginTop: '20px' }}>
                      <Card.Img variant="top" src={pythonLogo} className="card-img-top" />
                      <Card.Body>
                        <Card.Title>Python Course</Card.Title>
                        <Card.Text>
                          Python is a versatile, high-level programming language.
                        </Card.Text>
                        <Button variant="primary">Go to Course</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="auto">
                    <Card style={{ width: '18rem', marginTop: '20px' }}>
                      <Card.Img variant="top" src={javaLogo} className="card-img-top" />
                      <Card.Body>
                        <Card.Title>Java Course</Card.Title>
                        <Card.Text>
                          Java is a robust, object-oriented programming language.
                        </Card.Text>
                        <Button variant="primary">Go to Course</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            }
          />
          <Route path="/cpp-course" element={<CppCourse />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account onLogout={handleLogout} onDeleteAccount={deleteAccount} userId={userId} />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Added About Us route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

