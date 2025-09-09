// ProfileCard.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileCard({ currentUser, onProfileUpdate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔹 Populate form when currentUser loads
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password && password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:8000/api/auth/me",
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data)
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        onProfileUpdate(data.user); // ✅ send updated user back to Dashboard
      }
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#2a2a2a] text-white rounded-lg shadow-2xl p-6">
      <div className="border-b border-gray-700 pb-3 mb-4">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
      </div>

      <form className="space-y-4" onSubmit={handleUpdate}>
        {/* Name */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            New Password (optional)
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a new password"
              className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-700 hover:bg-purple-800 rounded-md font-medium transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
