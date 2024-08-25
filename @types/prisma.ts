import { Cart, CartItem, Category, Ingredient, Product, ProductVariant, Story, StoryItem } from '@prisma/client'


type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type ProductWithNestedFields = Product & {
  variants: ProductVariant[]
  ingredients: Ingredient[]
}

export type ProductVariantWithNestedFields = ProductVariant & {
  product: Product
}

export type CategoryWithNestedFields = Category & {
  products: (Product & {
    variants: ProductVariant[]
    ingredients: Ingredient[]
  })[]
}

export type CartItemWithNestedFields = Omit<
  CartItem,
  'productId' | 'productVariantId'
> & {
  additionIngredients: Ingredient[]
} & XOR<
    {
      productVariant: ProductVariantWithNestedFields | null
      productVariantId: number | null
    },
    { product: Product | null; productId: number | null }
  >

export type CartWithNestedFields = Cart & {
  items: CartItemWithNestedFields[]
}

export type StoryWithNestedFields = Story & {
  items: StoryItem[]
}
