import "./Button.css"

const Button = ({buttonText})=>{
    return(
        <button className="button">
            {buttonText}
        </button>
    )
}

export default Button;