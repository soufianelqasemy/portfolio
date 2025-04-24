import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { MailService } from "@sendgrid/mail";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize SendGrid if API key is available
  const mailService = new MailService();
  if (process.env.SENDGRID_API_KEY) {
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
  }

  // API endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body using the contactMessageSchema
      const validatedData = contactMessageSchema.parse(req.body);
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Send email via SendGrid if API key is available
      if (process.env.SENDGRID_API_KEY) {
        try {
          await mailService.send({
            to: "soufiane.elqasemy.45@edu.uiz.ac.ma", // Your email address
            from: "portfolio@elqasemy.com", // Use a verified sender in SendGrid
            subject: `Portfolio Contact: ${validatedData.subject}`,
            text: `
              New contact message from: ${validatedData.name}
              Email: ${validatedData.email}
              Subject: ${validatedData.subject}
              
              Message:
              ${validatedData.message}
            `,
            html: `
              <h3>New contact message</h3>
              <p><strong>From:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Subject:</strong> ${validatedData.subject}</p>
              <p><strong>Message:</strong></p>
              <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
            `
          });
          console.log("Email sent successfully");
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          // Continue processing - we still want to save the message even if email fails
        }
      } else {
        console.log("SendGrid API key not found, skipping email send");
      }
      
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
