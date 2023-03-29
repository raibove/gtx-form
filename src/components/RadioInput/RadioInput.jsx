import { useState, useRef, useEffect } from "react";
import rightArrow from "../../assets/right-arrow.svg";
import check from "../../assets/check.svg";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import "./RadioInput.css";
import useIsInViewport from "../../hooks/useIsInViewport";

const RadioInput = ({
  error,
  question,
  onAnswer,
  showError,
  questionText,
  updateCurrentQuestionId,
  questionNumber,
  updateNextPage,
}) => {
  const radioRef = useRef(null);
  const isInViewport1 = useIsInViewport(radioRef);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // 👇️ listen for changes

    if (isInViewport1) {
      radioRef.current.focus();
      updateCurrentQuestionId(question.id);
    }
  }, [isInViewport1]);


  const handleOptionChange = (option) => {
    if(option===selectedOption){
      setSelectedOption(null)
      onAnswer(null, question.id)
    }else{
      onAnswer(option, question.id);
      setSelectedOption(option);
    }
    
  };

  const handleKeyDown = (event) => {
    if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
      const key = event.key.toUpperCase().charCodeAt(0);
      const index = key - 65;
      if (index < question.options.length) {
        handleOptionChange(question.options[index])
      }
    }
  };

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
      <div
        className="radio-group"
        role="radiogroup"
        ref={radioRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {question.options.map((option, index) => (
          <div
            key={option}
            className="radio-button"
            onClick={() => handleOptionChange(option)}
          >
            <div className="key-hint-container">
              <div
                className={`key-hint ${
                  selectedOption === option ? "active" : ""
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
            </div>
            <label
              key={option}
              className={`radio-label ${
                selectedOption === option ? "active" : ""
              }`}
            >
              <span className="radio-text">{option}</span>
            </label>
            <div
              className={`checked ${selectedOption === option ? "active" : ""}`}
            >
              <img src={check} alt="checked" className="radio-checked" />
            </div>
          </div>
        ))}
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

export default RadioInput;
