import { FaQuestionCircle, FaGift, FaLock, FaCheckCircle } from "react-icons/fa";

export default function AboutOffer() {
  const offers = [
    {
      icon: <FaQuestionCircle className="text-3xl text-purple-400" />,
      title: "Thrilling Quizzes",
      desc: "Fun, knowledge-based challenges you’ll love",
    },
    {
      icon: <FaGift className="text-3xl text-pink-400" />,
      title: "Real Rewards",
      desc: "Play smart, win big, and withdraw instantly",
    },
    {
      icon: <FaLock className="text-3xl text-blue-400" />,
      title: "Secure Payments",
      desc: "100% safe UPI, Cards, and Wallets support",
    },
    {
      icon: <FaCheckCircle className="text-3xl text-green-400" />,
      title: "Transparent Results",
      desc: "Automated, fair, and unbiased results",
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-6 sm:px-10 lg:px-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
        What We Offer
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {offers.map((item, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 bg-gray-900 border border-purple-500 rounded-2xl text-center hover:scale-105 transition-transform"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400 text-sm sm:text-base mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
