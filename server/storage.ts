import { Config, InsertContactMessage, ContactMessage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getConfig(): Promise<Config>;
  updateGoogleSheetsUrl(url: string): Promise<void>;
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private config: Config;
  private contactMessages: Map<number, ContactMessage>;
  private contactMessageId: number;

  constructor() {
    // Initialize with default configuration
    this.config = {
      id: 1,
      googleSheetsUrl: "https://docs.google.com/spreadsheets/d/1MksyZTH5gKr7v0s6RAak8jpK58CmnkHxyCYK9qU1V_A/edit?gid=0#gid=0",
      adminPassword: process.env.ADMIN_PASSWORD || "peachtree123"
    };
    
    this.contactMessages = new Map();
    this.contactMessageId = 1;
  }

  async getConfig(): Promise<Config> {
    return this.config;
  }

  async updateGoogleSheetsUrl(url: string): Promise<void> {
    this.config.googleSheetsUrl = url;
  }

  async saveContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const now = new Date().toISOString();
    
    const contactMessage: ContactMessage = {
      id,
      ...message,
      createdAt: now
    };
    
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();
