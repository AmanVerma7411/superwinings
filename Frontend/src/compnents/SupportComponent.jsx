import sc from "../images/support.jpg";
export default function SupportComponent(){
    return(
        <>
           <section className="relative w-full h-[70vh] flex items-center justify-center bg-black/60">
     
      <img
        src={sc} 
        alt="Support Team"
        className="absolute inset-0 w-full h-full object-cover"
      />

   
      <div className="absolute inset-0 bg-black/60"></div>

     
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          We’re here to help you
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Find answers to common questions or reach out to our support team
        </p>
      </div>
    </section>
        </>
    );
}