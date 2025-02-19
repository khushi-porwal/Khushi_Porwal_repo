import { useNavigate, useLocation } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const score = state?.score || 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-2xl">Your Score: {score} / 40</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
}
