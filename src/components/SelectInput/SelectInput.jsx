import rightArrow from "../../assets/right-arrow.svg";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import Select from "react-select";
import { getData } from "./data";

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
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: "30px",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
};

const SelectInput = ({ question, onAnswer, showError, questionText, handleNextQuestion, currentPageIndex }) => {
  const options = getData();

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
      <div className="question-subtitle">
        <span>{question.subTitle}</span>
      </div>
      <div style={{ marginTop: "32px" }}>
        <Select
          isClearable={true}
          options={options}
          onChange={(option) => {
            onAnswer(option, question.id);
          }}
          styles={customStyles}
          captureMenuScroll={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "hotpink",
              primary: "black",
            },
          })}
        />
      </div>
      <div>{showError && <ErrorContainer />}</div>
      <div>
        {!showError && (
          <ButtonContainer buttonText="OK" showPressEnter={true} handleButtonClick={()=>{handleNextQuestion(currentPageIndex)}}/>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
