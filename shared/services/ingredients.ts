import { Ingredient } from '@prisma/client'

import { instance } from './instance'


export const getAll = async (): Promise<Ingredient[]> => {
  return (await instance.get<Ingredient[]>(`/ingredients`)).data
}
