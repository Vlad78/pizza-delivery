import { AxiosResponse } from 'axios'

import { Ingredient } from '@prisma/client'

import { instance } from './instance'

export const getAll = (): Promise<AxiosResponse<Ingredient[]>> => {
  return instance.get<Ingredient[]>(`/ingredients`)
}
