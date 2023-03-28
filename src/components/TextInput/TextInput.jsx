import { useRef, useEffect, useState } from "react";
import rightArrow from "../../assets/right-arrow.svg";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import "./TextInput.css";
import useIsInViewport from "../../hooks/useIsInViewport";

const TextInput = ({
  error,
  answers,
  question,
  onAnswer,
  showError,
  questionText,
  questionNumber,
  updateCurrentQuestionId,
  updateNextPage,
}) => {
  const inputRef = useRef(null);
  const isInViewport1 = useIsInViewport(inputRef);

  useEffect(() => {
    // 👇️ listen for changes
    if (isInViewport1) {
      inputRef.current.focus();
      updateCurrentQuestionId(question.id);
    }
  }, [isInViewport1]);

  return (
    <div className="question-container">
      <div className="question-number-container">
        <span className="question-number">
          {questionNumber}{" "}
          <img src={rightArrow} alt="right arrow" className="right-arrow" />
        </span>
        <label className="question-text" htmlFor={question.id}>
          {questionText} {question.isRequired && <span>*</span>}
        </label>
      </div>
      <div className="question-subtitle">
        <span>{question.subTitle}</span>
      </div>
      <div>
        <input
          ref={inputRef}
          className="text-input"
          type="text"
          id={question.id}
          onChange={(e) => onAnswer(e.target.value, question.id)}
          placeholder={question.placeholder ? question.placeholder :"Type your answer here ..."}
          value={
            answers.find((a) => a.id === question.id) !== undefined
              ? answers.find((a) => a.id === question.id).value
              : ""
          }
        />
      </div>
      <div>{showError && <ErrorContainer error={error}/>}</div>
      <div>
        {!showError && (
          <ButtonContainer
            buttonText="OK"
            showPressEnter={true}
            handleButtonClick={updateNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;
