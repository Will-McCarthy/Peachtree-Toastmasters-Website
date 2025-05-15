import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toastmastersLogo from "../assets/toastmasters-logo.svg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#schedule", label: "Schedule" },
    { href: "#location", label: "Location" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <>
      <header className={cn(
        "bg-white shadow-md sticky top-0 z-50 transition-all duration-300",
        scrolled && "shadow-lg py-2"
      )}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={toastmastersLogo} 
              alt="Peachtree Toastmasters Club Logo" 
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h1 className="text-tm-blue font-bold text-xl md:text-2xl">Peachtree Toastmasters</h1>
              <p className="text-sm text-gray-600">Atlanta, GA</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-gray-700 hover:text-tm-blue transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </Button>
        </div>
      </header>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 md:hidden transition-transform duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-tm-blue">Menu</h2>
          <Button 
            variant="ghost"
            size="icon"
            onClick={closeMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            <i className="fas fa-times text-xl"></i>
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-gray-700 hover:text-tm-blue transition py-2"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
