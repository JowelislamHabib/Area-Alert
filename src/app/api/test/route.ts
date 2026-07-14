import { NextResponse } from "next/server";
import { getTokenServer } from "@/lib/getTokenServer";

export async function GET() {
  try {
    const token = await getTokenServer();
    return NextResponse.json({ token: token || "null" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack });
  }
}
