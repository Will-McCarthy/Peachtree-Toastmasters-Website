export default function Footer() {
  return (
    <footer className="bg-tm-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="font-bold text-xl mb-2">Peachtree Toastmasters Club</h2>
            <p className="text-gray-300">Helping develop communication and leadership skills since 1985</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a 
              href="https://www.toastmasters.org/" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              Official Toastmasters International
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#location" className="text-gray-300 hover:text-white transition">Location</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Peachtree Toastmasters Club. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-gray-400 hover:text-white transition mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition mx-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
