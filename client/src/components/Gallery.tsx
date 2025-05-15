import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

interface InstagramResponse {
  data: InstagramPost[];
}

export default function Gallery() {
  const { data: instagramPosts, isLoading, error } = useQuery<InstagramResponse>({
    queryKey: ['/api/instagram'],
  });

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
          
          {instagramPosts?.data.map((post) => (
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
          
          {/* Fallback to sample posts if no data and no error */}
          {!isLoading && !error && (!instagramPosts || instagramPosts.data.length === 0) && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-700 mb-4">
                No Instagram posts to display at this time.
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
