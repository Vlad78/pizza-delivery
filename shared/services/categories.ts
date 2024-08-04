import { AxiosResponse } from 'axios'

import { CategoryWithNestedFields } from '@/@types/prisma'

import { instance } from './instance'

export const getAll = (): Promise<
  AxiosResponse<CategoryWithNestedFields[]>
> => {
  return instance.get('/categories')
}
