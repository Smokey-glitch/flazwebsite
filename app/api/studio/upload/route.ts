import { randomBytes } from "node:crypto";
import { putFile } from "@/lib/github-content";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "Only image uploads are allowed" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
  const filename = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const path = `public/images/uploads/${filename}`;

  try {
    await putFile({ path, content: buffer, message: `Upload image ${filename} via studio` });
    return Response.json({ path: `/images/uploads/${filename}` });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed" }, { status: 502 });
  }
}
