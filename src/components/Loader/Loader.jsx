import gtxLogo from "../../assets/gtx-logo.svg";
import "./Loader.css"

const Loader = ()=>{
    return <div className="loader-container">
        <img src={gtxLogo} alt="gtx-logo" className="loader-logo"/>
        <div class="loader-line"></div>
    </div>
}

export default Loader;