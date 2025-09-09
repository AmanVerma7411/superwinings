import { useState } from "react";
import { Bell, Home, List, X, Menu } from "lucide-react"; 
import logo from "../images/image1.png";
import ProfileCard from "./ProfileCard";

export default function EditProfile() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const notifications = [
    { id: 1, title: "Game Result", message: "🎉 Congrats! You won ₹500 in the last quiz.", time: "Just now" },
  ];

  return (
    <div className="flex h-screen bg-[#1a001d] text-white">
  
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

      
      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 w-56 bg-[#2b0030] flex flex-col pt-4 z-50 md:hidden">
          <div className="flex items-center justify-between px-4 mb-6">
            <img
              src={logo}
              alt="logo"
              className="w-[120px] h-auto object-contain"
            />
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

     
      <main className="flex-1 flex flex-col">
     
        <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-[#2b0030] shadow-md">
        
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
           <input
               type="text"
               placeholder="Search"
              className="w-1/2 sm:w-2/3 md:w-3/4 lg:w-full px-3 py-2 bg-white rounded-full text-gray-900 outline-none transition-all"
           />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="bg-pink-600 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
              $8,9876
            </span>

            <button
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={22} className="sm:w-6 sm:h-6" />
            </button>

            <img
              src=""
              alt="profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border"
            />
          </div>
        </header>

       
        <div className="flex-1 flex items-center justify-center text-center p-4">
          <ProfileCard/>
        </div>
      </main>

     
      {showNotifications && (
        <div className="absolute right-2 top-16 w-72 sm:w-80 bg-[#2b0030] border border-gray-700 rounded-xl shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Notification</h3>
            <button onClick={() => setShowNotifications(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((note) => (
              <div
                key={note.id}
                className="bg-[#3d0045] p-3 rounded-lg border border-gray-600"
              >
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm">{note.message}</p>
                <span className="text-xs text-gray-400">{note.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
