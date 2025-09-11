import { useState } from "react";

export default function Planpage() {
  const plans = [
    {
      title: "Daily Plan",
      price: "1 SZL/ Daily",
      color: "bg-orange-500",
      icon: "💎",
      button: "Select Daily",
    },
    {
      title: "Weekly Plan",
      price: "3 SZL/ Weekly",
      color: "bg-blue-600",
      icon: "💎",
      button: "Select Weekly",
    },
    {
      title: "Monthly Plan",
      price: "15 SZL/ Monthly",
      color: "bg-purple-700",
      icon: "💎",
      button: "Select Monthly",
    },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const openPopup = (plan) => {
    setSelectedPlan(plan);
    setShowPopup(true);
  };

  const handlePay = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }
    alert(`Payment done via ${paymentMethod} for ${selectedPlan.title}`);
    setShowPopup(false);
    setPaymentMethod("");
  };

  return (
    <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Which plan is right for you?
        </h2>
        <p className="text-xl font-semibold mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Select one to enjoy 😅
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="group relative rounded-lg p-[2px] bg-transparent"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition duration-300"></div>

            <div className="relative bg-zinc-900 rounded-lg flex flex-col h-full min-h-[450px]">
              <div
                className={`${plan.color} p-6 flex items-center gap-3 rounded-t-lg`}
              >
                <span className="text-3xl">{plan.icon}</span>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl">{plan.title}</h3>
                  <p className="text-xl font-semibold">{plan.price}</p>
                </div>
              </div>

              <div className="p-8 flex-1">
                <h4 className="font-semibold mb-3 text-gray-300 text-lg">
                  Features Included:
                </h4>
                <ul className="text-gray-400 text-base space-y-3">
                  <li>✔️ Get a chance to win Bumper prize of 100k</li>
                  <li>✔️ SZL and smartphones by participating in weekly Quiz</li>
                </ul>
              </div>

              <div className="p-6">
                <button
                  onClick={() => openPopup(plan)}
                  className="w-full py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition text-lg"
                >
                  {plan.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======== Popup Modal ======== */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-xl p-8 w-96 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>
            <p className="mb-4 text-center text-gray-700">
              Selected Plan: <span className="font-semibold">{selectedPlan?.title}</span>
            </p>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="MTN"
                  checked={paymentMethod === "MTN"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>MTN</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Airtel"
                  checked={paymentMethod === "Airtel"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Airtel</span>
              </label>
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePay}
                className="flex-1 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
