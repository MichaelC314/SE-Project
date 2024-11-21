import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "../../styles/Sidebar.css";
import meteorGif from "../../img/meteor.gif";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDb } from "../services/db.mjs";

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

    // Load progress from Firestore
    const fetchProgress = async () => {
      try {
        const docRef = doc(db, "accountInfo", userId);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const currentProgress = userDoc.data().cppProgress || 0; // Default to 0 if not set
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
      // Fetch the current cppProgress from Firestore
      const docRef = doc(db, "accountInfo", userId);
      const userDoc = await getDoc(docRef);
      const currentProgress = userDoc.exists() ? userDoc.data().cppProgress || 0 : 0;

      // Calculate the new progress sum
      const isTopicCompleted = progress[selectedTopic] || false;
      const progressIncrement = isTopicCompleted ? -1 : 1; // Subtract 1 if unchecking, add 1 if checking
      const updatedProgressSum = currentProgress + progressIncrement;

      // Update the progress in local state and Firestore
      setProgress((prev) => ({
        ...prev,
        [selectedTopic]: !isTopicCompleted,
      }));
      await updateDoc(docRef, { cppProgress: updatedProgressSum });

      console.log("Progress updated successfully:", updatedProgressSum);
    } catch (error) {
      console.error("Error updating progress in Firestore:", error);
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const meteorSize = 100 + completedCount * 20;

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
      <Sidebar topics={cppTopics} onSelectTopic={setSelectedTopic} />
      <div className="course-page" style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
        <h1>C++ Course</h1>
        <p>{topicContent[selectedTopic]}</p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={meteorGif}
          alt="Meteor Progress Indicator"
          style={{
            width: `${meteorSize}px`,
            height: `${meteorSize}px`,
            transition: "width 0.3s ease, height 0.3s ease",
          }}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "80%",
          backgroundColor: "#f8f9fa",
          padding: "10px 20px",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
      </div>
    </div>
  );
}

export default CppCourse;
