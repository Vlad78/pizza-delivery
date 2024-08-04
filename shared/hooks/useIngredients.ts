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
    ;(async () => {
      try {
        const res = await Api.ingredients.getAll()
        setFilterIngredients(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return {
    filterIngredients,
    loading,
  }
}
