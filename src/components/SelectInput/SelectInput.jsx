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
    zIndex: 9999,
    border: 0,
    color: "white",
    backgroundColor: "black",
    "&:hover": { borderColor: "gray" }, // border style on hover
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
    fontSize: "30px"
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize:"30px"
  }),
  indicatorSeparator: (styles) =>({
    ...styles,
    display: 'none'
  })
};

const SelectInput = ({ question, onAnswer, showError, questionText }) => {
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
      <div style={{marginTop:'32px'}}>
        <Select
          isClearable={true}
          options={options}
          onChange={(option) => {
            onAnswer(option, question.id);
          }}
          styles={customStyles}
          captureMenuScroll={true}
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
