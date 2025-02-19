import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (name.trim() !== "") {
      navigate("/quiz", { state: { userName: name } });
    } else {
      alert("Please enter your name to start the quiz");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded-lg mb-4"
      />
      <button
        onClick={handleStartQuiz}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Start Quiz
      </button>
    </div>
  );
}
