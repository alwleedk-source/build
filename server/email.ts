import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(
  options: EmailOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: 'RESEND_API_KEY not configured',
      };
    }

    const { data, error } = await resend.emails.send({
      from: 'BuildCraft <noreply@thefluyt.nl>',
      to: [options.to],
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error('Error sending email via Resend:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    console.log('Email sent successfully via Resend:', data);
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
  customerMessage: string,
  customSubject?: string,
  contactPhone?: string,
  contactEmail?: string
): { html: string; text: string; subject: string } {
  const subject = customSubject || 'Bedankt voor uw bericht';

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
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #D4AF37;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          .message-box {
            background-color: white;
            padding: 20px;
            border-left: 4px solid #D4AF37;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>BuildCraft</h1>
          <p>Professional Construction Services</p>
        </div>
        <div class="content">
          <p>Beste ${customerName},</p>
          
          <p>Hartelijk dank voor uw bericht. Wij hebben uw aanvraag in goede orde ontvangen en zullen zo spoedig mogelijk contact met u opnemen.</p>
          
          <div class="message-box">
            <strong>Uw bericht:</strong>
            <p>${customerMessage}</p>
          </div>
          
          <p>Ons team zal uw aanvraag beoordelen en binnen 24 uur reageren. Voor dringende zaken kunt u ons bereiken op:</p>
          
          ${contactPhone || contactEmail ? '<ul>' : ''}
            ${contactPhone ? `<li>Telefoon: ${contactPhone}</li>` : ''}
            ${contactEmail ? `<li>Email: ${contactEmail}</li>` : ''}
          ${contactPhone || contactEmail ? '</ul>' : ''}
          
          <p>Met vriendelijke groet,<br>
          <strong>Het BuildCraft Team</strong></p>
        </div>
        <div class="footer">
          <p>BuildCraft - Professional Construction Services<br>
          Bouwstraat 123, 1234 AB Amsterdam, Nederland<br>
          © ${new Date().getFullYear()} BuildCraft. Alle rechten voorbehouden.</p>
        </div>
      </body>
    </html>
  `;

  const text = `
Beste ${customerName},

Hartelijk dank voor uw bericht. Wij hebben uw aanvraag in goede orde ontvangen en zullen zo spoedig mogelijk contact met u opnemen.

Uw bericht:
${customerMessage}

Ons team zal uw aanvraag beoordelen en binnen 24 uur reageren.${contactPhone || contactEmail ? ' Voor dringende zaken kunt u ons bereiken op:' : ''}
${contactPhone ? `- Telefoon: ${contactPhone}` : ''}
${contactEmail ? `- Email: ${contactEmail}` : ''}

Met vriendelijke groet,
Het BuildCraft Team

---
BuildCraft - Professional Construction Services
Bouwstraat 123, 1234 AB Amsterdam, Nederland
© ${new Date().getFullYear()} BuildCraft. Alle rechten voorbehouden.
  `;

  return { html, text, subject };
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
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #D4AF37;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .info-box {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .info-row {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #D4AF37;
            display: inline-block;
            width: 120px;
          }
          .message-box {
            background-color: white;
            padding: 20px;
            border-left: 4px solid #D4AF37;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #D4AF37;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📧 Nieuw Contact Bericht</h1>
        </div>
        <div class="content">
          <p>Er is een nieuw bericht binnengekomen via het contactformulier:</p>
          
          <div class="info-box">
            <div class="info-row">
              <span class="label">Naam:</span>
              <span>${customerName}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span><a href="mailto:${customerEmail}">${customerEmail}</a></span>
            </div>
            ${customerPhone ? `
            <div class="info-row">
              <span class="label">Telefoon:</span>
              <span><a href="tel:${customerPhone}">${customerPhone}</a></span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Datum:</span>
              <span>${new Date().toLocaleString('nl-NL')}</span>
            </div>
          </div>
          
          <div class="message-box">
            <strong>Bericht:</strong>
            <p>${message}</p>
          </div>
          
          <p>Vergeet niet om binnen 24 uur te reageren voor de beste klantenservice!</p>
          
          <a href="${adminUrl}/admin/messages" class="button">
            Bekijk in Admin Dashboard
          </a>
        </div>
      </body>
    </html>
  `;

  const text = `
📬 NIEUW CONTACT BERICHT

Er is een nieuw bericht ontvangen via het contactformulier.

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
© ${new Date().getFullYear()} BuildCraft. Alle rechten voorbehouden.
  `;

  return { html, text };
}
