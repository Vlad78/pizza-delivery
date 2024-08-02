import { ProductVariant } from '@prisma/client'


/**
 * Calculates the total price of a product.
 *
 * @param {number} selectedIngredientsPrice - The price of the selected ingredients.
 * @param {ProductVariant | undefined} [currentVariant] - The current variant of the product.
 * @param {number | null} [price] - The price of the product.
 * @returns {string} - The total price rounded to one decimal place.
 */
export const calcTotalProductPrice = (
  selectedIngredientsPrice: number,
  currentVariant?: ProductVariant,
  price?: number | null
): string => {
  return currentVariant
    ? (currentVariant.price + selectedIngredientsPrice).toFixed(1)
    : ((price || 0) + selectedIngredientsPrice).toFixed(1)
}
