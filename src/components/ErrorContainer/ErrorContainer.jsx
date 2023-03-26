import "./ErrorContainer.css";
import alertSvg from "../../assets/alert.svg";

const ErrorContainer = ()=>{
    return(
        <div className="error-container">
            <img src={alertSvg} alt="alert" className="alert"/>
            <span className="error-text">Please fill this in</span>
        </div>
    )
}

export default ErrorContainer;