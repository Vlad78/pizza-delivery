import { CartItemWithNestedFields, CartWithNestedFields } from '@/@types/prisma'
import prisma from '@/prisma/prisma-client'

import { calcCartTotalPrice } from './calc-cart-total-price'

export const updateCartTotalPrice = async (
  token: string
): Promise<CartWithNestedFields> => {
  const cart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        include: {
          productVariant: true,
          additionIngredients: true,
          product: true,
        },
      },
    },
  })

  const totalPrice = calcCartTotalPrice(
    cart!.items as unknown as CartItemWithNestedFields[]
  )
  return (await prisma.cart.update({
    where: { id: cart!.id },
    data: {
      totalPrice,
    },
    include: {
      items: {
        include: {
          productVariant: { include: { product: true } },
          additionIngredients: true,
          product: true,
        },
      },
    },
  })) as unknown as CartWithNestedFields
}
