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
  "Syntax",
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
    "Syntax":
      `Let's take a look at some example code to better understand C++:
  
      #include <iostream>
      using namespace std;
  
      int main() {
        cout << "Hello World!" << endl;
        return 0;
      }
  
      This is an example of what C++ code looks like. Let's break it down line by line to see what is really happening.
  
      In line #1, we see '#include <iostream>'. This is a header file library and it lets us use functionality from another file, in this example, we use 'cout' and 'endl'. This is useful because it means we do not have to completely start from scratch each time we program.
  
      In line #2, we see 'using namespace std;'. This lets use use the names from the standard library for objects from it. Without this line of code, if we wanted to use 'cout', we would have to write 'std::cout'.
  
      Line #3 is blank. C++ ignores this white space, so we can utilize this to help make our code more readable.
  
      Line #4 has 'int main()'. This is known as a function. All of the code inside of the curly brackets will be executed. In C++, our primary function is known as the main function, hence the name.
  
      Line #5 has our cout statement, which is an object in C++ that can be utilized with the insertion operator (<<) to either print or output text. For the example above, it prints "Hello World!". The object after that bit of text is 'endl'. This will print out a new line. All of this is finished with a semicolon. A semicolon is used to mark the end of a statement. This must be done for every statement in C++.
  
      Line #6 has 'return 0;'. This ends the main function.
  
      Line #7 is our final line, and it closes the curly brackets for the main function.`
    ,
    "Control Structures":
      "Control structures in C++ allow you to control the flow of your program. This includes conditional statements like if-else and loops like for and while.",
    "Functions and Scope":
      "Functions in C++ are blocks of code that perform a specific task. Scope defines where variables can be accessed or modified.",
    "Object-Oriented Programming":
      "C++ supports object-oriented programming, which helps you create reusable code using classes and objects.",
  };

  // Split content into sentences and return as an array
  const contentSentences = topicContent[selectedTopic]
    .split(". ")
    .map((sentence, index) => <p key={index}>{sentence.trim()}.</p>);

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
        {/* Render content sentences */}
        {contentSentences}
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
