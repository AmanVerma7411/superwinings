import React, { useState } from "react";
import axios from "axios";

export default function AddQuizPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correct, setCorrect] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const addOption = () => setOptions([...options, ""]);
  const handleChange = (i, val) => {
    const newOptions = [...options];
    newOptions[i] = val;
    setOptions(newOptions);
  };

  const handleReset = () => {
    setQuestion("");
    setOptions(["", "", ""]);
    setCorrect(null);
  };

  const handleSubmit = async () => {
    if (!question.trim()) return alert("⚠️ Please enter a question.");
    if (options.some((opt) => !opt.trim()))
      return alert("⚠️ All options must be filled.");
    if (correct === null) return alert("⚠️ Please select a correct answer.");

    try {
      const payload = {
        title: "Sample Quiz",
        questions: [{ q: question, options, correctIndex: correct }],
      };

      const res = await axios.post(
        "http://localhost:8000/api/admin/quizzes",
        payload,
        { headers }
      );

      if (res.data.success) {
        alert("✅ Question added successfully!");
        handleReset();
      } else {
        alert("⚠️ Something went wrong!");
      }
    } catch (err) {
      console.error("Error while adding quiz:", err);
      alert(err.response?.data?.message || "❌ Failed to add question");
    }
  };

  return (
    <div className="bg-[#111] rounded-xl p-6 mb-6 text-white w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Question</h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question..."
        className="w-full rounded-lg p-3 mb-4 bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows="3"
      />

      {options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${String.fromCharCode(65 + i)}...`}
          value={opt}
          onChange={(e) => handleChange(i, e.target.value)}
          className="w-full rounded-lg p-3 mb-3 bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      ))}

      <button
        onClick={addOption}
        className="px-4 py-2 mb-4 rounded-lg bg-white text-purple-800 hover:bg-purple-200"
      >
        + Add Option
      </button>

      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Select Correct Answer</h4>
        <div className="flex flex-wrap gap-6">
          {options.map((_, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="correctAnswer"
                checked={correct === i}
                onChange={() => setCorrect(i)}
                className="accent-purple-600"
              />
              <span>{`Option ${String.fromCharCode(65 + i)}`}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={handleReset}
          className="px-5 py-2 rounded-full bg-white text-purple-800 hover:bg-purple-200 w-full sm:w-auto"
        >
          Reset
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-2 rounded-full bg-purple-700 text-white hover:bg-purple-600 w-full sm:w-auto"
        >
          Finish & Publish
        </button>
      </div>
    </div>
  );
}
