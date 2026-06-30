import { NextResponse } from 'next/server';
import data from '@/lib/data/community.json';

export async function GET(request: Request) {
  // Simulate network delay for realism
  // await new Promise(resolve => setTimeout(resolve, 500));
  
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  let result = data;
  
  if (type) {
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      result = (data as any[]).filter(item => item.tags?.includes(type));
  }
  
  return NextResponse.json(result);
}
