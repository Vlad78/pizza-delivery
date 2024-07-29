import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSet } from 'react-use'


type PriceRangeProps = {
  min?: number | null
  max?: number | null
}

type ReturnType = {
  selectedSizes: Set<string>
  toggleSizes: (id: string) => void
  selectedPizzaTypes: Set<string>
  togglePizzaTypes: (id: string) => void
  selectedIngredients: Set<string>
  toggleIngredientId: (id: string) => void
  priceRange: PriceRangeProps
  setPriceRange: Dispatch<SetStateAction<PriceRangeProps>>
}

export const useFilters = (): ReturnType => {
  const searchParams = useSearchParams()

  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes')?.split(',') || [])
  )
  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes')?.split(',') || [])
  )
  const [selectedIngredients, { toggle: toggleIngredientId }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',') || [])
  )

  const priceRangeInitial = {
    min: Number(searchParams.get('priceMin') || undefined) || null,
    max: Number(searchParams.get('priceMax') || undefined) || null,
  }

  const [priceRange, setPriceRange] =
    useState<PriceRangeProps>(priceRangeInitial)

  return {
    selectedSizes,
    toggleSizes,
    selectedPizzaTypes,
    togglePizzaTypes,
    selectedIngredients,
    toggleIngredientId,
    priceRange,
    setPriceRange,
  }
}
