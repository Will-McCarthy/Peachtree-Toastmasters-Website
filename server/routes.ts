import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";

// Environment variables for Instagram API (these would be set in your environment)
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || "";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get configuration
  app.get("/api/config", async (req, res) => {
    try {
      const config = await storage.getConfig();
      
      // Don't expose the admin password to the client
      const { adminPassword, ...safeConfig } = config;
      
      res.json(safeConfig);
    } catch (error) {
      console.error("Error fetching config:", error);
      res.status(500).json({ message: "Failed to fetch configuration" });
    }
  });
  
  // Update Google Sheets URL
  app.post("/api/config/update", async (req, res) => {
    try {
      const updateSchema = z.object({
        googleSheetsUrl: z.string().url("Please provide a valid URL")
      });
      
      const { googleSheetsUrl } = updateSchema.parse(req.body);
      
      await storage.updateGoogleSheetsUrl(googleSheetsUrl);
      
      res.json({ success: true, message: "Google Sheets URL updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      
      console.error("Error updating Google Sheets URL:", error);
      res.status(500).json({ message: "Failed to update Google Sheets URL" });
    }
  });
  
  // Verify admin password
  app.post("/api/admin/verify", async (req, res) => {
    try {
      const passwordSchema = z.object({
        password: z.string()
      });
      
      const { password } = passwordSchema.parse(req.body);
      
      // Get the admin password from storage
      const config = await storage.getConfig();
      const isValid = password === config.adminPassword;
      
      res.json({ success: isValid });
    } catch (error) {
      console.error("Error verifying password:", error);
      res.status(500).json({ message: "Failed to verify password" });
    }
  });
  
  // Send contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message
      await storage.saveContactMessage(contactData);
      
      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  
  // Get Instagram feed
  app.get("/api/instagram", async (req, res) => {
    try {
      if (!INSTAGRAM_ACCESS_TOKEN) {
        // If there's no access token, return sample data for demonstration
        return res.json({
          data: [
            {
              id: "post1",
              caption: "Great meeting this week with our members practicing impromptu speaking skills! #toastmasters #publicspeaking",
              media_url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
              permalink: "https://www.instagram.com/p/example1/",
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: "post2",
              caption: "Congratulations to our newest Competent Communicator! #achievement #toastmasters",
              media_url: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
              permalink: "https://www.instagram.com/p/example2/",
              timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: "post3",
              caption: "Our club's representatives at the area speech contest did an amazing job! So proud of their hard work. #toastmasters #speechcontest",
              media_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
              permalink: "https://www.instagram.com/p/example3/",
              timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        });
      }
      
      // In a real application, you would use the Instagram Graph API
      // Here's how it would be implemented:
      const instagramApiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
      
      const instagramResponse = await fetch(instagramApiUrl);
      
      if (!instagramResponse.ok) {
        throw new Error(`Instagram API returned ${instagramResponse.status}`);
      }
      
      const instagramData = await instagramResponse.json();
      res.json(instagramData);
    } catch (error) {
      console.error("Error fetching Instagram feed:", error);
      res.status(500).json({ message: "Failed to fetch Instagram feed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
