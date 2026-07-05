import { NextResponse } from "next/server";
import data from "@/lib/data/categories.json";

export async function GET(request: Request) {
  // Simulate network delay for realism
  // await new Promise(resolve => setTimeout(resolve, 500));

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let result = data;

  if (type) {
    result = data.filter((item) =>
      (item as unknown as { tags?: string[] }).tags?.includes(type),
    );
  }

  return NextResponse.json(result);
}
