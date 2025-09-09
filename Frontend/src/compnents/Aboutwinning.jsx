import React from "react";

export default function Aboutwinning() {
  const features = [
    "Trusted by thousands of quiz lovers",
    "Focused on responsible gaming and 18+ users only",
    "Designed for both casual and competitive players",
    "Quick support for smooth gameplay",
  ];

  return (
    <section className="bg-black text-white py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Why Super Winning?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-pink-600 to-blue-600 text-white py-4 px-6 rounded-lg shadow-md text-sm sm:text-base font-medium"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
