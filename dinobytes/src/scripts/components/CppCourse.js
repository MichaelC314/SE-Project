import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "../../styles/Sidebar.css";
import meteorGif from "../../img/meteor.gif";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDb } from "../services/db.mjs";
import jake from '../../img/jake.jpg';

const cppTopics = [
  "Introduction to C++",
  "Variables and Data Types",
  "Control Structures",
  "Functions and Scope",
  "Object-Oriented Programming",
];

function CppCourse({ userId }) {
  const [selectedTopic, setSelectedTopic] = useState("Introduction to C++");
  const [progress, setProgress] = useState({});
  const db = getDb();

  useEffect(() => {
    if (!db || !userId) {
      console.error("Firestore DB or User ID is missing.");
      return;
    }

    // Reset progress to avoid stale data
    setProgress({});

    // Load progress from Firestore
    const fetchProgress = async () => {
      try {
        const docRef = doc(db, "accountInfo", userId);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const currentProgress = userDoc.data().cppProgress || {}; // Default to empty object
          setProgress(currentProgress);
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [userId, db]); // Refetch progress when userId changes

  const handleCheckboxChange = async () => {
    if (!db || !userId) {
      console.error("Firestore DB or User ID is missing.");
      return;
    }

    try {
      const updatedProgress = {
        ...progress,
        [selectedTopic]: !progress[selectedTopic], // Toggle the current topic's status
      };
      setProgress(updatedProgress);

      // Update Firestore
      const docRef = doc(db, "accountInfo", userId);
      await updateDoc(docRef, { cppProgress: updatedProgress });

      console.log("Progress updated successfully:", updatedProgress);
    } catch (error) {
      console.error("Error updating progress in Firestore:", error);
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;

  // Adjust the meteor's horizontal position
  const offset = 5; // Starts padding 5% from the left
  const scale = 90; // Movement range is 60%
  const progressPercentage = offset + (completedCount / cppTopics.length) * scale;

  const topicContent = {
    "Introduction to C++":
      "Welcome to the C++ Course! Start learning advanced concepts and build amazing projects.",
    "Variables and Data Types":
      "In this lesson, you'll learn about variables and data types in C++. Variables are containers for storing data values, and data types specify the type of data a variable can hold.",
    "Control Structures":
      "Control structures in C++ allow you to control the flow of your program. This includes conditional statements like if-else and loops like for and while.",
    "Functions and Scope":
      "Functions in C++ are blocks of code that perform a specific task. Scope defines where variables can be accessed or modified.",
    "Object-Oriented Programming":
      "C++ supports object-oriented programming, which helps you create reusable code using classes and objects.",
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", flexDirection: "column" }}>
      {/* Sage Green Banner */}
<div
  style={{
    backgroundColor: "#98A886", // Sage green color
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px", // Adjust the height as needed
    zIndex: 1050,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  }}
>
  <img
    src={require("../../img/jake.jpg")} // Adjust the path based on the image location
    alt="Decorative Icon"
    style={{
      height: "50px", // Adjust height as needed
      position: "absolute",
      right: "20px", // Position it at the far-right
      top: "5px", // Adjust vertical positioning
    }}
  />
  <img
    src={meteorGif}
    alt="Meteor Progress Indicator"
    style={{
      position: "absolute",
      left: `${progressPercentage}%`, // Horizontal position with offset and scale
      transform: "translate(-50%, -50%) rotate(270deg)", // Rotate by 90 degrees
      top: "50%",
      width: "60px",
      height: "60px", // Fixed height for the meteor
      transition: "left 0.9s ease-in-out, transform 0.9s ease", // Smooth movement and rotation
    }}
  />
</div>


      {/* Sidebar and Course Content */}
      <Sidebar topics={cppTopics} onSelectTopic={setSelectedTopic} />
      <div className="course-page" style={{ marginLeft: "250px", padding: "20px", flex: 1, marginTop: "80px" }}>
        <h1>C++ Course</h1>
        <p>{topicContent[selectedTopic]}</p>
      </div>

      {/* Footer with Checkboxes */}
<div
  style={{
    position: "fixed",
    bottom: 0,
    width: "100%", // Ensure it spans the full screen width
    backgroundColor: "#f8f9fa",
    padding: "15px 20px", // Adjust padding for consistent spacing
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box", // Ensures padding is included in width
  }}
>
  <label
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      paddingLeft: "20px", // Add padding to move it away from the left edge
    }}
  >
    <input
      type="checkbox"
      checked={progress[selectedTopic] || false}
      onChange={handleCheckboxChange}
      style={{ marginLeft: "200px" }} // Reasonable spacing between checkbox and text
    />
    Mark "{selectedTopic}" as Completed
  </label>
  <p style={{ flex: 1, textAlign: "center", margin: 0 }}>
    <strong>Completed Lessons:</strong> {completedCount} / {cppTopics.length}
  </p>
  <div style={{ flex: 1, textAlign: "right" }}></div>
</div>

    </div>
  );
}

export default CppCourse;
