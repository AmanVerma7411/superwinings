import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X } from "lucide-react";
import logo from "../../images/image1.png";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    navigate(`/admin/${page}`);
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#2b0030] text-white">

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#2b0030] p-4 transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="logo" className="w-[100px] sm:w-[120px] md:w-[150px]" />
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white">
            <X size={28} />
          </button>
        </div>

        <nav className="space-y-3">
          <button
            className="w-full text-left px-4 py-2 rounded-lg transition hover:bg-purple-800"
            onClick={() => handlePageChange("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded-lg transition hover:bg-purple-800"
            onClick={() => handlePageChange("add-quiz")}
          >
            Add Quiz
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded-lg transition hover:bg-purple-800"
            onClick={() => handlePageChange("quizzes")}
          >
            Quizzes
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="w-full bg-[#2b0030] px-4 py-3 flex items-center justify-between flex-wrap">
          <button className="md:hidden text-white mr-3" onClick={() => setSidebarOpen(true)}>
            <Menu size={28} />
          </button>

          <div className="flex flex-1 items-center justify-between gap-3 flex-wrap">
            <div className="flex-1 max-w-md w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
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

        <main className="flex-1 p-4 md:p-10 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
