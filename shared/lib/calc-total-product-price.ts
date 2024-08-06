/**
 * Calculates the total price of a product.
 *
 * @param {number} selectedIngredientsPrice - The price of the selected ingredients.
 * @param {number | null} [currentVariant] - The current variant of the product.
 * @param {number | null} [price] - The price of the product.
 * @returns {string} - The total price rounded to one decimal place.
 */
export const calcTotalProductPrice = (
  selectedIngredientsPrice: number = 0,
  currentVariantPrice?: number | null,
  productPrice?: number | null
): number => {
  return (
    Math.round(
      (currentVariantPrice
        ? (currentVariantPrice || 0) + selectedIngredientsPrice
        : (productPrice || 0) + selectedIngredientsPrice) * 10
    ) / 10
  )
}
