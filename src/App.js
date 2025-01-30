import React, { useState } from "react";
import "./App.css";

function QuizApp() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questionHistory, setQuestionHistory] = useState([]);

  // Function to fetch quiz questions from an external API
  const fetchQuizQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const data = await response.json();
      setQuestions(data.results);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  // Function to handle answer selection
  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex]?.correct_answer;
    const isCorrect = selectedAnswer === correctAnswer;

    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));

    setQuestionHistory((prevHistory) => [
      ...prevHistory,
      {
        question: questions[currentQuestionIndex]?.question,
        selectedAnswer,
        correctAnswer,
        isCorrect,
      },
    ]);
  };

  // Function to go to the next question
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResults(true);
    }
  };

  // Function to go to the previous question
  const handlePrevQuestion = () => {
    const prevQuestionIndex = currentQuestionIndex - 1;
    if (prevQuestionIndex >= 0) {
      setCurrentQuestionIndex(prevQuestionIndex);
    }
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setQuestionHistory([]);
  };

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div className="start-container">
          <h2 className="quiz-title">Ready to Challenge Yourself?</h2>
          <p className="quiz-description">
            Test your knowledge with our exciting quiz! Click the button below
            to begin your adventure.
          </p>
          <button onClick={fetchQuizQuestions} className="start-button">
            Start Quiz
          </button>
        </div>
      ) : showResults ? (
        <div className="results-container">
          <h2>Quiz Results</h2>
          <p>
            You scored {score} out of {questions.length}
          </p>
          <button onClick={restartQuiz} className="restart-button">
            Restart Quiz
          </button>
          <div className="question-history">
            <h3>Question History</h3>
            <ul>
              {questionHistory.map((item, index) => (
                <li 
                key={index} 
                style={{ 
                  color: item.isCorrect ? "#34C759" : "#FF3B30", 
                  fontWeight: "600", 
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                  padding: "8px 8px",
                  borderBottom: "1px solid #E5E5EA" 
                }}
              >
                <strong>Q{index + 1}:</strong> 
                <span style={{ marginLeft: "8px" }}>
                  {item.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                </span>
              </li>
              
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="quiz-content">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p
            className="question-text"
            dangerouslySetInnerHTML={{
              __html: questions[currentQuestionIndex]?.question,
            }}
          />
          <div className="answers">
            {questions[currentQuestionIndex]?.incorrect_answers
              .concat(questions[currentQuestionIndex]?.correct_answer)
              .sort(() => Math.random() - 0.5) 
              .map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className="answer-button"
                />
              ))}
          </div>
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePrevQuestion} className="prev-button">
                Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
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
      )}
    </div>
  );
}

export default QuizApp;
