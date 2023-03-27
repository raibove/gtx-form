import Button from "./Button";
import "./ButtonContainer.css";

const ButtonContainer = ({ buttonText, showPressEnter }) => {
  return (
    <div className="button-container">
      <Button buttonText={buttonText} />
      {showPressEnter && (
        <span className="press-enter">
          press <strong>Enter ↵</strong>
        </span>
      )}
    </div>
  );
};

export default ButtonContainer;
