import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/prisma-client'

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (params.id) {
    const products = await prisma.product.findFirst({
      where: { id: Number(params.id) },
      include: { variants: true, ingredients: true },
    })
    return NextResponse.json(products)
  } else {
    return NextResponse.json([])
  }
}
