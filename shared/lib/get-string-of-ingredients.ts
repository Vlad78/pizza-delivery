import { Ingredient } from '@prisma/client'


export const getStringOfIngredients = (ingredients?: Ingredient[]) => {
  if (!!ingredients?.length)
    return `+ ${ingredients
      ?.reduce((acc, ingredient) => `${acc} ${ingredient.name},`, '')
      .slice(0, -1)}`
  return ""
}
