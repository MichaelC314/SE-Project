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
import { cpp } from "@codemirror/lang-cpp";

const cppTopics = [
  "Introduction to C++",
  "C++ Output",
  "Variables",
  "Control Structures",
];

const lessonContent = {
  "Introduction to C++": {
    sections: [
      {
        type: "text",
        content: `To get started with C++ you will need:\n- A text editor\n- A compiler\n\nThis can be accomplished with an Integrated Development Environment (IDE). For example, a good IDE to get started with is Visual Studio.`,
      },
      {
        type: "text",
        content: `C++ Syntax\nLet's take a look at some example code to better understand C++:`,
      },
      {
        type: "code",
        content: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!" << endl;\n  return 0;\n}`,
      },
      {
        type: "text",
        content: `This is an example of what C++ code looks like. Let's break it down line by line to see what is really happening.`,
      },
      {
        type: "text",
        content: `In line #1, we see '#include <iostream>'. This is a header file library and it lets us use functionality from another file, in this example, we use 'cout' and 'endl'. This is useful because it means we do not have to completely start from scratch each time we program.`,
      },
      {
        type: "text",
        content: `In line #2, we see 'using namespace std;'. This lets us use the names from the standard library for objects from it. Without this line of code, if we wanted to use 'cout', we would have to write 'std::cout'.`,
      },
      {
        type: "text",
        content: `Line #3 is blank. C++ ignores this white space, so we can utilize this to help make our code more readable.`,
      },
      {
        type: "text",
        content: `Line #4 has 'int main()'. This is known as a function. All of the code inside of the curly brackets will be executed. In C++, our primary function is known as the main function, hence the name.`,
      },
      {
        type: "text",
        content: `Line #5 has our cout statement, which is an object in C++ that can be utilized with the insertion operator (<<) to either print or output text. For the example above, it prints "Hello World!". The object after that bit of text is 'endl'. This will print out a new line. All of this is finished with a semicolon. A semicolon is used to mark the end of a statement. This must be done for every statement in C++.`,
      },
      {
        type: "text",
        content: `Line #6 has 'return 0;'. This ends the main function.`,
      },
      {
        type: "text",
        content: `Line #7 is our final line, and it closes the curly brackets for the main function.`,
      },
    ],
  },
  "C++ Output": {
    sections: [
      {
        type: "text",
        content: `You can output text to the terminal via the cout object. The cout object works with the << operator, known as the stream insertion operator.`,
      },
      {
        type: "code",
        content: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!" << endl;\n  return 0;\n}`,
      },
      {
        type: "text",
        content: `In the example above, the endl manipulator is what creates a new line of text for us to use. However, you can also use "\\n" to create a new line as well:`,
      },
      {
        type: "code",
        content: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!\\n";\n  return 0;\n}`,
      },
      {
        type: "text",
        content: `You can also use cout to output numbers as well. Here are some examples:`,
      },
      {
        type: "code",
        content: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << 5 << endl; // Outputs 5\n  cout << 5 + 5 << endl; // Outputs 10\n  cout << 5 - 5 << endl; // Outputs 0\n  cout << 5 * 5 << endl; // Outputs 25\n  cout << 5 / 5 << endl; // Outputs 1\n  return 0;\n}`,
      },
    ],
  },

  "Variables": {
  sections: [
    {
      type: "text",
      content: `In C++, there are several different data types that are used to specify what type of data a variable can store. C++ supports many built-in data types, but some of the basic data types are:`,
    },
    {
      type: "text",
      content: `- **int**: stores integers, an example being 100.\n- **float**: stores floating point numbers with decimals, an example being 100.5.\n- **double**: also stores floating point numbers, but has double the space that float has.\n- **char**: stores a single character, an example being 'A'. Char values use single quotes.\n- **bool**: stores either true or false.`,
    },
    {
      type: "text",
      content: `The following is an example of how to declare each variable:`,
    },
    {
      type: "code",
      content: `#include <iostream>\nusing namespace std;\n\nint main() {\n  int myInt = 5;               // Integer\n  float myFloat = 7.2;          // Floating point number (4 bytes)\n  double myDouble = 5.99;       // Floating point number (8 bytes)\n  char myLetter = 'A';         // Character\n  bool myBoolean = true;       // Boolean (true or false)\n\n  cout << myInt << endl;\n  cout << myFloat << endl;\n  cout << myDouble << endl;\n  cout << myLetter << endl;\n  cout << myBoolean << endl;\n  return 0;\n}`,
    },
  ],
},

"Control Structures": {
  sections: [
    {
      type: "text",
      content: `In C++, there are many ways to control the flow of the execution for the program. The main types of control structures in C++ are:\n- **Conditional Statements**: if, else, else if, and switch\n- **Loops**: for, while, and do-while\n- **Jump Statements**: break, continue, and return`,
    },
    {
      type: "text",
      content: `**Conditional Statements**\nConditional statements allow us to execute certain blocks of code, depending on whether a condition is true or false.`,
    },
    {
      type: "text",
      content: `**If Statement**\nThe if statement checks a condition. If it evaluates the condition as true, then the block of code inside the if statement will execute.\n\nHere is an example:`,
    },
    {
      type: "code",
      content: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int number = 16;\n    if (number > 10) {\n        cout << "The number is greater than 10!" << endl;\n    }\n    return 0;\n}`,
    },
    {
      type: "text",
      content: `In this program, since the variable \`number\` (which holds the value of 16) is greater than 10, the output will be: "The number is greater than 10!"`,
    },
    {
      type: "text",
      content: `**Else Statement**\nYou are also able to add an else block to the end of an if statement in C++. This else block will only be executed if the condition in the if statement is evaluated as false.\n\nHere is an example:`,
    },
    {
      type: "code",
      content: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int number = 5;\n    if (number > 10) {\n        cout << "The number is greater than 10!" << endl;\n    } else {\n        cout << "The number is less than or equal to 10." << endl;\n    }\n    return 0;\n}`,
    },
    {
      type: "text",
      content: `In this program, since \`number\` (which holds the value of 5) is not greater than 10, the code in the else block will execute, meaning that the output will be: "The number is less than or equal to 10."`,
    },
  ],
},

  // Other lessons can be added similarly
};


function CppCourse({ userId }) {
  const [selectedTopic, setSelectedTopic] = useState("C++ Output");
  const [progress, setProgress] = useState({});
  const db = getDb();

  useEffect(() => {
    if (!db || !userId) {
      console.error("Firestore DB or User ID is missing.");
      return;
    }

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

  const completedCount = Object.values(progress || {}).filter(Boolean).length;

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
      <Sidebar topics={cppTopics || []} onSelectTopic={setSelectedTopic} />

      {/* Course Content */}
      <div className="course-page">
        <h1>{selectedTopic}</h1>
        {lessonContent[selectedTopic]?.sections?.map((section, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {/* Render text */}
            {section.type === "text" && <p>{section.content}</p>}

            {/* Render code */}
            {section.type === "code" && (
              <div
                ref={(el) => {
                  if (el) {
                    // Ensure CodeMirror is attached only once
                    if (!el.dataset.initialized) {
                      const editor = new EditorView({
                        state: EditorState.create({
                          doc: section.content,
                          extensions: [
                            basicSetup,
                            cpp(),
                            EditorView.updateListener.of((update) => {
                              if (update.docChanged) {
                                const lines = update.state.doc.toString().split("\n").length;
                                el.style.height = `${Math.max(200, lines * 20)}px`;
                              }
                            }),
                          ],
                        }),
                        parent: el,
                      });
                      el.dataset.initialized = true; // Mark as initialized
                    }
                  }
                }}
                style={{
                  minHeight: "200px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                  overflow: "hidden",
                  transition: "height 0.2s ease",
                }}
              />
            )}
          </div>
        ))}
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
