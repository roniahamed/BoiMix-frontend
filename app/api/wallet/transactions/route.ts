import { NextResponse } from 'next/server';
import transactions from '@/lib/data/transactions.json';

export async function GET() {
  return NextResponse.json(transactions);
}
