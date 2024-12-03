import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../scripts/Sidebar";
import "../styles/Sidebar.css";
import "../styles/Courses.css"; // Import the new CSS file
import meteorGif from "../img/meteor.gif";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDb } from "../scripts/services/db.mjs";
import jake from "../img/jake.jpg";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { cpp } from "@codemirror/lang-cpp";

const cppTopics = [
  "Introduction to C++",
  "C++ Output",
  "Variables",
  "Control Structures",
];

const lessonContent = {
  "Introduction to C++": {
    text: `To get started with C++ you will need:\nA text editor\nA compiler\n\nThis can be accomplished with an Integrated Development Environment (IDE). For example, a good IDE to get started with is Visual Studio\n\nC++ Syntax\nLet's take a look at some example code to better understand C++`,
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!" << endl;\n  return 0;\n}`,
  },
  "C++ Output": {
    text: `You can output text to the terminal via the cout object. The cout object works with the << operator, known as the stream insertion operator. Reminder: When using text in C++, make sure that it is surrounded by double quotes "".\n\nIn the example above, the endl manipulator is what creates a new line of text for us to use, however, you can also use "\\n" to create a new line as well. Example:`,
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!" << endl;\n  return 0;\n}`,
    additionalCode: [
      `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!\\n";\n  return 0;\n}`,
      `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << 5 << endl; // Outputs 5\n  cout << 5 + 5 << endl; // Outputs 10\n  cout << 5 - 5 << endl; // Outputs 0\n  cout << 5 * 5 << endl; // Outputs 25\n  cout << 5 / 5 << endl; // Outputs 1\n  return 0;\n}`,
    ],
  },
  "Variables": {
    text: `In C++, there are several different data types that are used to specify what type of data a variable can store. C++ supports many built-in data types, but some of the basic data types are:\n\n- int: stores integers, an example being 100.\n- float: stores floating point numbers with decimals, an example being 100.5.\n- double: also stores floating point numbers, but has double the space that float has.\n- char: stores a single character, an example being 'A'. Char values use single quotes.\n- bool: stores either true or false.\n\nThe following is an example on how to declare each variable:\n\n- int myInt = 5;               // Integer\n- float myFloat = 7.2          // Floating point number (4 bytes)\n- double myDouble= 5.99;       // Floating point number (8 bytes)\n- char myLetter = 'A';         // Character\n- bool myBoolean = true;       // Boolean (true or false)`,
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n  int myInt = 5;  // Integer\n  float myFloat = 7.2;  // Floating point number\n  double myDouble = 5.99;  // Floating point number\n  char myLetter = 'A';  // Character\n  bool myBoolean = true;  // Boolean\n\n  cout << myInt << endl;\n  cout << myFloat << endl;\n  cout << myDouble << endl;\n  cout << myLetter << endl;\n  cout << myBoolean << endl;\n  return 0;\n}`,
  },
  "Control Structures": {
    text: `Control structures allow us to control the flow of execution in our program. In C++, we primarily use the following control structures:\n\n1. **Conditional Statements**: if, else, else if, and switch\n2. **Loops**: for, while, and do-while\n3. **Jump Statements**: break, continue, and return\n\nLet's take a closer look at how each one works.`,
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int number = 16;\n    if (number > 10) {\n        cout << "The number is greater than 10!" << endl;\n    }\n    return 0;\n}`,
    additionalCode: [
      `#include <iostream>\nusing namespace std;\n\nint main() {\n    int number = 5;\n    if (number > 10) {\n        cout << "The number is greater than 10!" << endl;\n    } else {\n        cout << "The number is less than or equal to 10." << endl;\n    }\n    return 0;\n}`,
      `#include <iostream>\nusing namespace std;\n\nint main() {\n    int number = 8;\n    if (number > 10) {\n        cout << "The number is greater than 10!" << endl;\n    } else if (number == 8) {\n        cout << "The number is 8." << endl;\n    } else {\n        cout << "The number is less than 8." << endl;\n    }\n    return 0;\n}`,
    ],
  },
};

function CppCourse({ userId }) {
  const [selectedTopic, setSelectedTopic] = useState("Introduction to C++");
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

  useEffect(() => {
    if (codeMirrorRef.current) {
      const editor = new EditorView({
        state: EditorState.create({
          doc: lessonContent[selectedTopic].code,
          extensions: [basicSetup, cpp(), EditorView.editable.of(false)], // Disable editing
        }),
        parent: codeMirrorRef.current,
      });

      return () => {
        editor.destroy(); // Clean up editor instance when component unmounts
      };
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (codeMirrorRefMultiple.current) {
      lessonContent["C++ Output"].additionalCode.forEach((code, index) => {
        const editor = new EditorView({
          state: EditorState.create({
            doc: code,
            extensions: [basicSetup, cpp(), EditorView.editable.of(false)], // Disable editing
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
      <Sidebar topics={cppTopics} onSelectTopic={setSelectedTopic} />
      <div className="course-page">
        <h1>C++ Course</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: lessonContent[selectedTopic].text,
          }}
        />
        <div ref={codeMirrorRef} style={{ height: "300px", marginTop: "20px" }} />
        {selectedTopic === "C++ Output" && (
          <>
            {lessonContent["C++ Output"].additionalCode.map((code, index) => (
              <div
                key={index}
                ref={(el) => (codeMirrorRefMultiple.current[index] = el)}
                style={{ height: "200px", marginTop: "20px" }}
              />
            ))}
          </>
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
          <strong>Completed Lessons:</strong> {completedCount} / {cppTopics.length}
        </p>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

export default CppCourse;
