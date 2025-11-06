import nodemailer from 'nodemailer';
import type { EmailSettings } from '../drizzle/schema';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(
  emailSettings: EmailSettings,
  options: EmailOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if email settings are configured
    if (!emailSettings.smtpHost || !emailSettings.smtpPort || !emailSettings.smtpUser || !emailSettings.smtpPassword) {
      return {
        success: false,
        error: 'Email settings not configured. Please configure SMTP settings in Admin Settings.',
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: emailSettings.smtpHost,
      port: emailSettings.smtpPort,
      secure: emailSettings.smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: emailSettings.smtpUser,
        pass: emailSettings.smtpPassword,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"${emailSettings.fromName || 'BuildCraft'}" <${emailSettings.fromEmail || emailSettings.smtpUser}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export function generateAutoReplyEmail(
  customerName: string,
  customMessage?: string
): { html: string; text: string } {
  const defaultMessage = `
    <p>Beste ${customerName},</p>
    <p>Hartelijk dank voor uw bericht. Wij hebben uw aanvraag in goede orde ontvangen en zullen zo spoedig mogelijk contact met u opnemen.</p>
    <p>Ons team bekijkt uw bericht zorgvuldig en streeft ernaar binnen 24 uur te reageren.</p>
    <p>Met vriendelijke groet,</p>
    <p><strong>Het BuildCraft Team</strong></p>
  `;

  const message = customMessage || defaultMessage;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-bottom: 3px solid #d4a574;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: #d4a574; margin: 0;">BuildCraft</h1>
          <p style="margin: 5px 0 0 0; color: #666;">Professional Construction Services</p>
        </div>
        <div class="content">
          ${message}
        </div>
        <div class="footer">
          <p>Dit is een automatisch gegenereerd bericht. Gelieve niet te antwoorden op deze email.</p>
          <p>© ${new Date().getFullYear()} BuildCraft. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Beste ${customerName},

Hartelijk dank voor uw bericht. Wij hebben uw aanvraag in goede orde ontvangen en zullen zo spoedig mogelijk contact met u opnemen.

Ons team bekijkt uw bericht zorgvuldig en streeft ernaar binnen 24 uur te reageren.

Met vriendelijke groet,
Het BuildCraft Team

---
Dit is een automatisch gegenereerd bericht. Gelieve niet te antwoorden op deze email.
© ${new Date().getFullYear()} BuildCraft. Alle rechten voorbehouden.
  `;

  return { html, text };
}
