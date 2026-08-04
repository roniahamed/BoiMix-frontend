import { NextResponse } from "next/server";
import { fetchCategories } from "@/lib/api-client";

export async function GET() {
  const categories = await fetchCategories();
  return NextResponse.json(categories);
}
