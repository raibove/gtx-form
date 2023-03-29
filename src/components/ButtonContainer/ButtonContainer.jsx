import Button from "./Button";
import "./ButtonContainer.css";

const ButtonContainer = ({ buttonText, showPressEnter, handleButtonClick, showPressEnterText }) => {
  return (
    <div className="button-container">
      <Button buttonText={buttonText} handleButtonClick={handleButtonClick}/>
      {showPressEnter && (
        <span className="press-enter">
          press <strong>{showPressEnterText} ↵</strong>
        </span>
      )}
    </div>
  );
};

export default ButtonContainer;
