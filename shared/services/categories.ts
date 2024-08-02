import { Category, Ingredient, Product, ProductVariant } from '@prisma/client'

import { instance } from './instance'

export type CategoryWithNestedFields = Category & {
  products: (Product & {
    variants: ProductVariant[]
    ingredients: Ingredient[]
  })[]
}

export const getAll = async (): Promise<CategoryWithNestedFields[]> => {
  return (await instance.get('/categories')).data
}
