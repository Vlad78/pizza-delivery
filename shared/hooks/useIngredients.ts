import { useEffect, useState } from 'react'

import { Ingredient } from '@prisma/client'

import { Api } from '../services/api-clients'


type ReturnProps = {
  filterIngredients: Ingredient[]
  loading: boolean
}
export const useIngredients = (): ReturnProps => {
  const [filterIngredients, setFilterIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Api.ingredients
      .getAll()
      .then(ingredients => {
        setFilterIngredients(ingredients)
      })
      .catch(err => console.log(err)) // TODO toasts
      .finally(() => setLoading(false))
  }, [])

  return {
    filterIngredients,
    loading,
  }
}
