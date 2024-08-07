import { AxiosResponse } from 'axios'

import { CategoryWithNestedFields } from '@/@types/prisma'

import { instance } from './instance'

export const getAll = (
  searchParams: string
): Promise<AxiosResponse<CategoryWithNestedFields[]>> => {
  return instance.get(`/categories`, { params: { searchParams } })
}
