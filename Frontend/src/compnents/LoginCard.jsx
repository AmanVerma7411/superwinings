import { useState } from "react";
import logo from "../images/image1.png";
export default function LoginCard() {
  const [mobile, setMobile] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
        
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Super Winnings"
            className="h-12"
          />
        </div>

       
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

        
        <button className="w-full bg-purple-700 text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition">
          Get OTP
        </button>
      </div>
    </div>
  );
}
