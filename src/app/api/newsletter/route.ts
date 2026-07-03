import { NextResponse } from "next/server";

import { saveNewsletterSubscriber } from "@/lib/cms/submissions";
import { sendNewsletterNotification } from "@/lib/email/send-newsletter-notification";
import { isRateLimited } from "@/lib/rate-limit";
import {
  isHoneypotFilled,
  validateNewsletterEmail,
} from "@/lib/validation/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (isHoneypotFilled(body)) {
      return NextResponse.json({ ok: true });
    }

    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const validation = validateNewsletterEmail(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await saveNewsletterSubscriber(validation.email);

    if (result.created) {
      try {
        await sendNewsletterNotification(validation.email);
      } catch (emailError) {
        console.error("[newsletter] email failed after save:", emailError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter]", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again later." },
      { status: 500 },
    );
  }
}
