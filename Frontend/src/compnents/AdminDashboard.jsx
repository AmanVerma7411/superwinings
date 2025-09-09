

import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateQuiz from "./CreateQuiz";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetch = async () => {
      try {
        const [u, q] = await Promise.all([
          axios.get("http://localhost:8000/api/admin/users", { headers }),
          axios.get("http://localhost:8000/api/admin/quizzes", { headers })
        ]);
        setUsers(u.data.users || []);
        console.log(u.data)
        console.log(q.data)
        setQuizzes(q.data.quizzes || []);
      } catch (err) {
        console.error(err);
       
      } finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleCreate = (newQuiz) => {
    setQuizzes(prev => [newQuiz, ...prev]);
    setShowCreate(false);
  };

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div className="flex">
      <aside className="w-64 p-4 bg-[#2b0030] hidden md:block">
        <h2 className="text-xl font-bold">SUPER <span className="text-purple-400">WINNINGS</span></h2>
        <nav className="mt-4">
          <button onClick={() => setShowCreate(true)} className="block w-full my-2 bg-purple-700 rounded p-2">Add Quiz</button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {showCreate && <CreateQuiz onCreated={handleCreate} onCancel={() => setShowCreate(false)} />}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-[#111] p-4 rounded">Total Quizzes: {quizzes.length}</div>
          <div className="bg-[#111] p-4 rounded">Active Quizzes: {quizzes.filter(q=>q.active).length}</div>
          <div className="bg-[#111] p-4 rounded">Users: {users.length}</div>
        </section>

        <section className="mt-6 bg-[#111] rounded p-4">
          <h3 className="mb-3">Users</h3>
          <table className="w-full">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6 bg-[#111] rounded p-4">
          <h3 className="mb-3">Recent Quizzes</h3>
          <ul>
            {quizzes.map(q => (
              <li key={q._id} className="border-t py-2">
                <strong>{q.title}</strong> — {q.questions.length} Qs
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
