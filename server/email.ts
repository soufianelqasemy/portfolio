import { MailService } from '@sendgrid/mail';
import { ContactMessage } from '@shared/schema';

// Initialize SendGrid client if API key is available
let mailService: MailService | null = null;

if (process.env.SENDGRID_API_KEY) {
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid initialized successfully');
} else {
  console.warn('SendGrid API key not found. Email functionality disabled.');
}

// Define the from email address for sending emails
const FROM_EMAIL = 'soufiane.elqasemy.45@edu.uiz.ac.ma'; // Set your verified sender email here

/**
 * Sends an email notification for a new contact message
 * @param contactMessage The contact message details
 * @returns Boolean indicating success or failure
 */
export async function sendContactNotification(contactMessage: ContactMessage): Promise<boolean> {
  // If SendGrid is not initialized, return false
  if (!mailService) {
    console.warn('Email not sent: SendGrid not initialized');
    return false;
  }

  try {
    // Email content
    const message = {
      to: FROM_EMAIL, // Send notification to yourself
      from: FROM_EMAIL, // Must be your verified sender
      subject: `New Contact Form Message: ${contactMessage.subject}`,
      text: `
        You have received a new message from your portfolio website contact form.
        
        From: ${contactMessage.name} (${contactMessage.email})
        Subject: ${contactMessage.subject}
        
        Message:
        ${contactMessage.message}
        
        This message was submitted at ${contactMessage.createdAt}.
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p>You have received a new message from your portfolio website contact form.</p>
        
        <p><strong>From:</strong> ${contactMessage.name} (${contactMessage.email})</p>
        <p><strong>Subject:</strong> ${contactMessage.subject}</p>
        
        <h3>Message:</h3>
        <p>${contactMessage.message.replace(/\n/g, '<br>')}</p>
        
        <p><small>This message was submitted at ${contactMessage.createdAt}.</small></p>
      `,
    };

    // Send the email
    await mailService.send(message);
    console.log('Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

/**
 * Sends an auto-reply email to the contact form submitter
 * @param contactMessage The contact message details
 * @returns Boolean indicating success or failure
 */
export async function sendAutoReply(contactMessage: ContactMessage): Promise<boolean> {
  // If SendGrid is not initialized, return false
  if (!mailService) {
    console.warn('Auto-reply not sent: SendGrid not initialized');
    return false;
  }

  try {
    // Email content
    const message = {
      to: contactMessage.email,
      from: FROM_EMAIL, // Must be your verified sender
      subject: 'Thank you for contacting Soufiane El Qasemy',
      text: `
        Dear ${contactMessage.name},
        
        Thank you for your message. I have received your inquiry and will get back to you as soon as possible.
        
        For your reference, here is a copy of your message:
        
        Subject: ${contactMessage.subject}
        Message: ${contactMessage.message}
        
        Best regards,
        Soufiane El Qasemy
      `,
      html: `
        <h2>Thank you for your message</h2>
        <p>Dear ${contactMessage.name},</p>
        
        <p>Thank you for your message. I have received your inquiry and will get back to you as soon as possible.</p>
        
        <p>For your reference, here is a copy of your message:</p>
        
        <p><strong>Subject:</strong> ${contactMessage.subject}</p>
        <p><strong>Message:</strong><br>${contactMessage.message.replace(/\n/g, '<br>')}</p>
        
        <p>Best regards,<br>Soufiane El Qasemy</p>
      `,
    };

    // Send the email
    await mailService.send(message);
    console.log('Auto-reply sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
    return false;
  }
}