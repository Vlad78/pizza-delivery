import { CartItemWithNestedFields } from '@/@types/prisma'

export const calcCartTotalPrice = (
  cartItems: CartItemWithNestedFields[]
): number =>
  Math.round(
    cartItems.reduce((acc, item) => {
      if (item.product?.price) {
        return (acc += item.product.price * item.quantity)
      } else {
        const ingredientsPrice = item.additionIngredients.reduce(
          (acc, ingredient) => {
            return (acc += ingredient.price || 0)
          },
          0
        )
        return (acc +=
          ((item.productVariant?.price || 0) + ingredientsPrice) *
          item.quantity)
      }
    }, 0) * 10
  ) / 10
