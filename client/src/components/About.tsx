import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-tm-blue mb-4">About Our Club</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Peachtree Toastmasters is an active, engaging club dedicated to helping members 
            improve their public speaking and leadership skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="bg-gray-50 hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="text-tm-blue mb-4 text-center">
                <i className="fas fa-comment-dots text-4xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">Public Speaking</h3>
              <p className="text-gray-600">
                Practice giving prepared speeches and receive constructive feedback in a supportive environment.
              </p>
            </CardContent>
          </Card>
          
          {/* Card 2 */}
          <Card className="bg-gray-50 hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="text-tm-blue mb-4 text-center">
                <i className="fas fa-users text-4xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">Leadership Skills</h3>
              <p className="text-gray-600">
                Take on various meeting roles to develop organization, time management, and leadership abilities.
              </p>
            </CardContent>
          </Card>
          
          {/* Card 3 */}
          <Card className="bg-gray-50 hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="text-tm-blue mb-4 text-center">
                <i className="fas fa-medal text-4xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">Active Club</h3>
              <p className="text-gray-600">
                Join our vibrant and active community that meets weekly to practice, learn, and grow together.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 bg-tm-gold/20 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="font-bold text-2xl mb-4 text-tm-blue">Why Join Peachtree Toastmasters?</h3>
              <p className="mb-4 text-gray-700">
                Our club provides a supportive and positive learning experience where members develop 
                speaking and leadership skills, resulting in greater self-confidence and personal growth.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Practice speaking in a friendly, encouraging environment</li>
                <li>Receive constructive feedback from fellow members</li>
                <li>Network with professionals from diverse backgrounds</li>
                <li>Develop leadership skills through meeting roles</li>
              </ul>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400" 
                alt="Toastmasters meeting in progress" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
