import { Ingredient, Product, ProductVariant } from '@prisma/client'

export type ProductWithNestedFields = Product & {
  variants: ProductVariant[]
  ingredients: Ingredient[]
}
