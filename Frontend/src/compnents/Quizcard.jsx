import { useState, useEffect } from "react";

export default function Quizcard({ onBack }) {
  const [time, setTime] = useState(10);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  const questions = [
    {
      q: "What is the capital city of South Africa?",
      options: ["Pretoria", "Cape Town", "Bloemfontein", "Johannesburg"],
    },
    {
      q: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
    },
  ];

  useEffect(() => {
    if (time > 0 && !quizEnd) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      handleNext();
    }
  }, [time, quizEnd]);

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTime(10);
    } else {
      setQuizEnd(true);
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
   
      <div className="relative flex justify-center mb-6">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="gray"
            strokeWidth="6"
            fill="transparent"
          />
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

      <div className="bg-black/80 text-white text-center px-4 py-4 rounded-lg mb-6">
        <p className="text-base sm:text-lg font-medium">
          {questionIndex + 1}. {questions[questionIndex].q}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {questions[questionIndex].options.map((opt, i) => (
          <button
            key={i}
            className="px-4 py-2 rounded-full bg-black/60 hover:bg-purple-600 transition w-full sm:w-auto"
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-full font-semibold text-purple-700 bg-white hover:bg-gray-200 transition shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
