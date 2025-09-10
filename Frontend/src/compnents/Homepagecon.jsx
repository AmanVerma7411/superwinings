import { useContext } from "react";
import lucky from "../images/lucky.png";
import { LoginContext } from "./LoginContext"; // 👈 yeh global context jo App me banaya tha

export default function Homepagecon() {
  const { setShowLogin } = useContext(LoginContext); // 👈 modal control yahan se milega

  return (
    <section
      className="flex flex-col-reverse md:flex-row items-center justify-between 
      px-4 sm:px-6 md:px-20 py-8 md:py-16 
      bg-gradient-to-r from-pink-700 via-purple-700 to-blue-800 text-white"
    >
      {/* Left Content */}
      <div
        className="flex flex-col items-center md:items-start 
        gap-4 md:gap-6 
        w-full md:w-1/2 lg:w-5/12 
        max-w-md md:max-w-lg lg:max-w-xl
        text-center md:text-left mx-auto md:mx-0"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          font-extrabold leading-snug break-words"
        >
          EXPLORE THE NEW <br /> WORLD OF <br /> SUPER WINNINGS!!
        </h1>

        <button
          onClick={() => setShowLogin(true)} // 👈 ab direct login modal open karega
          className="px-6 sm:px-8 lg:px-10 py-3 rounded-full font-semibold 
          text-sm sm:text-base md:text-lg lg:text-xl
          text-purple-700 bg-white hover:bg-gray-100 
          transition shadow-lg"
        >
          PLEASE REGISTER TO PROCEED
        </button>
      </div>

      {/* Right Image */}
      <div className="flex justify-center md:justify-end w-full md:w-1/2 lg:w-7/12 mt-8 md:mt-0">
        <img
          src={lucky}
          alt="Big Win"
          className="w-full max-w-[240px] sm:max-w-[320px] md:max-w-[420px] lg:max-w-[500px] drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
