import { NextResponse } from "next/server";
import { fetchBooks } from "@/lib/api-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;
  const books = await fetchBooks(type);
  return NextResponse.json(books);
}
