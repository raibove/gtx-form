import rightArrow from "../../assets/right-arrow.svg";

const TextInput = ({question, onAnswer})=>{
    return(
        <div>
            <span className="question-number">{question.id} <img src={rightArrow} alt="right arrow" className="right-arrow"/></span>
            <label className="question-text" htmlFor={question.id}>{question.text}  {question.isRequired && <span>*</span>}</label>
            <input
                type="text"
                id={question.id}
                onChange={(e) => onAnswer(e.target.value)}
                placeholder="Type your answer here ..."

            />
        </div>
    )
}

export default TextInput;