import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Configuration table for storing app settings
export const config = pgTable("config", {
  id: serial("id").primaryKey(),
  googleSheetsUrl: text("google_sheets_url").notNull(),
  adminPassword: text("admin_password").notNull()
});

export const insertConfigSchema = createInsertSchema(config).pick({
  googleSheetsUrl: true,
  adminPassword: true
});

// Contact messages table for storing contact form submissions
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull()
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});

// Export types
export type InsertConfig = z.infer<typeof insertConfigSchema>;
export type Config = typeof config.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
