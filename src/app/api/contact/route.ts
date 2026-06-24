import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/send-contact-email";
import { isRateLimited } from "@/lib/rate-limit";
import {
  isHoneypotFilled,
  validateContactPayload,
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
        { status: 429 }
      );
    }

    const validation = validateContactPayload(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await sendContactEmail(validation.data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again later." },
      { status: 500 }
    );
  }
}
