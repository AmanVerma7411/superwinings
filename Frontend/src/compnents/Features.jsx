import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import card4 from "../images/card4.png";
import card5 from "../images/card5.png";

const features = [
  {
    title: "REAL TIME QUIZ",
    img: card1,
    gradient: "from-blue-1000 to-blue-600", 
  },
  {
    title: "INSTANT REWARDS",
    img: card2,
    gradient: "from-red-900 to-orange-200", 
  },
  {
    title: "SAFE & SECURE GAMEPLAY",
    img: card3,
    gradient: "from-purple-800 to-violet-300", 
  },
  {
    title: "MULTIPLE GAME MODES",
    img: card4,
    gradient: "from-gray-900 to-sky-100", 
  },
  {
    title: "EASY WITHDRAWALS",
    img: card5,
    gradient: "from-blue-900 to-indigo-400", 
  },
];



export default function Features() {
  return (
    <section className="bg-black py-16">
      <div className="text-center mb-10 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Features</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8 md:px-20 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-end rounded-2xl shadow-lg overflow-hidden bg-gradient-to-b ${feature.gradient} h-[380px]`}
          >
          
            <img
              src={feature.img}
              alt={feature.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

          
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

           
            <div className="relative z-10 p-4 text-center">
           <h3 className="text-3xl font-bold text-white/75 hover:text-white drop-shadow-md transition-opacity duration-300">
                {feature.title}
           </h3>


            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
