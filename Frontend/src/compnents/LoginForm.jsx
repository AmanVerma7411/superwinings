import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/image1.png";
import axios from "axios";

// optional: centralize base URL
const API_BASE = ""; // <-- set this to your backend (5000 or 8000)

export default function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
   
    const newErrors = [];
    if (!email) newErrors.push("The email field is required.");
    if (!password) newErrors.push("The password field is required.");
    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:8000/api/auth/login`, { email, password });

      // debug
      console.log("login response:", res.data);

      if (!res.data || !res.data.success) {
        setErrors([res.data?.message || "Login failed"]);
        setLoading(false);
        return;
      }

      const { user, token } = res.data;
      if (!user || !token) {
        setErrors(["Unexpected response from server."]);
        setLoading(false);
        return;
      }

      // ensure correct role selection
      if (user.role !== role) {
        setErrors([`This account is a "${user.role}". Please select correct role or use correct credentials.`]);
        setLoading(false);
        return;
      }

      // success: save token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect
      if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      // show backend message if available
      const message = err.response?.data?.message || err.response?.data?.error || err.message || "Something went wrong";
      setErrors([message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
        <img src={logo} alt="logo" className="h-12 mx-auto mb-4" />

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 text-sm rounded-md p-3 mb-4 relative">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <button onClick={() => setErrors([])} className="absolute top-2 right-2 text-red-600 font-bold">✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" placeholder="jenny@example.com" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" type="password" placeholder="Enter your password" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          {/* Role selector */}
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} />
              <span>User</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} />
              <span>Admin</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-purple-700 text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">Don’t have an account? <a href="/register" className="text-purple-600 font-semibold">Register Now</a></p>
      </div>
    </div>
  );
}
