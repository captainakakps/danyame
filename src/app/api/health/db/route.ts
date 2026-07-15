import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.ENABLE_DB_HEALTHCHECK !== "true") {
    return Response.json({ error: "Disabled" }, { status: 404 });
  }

  try {
    const payload = await getPayloadClient();

    const events = await payload.find({
      collection: "events",
      limit: 1,
      overrideAccess: true,
    });

    const homePage = await payload.findGlobal({
      slug: "home-page",
      depth: 0,
    });

    return Response.json({
      ok: true,
      events: events.totalDocs,
      homePage: Boolean(homePage),
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));

    return Response.json(
      {
        ok: false,
        message: err.message,
        cause:
          err.cause instanceof Error
            ? err.cause.message
            : err.cause
              ? String(err.cause)
              : undefined,
      },
      { status: 500 },
    );
  }
}
