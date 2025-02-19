import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizPage from "./components/QuizPage";
import HomePage from "./components/Home"; // Renamed from Home to HomePage for consistency
import ResultPage from "./components/ResultPage";
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage as the main page */}
          <Route path="/quiz" element={<QuizPage />} /> {/* QuizPage for the quiz */}
          <Route path="/result" element={<ResultPage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

