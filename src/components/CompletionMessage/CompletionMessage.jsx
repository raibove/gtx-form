import "./CompletionMessage.css"
import logo from "../../assets/gtx-logo.svg";

const CompletionMessage = ()=>{
    return(
        <div className="message-container">
            <img src={logo} alt="GrowtX" className="logo" />
            <p className="message-text">All done! Thanks for your time.</p>
        </div>
    )
}

export default CompletionMessage;