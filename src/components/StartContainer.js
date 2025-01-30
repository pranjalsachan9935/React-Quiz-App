import React from 'react';

const StartContainer = ({ onStartQuiz }) => {
  return (
    <div className="start-container">
      <h2 className="quiz-title">Ready to Challenge Yourself?</h2>
      <p className="quiz-description">Test your knowledge with our exciting quiz! Click the button below to begin your adventure.</p>
      <button onClick={onStartQuiz} className="start-button">
        Start Quiz
      </button>
    </div>
  );
};

export default StartContainer;
