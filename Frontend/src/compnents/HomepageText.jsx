import { useState } from "react";
import Quizcard from "./Quizcard"; 

export default function HomepageText() {
  const [showQuiz, setShowQuiz] = useState(false);

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
      ) : (
        <div className="w-full max-w-3xl">
          <Quizcard onBack={() => setShowQuiz(false)} />
        </div>
      )}
    </section>
  );
}
