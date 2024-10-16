import React from 'react';
import { Button, Card, Navbar, Container, Nav } from 'react-bootstrap';
import logo from './logo.svg';
import './Main.css';

function App() {
  return (
    <div className="App">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container fluid>
          <Navbar.Brand href="#home">Dinobytes</Navbar.Brand>
          <Nav className="me-auto navbar-nav">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Lessons</Nav.Link>
            <Nav.Link href="#pricing">Account</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex">
        {/* Main Content */}
        <div className="main-content col-md-9 p-4" style={{ marginLeft: '250px', marginTop: '56px' }}>
          <header className="App-header">
            <Button variant="primary">Bootstrap Button</Button>
            <Card style={{ width: '18rem', marginTop: '20px' }}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  This is a simple card example using Bootstrap in a React app.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </header>
        </div>
      </div>
    </div>
  );
}

export default App;
