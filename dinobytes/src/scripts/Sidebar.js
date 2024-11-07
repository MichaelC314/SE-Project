// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/Sidebar.css';

const Sidebar = ({ topics, onSelectTopic }) => {
  return (
    <Nav className="flex-column col-md-3 bg-light p-3 position-fixed sidebar" style={{ height: 'calc(100vh - 56px)', top: '56px', overflowY: 'auto' }}>
      {topics.map((topic, index) => (
        <Nav.Link
          key={index}
          href={`#${topic.toLowerCase().replace(/\s+/g, '-')}`}
          className="sidebar-link"
          onClick={(e) => {
            e.preventDefault(); // Prevent page reload
            onSelectTopic(topic); // Update the selected topic in the parent component
          }}
        >
          {topic}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
