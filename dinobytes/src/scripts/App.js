import {BrowserRouter as Router, Route, Link, Routes, Outlet} from "react-router-dom";
import '../styles/Main.css';
import React, { useState } from 'react';
import { Button, Card, Navbar, Container, Row, Col, Nav } from 'react-bootstrap';
import Login from './components/Login.js'
import cplusplusLogo from '../img/cpp_logo.png'; // Import your C++ logo
import pythonLogo from '../img/python_logo.png'; // Import your Python logo
import javaLogo from '../img/java_logo.png'; // Import your Java logo
import '../styles/Main.css';
import AccountInfoList from './components/accountInfo-list.js'
import LoginOverlay from './components/LoginOverlay.js';
import SignUp from './components/SignUp';

function App() {        

  const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    // Close both modals when switching between login and signup
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

    return(
      <div className="Home">
      {/* Top Navbar */}
      <Router>
      <Navbar bg="dark" className="fixed-top">
        <Container fluid>
          <Navbar.Brand href="#home">Dinobytes</Navbar.Brand>
          <Nav className="navbar-nav">
            <Nav.Link as={Link} to="../components/Home">Home</Nav.Link>
            <Nav.Link href="#lessons">Lessons</Nav.Link>
            <Nav.Link href="#account">Account</Nav.Link>
            <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
      {/* {showLogin && <LoginOverlay onClose={() => setShowLogin(false)} />} */}
      {showLogin && <Login onClose={closeAllModals} onSwitchToSignUp={openSignUp} />}
      {showSignUp && <SignUp onClose={closeAllModals} />}
        <Routes>
        <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router> 
      

      <div className="d-flex justify-content-center main-content">
        {/* Main Content */}
        <div className="main-content">
          <header className="App-header">
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
                    <Card.Img variant="top" src={cplusplusLogo} className="card-img-top" /> {/* Use the C++ logo */}
                    <Card.Body>
                      <Card.Title>C++ Course</Card.Title>
                      <Card.Text>
                        C++ is a powerful general-purpose programming language. It is widely used in software development, game development, and real-time simulations.
                      </Card.Text>
                      <Button variant="primary">Go to Course</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card style={{ width: '18rem', marginTop: '20px' }}>
                    <Card.Img variant="top" src={pythonLogo} className="card-img-top" /> {/* Use the Python logo */}
                    <Card.Body>
                      <Card.Title>Python Course</Card.Title>
                      <Card.Text>
                        Python is a versatile, high-level programming language known for its ease of use and readability. It's widely used in web development, data science, artificial intelligence, and more.
                      </Card.Text>
                      <Button variant="primary">Go to Course</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="auto">
                  <Card style={{ width: '18rem', marginTop: '20px' }}>
                    <Card.Img variant="top" src={javaLogo} className="card-img-top" /> {/* Use the Java logo */}
                    <Card.Body>
                      <Card.Title>Java Course</Card.Title>
                      <Card.Text>
                        Java is a robust, object-oriented programming language used in many enterprise-level applications. Dive into Java and learn how to build reliable and scalable software solutions.
                      </Card.Text>
                      <Button variant="primary">Go to Course</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </header>
        </div>
      </div>
    </div>
  );
}

export default App;

