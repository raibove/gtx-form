import React, { useState } from "react";
import Terms from "./components/Terms/Terms";
import TextInput from "./components/TextInput/TextInput";
import FullScroll from "./FullScroll";
import "./App.css";
import SelectInput from "./components/SelectInput/SelectInput";

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
  {
    id:3,
    type: "select",
    text: "What industry is your company in?",
    isRequired: true,
    subTitle: "We will personalize your learning experience accordingly",
  }
];

const initialAnswersState = questions.map((question) => ({
  id: question.id,
  type: question.type,
  value: null,
}));

function App() {
  const [answers, setAnswers] = useState(initialAnswersState);
  const [showError, setShowError] = useState(false);

  const handleAnswer = (answer, questionId) => {
    if(answer===" ")
      return;

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionId - 1].value = answer;
      return newAnswers;
    });

    if(showError===true){
      setShowError(false)
    }
  };

  const getCurrentQuestion = (question) => {
    const questionText = question.text.replace(
      "{name}",
      answers[0].value
    );
    switch (question.type) {
      case "text":
        return (
          <TextInput
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
          />
        );
      case "select":
          return(
            <SelectInput 
              key={question.id}
              question={question}
              onAnswer={handleAnswer}
              showError={showError}
              questionText={questionText}
            />
          )
      default:
        return null;
    }
  };

  const handleShowError = (newError)=>{
    setShowError(newError)
  }

  return (
    <FullScroll answers={answers} questions={questions} handleShowError={handleShowError}>
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
