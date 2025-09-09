import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/image1.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
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
              onClick={() => {
                setShowLogin(true);
                setStep("mobile");
              }}
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
                  setStep("mobile");
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

     
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-[999]">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

          
            {step === "mobile" && (
              <>
                <img src={logo} alt="logo" className="h-12 mx-auto mb-4" />
                <h2 className="text-lg font-bold">Welcome to SUPER WINNINGS</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Login with your Mobile number
                </p>
                <input
                  type="text"
                  placeholder="Enter mobile no."
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => setStep("otp")}
                  className="w-full bg-purple-700 text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition"
                >
                  Get OTP
                </button>
              </>
            )}

          
            {step === "otp" && (
              <>
                <div className="text-3xl mb-2">🙌</div>
                <h2 className="text-lg font-bold">You're almost there</h2>
                <p className="text-gray-500 text-sm mb-4">
                  A one time password has been sent to{" "}
                  <span className="font-bold">{mobile || "1234567890"}</span>{" "}
                  <button
                    onClick={() => setStep("mobile")}
                    className="text-blue-600 hover:underline"
                  >
                    change
                  </button>
                </p>
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => {
                    setIsLoggedIn(true);
                    localStorage.setItem("isLoggedIn", "true");
                    setShowLogin(false);
                    navigate("/trialplaypage");
                  }}
                  className="w-full bg-purple-700 text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
