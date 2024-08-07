import { NextRequest, NextResponse } from 'next/server'

import { findPizzas } from '@/shared/lib/back-end'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('searchParams') || ''

  const categories = await findPizzas(query)

  return NextResponse.json(categories)
}
