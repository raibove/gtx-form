import "./Button.css";

const Button = ({ buttonText, handleButtonClick }) => {
  return <button className="button" onClick={handleButtonClick}>{buttonText}</button>;
};

export default Button;
