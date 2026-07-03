import { getSiteSettings } from "@/lib/cms/site-settings";
import type { ContactPayload } from "@/lib/validation/contact";
import {
  getContactFromEmail,
  getContactToEmail,
  getResendClient,
} from "@/lib/email/resend";
import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/email/templates/contact-email";

export async function sendContactEmail(payload: ContactPayload) {
  const site = await getSiteSettings();
  const resend = getResendClient();
  const to = getContactToEmail();
  const from = getContactFromEmail();

  const subject = `[${site.shortName}] New inquiry — ${payload.eventType}`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject,
    text: buildContactEmailText(payload),
    html: buildContactEmailHtml(payload),
  });

  if (error) {
    throw new Error(error.message);
  }
}
