// src/components/CreateQuiz.jsx
import { useState } from "react";
import axios from "axios";

export default function CreateQuiz({ onCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ q: "", options: ["",""], correctIndex: 0 }]);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const addQuestion = () => setQuestions(prev => [...prev, { q: "", options: ["",""], correctIndex: 0 }]);
  const updateQuestion = (idx, patch) => setQuestions(prev => prev.map((q,i)=> i===idx ? { ...q, ...patch } : q));
  const addOption = (idx) => updateQuestion(idx, { options: [...questions[idx].options, ""] });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/admin/quizzes", { title, questions }, { headers });
      if (res.data.success) onCreated(res.data.quiz);
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="bg-[#111] p-4 rounded mb-4">
      <h3>Create Quiz</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full my-2 p-2" />
      {questions.map((qq, i) => (
        <div key={i} className="border p-2 my-2">
          <input value={qq.q} onChange={e=>updateQuestion(i, { q: e.target.value })} placeholder={`Question ${i+1}`} className="w-full p-1 mb-2" />
          {qq.options.map((opt, j) => (
            <div key={j} className="flex gap-2 items-center mb-1">
              <input value={opt} onChange={e => {
                const newOpts = [...qq.options]; newOpts[j] = e.target.value;
                updateQuestion(i, { options: newOpts });
              }} className="flex-1 p-1" />
              <label>
                <input type="radio" name={`correct-${i}`} checked={qq.correctIndex===j} onChange={()=>updateQuestion(i, { correctIndex: j })} /> correct
              </label>
            </div>
          ))}
          <button onClick={()=>addOption(i)} className="text-sm underline">Add Option</button>
        </div>
      ))}

      <div className="flex gap-2">
        <button onClick={addQuestion} className="bg-purple-700 px-3 py-1 rounded">Add Q</button>
        <button onClick={handleSubmit} className="bg-green-600 px-3 py-1 rounded">Create</button>
        <button onClick={onCancel} className="bg-gray-600 px-3 py-1 rounded">Cancel</button>
      </div>
    </div>
  );
}
