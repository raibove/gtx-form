import "./ErrorContainer.css";
import alertSvg from "../../assets/alert.svg";

const ErrorContainer = ({error}) => {
  return (
    <div className="error-container">
      <img src={alertSvg} alt="alert" className="alert" />
      <span className="error-text">{error}</span>
    </div>
  );
};

export default ErrorContainer;
