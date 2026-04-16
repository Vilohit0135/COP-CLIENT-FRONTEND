import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// POST /api/revalidate
// body: { secret: string, path?: string }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secret = process.env.REVALIDATE_SECRET;
    if (!body?.secret || body.secret !== secret) {
      return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
    }

    const path = body.path || "/";
    // revalidate the given path (app-router)
    revalidatePath(path);
    return NextResponse.json({ ok: true, path });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
