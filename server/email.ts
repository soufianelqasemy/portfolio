import { ContactMessage } from '@shared/schema';

/**
 * Log contact notification details (used when email service is not available)
 * @param contactMessage The contact message details
 * @returns Boolean indicating success (always true)
 */
export async function sendContactNotification(contactMessage: ContactMessage): Promise<boolean> {
  console.log('✅ Contact message received and saved to database:');
  console.log(`- From: ${contactMessage.name} (${contactMessage.email})`);
  console.log(`- Subject: ${contactMessage.subject}`);
  console.log(`- Message: ${contactMessage.message.slice(0, 100)}${contactMessage.message.length > 100 ? '...' : ''}`);
  console.log(`- Time: ${contactMessage.createdAt}`);
  
  // Always return true since we're just logging, not actually sending emails
  return true;
}

/**
 * Log auto-reply details (used when email service is not available)
 * @param contactMessage The contact message details
 * @returns Boolean indicating success (always true)
 */
export async function sendAutoReply(contactMessage: ContactMessage): Promise<boolean> {
  console.log(`✅ Auto-reply would be sent to: ${contactMessage.email}`);
  
  // Always return true since we're just logging, not actually sending emails
  return true;
}