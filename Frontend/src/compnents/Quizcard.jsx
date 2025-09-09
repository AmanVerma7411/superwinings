import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Quizcard({ onBack, quizData = [], loading }) {
  const [time, setTime] = useState(10);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  const navigate = useNavigate();

  if (loading) {
    return <p className="text-white text-center">Loading quiz...</p>;
  }

  if (!quizData || quizData.length === 0) {
    return (
      <div className="text-center text-white">
        <p>No quiz available</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 transition shadow-md"
        >
          Back to Start
        </button>
      </div>
    );
  }

  const currentQ = quizData[questionIndex];

  // ✅ Timer
  useEffect(() => {
    if (time > 0 && !quizEnd) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      handleNext();
    }
  }, [time, quizEnd]);

  const handleNext = () => {
    if (questionIndex < quizData.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTime(10);
    } else {
      setQuizEnd(true);
    }
  };

  // ✅ Answer handling
  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === currentQ.correctIndex) {
      handleNext(); // correct → next
    } else {
      navigate("/plans"); // wrong → redirect to Planpage
    }
  };

  if (quizEnd) {
    return (
      <div className="w-full max-w-md mx-auto bg-white text-gray-900 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 Quiz Finished!</h2>
        <p className="mb-6">Thanks for playing. Want to try again?</p>
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 transition shadow-md"
        >
          Back to Start
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-r from-pink-700 via-purple-700 to-blue-800 text-white rounded-2xl shadow-lg p-6">
      {/* Timer */}
      <div className="relative flex justify-center mb-6">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle cx="40" cy="40" r="36" stroke="gray" strokeWidth="6" fill="transparent" />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 36}
            strokeDashoffset={(2 * Math.PI * 36 * (10 - time)) / 10}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {time}
        </span>
      </div>

      {/* Question */}
      <div className="bg-black/80 text-white text-center px-4 py-4 rounded-lg mb-6">
        <p className="text-base sm:text-lg font-medium">
          {questionIndex + 1}. {currentQ.q}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {currentQ.options?.map((opt, i) => (
          <button
            key={i}
            className="px-4 py-2 rounded-full bg-black/60 hover:bg-purple-600 transition"
            onClick={() => handleAnswer(i)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
