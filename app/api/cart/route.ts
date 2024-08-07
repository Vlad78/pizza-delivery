import { NextRequest, NextResponse } from 'next/server'

import { CartItemWithNestedFields } from '@/@types/prisma'
import prisma from '@/prisma/prisma-client'
import { checkServerErrorType, getCart, updateCartTotalPrice } from '@/shared/lib/back-end'


export async function GET(req: NextRequest) {
  try {
    // TODO remove hardcode
    const token = req.cookies.get('cartToken')?.value || '123'

    if (!token) {
      return NextResponse.json({ message: 'Cart token not found' })
    }

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          include: {
            productVariant: { include: { product: true } },
            additionIngredients: true,
            product: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
    return NextResponse.json(cart)
  } catch (error) {
    return checkServerErrorType(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value
    if (!token) {
      token = crypto.randomUUID()
    }

    const cart = await getCart(token)

    const body = (await req.json()) as CartItemWithNestedFields

    // looking for the same item in cart
    let findCartItem = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
        productVariantId: body.productVariantId,
        productId: body.productId,
      },
      include: {
        additionIngredients: true,
      },
    }) as unknown as CartItemWithNestedFields[]

    let additionIngredientsEqualArraysItem: CartItemWithNestedFields[] = []

    // compare every field in every found item of additionIngredients arrays
    if (!findCartItem || findCartItem.length !== 0) {
      additionIngredientsEqualArraysItem = findCartItem.filter(item => {
        return (item.additionIngredients.every(ingr =>
          body.additionIngredients.some(reqIngr => ingr.id === reqIngr.id)
        ) && body.additionIngredients.every(reqIngr =>
          item.additionIngredients.some(ingr => ingr.id === reqIngr.id)
        ))
      })
    }

    if (additionIngredientsEqualArraysItem.length > 0) {
      await prisma.cartItem.update({
        where: {
          id: additionIngredientsEqualArraysItem[0].id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      })
    } else {
      // if we don't have same product in cart - create new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId: body.productVariantId,
          productId: body.productId,
          quantity: 1,
          additionIngredients: {
            connect: body.additionIngredients?.map(({ id }) => ({ id })),
          },
        },
      })
    }

    const updatedCart = await updateCartTotalPrice(token)

    const response = NextResponse.json(updatedCart)
    response.cookies.set('cartToken', token)
    return response
  } catch (error) {
    return checkServerErrorType(error)
  }
}
