import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MoreHorizontal, X } from "lucide-react";

export default function QuizListPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editData, setEditData] = useState(null);

  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/quizzes", { headers });
      if (res.data.success) setQuizzes(res.data.quizzes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (quizId, qIndex) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/quizzes/${quizId}/questions/${qIndex}`,
        { headers }
      );
      setQuizzes((prev) =>
        prev.map((quiz) =>
          quiz._id === quizId
            ? { ...quiz, questions: quiz.questions.filter((_, i) => i !== qIndex) }
            : quiz
        )
      );
      alert("Deleted ✅");
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };

  const handleEdit = (quizId, qIndex, question) => {
    setEditData({ quizId, qIndex, ...question });
    setOpenMenuId(null);
  };

  const handleUpdate = async () => {
    try {
      const { quizId, qIndex, q, options, correctIndex } = editData;
      const res = await axios.put(
        `http://localhost:8000/api/admin/quizzes/${quizId}/questions/${qIndex}`,
        { q, options, correctIndex },
        { headers }
      );
      if (res.data.success) {
        await fetchQuizzes();
        setEditData(null);
        alert("Updated ✅");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  const allQuestions = quizzes.flatMap((quiz) =>
    quiz.questions.map((q, idx) => ({
      id: `${quiz._id}-${idx}`,
      quizId: quiz._id?.slice(-4).toUpperCase() || "QZ",
      q: q.q,
      options: q.options,
      correctIndex: q.correctIndex,
      quizIdFull: quiz._id,
      qIndex: idx,
    }))
  );

  return (
    <div className="overflow-x-auto text-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold">Quiz Questions</h2>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition w-full sm:w-auto"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm min-w-[600px] sm:min-w-full">
          <thead>
            <tr className="bg-neutral-800 text-gray-300">
              <th className="p-3">Quiz ID</th>
              <th className="p-3">Question</th>
              <th className="p-3">Options</th>
              <th className="p-3">Answer</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allQuestions.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-gray-400 text-center">
                  No questions found
                </td>
              </tr>
            ) : (
              allQuestions.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700 hover:bg-neutral-800/50 transition relative"
                >
                  <td className="p-3">{row.quizId}</td>
                  <td className="p-3 break-words">{row.q}</td>
                  <td className="p-3 truncate max-w-[150px] sm:max-w-[300px]">
                    {row.options.join(", ")}
                  </td>
                  <td className="p-3">{String.fromCharCode(65 + row.correctIndex)}</td>
                  <td className="p-3 text-center relative">
                    <button
                      className="p-1 hover:bg-neutral-700 rounded-full"
                      onClick={() =>
                        setOpenMenuId(openMenuId === row.id ? null : row.id)
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenuId === row.id && (
                      <div className="absolute right-0 sm:right-8 mt-2 w-32 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg z-50">
                        <button
                          onClick={() =>
                            handleEdit(row.quizIdFull, row.qIndex, {
                              q: row.q,
                              options: row.options,
                              correctIndex: row.correctIndex,
                            })
                          }
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row.quizIdFull, row.qIndex)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Question</h2>
              <button onClick={() => setEditData(null)}>
                <X className="text-gray-400" />
              </button>
            </div>

            <textarea
              value={editData.q}
              onChange={(e) => setEditData({ ...editData, q: e.target.value })}
              className="w-full p-2 rounded bg-[#111] border border-gray-700 mb-4 resize-none"
              rows={3}
            />

            {editData.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...editData.options];
                  newOptions[i] = e.target.value;
                  setEditData({ ...editData, options: newOptions });
                }}
                className="w-full p-2 rounded bg-[#111] border border-gray-700 mb-2"
              />
            ))}

            <div className="mb-4 flex flex-wrap gap-4">
              <p className="text-sm">Correct Answer:</p>
              {editData.options.map((_, i) => (
                <label key={i} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={editData.correctIndex === i}
                    onChange={() => setEditData({ ...editData, correctIndex: i })}
                  />
                  {String.fromCharCode(65 + i)}
                </label>
              ))}
            </div>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
