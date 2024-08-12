import { Ingredient } from '@prisma/client'


/**
 * Calculates the total price of a product.
 *
 * @param {number} selectedIngredientsPrice - The price of the selected ingredients.
 * @param {number | null} [currentVariant] - The current variant of the product.
 * @param {number | null} [price] - The price of the product.
 * @returns {string} - The total price rounded to one decimal place.
 */
export const calcTotalProductPrice = (
  ingredients: Ingredient[],
  currentVariantPrice?: number | null,
  productPrice?: number | null
): number => {
  const ingredientsPrice = ingredients.reduce((acc, item) => acc + (item.price || 0), 0)
  return (
    Math.round(
      (currentVariantPrice
        ? (currentVariantPrice || 0) + ingredientsPrice
        : (productPrice || 0) + ingredientsPrice) * 10
    ) / 10
  )
}
