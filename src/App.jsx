import React, { useEffect, useState } from "react";
import Terms from "./components/Terms/Terms";
import TextInput from "./components/TextInput/TextInput";
import FullScroll from "./FullScroll";
import "./App.css";
import SelectInput from "./components/SelectInput/SelectInput";
import CheckboxInput from "./components/CheckboxInput/CheckboxInput";

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
    id: 3,
    type: "select",
    text: "What industry is your company in?",
    isRequired: true,
    subTitle: "We will personalize your learning experience accordingly",
  },
  {
    id: 4,
    type: "checkbox",
    text: "Your role in your company?",
    isRequired: true,
    subTitle:
      "We want to understand how you spend your time right now. {\n} [ 🔴DEVELOPER NOTICE: Options in the questions ahead depend on this question's response/s. ]",
    options: [
      "Founder or CXO",
      "Product Team",
      "Marketing Team",
      "VC",
      "Other",
    ],
  },
  {
    id: 5,
    type: "checkbox",
    text: "{name}, what's your professional goal for the next 12 months?",
    isRequired: true,
    options: [
      "Get hired",
      "Get promoted",
      "Connect with like minded people",
      "Structured approach to growth",
      "Build a growth team",
    ],
    condition: (answers) =>
      answers.find((a) => a.id === 4) &&
      answers.find((a) => a.id === 4).value !== "Founder or CXO",
  },
  {
    id: 6,
    type: "checkbox",
    text: "{name}, what's your professional goal for the next 12 months?",
    isRequired: true,
    options: [
      "Structured approach to growth",
      "Build a growth team",
      "Connect with like minded people",
    ],
    condition: (answers) =>
      answers.find((a) => a.id === 4) &&
      answers.find((a) => a.id === 4).value === "Founder or CXO",
  },
];

function App() {
  const [answers, setAnswers] = useState([]);
  const [showError, setShowError] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);

  const updateCurrentQustionId = (questionId) => {
    setCurrentQuestionId(questionId);
  };

  const handleAnswer = (answer, questionId) => {
    if (answer === " ") return;

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const existingAnswer = newAnswers.find((a) => a.id === questionId);
      if (existingAnswer) {
        existingAnswer.value = answer;
      } else {
        newAnswers.push({
          id: questionId,
          type: questions.find((q) => q.id === questionId).type,
          value: answer,
        });
      }
      return newAnswers;
    });

    if (showError === true) {
      setShowError(false);
    }
  };

  const getCurrentQuestion = (question) => {
    let name = "";
    if (answers.find((a) => a.id === 1) !== undefined) {
      name = answers.find((a) => a.id === 1).value;
    }

    const questionText = question.text.replace("{name}", name);

    if (question.condition && !question.condition(answers)) {
      return null;
    }

    switch (question.type) {
      case "text":
        return (
          <TextInput
            answers={answers}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQustionId={updateCurrentQustionId}
          />
        );
      case "select":
        return (
          <SelectInput
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQustionId={updateCurrentQustionId}
          />
        );
      case "checkbox":
        return (
          <CheckboxInput
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQustionId={updateCurrentQustionId}
          />
        );
      default:
        return null;
    }
  };

  const handleShowError = (newError) => {
    setShowError(newError);
  };

  return (
    <FullScroll
      answers={answers}
      questions={questions}
      handleShowError={handleShowError}
      currentQuestionId={currentQuestionId}
    >
      <Terms />
      {questions.map((question) => {
        return getCurrentQuestion(question);
      })}
    </FullScroll>
  );
}

export default App;
