import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
  { question: "Capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
  { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Mars", "Saturn"], correct: 1 },
  { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"], correct: 0 },
  { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
  { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Silver"], correct: 0 },
  { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], correct: 1 },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correct: 2 },
  { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
  { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Curie"], correct: 1 },
  { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correct: 2 },
  { question: "Which gas do plants primarily use for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 min timer
  const [questionTimer, setQuestionTimer] = useState(15);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [attempted, setAttempted] = useState(Array(questions.length).fill(false));
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const mainTimer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(mainTimer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (questionTimer > 0 && !attempted[currentQuestion]) {
      const questionInterval = setInterval(() => setQuestionTimer((prev) => prev - 1), 1000);
      return () => clearInterval(questionInterval);
    } else if (!attempted[currentQuestion]) {
      setFeedback("unattempted");
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = "unattempted";
        return newAnswers;
      });
      setAttempted((prev) => {
        const newAttempted = [...prev];
        newAttempted[currentQuestion] = true;
        return newAttempted;
      });
    }
  }, [questionTimer, currentQuestion, attempted]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (!attempted[currentQuestion]) {
      const isCorrect = selectedOption === questions[currentQuestion].correct;
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = isCorrect ? "correct" : "incorrect";
        return newAnswers;
      });
      setFeedback(isCorrect ? "correct" : "incorrect");
      setAttempted((prev) => {
        const newAttempted = [...prev];
        newAttempted[currentQuestion] = true;
        return newAttempted;
      });
      if (isCorrect) {
        setScore(score + 1);
        setQuestionTimer(null);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback(null);
      setQuestionTimer(15);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setFeedback(answers[currentQuestion - 1]);
    }
  };

  return (
    <div className="quiz-container">
      <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
      <div className="question-timer">Question Timer: {questionTimer}</div>
      <h2>{questions[currentQuestion].question}</h2>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option ${selectedOption === index ? "selected" : ""}`}
            onClick={() => handleOptionSelect(index)}
            disabled={attempted[currentQuestion]}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption !== null && !attempted[currentQuestion] && <button onClick={handleSubmit}>Submit</button>}
      {feedback && (
        <div className={`feedback ${feedback}`}> 
          {feedback === "correct" ? "✔ Correct!" : feedback === "incorrect" ? "✘ Incorrect!" : "❌ Unfortunately Not Attempted!"}
        </div>
      )}
      {currentQuestion > 0 && <button onClick={handlePrevious}>Previous</button>}
      <button onClick={handleNext}>{currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}</button>
    </div>
  );
};

export default QuizPage;
