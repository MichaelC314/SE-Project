import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import "../styles/Main.css";
import Login from "./components/Login.js";
import AccountInfoList from "./components/accountInfo-list.js";
import LoginOverlay from "./components/LoginOverlay.js";
import SignUp from "./components/SignUp";

import CppCourse from "../CppCourse/CppCourse.js";//imported cpp course
import PythonCourse from "../PythonCourse/PythonCourse.js";//imported python course

import AboutUs from "../AboutUs/AboutUs"; // Import About Us component
import Account from "./components/Account";

import banner from "../img/banner.jpg"

import cplusplusLogo from "../img/cpp_logo.png";
import pythonLogo from "../img/python_logo.png";
import javaLogo from "../img/java_logo.png";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [userId, setUserId] = useState(null);

  const skipLoginForStyling = true; // Set to true for testing styling

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
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLoginSuccess = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
    closeAllModals();
  };

  return (
    <div className="Home">
      {/* Conditional rendering for the navbar or the sage green banner */}
      {(location.pathname === "/cpp-course" || location.pathname === "/python-course") ? (
        <div
          style={{
            backgroundColor: "#98A886", // Sage green color
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1050, // Same z-index as the navbar
          }}
        >
          
        </div>
      ) : (
        <Navbar bg="dark" className="fixed-top">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">Dinobytes</Navbar.Brand>
            <Nav className="navbar-nav">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {isLoggedIn ? (
                <Nav.Link as={Link} to="/account">Account</Nav.Link>
              ) : (
                <Nav.Link onClick={openLogin}>Login/Signup</Nav.Link>
              )}
              <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}

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
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Routes */}
      <div className="d-flex justify-content-center main-content">
  <Routes>
    <Route
      path="/"
      element={
        <Container>
          {/* Banner Section */}
          <Row className="justify-content-center">
            <Col md="auto" className="text-center">
              <img
                src={banner}
                alt="Banner"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  borderRadius: "15px",
                  marginTop: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for polish
                }}
              />
            </Col>
          </Row>
          {/* Cards Section */}
          <Row className="justify-content-center" style={{ marginTop: "40px" }}>
            <Col md="auto">
              <Card style={{ width: "18rem", marginTop: "20px" }}>
                <Card.Img variant="top" src={cplusplusLogo} className="card-img-top" />
                <Card.Body>
                  <Card.Title>C++ Course</Card.Title>
                  <Card.Text>
                    C++ is a powerful general-purpose programming language used in many domains.
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate("/cpp-course")}>
                    Go to Course
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md="auto">
              <Card style={{ width: "18rem", marginTop: "20px" }}>
                <Card.Img variant="top" src={pythonLogo} className="card-img-top" />
                <Card.Body>
                  <Card.Title>Python Course</Card.Title>
                  <Card.Text>Python is a versatile, high-level programming language.</Card.Text>
                  <Button variant="primary" onClick={() => navigate("/python-course")}>
                    Go to Course
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md="auto">
              <Card style={{ width: "18rem", marginTop: "20px" }}>
                <Card.Img variant="top" src={javaLogo} className="card-img-top" />
                <Card.Body>
                  <Card.Title>Java Course</Card.Title>
                  <Card.Text>Java is a robust, object-oriented programming language.</Card.Text>
                  <Button variant="primary">Go to Course</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      }
    />
    <Route path="/cpp-course" element={<CppCourse userId={userId} />} />
    <Route path="/python-course" element={<PythonCourse userId={userId} />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/account" element={<Account onLogout={handleLogout} userId={userId} />} />
    <Route path="/about-us" element={<AboutUs />} />
  </Routes>
</div>

      {/* Home Button on Bottom Left */}
      {(location.pathname === "/cpp-course" || location.pathname === "/python-course") && (
        <Button
          variant="success"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 1050,
          }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      )}
    </div>
  );
}

export default App;
