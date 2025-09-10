import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/image1.png";

export default function LoginModal({ onClose, setIsLoggedIn }) {
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); // ✅ error message
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-[999]">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center relative">
        <button
          onClick={onClose}
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
                onClick={() => {
                  setStep("mobile");
                  setError(""); // clear error on change
                }}
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <button
              onClick={() => {
                if (otp === "123456") {
                  setIsLoggedIn(true);
                  localStorage.setItem("isLoggedIn", "true");
                  onClose();
                  navigate("/trialplaypage");
                } else {
                  setError("❌ Wrong OTP! Please try again."); // wrong OTP message
                }
              }}
              className="w-full bg-purple-700 text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
