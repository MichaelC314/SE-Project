import React from 'react';
import { Button, Card, Navbar, Container, Nav } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">My React App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
