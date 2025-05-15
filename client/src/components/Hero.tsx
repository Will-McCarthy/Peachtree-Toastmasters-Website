import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-tm-blue text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-bold text-3xl md:text-5xl mb-6">Welcome to Peachtree Toastmasters</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-100">
          Develop your public speaking and leadership skills in a supportive and friendly environment
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center mb-4">
            <div className="text-center md:text-left md:mr-8 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Meeting Time</h2>
              <p className="text-lg"><i className="far fa-clock mr-2"></i>Mondays at 6:30 PM</p>
              <p className="text-sm italic">(Excluding holidays)</p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Meeting Location</h2>
              <p className="text-lg"><i className="fas fa-map-marker-alt mr-2"></i>Cathedral of St. Philip</p>
              <p className="text-sm">2744 Peachtree Rd, Atlanta, GA 30305</p>
            </div>
          </div>
          <Button 
            asChild
            className="bg-tm-red hover:bg-tm-red-light text-white font-bold py-3 px-8 rounded-full mt-4 transition duration-300 transform hover:scale-105"
          >
            <a href="#contact">Visit Us Today</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
