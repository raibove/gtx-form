import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ answers, totalQuestions }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = ((answers.length) / totalQuestions) * 100;
    setProgress(newProgress);
  }, [answers.length, totalQuestions]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
