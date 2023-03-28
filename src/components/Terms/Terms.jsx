import ButtonContainer from "../ButtonContainer/ButtonContainer";
import "./Terms.css";
import useIsInViewport from "../../hooks/useIsInViewport";
import { useRef, useEffect } from "react";

const Terms = ({ updateNextPage }) => {
  const termsRef = useRef(null);
  const isInViewport1 = useIsInViewport(termsRef);

  useEffect(() => {
    // 👇️ listen for changes

    if (isInViewport1) {
      termsRef.current.focus();
    }
  }, [isInViewport1]);

  return (
    <div className="terms-container" ref={termsRef} tabIndex="0">
      <span className="terms-title">Up-skilling requires time commitment</span>
      <p className="terms-description">
        The GrowthX experience is designed by keeping in mind the working hours
        founders & full time operators typically work in.
        <br />
        <br />
        <span>You will spend</span>
        <br />
        <span>- 6 hours/week for the first 5 weeks</span>
        <br />
        <span>- 15 hours/week for the last 3 weeks</span>
      </p>
      <ButtonContainer
        buttonText="I agree"
        showPressEnter={true}
        handleButtonClick={updateNextPage}
      />
    </div>
  );
};

export default Terms;
