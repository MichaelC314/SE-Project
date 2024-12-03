import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../scripts/Sidebar";
import "../styles/Sidebar.css";
import "../styles/Courses.css";
import meteorGif from "../img/meteor.gif";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDb } from "../scripts/services/db.mjs";
import jake from "../img/jake.jpg";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";

const pythonTopics = [
  "Variables",
  "Control Structures",
];

const lessonContent = {
  "Variables": {
    text: `In Python, variables are used to store data values. Python has no command for declaring a variable; the assignment operator \`=\`, is used for creating variables. Python also has dynamic typing, meaning you do not need to specify the type of variable when you create it.\n\nSome basic types in Python are:\n- int: stores integers, like 100\n- float: stores decimal numbers, like 100.5\n- str: stores strings (text), like 'Hello'\n- bool: stores Boolean values, True or False`,
    code: `my_int = 5  # Integer\nmy_float = 7.2  # Floating point number\nmy_string = 'Hello'  # String\nmy_bool = True  # Boolean\n\nprint(my_int)\nprint(my_float)\nprint(my_string)\nprint(my_bool)`,
  },
  "Control Structures": {
    text: `In Python, control structures allow you to control the flow of your program. Some common control structures include:\n- if/else statements\n- loops (for, while)`,
    code: `x = 10\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is less than or equal to 5")`,
  }
};

function PythonCourse({ userId }) {
  const [selectedTopic, setSelectedTopic] = useState("Introduction to Python");
  const [progress, setProgress] = useState({});
  const db = getDb();
  const codeMirrorRef = useRef([]);
  const codeMirrorRefMultiple = useRef([]);

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
          const currentProgress = userDoc.data().pythonProgress || {};
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

  useEffect(() => {
    const topicContent = lessonContent[selectedTopic];
    if (topicContent) {
      if (codeMirrorRef.current) {
        const editor = new EditorView({
          state: EditorState.create({
            doc: topicContent.code,
            extensions: [basicSetup, python(), EditorView.editable.of(false)], // Disable editing
          }),
          parent: codeMirrorRef.current,
        });

        return () => {
          editor.destroy(); // Clean up editor instance when component unmounts
        };
      }
    } else {
      console.error(`No content found for the selected topic: ${selectedTopic}`);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (codeMirrorRefMultiple.current && lessonContent["Python Output"]?.additionalCode) {
      lessonContent["Python Output"].additionalCode.forEach((code, index) => {
        const editor = new EditorView({
          state: EditorState.create({
            doc: code,
            extensions: [basicSetup, python(), EditorView.editable.of(false)], // Disable editing
          }),
          parent: codeMirrorRefMultiple.current[index],
        });

        return () => {
          editor.destroy();
        };
      });
    }
  }, [selectedTopic]);

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
      await updateDoc(docRef, { pythonProgress: updatedProgress });

      console.log("Progress updated successfully:", updatedProgress);
    } catch (error) {
      console.error("Error updating progress in Firestore:", error);
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const offset = 5;
  const scale = 90;
  const progressPercentage = offset + (completedCount / pythonTopics.length) * scale;

  return (
    <div className="d-flex" style={{ minHeight: "100vh", flexDirection: "column" }}>
      {/* Sage Green Banner */}
      <div className="course-banner">
        <img src={jake} alt="Decorative Icon" className="decorative-icon" />
        <img
          src={meteorGif}
          alt="Meteor Progress Indicator"
          className="meteor-progress"
          style={{ left: `${progressPercentage}%` }}
        />
      </div>

      {/* Sidebar and Course Content */}
      <Sidebar topics={pythonTopics} onSelectTopic={setSelectedTopic} />
      <div className="course-page">
        <h1>Python Course</h1>
        {/* Check if the topic content exists before rendering */}
        {lessonContent[selectedTopic] ? (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: lessonContent[selectedTopic].text,
              }}
            />
            <div ref={codeMirrorRef} style={{ height: "300px", marginTop: "20px" }} />
            {selectedTopic === "Python Output" && lessonContent["Python Output"]?.additionalCode && (
              <>
                {lessonContent["Python Output"].additionalCode.map((code, index) => (
                  <div
                    key={index}
                    ref={(el) => (codeMirrorRefMultiple.current[index] = el)}
                    style={{ height: "200px", marginTop: "20px" }}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <p>No content available for this topic.</p>
        )}
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
          <strong>Completed Lessons:</strong> {completedCount} / {pythonTopics.length}
        </p>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

export default PythonCourse;
