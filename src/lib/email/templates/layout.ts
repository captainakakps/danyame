import { colors } from "@/lib/tokens";
import { site } from "@/lib/site";
import { escapeHtml } from "@/lib/email/resend";

export interface EmailLayoutOptions {
  preheader: string;
  eyebrow: string;
  title: string;
  badge?: string;
  bodyHtml: string;
  footerNote?: string;
}

function getSiteUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return url || undefined;
}

function formatSubmittedAt(date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Accra",
  }).format(date);
}

export function formatDisplayDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function renderLogoBlock(): string {
  const siteUrl = getSiteUrl();
  const logoUrl = siteUrl ? `${siteUrl}/assets/logo.png` : null;

  if (logoUrl) {
    return `
      <img
        src="${logoUrl}"
        alt="${escapeHtml(site.name)}"
        width="140"
        height="auto"
        style="display:block;border:0;outline:none;text-decoration:none;max-width:140px;height:auto;"
      />
    `.trim();
  }

  return `
    <p style="margin:0;font-size:28px;line-height:1;font-weight:700;letter-spacing:0.08em;color:${colors.surface};font-family:Georgia,'Times New Roman',serif;">
      DANYAME
    </p>
    <p style="margin:8px 0 0;font-size:11px;line-height:1.4;letter-spacing:0.2em;text-transform:uppercase;color:${colors.teal100};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      Recreational Village
    </p>
  `.trim();
}

function renderFieldRow(label: string, value: string, valueIsLink = false): string {
  const safeValue = escapeHtml(value);
  const valueHtml = valueIsLink
    ? `<a href="mailto:${safeValue}" style="color:${colors.teal};text-decoration:none;font-weight:600;">${safeValue}</a>`
    : `<span style="color:${colors.ink};font-weight:600;">${safeValue}</span>`;

  return `
    <tr>
      <td style="padding:0 0 18px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding:14px 18px;background-color:${colors.surface2};border-radius:12px;border:1px solid ${colors.muted};">
              <p style="margin:0 0 6px;font-size:11px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:${colors.amber};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${escapeHtml(label)}
              </p>
              <p style="margin:0;font-size:16px;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${valueHtml}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `.trim();
}

export function renderEmailLayout(options: EmailLayoutOptions): string {
  const {
    preheader,
    eyebrow,
    title,
    badge,
    bodyHtml,
    footerNote = `Received via ${site.name} website`,
  } = options;

  const badgeHtml = badge
    ? `
      <span style="display:inline-block;margin:16px 0 0;padding:8px 16px;border-radius:999px;background-color:${colors.rust};color:${colors.surface};font-size:12px;line-height:1;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        ${escapeHtml(badge)}
      </span>
    `.trim()
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${colors.surface2};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${colors.surface2};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 28px;background-color:${colors.teal};border-radius:20px 20px 0 0;">
              ${renderLogoBlock()}
              <p style="margin:24px 0 0;font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:${colors.teal100};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:10px 0 0;font-size:32px;line-height:1.1;font-weight:700;color:${colors.surface};font-family:Georgia,'Times New Roman',serif;">
                ${escapeHtml(title)}
              </h1>
              ${badgeHtml}
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="height:4px;background-color:${colors.rust};font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;background-color:${colors.surface};border-left:1px solid ${colors.muted};border-right:1px solid ${colors.muted};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${bodyHtml}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px;background-color:${colors.ink};border-radius:0 0 20px 20px;border:1px solid ${colors.ink};border-top:none;">
              <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:${colors.surface};opacity:0.92;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${escapeHtml(footerNote)}
              </p>
              <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:${colors.teal100};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${escapeHtml(site.location)}
              </p>
              <p style="margin:0;font-size:11px;line-height:1.6;color:${colors.muted};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${escapeHtml(formatSubmittedAt())}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function renderMessageBlock(message: string): string {
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
    <tr>
      <td style="padding:6px 0 24px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding:20px 22px;background-color:${colors.teal50};border-radius:16px;border-left:4px solid ${colors.teal};">
              <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:${colors.teal800};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                Message
              </p>
              <p style="margin:0;font-size:16px;line-height:1.7;color:${colors.ink};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${safeMessage}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `.trim();
}

export function renderReplyButton(email: string, label = "Reply to sender"): string {
  const safeEmail = escapeHtml(email);

  return `
    <tr>
      <td align="center" style="padding:8px 0 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="border-radius:999px;background-color:${colors.rust};">
              <a href="mailto:${safeEmail}" style="display:inline-block;padding:14px 28px;font-size:14px;line-height:1;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${colors.surface};text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${escapeHtml(label)}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `.trim();
}

export { renderFieldRow };
