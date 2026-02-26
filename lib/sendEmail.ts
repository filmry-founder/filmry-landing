import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = "https://filmry.io";
const POSTER_URL = `${SITE_URL}/images/email/email-poster-1200x400-v2.jpg`;
const CTA_URL = SITE_URL;

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
© 2025–2026 Mavren Studios Ltd`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>You're on the Filmry waitlist</title>
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .outer-pad { padding: 24px 20px !important; }
      .inner-pad { padding-left: 24px !important; padding-right: 24px !important; }
      .headline { font-size: 24px !important; }
      .cta-cell { padding-left: 24px !important; padding-right: 24px !important; }
      .cta-button { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">You're on the Filmry waitlist — private early access. Limited invites.</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#000000;min-height:100vh;">
    <tr>
      <td align="center" class="outer-pad" style="padding:40px 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#0b0b0d;border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="${POSTER_URL}" alt="Filmry" width="1200" style="width:100%;height:auto;border:0;display:block;border-top-left-radius:16px;border-top-right-radius:16px;" />
            </td>
          </tr>
          <tr>
            <td class="inner-pad" style="padding:24px 40px 0 40px;">
              <h1 class="headline" style="margin:0;font-size:28px;font-weight:600;color:#ffffff;font-family:Helvetica,Arial,sans-serif;">You're on the list.</h1>
            </td>
          </tr>
          <tr>
            <td class="inner-pad" style="padding:0 40px 16px 40px;">
              <p style="margin:0;font-size:16px;color:#a1a1aa;font-family:Helvetica,Arial,sans-serif;">Private early access. Limited invites.</p>
            </td>
          </tr>
          <tr>
            <td class="inner-pad" style="padding:0 40px 20px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="height:1px;background-color:rgba(255,255,255,0.06);"></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="inner-pad" style="padding:0 40px 8px 40px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#d4d4d8;font-family:Helvetica,Arial,sans-serif;">Thanks for joining Filmry. Early access will roll out in waves.</p>
            </td>
          </tr>
          <tr>
            <td class="inner-pad" style="padding:0 40px 8px 40px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#d4d4d8;font-family:Helvetica,Arial,sans-serif;">You'll be the first to know when your invite is ready.</p>
            </td>
          </tr>
          <tr>
            <td class="inner-pad" style="padding:0 40px 24px 40px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#d4d4d8;font-family:Helvetica,Arial,sans-serif;">Make films. Not chaos.</p>
            </td>
          </tr>
          <tr>
            <td align="center" class="cta-cell" style="padding:0 40px 32px 40px;">
              <a href="${CTA_URL}" target="_blank" rel="noopener noreferrer" class="cta-button" style="display:inline-block;padding:14px 28px;background-color:#e5e5e5;background:linear-gradient(180deg,#ffffff 0%,#e5e5e5 100%);color:#111111;font-size:15px;font-weight:600;text-decoration:none;border-radius:12px;font-family:Helvetica,Arial,sans-serif;box-shadow:0 4px 20px rgba(255,255,255,0.15);">Visit Filmry</a>
            </td>
          </tr>
          <tr>
            <td align="center" class="inner-pad" style="padding:24px 40px 0 40px;">
              <p style="margin:0;font-size:12px;color:#71717a;font-family:Helvetica,Arial,sans-serif;">Filmry — a product of Mavren Studios Ltd</p>
            </td>
          </tr>
          <tr>
            <td align="center" class="inner-pad" style="padding:4px 40px 0 40px;">
              <p style="margin:0;font-size:12px;color:#71717a;font-family:Helvetica,Arial,sans-serif;">Need help? <a href="mailto:hello@filmry.io" style="color:#71717a;text-decoration:underline;">hello@filmry.io</a></p>
            </td>
          </tr>
          <tr>
            <td align="center" class="inner-pad" style="padding:4px 40px 24px 40px;">
              <p style="margin:0;font-size:12px;color:#71717a;font-family:Helvetica,Arial,sans-serif;">© 2025–2026 Mavren Studios Ltd</p>
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
