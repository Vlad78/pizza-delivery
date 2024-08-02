import { Ingredient } from '@prisma/client'


export const getStringOfIngredients = (ingredients?: Ingredient[]) => {
  return `${ingredients
    ?.reduce((acc, ingredient) => `${acc} ${ingredient.name},`, '')
    .slice(0, -1)}`
}
