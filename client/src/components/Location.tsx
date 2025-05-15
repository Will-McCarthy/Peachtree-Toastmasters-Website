import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Location() {
  return (
    <section id="location" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-tm-blue mb-4">Our Meeting Location</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We meet at the Cathedral of St. Philip in Atlanta. 
            The beautiful venue provides an ideal setting for our weekly meetings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-50 shadow-md">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4">Cathedral of St. Philip</h3>
              <p className="mb-4">
                <i className="fas fa-map-marker-alt text-tm-red mr-2"></i>
                2744 Peachtree Rd, Atlanta, GA 30305
              </p>
              <p className="mb-4">
                <i className="far fa-clock text-tm-red mr-2"></i>
                Every Monday at 6:30 PM (excluding holidays)
              </p>
              <div className="space-y-3">
                <p className="font-medium">Directions:</p>
                <p>Located on Peachtree Road in Buckhead. Free parking is available in the cathedral parking lot.</p>
                <p>Enter through the main entrance and follow signs to the meeting room.</p>
              </div>
              <div className="mt-6">
                <Button 
                  asChild
                  className="bg-tm-blue hover:bg-tm-blue-light text-white"
                >
                  <a 
                    href="https://maps.google.com/?q=Cathedral+of+St+Philip+Atlanta+2744+Peachtree+Rd,+Atlanta,+GA+30305" 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <i className="fas fa-directions mr-2"></i>Get Directions
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="rounded-lg shadow-md overflow-hidden h-80 md:h-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.4320751964915!2d-84.3831208!3d33.825293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f505f7c640124d%3A0xa528aad8c389ef0a!2sCathedral%20of%20St.%20Philip!5e0!3m2!1sen!2sus!4v1652881576247!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Cathedral of St. Philip Location"
            />
          </div>
        </div>
        
        <Card className="mt-12 bg-gray-50 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1537202108838-e7072bad1927?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Cathedral of St. Philip" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h3 className="font-bold text-xl mb-3">About the Venue</h3>
                <p className="text-gray-700 mb-4">
                  The Cathedral of St. Philip provides a peaceful and professional environment for our Toastmasters meetings. 
                  The facility offers comfortable seating, good acoustics, and all the amenities needed for productive meetings.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <i className="fas fa-parking text-tm-blue mr-2"></i>
                    <span>Free Parking</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-wifi text-tm-blue mr-2"></i>
                    <span>WiFi Available</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-wheelchair text-tm-blue mr-2"></i>
                    <span>Accessible Facility</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
