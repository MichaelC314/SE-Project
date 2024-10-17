import React from 'react';
import { Button, Card, Navbar, Container, Row, Col, Nav } from 'react-bootstrap';
import cplusplusLogo from './cpp_logo.png'; // Import your C++ logo
import pythonLogo from './python_logo.png'; // Import your Python logo
import javaLogo from './java_logo.png'; // Import your Java logo
import './Main.css';

function App() {
  return (
<div className="App">
      {/* Top Navbar */}
      <Navbar bg="dark" className="fixed-top">
        <Container fluid>
          <Navbar.Brand href="#home">Dinobytes</Navbar.Brand>
          <Nav className="me-auto navbar-nav">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#lessons">Lessons</Nav.Link>
            <Nav.Link href="#account">Account</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="d-flex justify-content-center" style={{ marginTop: '70px' }}>
        {/* Main Content */}
        <div className="main-content">
          <header className="App-header">
            <Container>
              <Row className="justify-content-center">
                <Col md="auto">
                  <Card style={{ width: '18rem', marginTop: '20px' }}>
                    <Card.Img variant="top" src={cplusplusLogo} className="card-img-top" /> {/* Use the C++ logo */}
                    <Card.Body>
                      <Card.Title>C++ Course</Card.Title>
                      <Card.Text>
                        C++ is a powerful general-purpose programming language. It is widely used in software development, game development, and real-time simulations. Learn the fundamentals and advanced concepts of C++ with this course.
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
                        Python is a versatile, high-level programming language known for its ease of use and readability. It's widely used in web development, data science, artificial intelligence, and more. Explore the basics and advanced topics of Python in this course.
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
