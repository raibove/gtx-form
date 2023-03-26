import React, { useState } from "react";
import Terms from "./components/Terms/Terms";
import TextInput from "./components/TextInput/TextInput";
import FullScroll from "./FullScroll";
import "./App.css";

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

const initialAnswersState = questions.map((question) => ({ id:question.id, type: question.type, value: null }));

function App() {

  const [answers, setAnswers] = useState(initialAnswersState);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (answer) => {
    console.log(answers)
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex].value = answer;
      return newAnswers;
    });
    // setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  

  const handleScroll = (dir) => {
    if (dir === "up") {
      setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1,0));
    } else if(dir==="down"){
      setCurrentQuestionIndex((prevIndex) => Math.min( prevIndex + 1, questions.length-1));
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
    <FullScroll currentQuestionIndex={currentQuestionIndex} answers={answers} questions={questions} handleUpdateQuestionIndex={handleScroll}>
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
