import rightArrow from "../../assets/right-arrow.svg";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getData } from "./data";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    border: "1px solid #ccc",
    padding: 10,
  }),
};

const SelectInput = ({ question, onAnswer, showError, questionText }) => {
  const [options, setOptions] = useState(getData());

  // useEffect(()=>(
  //     getData()
  // ),[])
  return (
    <div>
      <div className="question-number-container">
        <span className="question-number">
          {question.id}{" "}
          <img src={rightArrow} alt="right arrow" className="right-arrow" />
        </span>
        <label className="question-text" htmlFor={question.id}>
          {questionText} {question.isRequired && <span>*</span>}
        </label>
      </div>
      <div>
        <Select
            options={options}
            onChange={(option)=>{onAnswer(option, question.id)}}
            styles={customStyles}
        />
      </div>
      <div>{showError && <ErrorContainer />}</div>
      <div>
        {!showError && (
          <ButtonContainer buttonText="OK" showPressEnter={true} />
        )}
      </div>
    </div>
  );
};

export default SelectInput;
