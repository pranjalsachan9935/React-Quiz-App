import React from 'react';

const QuizContainer = ({
  question,
  currentQuestionIndex: currentIndex, 
  answers,
  handleAnswerClick,
  handlePrevQuestion,
  handleNextQuestion,
  totalQuestions,
}) => {
  return (
    <div className="quiz-content">
      <h2>Question {currentIndex + 1}</h2>
      <p
        className="question-text"
        dangerouslySetInnerHTML={{
          __html: question?.question,
        }}
      />
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer.isCorrect)}
            dangerouslySetInnerHTML={{ __html: answer.text }}
            className="answer-button"
          />
        ))}
      </div>
      <div className="navigation-buttons">
        {currentIndex > 0 && (
          <button onClick={handlePrevQuestion} className="prev-button">
            Previous
          </button>
        )}
        {currentIndex < totalQuestions - 1 ? (
          <button onClick={handleNextQuestion} className="next-button">
            Next
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="next-button">
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
