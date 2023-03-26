import React, { useState } from "react";
import Terms from "./components/Terms/Terms";
import TextInput from "./components/TextInput/TextInput";
import FullScroll from "./FullScroll";
import "./App.css";

function App() {
  const questions = [
    {
      id: 1,
      type: "text",
      text: "What's is your first name?",
      isRequired: true,
    },
    {
      id: 2,
      type: "text",
      text: "and what is your last name, {name}?",
      isRequired: true,
    },
  ];

  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleScroll = (dir) => {
    if (dir === "up") {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const getCurrentQuestion = (question) => {

    switch (question.type) {
      case "text":
        return (
          <TextInput
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
          />
        );
        default:
          return null;
    }
    
  };

  return (
    <FullScroll>
      <div>
        <Terms />
      </div>

      {questions.map((question) => {
        return (
          <div className="question-container" key={question.id}>
            {getCurrentQuestion(question)}
          </div>
        );
      })}
      <div>
        <h1>Page 2</h1>
        <p>This is the content for page 2</p>
      </div>
      <div>
        <h1>Page 3</h1>
        <p>This is the content for page 3</p>
      </div>
    </FullScroll>
  );
}

export default App;
