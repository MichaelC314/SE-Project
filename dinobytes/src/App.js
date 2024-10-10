import React from 'react';
import { Button, Card, Navbar, Container, Nav } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Top Navbar */}
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

      <div className="d-flex">
        {/* Sidebar */}
        <Nav className="flex-column col-md-3 bg-light p-3">
          <Nav.Link href="#topic1">Topic 1</Nav.Link>
          <Nav.Link href="#topic2">Topic 2</Nav.Link>
          <Nav.Link href="#topic3">Topic 3</Nav.Link>
          <Nav.Link href="#topic4">Topic 4</Nav.Link>
        </Nav>

        {/* Main Content */}
        <div className="col-md-9 p-4">
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

          {/* Sections corresponding to sidebar links */}
          <section id="topic1" style={{ marginTop: '50px' }}>
            <h2>Topic 1</h2>
            <p>Content for Topic 1...</p>
          </section>

          <section id="topic2" style={{ marginTop: '50px' }}>
            <h2>Topic 2</h2>
            <p>Content for Topic 2...</p>
          </section>

          <section id="topic3" style={{ marginTop: '50px' }}>
            <h2>Topic 3</h2>
            <p>Content for Topic 3...</p>
          </section>

          <section id="topic4" style={{ marginTop: '50px' }}>
            <h2>Topic 4</h2>
            <p>Content for Topic 4...</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
