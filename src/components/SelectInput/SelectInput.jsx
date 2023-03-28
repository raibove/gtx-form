import rightArrow from "../../assets/right-arrow.svg";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import Select, {components} from "react-select";
import { getData } from "./data";
import { useRef, useEffect, useState } from "react";
import useIsInViewport from "../../hooks/useIsInViewport";


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    border: "1px solid #ccc",
    padding: 10,
    margin: 10,
    width: "95%",
    color: "white",
    // backgroundColor: "#808080",
  }),
  menuList: (provided) => ({
    ...provided,
    border: 0,
    backgroundColor: "black", // Change the color of the dropdown arrow
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: "rgb(255, 255, 255) 0px 2px",
    minWidth: "242px",
    border: 0,
    color: "white",
    backgroundColor: "black",
    "&:hover": { borderColor: "gray" }, // border style on hover
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
    fontSize: "30px",
    '@media(max-width: 576px)': {
      fontSize: "20px",
    }
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: "30px",
    '@media(max-width: 576px)': {
      fontSize: "20px",
    }
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
};

const SelectInput = ({ error, question, onAnswer, showError, questionText, updateCurrentQuestionId, questionNumber, updateNextPage}) => {
  const options = getData();
  const [inputValue, setInputValue] = useState(null);
  const inputRef = useRef(null);
  const isInViewport1 = useIsInViewport(inputRef);

  useEffect(() => {
    // 👇️ listen for changes
    if (isInViewport1) {
      // inputRef.current.focus();
      updateCurrentQuestionId(question.id)
    }
  }, [isInViewport1]);

  return (
    <div 
    ref={inputRef}
    className="question-container"
    >
      <div className="question-number-container">
        <span className="question-number">
          {questionNumber}{" "}
          <img src={rightArrow} alt="right arrow" className="right-arrow" />
        </span>
        <label className="question-text" htmlFor={question.id}>
          {questionText} {question.isRequired && <span>*</span>}
        </label>
      </div>
      <div className="question-subtitle">
        <span>{question.subTitle}</span>
      </div>
      <div style={{ marginTop: "32px" }}>
        <Select
          isClearable={true}
          value={inputValue}
          options={options}
          onChange={(option) => {
            setInputValue(option)
            onAnswer(option, question.id);
          }}
          styles={customStyles}
          captureMenuScroll={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "rgb(48,48,48,0.7)",
              primary: "rgb(48,48,48)",
            },
          })}
          components={{DropdownIndicator:inputValue!==null ? null : (props) => <components.DropdownIndicator {...props}/>}}
        />
      </div>
      <div>{showError && <ErrorContainer error={error}/>}</div>
      <div>
        {!showError && (
          <ButtonContainer buttonText="OK" showPressEnter={true} handleButtonClick={updateNextPage}/>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
