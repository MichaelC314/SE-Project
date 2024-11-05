// CppCourse.js
import React from 'react';
import Sidebar from '../scripts/Sidebar';  // Import the Sidebar component
import '../styles/Sidebar.css';   // Import the CSS for styling


const cppTopics = [
  "Introduction to C++",
  "Variables and Data Types",
  "Control Structures",
  "Functions and Scope",
  "Object-Oriented Programming",
  // Add more topics as needed
];

function CppCourse() {
  return (
    <div className="d-flex">
      <Sidebar topics={cppTopics} />
      <div className="course-page" style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>C++ Course</h1>
        <p>Welcome to the C++ Course! Start learning advanced concepts and build amazing projects.</p>
      </div>
    </div>
  );
}

export default CppCourse;
