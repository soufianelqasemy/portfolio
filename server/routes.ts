import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactNotification, sendAutoReply } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body using the contactMessageSchema
      const validatedData = contactMessageSchema.parse(req.body);
      
      // Store the contact message in the database
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Send notification and auto-reply emails
      // These functions handle their own errors internally
      sendContactNotification(contactMessage)
        .then(sent => {
          if (sent) {
            console.log("Notification email sent successfully");
          }
        });
      
      sendAutoReply(contactMessage)
        .then(sent => {
          if (sent) {
            console.log("Auto-reply email sent successfully");
          }
        });
      
      // Return the saved contact message
      res.status(201).json({
        message: "Message sent successfully",
        id: contactMessage.id
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
        return;
      }
      
      // Handle other errors
      console.error("Error saving contact message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
