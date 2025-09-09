import React, { useState, useEffect, useRef } from "react";
import logo from "../images/image1.png";
import { Search, Bell, Menu, X, MoreVertical } from "lucide-react";

export default function AdminQuestion() {
  const [options, setOptions] = useState(["", "", ""]);
  const [correct, setCorrect] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const addOption = () => setOptions([...options, ""]);
  const handleChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false); // mobile sidebar close
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const questions = [
    { id: "QW001", q: "Capital of France?", opts: "A. Paris, B. Rome, C. Delhi", ans: "A" },
    { id: "INV001", q: "Largest planet?", opts: "A. Earth, B. Jupiter, C. Mars", ans: "B" },
    { id: "INV002", q: "Fastest land animal?", opts: "A. Cheetah, B. Lion, C. Tiger", ans: "A" },
    { id: "INV003", q: "Chemical symbol for Gold?", opts: "A. Au, B. Ag, C. Go", ans: "A" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#2b0030] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#2b0030] p-4 transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <img
            src={logo}
            alt="logo"
            className="w-[100px] sm:w-[120px] md:w-[150px] h-auto object-contain"
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="space-y-3">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "dashboard"
                ? "bg-purple-700"
                : "hover:bg-purple-800"
            }`}
            onClick={() => handlePageChange("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "addQuiz" ? "bg-purple-700" : "hover:bg-purple-800"
            }`}
            onClick={() => handlePageChange("addQuiz")}
          >
            Add Quiz
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "viewAllQuestions"
                ? "bg-purple-700"
                : "hover:bg-purple-800"
            }`}
            onClick={() => handlePageChange("viewAllQuestions")}
          >
            Quizzes
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-[#2b0030] px-4 py-3 flex items-center justify-between">
          <button
            className="md:hidden text-white mr-3"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          <div className="flex flex-1 items-center justify-between gap-3">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative rounded-full p-2 bg-purple-900 hover:bg-purple-700 transition">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white object-cover cursor-pointer"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-10">
          {/* Dashboard Page */}
          {activePage === "dashboard" && (
            <div className="overflow-x-auto">
              <h2 className="text-2xl font-bold mb-4 text-white">Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#1f1f1f] p-6 rounded-lg">
                  <p>Total Questions</p>
                  <h3 className="text-2xl font-bold">127</h3>
                </div>
                <div className="bg-[#1f1f1f] p-6 rounded-lg">
                  <p>Active Questions</p>
                  <h3 className="text-2xl font-bold">127</h3>
                </div>
                <div className="bg-[#1f1f1f] p-6 rounded-lg">
                  <p>Users</p>
                  <h3 className="text-2xl font-bold">127</h3>
                </div>
              </div>

              <div className="bg-[#111] p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Question Added</h3>
                  <button
                    onClick={() => handlePageChange("viewAllQuestions")}
                    className="px-3 py-1 text-sm rounded-md bg-purple-700 hover:bg-purple-600"
                  >
                    View All
                  </button>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-3">Quiz ID</th>
                      <th className="p-3">Questions</th>
                      <th className="p-3">Options</th>
                      <th className="p-3">Correct Answer</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((row) => (
                      <tr key={row.id} className="border-b border-gray-700">
                        <td className="p-3">{row.id}</td>
                        <td className="p-3">{row.q}</td>
                        <td className="p-3">{row.opts}</td>
                        <td className="p-3">{row.ans}</td>
                        <td className="p-3 relative" ref={menuRef}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(row.id);
                            }}
                            className="p-2 rounded hover:bg-gray-700"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          {openMenu === row.id && (
                            <div className="absolute right-0 mt-2 w-28 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg z-10">
                              <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                                Edit
                              </button>
                              <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add Quiz Page */}
          {activePage === "addQuiz" && (
            <div className="text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-2xl font-bold">Add New Question</h2>
                <button
                  onClick={() => handlePageChange("dashboard")}
                  className="px-4 py-2 rounded-full bg-white text-purple-800 text-sm font-medium hover:bg-purple-200 transition"
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="bg-[#111] rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">Question Details</h3>
                <textarea
                  placeholder="Enter your question here..."
                  className="w-full rounded-lg p-3 bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
              </div>

              <div className="bg-[#111] rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">Answer Details</h3>
                {options.map((opt, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + index)}...`}
                    value={opt}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-full rounded-lg p-3 mb-3 bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ))}
                <button
                  onClick={addOption}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 mt-2 rounded-lg bg-white text-purple-800 hover:bg-purple-200 transition"
                >
                  + Add Option
                </button>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-3">
                    Select Correct Answer
                  </h4>
                  <div className="flex flex-wrap gap-6">
                    {options.map((opt, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={index}
                          checked={correct === index}
                          onChange={() => setCorrect(index)}
                          className="accent-purple-600"
                        />
                        <span className="text-sm">{`Option ${String.fromCharCode(
                          65 + index
                        )}`}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button className="px-5 py-2 rounded-full bg-white text-purple-800 text-sm font-medium hover:bg-purple-200 transition">
                  Reset
                </button>
                <button className="px-5 py-2 rounded-full bg-purple-700 text-white text-sm font-medium hover:bg-purple-600 transition">
                  Finish & Publish
                </button>
              </div>
            </div>
          )}

          {/* View All Questions Page */}
          {activePage === "viewAllQuestions" && (
            <div className="text-white overflow-x-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-2xl font-bold">Quiz Questions</h2>
                <button
                  onClick={() => handlePageChange("dashboard")}
                  className="px-4 py-2 rounded-full bg-white text-purple-800 text-sm font-medium hover:bg-purple-200 transition"
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="bg-[#111] rounded-xl p-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-3">Quiz ID</th>
                      <th className="p-3">Questions</th>
                      <th className="p-3">Options</th>
                      <th className="p-3">Correct Answer</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((row) => (
                      <tr key={row.id} className="border-b border-gray-700">
                        <td className="p-3">{row.id}</td>
                        <td className="p-3">{row.q}</td>
                        <td className="p-3">{row.opts}</td>
                        <td className="p-3">{row.ans}</td>
                        <td className="p-3 relative" ref={menuRef}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(row.id);
                            }}
                            className="p-2 rounded hover:bg-gray-700"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          {openMenu === row.id && (
                            <div className="absolute right-0 mt-2 w-28 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg z-10">
                              <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                                Edit
                              </button>
                              <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
