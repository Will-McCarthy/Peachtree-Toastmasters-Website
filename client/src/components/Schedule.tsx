import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { queryClient, apiRequest } from "@/lib/queryClient";
import AdminModal from "./AdminModal";
import { Config } from "@/lib/types";

export default function Schedule() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  const { data: config, isLoading } = useQuery<Config>({
    queryKey: ['/api/config'],
  });
  
  const sheetsUrl = config?.googleSheetsUrl || 
    "https://docs.google.com/spreadsheets/d/1MksyZTH5gKr7v0s6RAak8jpK58CmnkHxyCYK9qU1V_A/edit?gid=0#gid=0";
  
  return (
    <section id="schedule" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-tm-blue mb-4">Meeting Schedule</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our club meets every Monday at 6:30 PM (excluding holidays). 
            See our upcoming meetings and role assignments below.
          </p>
        </div>
        
        <Card className="bg-white shadow-md">
          <CardContent className="p-4 md:p-6">
            <h3 className="font-bold text-xl mb-4">Upcoming Meetings</h3>
            <div className="overflow-hidden">
              {isLoading ? (
                <div className="h-[500px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tm-blue"></div>
                </div>
              ) : (
                <iframe 
                  src={sheetsUrl}
                  className="google-calendar"
                  title="Peachtree Toastmasters Meeting Schedule"
                />
              )}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <i className="fas fa-info-circle mr-1"></i> Can't see the schedule? {" "}
                <a 
                  href={sheetsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-tm-blue hover:underline"
                >
                  Open in Google Sheets
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button 
            className="bg-tm-blue hover:bg-tm-blue-light text-white"
            onClick={() => setIsAdminModalOpen(true)}
          >
            <i className="fas fa-cog mr-2"></i> Admin Settings
          </Button>
        </div>
      </div>
      
      <AdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)}
        currentUrl={sheetsUrl}
      />
    </section>
  );
}
