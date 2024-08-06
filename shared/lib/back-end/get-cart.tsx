import { CartWithNestedFields } from '@/@types/prisma'
import prisma from '@/prisma/prisma-client'

export const getCart = async (token: string): Promise<CartWithNestedFields> => {
  let cart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        include: {
          productVariant: true,
          additionIngredients: true,
        },
      },
    },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        token,
      },
      include: {
        items: {
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            additionIngredients: true,
          },
        },
      },
    })
  }

  return cart as unknown as CartWithNestedFields
}
