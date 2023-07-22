import React, { useState, useEffect } from "react";
import questionsData from "./questions.json";
import optionsData from "./options.json";
import keyData from "./key.json";
import "./App.css";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = questionsData.questions;
  const options = optionsData.options;
  const correctAnswers = keyData.key;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === correctAnswers[currentQuestion];
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      setSelectedOption(null);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  useEffect(() => {
    if (currentQuestion === questions.length) {
      setShowResult(true);
    }
  }, [currentQuestion]);

  return (
    <div className="quiz-app">
      {!showResult ? (
        <div className="quiz-container">
          <div className="question">
            <h2>{questions[currentQuestion]}</h2>
          </div>
          <div className="options">
            {options[currentQuestion].map((option, index) => (
              <div
                key={index}
                className={`option ${selectedOption === option ? "selected" : ""}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <button className="next-button" onClick={handleNextQuestion}>
            Next
          </button>
        </div>
      ) : (
        <div className="result">
          <h2>Quiz Result</h2>
          <p>You scored {score} out of {questions.length}!</p>
          <button className="restart-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default App;