import { useState, useRef, useEffect } from "react";
import rightArrow from "../../assets/right-arrow.svg";
import check from "../../assets/check.svg";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import "./CheckboxInput.css";

const CheckboxInput = ({
  question,
  onAnswer,
  showError,
  questionText,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  return (
    <div>
      <div className="question-number-container">
        <span className="question-number">
          {question.id}{" "}
          <img src={rightArrow} alt="right arrow" className="right-arrow" />
        </span>
        <label className="question-text" htmlFor={question.id}>
          {questionText} {question.isRequired && <span>*</span>}
        </label>
      </div>
      <div className="question-subtitle">
        <span>{question.subTitle}</span>
      </div>
      <div className="radio-group" role="radiogroup">
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
              <input
                type="radio"
                name="radioGroup"
                value={option}
                checked={selectedOption === option}
              />
              <span className="radio-text">{option}</span>
            </label>
            <div
              className={`checked ${
                selectedOption === option ? "active" : ""
              }`}
            >
              <img src={check} alt="checked" className="radio-checked" />
            </div>
          </div>
        ))}
      </div>
      <div>{showError && <ErrorContainer />}</div>
      <div>
        {!showError && (
          <ButtonContainer buttonText="OK" showPressEnter={true} />
        )}
      </div>
    </div>
  );
};

export default CheckboxInput;
