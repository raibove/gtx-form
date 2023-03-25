import ButtonContainer from "../ButtonContainer/ButtonContainer";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
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
      <ButtonContainer buttonText="I agree" showPressEnter={true} />
    </div>
  );
};

export default Terms;
