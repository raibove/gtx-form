import React, { useEffect, useState } from "react";
import Terms from "./components/Terms/Terms";
import TextInput from "./components/TextInput/TextInput";
import FullScroll from "./FullScroll";
import "./App.css";
import SelectInput from "./components/SelectInput/SelectInput";
import RadioInput from "./components/RadioInput/RadioInput";
import RadioGroupInput from "./components/RadioInput/RadioGroupInput";
import Loader from "./components/Loader/Loader";

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
    type: "radio",
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
    type: "radio-group",
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
    maxSelect: 2,
  },
  {
    id: 6,
    type: "radio-group",
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
    maxSelect: 2,
  },
];

function App() {
  const [answers, setAnswers] = useState([]);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("Please fill this in");
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const updateCurrentQuestionNumber = (prevQuestionNumber, questionId) => {
    if (questionId > currentQuestionId) {
      return prevQuestionNumber + 1;
    } else if (questionId < currentQuestionId) {
      return prevQuestionNumber - 1;
    }
    return prevQuestionNumber;
  };

  const updateCurrentQuestionId = (questionId) => {
    setQuestionNumber((prevQuestionNumber) => {
      return updateCurrentQuestionNumber(prevQuestionNumber, questionId);
    });

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
            error={error}
            answers={answers}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQuestionId={updateCurrentQuestionId}
            questionNumber={questionNumber}
          />
        );
      case "select":
        return (
          <SelectInput
            error={error}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQuestionId={updateCurrentQuestionId}
            questionNumber={questionNumber}
          />
        );
      case "radio":
        return (
          <RadioInput
            error={error}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQuestionId={updateCurrentQuestionId}
            questionNumber={questionNumber}
          />
        );
      case "radio-group":
        return (
          <RadioGroupInput
            error={error}
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showError={showError}
            questionText={questionText}
            updateCurrentQuestionId={updateCurrentQuestionId}
            questionNumber={questionNumber}
            maxSelections={question.maxSelect}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleShowError = (newError) => {
    setShowError(newError);
  };

  const isRequiredQuestionAnswered = () => {
    let currentQuestion = questions.find((q) => q.id === currentQuestionId);
    let currentAnswer = answers.find((a) => a.id === currentQuestionId);
    if (currentQuestion.isRequired !== true) return true;

    if (currentAnswer) {
      if (currentQuestion.type === "radio-group") {
        if (currentAnswer.value.length === 0) {
          setError("Oops! Please make a selection");
          return false;
        } else if (currentAnswer.value.length < currentQuestion.maxSelect) {
          setError("Please make more choices");
          return false;
        }
      } else if (currentAnswer.value.length === 0) {
        if (currentQuestion.type === "text") {
          setError("Please fill this in");
        }else{
          setError("Please make a selection")
        }
        return false;
      }
      
      return true;
    }

    if (currentQuestion.type === "text") {
      setError("Please fill this in");
    }else{
      setError("Please make a selection")
    }
    return false;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FullScroll
        answers={answers}
        isRequiredQuestionAnswered={isRequiredQuestionAnswered}
        handleShowError={handleShowError}
      >
        <Terms />
        {questions.map((question) => {
          return getCurrentQuestion(question);
        })}
      </FullScroll>
    </>
  );
}

export default App;
