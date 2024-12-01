import React, { useState, useEffect } from "react";
import Sidebar from "../scripts/Sidebar";
import "../styles/Sidebar.css";
import "../styles/Courses.css"; // Import the new CSS file
import meteorGif from "../img/meteor.gif";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDb } from "../scripts/services/db.mjs";
import jake from '../img/jake.jpg';

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

    setProgress({});

    const fetchProgress = async () => {
      try {
        const docRef = doc(db, "accountInfo", userId);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const currentProgress = userDoc.data().cppProgress || {};
          setProgress(currentProgress);
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [userId, db]);

  const handleCheckboxChange = async () => {
    if (!db || !userId) {
      console.error("Firestore DB or User ID is missing.");
      return;
    }

    try {
      const updatedProgress = {
        ...progress,
        [selectedTopic]: !progress[selectedTopic],
      };
      setProgress(updatedProgress);

      const docRef = doc(db, "accountInfo", userId);
      await updateDoc(docRef, { cppProgress: updatedProgress });

      console.log("Progress updated successfully:", updatedProgress);
    } catch (error) {
      console.error("Error updating progress in Firestore:", error);
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;

  const offset = 5;
  const scale = 90;
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
      <div className="course-banner">
        <img
          src={jake}
          alt="Decorative Icon"
          className="decorative-icon"
        />
        <img
          src={meteorGif}
          alt="Meteor Progress Indicator"
          className="meteor-progress"
          style={{ left: `${progressPercentage}%` }}
        />
      </div>

      {/* Sidebar and Course Content */}
      <Sidebar topics={cppTopics} onSelectTopic={setSelectedTopic} />
      <div className="course-page">
        <h1>C++ Course</h1>
        <p>{topicContent[selectedTopic]}</p>
      </div>

      {/* Footer with Checkboxes */}
      <div className="course-footer">
        <label>
          <input
            type="checkbox"
            checked={progress[selectedTopic] || false}
            onChange={handleCheckboxChange}
          />
          Mark "{selectedTopic}" as Completed
        </label>
        <p>
          <strong>Completed Lessons:</strong> {completedCount} / {cppTopics.length}
        </p>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

export default CppCourse;
