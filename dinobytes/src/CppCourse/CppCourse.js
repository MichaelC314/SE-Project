
import React, { useState, useEffect } from 'react';
import Sidebar from '../scripts/Sidebar';
import '../styles/Sidebar.css';

const cppTopics = [
  "Introduction to C++",
  "Variables and Data Types",
  "Control Structures",
  "Functions and Scope",
  "Object-Oriented Programming"
];

function CppCourse() {
  const [selectedTopic, setSelectedTopic] = useState("Introduction to C++");
  const [progress, setProgress] = useState(() => {
    // Load progress from local storage or initialize empty
    return JSON.parse(localStorage.getItem('cppCourseProgress')) || {};
  });

  // Content for each topic
  const topicContent = {
    "Introduction to C++": "Welcome to the C++ Course! Start learning advanced concepts and build amazing projects.",
    "Variables and Data Types": "In this lesson, you'll learn about variables and data types in C++. Variables are containers for storing data values, and data types specify the type of data a variable can hold.",
    "Control Structures": "Control structures in C++ allow you to control the flow of your program. This includes conditional statements like if-else and loops like for and while.",
    "Functions and Scope": "Functions in C++ are blocks of code that perform a specific task. Scope defines where variables can be accessed or modified.",
    "Object-Oriented Programming": "C++ supports object-oriented programming, which helps you create reusable code using classes and objects."
  };

  const handleCheckboxChange = () => {
    const updatedProgress = { ...progress, [selectedTopic]: !progress[selectedTopic] };
    setProgress(updatedProgress);
    localStorage.setItem('cppCourseProgress', JSON.stringify(updatedProgress));
  };

  return (
    <div className="d-flex">
      <Sidebar topics={cppTopics} onSelectTopic={setSelectedTopic} />
      <div className="course-page" style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>C++ Course</h1>
        <p>{topicContent[selectedTopic]}</p>
        <div style={{ marginTop: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={progress[selectedTopic] || false}
              onChange={handleCheckboxChange}
            />
            Mark as Completed
          </label>
        </div>
      </div>
    </div>
  );
}

export default CppCourse;
