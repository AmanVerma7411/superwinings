import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quizcard.css";

export default function Quizcard({ onBack, quizData = [], loading }) {
  const [time, setTime] = useState(15);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [score, setScore] = useState(0); // ✅ NEW

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

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === currentQ.correctIndex) {
      setScore((prev) => prev + 1); // ✅ increase score if correct
      handleNext();
    } else {
      navigate("/plans");
    }
  };

  if (quizEnd) {
    return (
      <div className="w-full max-w-md mx-auto text-white rounded-2xl shadow-lg p-8 text-center bg-transparent">
        <h2 className="text-2xl font-bold mb-4">🎉 Quiz Finished!</h2>
        <p className="mb-2">Correct Answers: {score}</p> {/* ✅ show final score */}
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
    <div className="w-full flex justify-center items-start p-5 overflow-x-hidden">

      {/* ✅ Score card in top-right */}
      <div className="fixed top-30 right-4 bg-transparent text-white font-bold px-4 py-2 rounded-xl shadow-lg">
        Score:<br></br>Correct Answer {score}
      </div>

      <div className="relative w-full max-w-2xl max-w-full bg-transparent">
        {/* Question box */}
        <div className="mb-6 relative">
          <div className="rounded-2xl border-[3px] border-pink-500 relative p-[1px] bg-transparent">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-purple-600 
                            text-white font-bold rounded-full w-10 h-10 flex items-center 
                            justify-center shadow-lg z-20 time ">
              {time}
            </div>
            <div className="m-2 rounded-2xl gradient-border">
              <div className="content">
                <p className="text-lg font-medium leading-relaxed">
                  {questionIndex + 1}. {currentQ.q}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {currentQ.options?.map((opt, i) => (
            <button
              key={i}
              className="px-4 py-3 rounded-full text-white font-semibold optiondiv"
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Next button */}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="px-8 py-2 rounded-lg bg-black"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
