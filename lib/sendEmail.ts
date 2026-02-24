import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = "https://filmry.io";
const POSTER_URL = `${SITE_URL}/images/email/email-poster-1200x400.jpg`;
const CTA_URL = "https://x.com/filmryio";
const CURRENT_YEAR = new Date().getFullYear();

export async function sendWaitlistEmail(email: string) {
  const text = `You're on the list.

Private early access. Limited invites.

Thanks for joining Filmry. Early access will roll out in waves.
You'll be the first to know when your invite is ready.

Make films. Not chaos.

Visit Filmry: ${CTA_URL}

—
Filmry — a product of Mavren Studios Ltd
Need help? hello@filmry.io
© ${CURRENT_YEAR} Filmry`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style type="text/css">a.cta-button:hover{background:#e8e8e8!important;box-shadow:0 4px 20px rgba(255,255,255,0.2)!important;}</style>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">You're on the Filmry waitlist — private early access. Limited invites.</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(180deg,#0a0a0a 0%,#050505 50%,#020202 100%);min-height:100vh;">
    <tr>
      <td align="center" style="padding:32px 24px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:480px;border-radius:16px;overflow:hidden;">
          <!-- Poster (branding in banner only) -->
          <tr>
            <td style="overflow:hidden;border-top-left-radius:16px;border-top-right-radius:16px;background:#000;padding:0;line-height:0;">
              <img src="${POSTER_URL}" alt="Filmry" width="640" style="width:100%;height:auto;border:0;display:block;" />
            </td>
          </tr>
          <!-- Title (compact spacing from banner) -->
          <tr>
            <td style="padding:20px 24px 4px 24px;">
              <h1 style="margin:0;font-size:28px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">You're on the list.</h1>
            </td>
          </tr>
          <!-- Subtitle -->
          <tr>
            <td style="padding:0 24px 16px;">
              <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.6);letter-spacing:0.02em;font-weight:500;">Private early access. Limited invites.</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding:0 24px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="60">
                <tr>
                  <td style="height:1px;background:rgba(255,255,255,0.15);box-shadow:0 0 8px rgba(255,255,255,0.06);"></td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px;">
              <p style="margin:0;font-size:16px;color:rgba(255,255,255,0.9);line-height:1.6;">Thanks for joining Filmry. Early access will roll out in waves.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 20px;">
              <p style="margin:0;font-size:16px;color:rgba(255,255,255,0.9);line-height:1.6;">You'll be the first to know when your invite is ready.</p>
            </td>
          </tr>
          <!-- Statement -->
          <tr>
            <td style="padding:0 24px 24px;">
              <p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;letter-spacing:0.01em;">Make films. Not chaos.</p>
            </td>
          </tr>
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:0 24px 32px;">
              <a href="${CTA_URL}" target="_blank" class="cta-button" style="display:inline-block;padding:16px 36px;background:#ffffff;color:#0a0a0a;font-size:15px;font-weight:600;text-decoration:none;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.4),0 0 1px rgba(255,255,255,0.1);">Visit Filmry</a>
            </td>
          </tr>
          <!-- Footer divider -->
          <tr>
            <td style="padding:0 24px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="height:1px;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.08) 50%,transparent 100%);"></td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:0 24px 6px;">
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Filmry — a product of Mavren Studios Ltd</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 24px 6px;">
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Need help? <a href="mailto:hello@filmry.io" style="color:rgba(255,255,255,0.7);text-decoration:underline;">hello@filmry.io</a></p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 24px 24px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">© ${CURRENT_YEAR} Filmry</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "You're on the Filmry waitlist",
    html,
    text,
  });
}
