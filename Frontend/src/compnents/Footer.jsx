import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import visa from "../images/visa.png";
import mastercard from "../images/mastercard.png";
import rupay from "../images/rupay.png";
import paytm from "../images/paytm.png";
import phonepe from "../images/phonepay.png";
import gpay from "../images/gpay.png";
import netbanking from "../images/netbanking.png";
import mtn from "../images/mtn.jpg"
import logo from "../images/image1.png";
import { useNavigate, Link } from "react-router-dom";

export default function Footer() {
  const payments = [mtn,netbanking];
    const navigate = useNavigate();

  return (
    <footer className="bg-[#0A1636] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
       
        <div>
          <img src={logo} alt="Super Winning" className="w-32 mb-4" />
          <p className="text-sm text-gray-300 mb-4">
            Super Winning is India's trusted quiz and gaming platform. Play thrilling KBC-style quizzes, win real rewards, and enjoy secure gameplay. Strictly for 18+ users. Play responsibly.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <FaFacebookF className="hover:text-blue-400 transition cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 transition cursor-pointer" />
            <FaYoutube className="hover:text-blue-400 transition cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-400 transition cursor-pointer" />
          </div>

          <div className="flex flex-wrap gap-3">
            {payments.map((img, idx) => (
              <img key={idx} src={img} alt="Payment" className="h-8 hover:scale-110 transition transform" />
            ))}
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li> <button
            onClick={() => navigate("/about")}
            className="hover:text-blue-400"
          >
            About Us
          </button></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
              <li> <button
            onClick={() => navigate("/privacypolicy")}
            className="hover:text-blue-400"
          >
            Privacy Policy
          </button></li>
            <li><a href="#" className="hover:text-blue-400">Refund Gaming</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
            <li>Email: <span className="text-blue-400">example@gmail.com</span></li>
          </ul>
        </div>
      </div>

      <div className="bg-black text-gray-400 text-center text-sm py-4 px-6">
        <p className="mb-2">
          ⚠ This website is strictly for 18+ users. Gambling can be addictive. Please play responsibly.
        </p>
        <p>© 2025 SUPER WINNING | All Rights Reserved.</p>
      </div>
    </footer>
  );
}
