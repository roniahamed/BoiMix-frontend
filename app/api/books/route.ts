import { NextResponse } from "next/server";
import { fetchBooks } from "@/lib/api-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;
  const response = await fetchBooks(type);
  const books = response?.results || response || [];
  return NextResponse.json(books);
}
