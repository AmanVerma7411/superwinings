import { useState, useEffect } from "react";
import Quizcard from "./Quizcard";

export default function HomepageText() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Backend se quiz fetch
  useEffect(() => {
    fetch("http://localhost:8000/api/quiz") // ✅ singular route, same as Dashboard
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Transform DB format → frontend format
          const transformed = data[0].questions.map((q) => ({
            q: q.q,
            options: q.options,
            correctIndex: q.correctIndex,
          }));
          setQuizData(transformed);
        } else {
          setQuizData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quiz:", err);
        setQuizData([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-pink-700 via-purple-700 to-blue-800 text-white min-h-screen">
      {!showQuiz ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            LET’s DO SOME TRIAL
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            BEFORE
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            START TO PLAY
          </h1>

          <button
            onClick={() => setShowQuiz(true)}
            className="mt-8 px-10 py-3 rounded-full font-bold text-sm text-purple-700 bg-white hover:bg-gray-100 transition shadow-lg"
          >
            PLAY
          </button>
        </div>
      ) : loading ? (
        <p className="text-gray-300">Loading quiz...</p>
      ) : quizData.length === 0 ? (
        <p className="text-red-400 font-semibold">❌ No quiz available</p>
      ) : (
        <div className="w-full max-w-3xl">
          <Quizcard
            onBack={() => setShowQuiz(false)}
            quizData={quizData}
            loading={loading}
          />
        </div>
      )}
    </section>
  );
}
