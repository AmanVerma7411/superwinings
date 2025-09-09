import { useState } from "react";
import { MoreVertical } from "lucide-react"; 

export default function ActionMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="relative inline-block text-left">
    
      <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-200">
        <MoreVertical size={20} />
      </button>

     
      {showMenu && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              setShowMenu(false);
              alert("Edit clicked");
            }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
            onClick={() => {
              setShowMenu(false);
              alert("Delete clicked");
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
