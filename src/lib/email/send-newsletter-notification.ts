import { site } from "@/lib/site";
import {
  getContactFromEmail,
  getContactToEmail,
  getResendClient,
} from "@/lib/email/resend";
import {
  buildNewsletterEmailHtml,
  buildNewsletterEmailText,
} from "@/lib/email/templates/newsletter-email";

export async function sendNewsletterNotification(email: string) {
  const resend = getResendClient();
  const to = getContactToEmail();
  const from = getContactFromEmail();

  const subject = `[${site.shortName}] New newsletter signup`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    text: buildNewsletterEmailText(email),
    html: buildNewsletterEmailHtml(email),
  });

  if (error) {
    throw new Error(error.message);
  }
}
