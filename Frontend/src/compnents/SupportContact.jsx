import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

export default function SupportContact() {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          CONTACT
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Contact Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Contact Info */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col h-full">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Contact Information
            </h2>
            <p className="text-gray-200 mb-6 sm:mb-8 text-sm sm:text-base">
              Say something to start a live chat!
            </p>

            <ul className="space-y-5 text-sm sm:text-base mt-12">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="flex-shrink-0" /> +1012 3456 789
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="flex-shrink-0" /> example@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="flex-shrink-0" /> 132 Dartmouth Street
                Boston, MA 02156 United States
              </li>
            </ul>
          </div>

          {/* Social Icons at bottom */}
          <div className="flex gap-4 mt-auto pt-8">
            <a
              href="#"
              className="bg-white text-purple-700 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-purple-200 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-white text-purple-700 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-purple-200 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white text-purple-700 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-purple-200 transition"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 text-white">
          <form className="space-y-5 sm:space-y-6">
            <div>
              <label className="block mb-2 text-gray-300 text-sm sm:text-base">
                Name
              </label>
              <input
                type="text"
                placeholder="Oliver Noah"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="jenny@example.com"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300 text-sm sm:text-base">
                Message
              </label>
              <textarea
                placeholder="Write a message..."
                rows="5"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-semibold rounded-full text-sm sm:text-base hover:opacity-90 transition"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
