import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(2, "Subject must be at least 2 characters."),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Using Formspree to handle the form submission
    try {
      const response = await fetch("https://formspree.io/f/xgegdyla", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          _replyto: data.email
        })
      });
      
      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you soon.",
          duration: 5000
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-tm-blue mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Have questions or ready to visit? We'd love to hear from you! 
            Fill out the form below or reach out directly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-50 shadow-md">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4">Get in Touch</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-tm-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            type="email" 
                            {...field} 
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-tm-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="I'm interested in visiting" 
                            {...field} 
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-tm-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I'd like to know more about..." 
                            {...field} 
                            rows={4}
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-tm-blue resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-tm-blue hover:bg-tm-blue-light text-white font-bold py-3 px-6 rounded transition w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-b-2 rounded-full border-white"></div>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 shadow-md">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4">Visit Us</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg">Meeting Schedule</h4>
                  <p>
                    <i className="far fa-calendar-alt text-tm-red mr-2"></i>
                    Every Monday at 6:30 PM (excluding holidays)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">Location</h4>
                  <p>
                    <i className="fas fa-map-marker-alt text-tm-red mr-2"></i>
                    Cathedral of St. Philip
                  </p>
                  <p className="ml-6">2744 Peachtree Rd, Atlanta, GA 30305</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg">Club Contact</h4>
                  <p>
                    <i className="fas fa-envelope text-tm-red mr-2"></i>
                    peachtreetoastmasters@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone text-tm-red mr-2"></i>
                    (941) 780-6951
                  </p>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium text-lg mb-2">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/peachtreetoastmastersclub/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-2xl text-gray-700 hover:text-tm-red transition"
                      aria-label="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a 
                      href="https://www.facebook.com/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-2xl text-gray-700 hover:text-tm-blue transition"
                      aria-label="Facebook"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a 
                      href="https://www.linkedin.com/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-2xl text-gray-700 hover:text-blue-600 transition"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
                alt="Join us at our next meeting" 
                className="rounded-lg mt-6 w-full h-auto shadow"
              />
              
              <div className="mt-6 p-4 bg-tm-gold/20 rounded-lg">
                <h4 className="font-medium text-lg text-tm-blue">First Time Visitors</h4>
                <p>
                  New visitors are always welcome! No appointment necessary, 
                  just drop by a meeting to see what Toastmasters is all about.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
