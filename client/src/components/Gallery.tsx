import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

// Instagram post sample data type
type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
};

// Sample Instagram posts data
const SAMPLE_POSTS: InstagramPost[] = [
  {
    id: "post1",
    caption: "Great meeting this week with our members practicing impromptu speaking skills! #toastmasters #publicspeaking",
    media_url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    permalink: "https://www.instagram.com/peachtreetoastmastersclub/",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "post2",
    caption: "Congratulations to our newest Competent Communicator! #achievement #toastmasters",
    media_url: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    permalink: "https://www.instagram.com/peachtreetoastmastersclub/",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "post3",
    caption: "Our club's representatives at the area speech contest did an amazing job! So proud of their hard work. #toastmasters #speechcontest",
    media_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    permalink: "https://www.instagram.com/peachtreetoastmastersclub/",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "post4",
    caption: "Weekly Table Topics session - improving our impromptu speaking skills one question at a time! #toastmasters #tabletopics",
    media_url: "https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    permalink: "https://www.instagram.com/peachtreetoastmastersclub/",
    timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "post5",
    caption: "Members enjoying our annual club social event. Building friendships beyond the meeting room! #toastmasters #community",
    media_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    permalink: "https://www.instagram.com/peachtreetoastmastersclub/",
    timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "post6",
    caption: "Learning leadership skills through meeting roles. Today's Toastmaster of the Day did an excellent job! #toastmasters #leadership",
    media_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
    permalink: "https://www.instagram.com/peachtreetoastmastersclub/",
    timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function Gallery() {
  // We'll use sample data directly rather than dealing with API calls
  // If you get an Instagram token in the future, you can replace this with real data
  const instagramPosts = SAMPLE_POSTS;
  const isLoading = false;
  const error = null;

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-tm-blue mb-4">Club Gallery</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See what we're up to on Instagram! Follow us {" "}
            <a 
              href="https://www.instagram.com/peachtreetoastmastersclub/" 
              target="_blank" 
              rel="noreferrer"
              className="text-tm-blue hover:underline"
            >
              @peachtreetoastmastersclub
            </a>
          </p>
        </div>
        
        {/* Instagram Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading && (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-md">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between items-center mt-3">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          
          {error && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-700 mb-4">
                <i className="fas fa-exclamation-circle text-tm-red mr-2"></i>
                Unable to load Instagram posts at this time.
              </p>
              <Button 
                asChild
                className="bg-tm-blue hover:bg-tm-blue-light text-white"
              >
                <a 
                  href="https://www.instagram.com/peachtreetoastmastersclub/" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  View on Instagram
                </a>
              </Button>
            </div>
          )}
          
          {instagramPosts.map((post) => (
            <Card key={post.id} className="instagram-item overflow-hidden shadow-md hover:shadow-lg transition">
              <img 
                src={post.media_url} 
                alt={post.caption.substring(0, 50) || "Instagram post"} 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-4 bg-white">
                <p className="text-gray-800 line-clamp-2">
                  {post.caption || ""}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-500 text-sm">
                    {format(new Date(post.timestamp), 'MMM d, yyyy')}
                  </span>
                  <a 
                    href={post.permalink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-tm-blue"
                  >
                    <i className="fab fa-instagram mr-1"></i> View
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* We don't need a fallback section anymore since we're using sample data */}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            asChild
            className="bg-gradient-to-r from-tm-red to-purple-600 text-white font-bold py-3 px-8 rounded-full transition hover:opacity-90"
          >
            <a 
              href="https://www.instagram.com/peachtreetoastmastersclub/" 
              target="_blank" 
              rel="noreferrer"
            >
              <i className="fab fa-instagram mr-2"></i>
              Follow Us on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
