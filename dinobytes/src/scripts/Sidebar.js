// Sidebar.js
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/Sidebar.css';

const Sidebar = ({ topics }) => {
  const [activeTopic, setActiveTopic] = useState(null);

  return (
    <Nav className="flex-column col-md-3 bg-light p-3 position-fixed sidebar" style={{ height: 'calc(100vh - 56px)', top: '56px', overflowY: 'auto' }}>
      {topics.map((topic, index) => (
        <Nav.Link
          key={index}
          href={`#${topic.toLowerCase().replace(/\s+/g, '-')}`}
          className={`sidebar-link ${activeTopic === topic ? 'active' : ''}`} // Conditionally add 'active' class
          onClick={() => setActiveTopic(topic)} // Set the active topic on click
        >
          {topic}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
