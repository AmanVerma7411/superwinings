import { useState, useEffect } from "react";
import { Bell, Home, List, X, Menu } from "lucide-react";
import logo from "../images/image1.png";
import Quizcardone from "./Quizcardone";
import ProfileCard from "./ProfileCard";
import Planpage from "./Planpage";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home"); // home, quiz, subscribe


  const [quizData, setQuizData] = useState([]);
  const [quizLoading, setQuizLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch quiz data
// Fetch quiz data
useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/quiz");
      if (Array.isArray(res.data) && res.data.length > 0) {
        // Transform DB questions to frontend format
        const transformed = res.data[0].questions.map(q => ({
          q: q.q,
          options: q.options,
          correctIndex: q.correctIndex
        }));
        setQuizData(transformed);
      } else {
        setQuizData([]);
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setQuizData([]);
    } finally {
      setQuizLoading(false);
    }
  };

  fetchQuiz();
}, []);




  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    setMessage("✅ Profile updated successfully!");
    setShowProfileEdit(false);
    setTimeout(() => setMessage(""), 3000);
    navigate("/dashboard");
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex h-screen bg-[#1a001d] text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 bg-[#2b0030] flex-col items-center pt-4">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="logo"
            className="w-[100px] sm:w-[120px] md:w-[150px] h-auto object-contain"
          />
        </div>
        <nav className="flex flex-col space-y-2 px-4 w-full">
          <button className="flex items-center gap-2 px-3 py-2 bg-pink-700 rounded-lg">
            <List size={18} /> Quiz
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-pink-800 rounded-lg">
            <Home size={18} /> Subscribe
          </button>
        </nav>
      </aside>

      {/* Sidebar mobile */}
      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 w-56 bg-[#2b0030] flex flex-col pt-4 z-50 md:hidden">
          <div className="flex items-center justify-between px-4 mb-6">
            <img src={logo} alt="logo" className="w-[120px] h-auto object-contain" />
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-2 px-4">
            <button className="flex items-center gap-2 px-3 py-2 bg-pink-700 rounded-lg">
              <List size={18} /> Quiz
            </button>
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-pink-800 rounded-lg">
              <Home size={18} /> Subscribe
            </button>
          </nav>
        </aside>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-[#2b0030] shadow-md">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="hidden xs:flex flex-1 min-w-0 px-3 py-2 bg-white rounded-full text-gray-900 outline-none"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-6 relative flex-shrink-0">
            <span className="bg-pink-600 px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold truncate max-w-[80px] sm:max-w-none">
              $8,9876
            </span>

            <button className="relative" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={22} className="sm:w-6 sm:h-6" />
            </button>

            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2b0030] border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-600">
                      <p className="text-sm font-semibold">{user?.name || "User"}</p>
                      <span className="text-xs text-gray-400">{user?.email}</span>
                      <span
                        className="block mt-1 text-xs text-gray-400 cursor-pointer hover:text-white"
                        onClick={() => {
                          setShowProfileEdit(true);
                          setShowProfileMenu(false);
                        }}
                      >
                        Edit Profile
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#3d0045] text-sm"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 flex items-center justify-center text-center p-4">
          <div className="max-w-xl w-full">
            {message && <p className="mb-4 text-green-400 font-semibold">{message}</p>}

            {showProfileEdit ? (
              <ProfileCard currentUser={user} onProfileUpdate={handleProfileUpdate} />
            ) : !showQuiz ? (
              <>
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-6">
                  Play now and claim your chance to win big today.
                </h2>
                <button
                  className="bg-white text-purple-700 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md"
                  onClick={() => setShowQuiz(true)}
                >
                  Start Quiz Now
                </button>
              </>
            ) : quizLoading ? (
              <p className="text-gray-400">Loading quiz...</p>
            ) : quizData.length === 0 ? (
              <p className="text-red-400 font-semibold">❌ No quiz available</p>
            ) : (
              <Quizcardone onBack={() => setShowQuiz(false)} quizData={quizData} loading={quizLoading} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
