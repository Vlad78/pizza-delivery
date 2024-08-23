import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/prisma-client'
import { checkServerErrorType, updateCartTotalPrice } from '@/shared/lib/back-end'


export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const id = Number(params.id)
    const body = await req.json()
    // TODO remove hardcode
    const token = req.cookies.get('cartToken')?.value || '123'

    if (!token) {
      return NextResponse.json({ message: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.update({
      where: { id },
      data: body,
    })

    const { totalPrice } = await updateCartTotalPrice(token)

    return NextResponse.json({ ...cartItem, totalPrice })
  } catch (error) {
    return checkServerErrorType(error)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    // TODO remove hardcode
    const token = req.cookies.get('cartToken')?.value || '123'

    if (!token) {
      return NextResponse.json({ message: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.delete({
      where: { id },
    })

    const { totalPrice } = await updateCartTotalPrice(token)

    return NextResponse.json({ ...cartItem, totalPrice })
  } catch (error) {
    return checkServerErrorType(error)
  }
}
