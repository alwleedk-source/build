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

export function generateAdminNotificationEmail(
  customerName: string,
  customerEmail: string,
  customerPhone: string | null,
  message: string,
  messageId: number,
  adminUrl: string
): { html: string; text: string } {
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
          background-color: #d4a574;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 30px 20px;
          background-color: #f8f9fa;
        }
        .info-box {
          background-color: white;
          border-left: 4px solid #d4a574;
          padding: 15px;
          margin: 15px 0;
        }
        .info-label {
          font-weight: bold;
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
        }
        .info-value {
          color: #333;
          font-size: 14px;
          margin-top: 5px;
        }
        .message-box {
          background-color: white;
          border: 1px solid #ddd;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .button {
          display: inline-block;
          background-color: #d4a574;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">📬 Nieuw Contact Bericht</h1>
          <p style="margin: 10px 0 0 0;">BuildCraft Admin Notificatie</p>
        </div>
        <div class="content">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Er is een nieuw bericht ontvangen via het contactformulier op uw website.
          </p>

          <div class="info-box">
            <div class="info-label">Naam</div>
            <div class="info-value">${customerName}</div>
          </div>

          <div class="info-box">
            <div class="info-label">Email</div>
            <div class="info-value">
              <a href="mailto:${customerEmail}" style="color: #d4a574;">${customerEmail}</a>
            </div>
          </div>

          ${customerPhone ? `
          <div class="info-box">
            <div class="info-label">Telefoon</div>
            <div class="info-value">
              <a href="tel:${customerPhone}" style="color: #d4a574;">${customerPhone}</a>
            </div>
          </div>
          ` : ''}

          <div class="info-box">
            <div class="info-label">Datum & Tijd</div>
            <div class="info-value">${new Date().toLocaleString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
          </div>

          <div class="message-box">
            <div class="info-label" style="margin-bottom: 10px;">Bericht</div>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center;">
            <a href="${adminUrl}/admin/messages" class="button">
              Bekijk in Admin Dashboard
            </a>
          </div>
        </div>
        <div class="footer">
          <p>Dit is een automatische notificatie van uw BuildCraft website.</p>
          <p>© ${new Date().getFullYear()} BuildCraft. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
📬 NIEUW CONTACT BERICHT

Er is een nieuw bericht ontvangen via het contactformulier op uw website.

KLANT INFORMATIE:
------------------
Naam: ${customerName}
Email: ${customerEmail}
${customerPhone ? `Telefoon: ${customerPhone}` : ''}
Datum: ${new Date().toLocaleString('nl-NL')}

BERICHT:
--------
${message}

Bekijk dit bericht in uw admin dashboard:
${adminUrl}/admin/messages

---
Dit is een automatische notificatie van uw BuildCraft website.
© ${new Date().getFullYear()} BuildCraft. Alle rechten voorbehouden.
  `;

  return { html, text };
}
