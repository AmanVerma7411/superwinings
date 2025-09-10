import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/image1.png";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-4 md:px-9 py-3 shadow-md bg-white">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[100px] sm:w-[120px] md:w-[170px] h-[50px] sm:h-[60px] md:h-[70px] object-contain cursor-pointer"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center text-sm font-medium text-gray-700">
          <div className="flex items-center gap-6">
            <a href="#products" className="hover:text-blue-600">PRODUCTS</a>
            <a href="#features" className="hover:text-blue-600">FEATURES</a>
            <Link to="/support" className="hover:text-blue-600">SUPPORT</Link>
          </div>

          {!isLoggedIn ? (
            <button
              onClick={() => setShowLogin(true)}
              className="ml-4 px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
            >
              LOGIN
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-4 px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-600 to-pink-600 hover:opacity-90 transition"
            >
              LOGOUT
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-[64px] left-0 w-full z-50">
          <div className="flex flex-col items-center gap-4 py-4">
            <a href="#products" className="hover:text-blue-600">PRODUCTS</a>
            <a href="#features" className="hover:text-blue-600">FEATURES</a>
            <Link to="/support" className="hover:text-blue-600">SUPPORT</Link>

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsOpen(false);
                }}
                className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
              >
                LOGIN
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-red-600 to-pink-600 hover:opacity-90 transition"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </>
  );
}
