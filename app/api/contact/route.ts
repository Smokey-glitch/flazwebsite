import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^(0?5[0-9]{8})$/),
  intent: z.enum(["quote", "maintenance", "amc", "visit", "technical"]).optional(),
  enquiryType: z.string().max(80).optional(),
  message: z.string().max(1500).optional(),
  // The forms require the visitor to tick the consent box; reject any submission that bypasses it.
  consent: z.literal(true),
});

const INTENT_LABELS: Record<string, string> = {
  quote: "Project quote",
  maintenance: "Maintenance request",
  amc: "AMC proposal",
  visit: "Site visit",
  technical: "Technical problem",
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "amanalili@flaztechnicalservices.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "noreply@flaztechnicalservices.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }
  const { name, phone, intent, enquiryType, message } = parsed.data;
  const kind = enquiryType ?? (intent ? INTENT_LABELS[intent] : "Callback request");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `Flaz Website <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    subject: `${kind} — ${name}`,
    text: `Enquiry: ${kind}\nName: ${name}\nPhone: +971 ${phone.replace(/^0/, "")}${message ? `\n\nMessage:\n${message}` : ""}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send message" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
