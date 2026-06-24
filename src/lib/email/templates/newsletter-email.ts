import { site } from "@/lib/site";
import {
  renderEmailLayout,
  renderFieldRow,
  renderReplyButton,
} from "@/lib/email/templates/layout";

export function buildNewsletterEmailHtml(email: string): string {
  const bodyHtml = [
    `
      <tr>
        <td style="padding:0 0 24px;">
          <p style="margin:0;font-size:16px;line-height:1.7;color:#575757;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            A new visitor subscribed to your newsletter. Add them to your mailing list when ready.
          </p>
        </td>
      </tr>
    `.trim(),
    renderFieldRow("Subscriber email", email, true),
    renderReplyButton(email, "Send welcome email"),
  ].join("");

  return renderEmailLayout({
    preheader: `${email} just subscribed to the Danyame newsletter.`,
    eyebrow: "Newsletter",
    title: "New subscriber",
    badge: "Signup",
    bodyHtml,
    footerNote: `Newsletter signup · ${site.name}`,
  });
}

export function buildNewsletterEmailText(email: string): string {
  return [
    `New newsletter signup for ${site.name}`,
    "",
    `Email: ${email}`,
    "",
    `Reply to: ${email}`,
  ].join("\n");
}
