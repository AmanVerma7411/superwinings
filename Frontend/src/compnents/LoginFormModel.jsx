import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm"; 

export default function LoginFormModal() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative animate-fade-in-down">
       
        <button
          onClick={() => navigate(-1)} 
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg"
        >
          ✕
        </button>

        <LoginForm /> 
      </div>
    </div>
  );
}
