import { NextResponse } from "next/server";
import tracking from "@/lib/data/tracking.json";

export async function GET() {
  return NextResponse.json(tracking);
}
