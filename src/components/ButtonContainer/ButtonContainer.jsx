import Button from "./Button";
import "./ButtonContainer.css";

const ButtonContainer = ({ buttonText, showPressEnter, handleButtonClick }) => {
  return (
    <div className="button-container">
      <Button buttonText={buttonText} handleButtonClick={handleButtonClick}/>
      {showPressEnter && (
        <span className="press-enter">
          press <strong>Enter ↵</strong>
        </span>
      )}
    </div>
  );
};

export default ButtonContainer;
