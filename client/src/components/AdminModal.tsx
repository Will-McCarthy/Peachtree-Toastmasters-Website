import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
}

export default function AdminModal({ isOpen, onClose, currentUrl }: AdminModalProps) {
  const [password, setPassword] = useState("");
  const [newUrl, setNewUrl] = useState(currentUrl);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const { toast } = useToast();
  
  const verifyPasswordMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest('POST', '/api/admin/verify', { password });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsPasswordVerified(true);
        toast({
          title: "Password Verified",
          description: "You can now update the Google Sheets URL.",
          duration: 3000
        });
      } else {
        toast({
          title: "Invalid Password",
          description: "The password you entered is incorrect. Please try again.",
          variant: "destructive",
          duration: 3000
        });
      }
    },
    onError: () => {
      toast({
        title: "Verification Failed",
        description: "Could not verify password. Please try again later.",
        variant: "destructive",
        duration: 3000
      });
    }
  });
  
  const updateUrlMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest('POST', '/api/config/update', { googleSheetsUrl: url });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/config'] });
      toast({
        title: "URL Updated",
        description: "The Google Sheets URL has been updated successfully.",
        duration: 3000
      });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update the URL. Please try again later.",
        variant: "destructive",
        duration: 3000
      });
    }
  });
  
  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPasswordMutation.mutate(password);
  };
  
  const handleUpdateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlMutation.mutate(newUrl);
  };
  
  const handleClose = () => {
    setPassword("");
    setNewUrl(currentUrl);
    setIsPasswordVerified(false);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Settings</DialogTitle>
          <DialogDescription>
            {isPasswordVerified 
              ? "Update the Google Sheets URL for the meeting schedule." 
              : "Enter the admin password to continue."}
          </DialogDescription>
        </DialogHeader>
        
        {!isPasswordVerified ? (
          <form onSubmit={handleVerifyPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-tm-blue hover:bg-tm-blue-light text-white"
                disabled={verifyPasswordMutation.isPending}
              >
                {verifyPasswordMutation.isPending ? "Verifying..." : "Verify"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleUpdateUrl} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="googleSheetsUrl">Google Sheets URL</Label>
              <Input 
                id="googleSheetsUrl" 
                type="url"
                value={newUrl} 
                onChange={(e) => setNewUrl(e.target.value)} 
                placeholder="https://docs.google.com/spreadsheets/d/..."
                required
              />
              <p className="text-sm text-gray-500">
                Enter the full URL to your Google Sheets document that contains the meeting schedule.
              </p>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-tm-blue hover:bg-tm-blue-light text-white"
                disabled={updateUrlMutation.isPending}
              >
                {updateUrlMutation.isPending ? "Updating..." : "Update URL"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
