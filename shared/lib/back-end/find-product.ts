import qs from 'qs'

import prisma from '@/prisma/prisma-client'
import { Size } from '@prisma/client'

export type GetSearchParams = {
  priceMin?: number | null
  priceMax?: number | null
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: string) => {
  const paramsQs = qs.parse(params) as GetSearchParams

  const sizes = paramsQs.sizes?.split(',').map(e => e as Size)
  const pizzaTypes = paramsQs.pizzaTypes?.split(',')
  const ingredientsIds = paramsQs.ingredients?.split(',').map(Number)
  const priceMin = Number(paramsQs.priceMin) || DEFAULT_MIN_PRICE
  const priceMax = Number(paramsQs.priceMax) || DEFAULT_MAX_PRICE

  const categoriesPizzas = await prisma.category.findMany({
    where: {
      name: {
        equals: 'Pizza',
      },
    },
    include: {
      products: {
        where: {
          ingredients: ingredientsIds
            ? {
                some: {
                  id: {
                    in: ingredientsIds,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              type: {
                in: pizzaTypes,
              },
              price: {
                gte: priceMin,
                lte: priceMax,
              },
            },
          },
        },
        include: {
          variants: true,
          ingredients: true,
        },
      },
    },
  })

  const categoriesOther = await prisma.category.findMany({
    include: {
      products: {
        where: {
          category: {
            name: {
              not: 'Pizza',
            },
          },

          price: {
            gte: priceMin,
            lte: priceMax,
          },
        },
      },
    },
  })

  return [...categoriesPizzas, ...categoriesOther]
}
