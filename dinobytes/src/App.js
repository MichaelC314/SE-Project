import React from 'react';
import { Button, Card, Navbar, Container, Nav } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand href="#home">Dinobytes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Lessons</Nav.Link>
            <Nav.Link href="#pricing">Account</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex">
        {/* Sidebar */}
        <Nav className="flex-column col-md-3 bg-light p-3 position-sticky" style={{ top: '0' }}>
          <Nav.Link href="#topic1">Topic 1</Nav.Link>
          <Nav.Link href="#topic2">Topic 2</Nav.Link>
          <Nav.Link href="#topic3">Topic 3</Nav.Link>
          <Nav.Link href="#topic4">Topic 4</Nav.Link>
        </Nav>

        {/* Main Content */}
        <div className="col-md-9 p-4">
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
