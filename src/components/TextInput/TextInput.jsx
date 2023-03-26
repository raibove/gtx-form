import rightArrow from "../../assets/right-arrow.svg";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import "./TextInput.css";

const TextInput = ({ question, onAnswer, showError, questionText }) => {
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
      <div>
        <input
          className="text-input"
          type="text"
          id={question.id}
          onChange={(e) => onAnswer(e.target.value, question.id)}
          placeholder="Type your answer here ..."
        />
      </div>
      <div>
        {showError && <ErrorContainer/>}
      </div>
      <div>
        {!showError && <ButtonContainer buttonText="OK" showPressEnter={true} />}
      </div>
    </div>
  );
};

export default TextInput;
