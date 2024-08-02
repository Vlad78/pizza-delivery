import { AxiosError } from 'axios'

import { Product } from '@prisma/client'

import { ProductWithNestedFields } from '../../@types/prisma'
import { instance } from './instance'

export const search = async (query: string): Promise<Product[]> => {
  return (await instance.get<Product[]>(`/products/search?query=${query}`)).data
}

export const getById = async (
  id: string
): Promise<ProductWithNestedFields | null> => {
  try {
    return (await instance.get<ProductWithNestedFields>(`/products/${id}`)).data
  } catch (error) {
    const err = error as AxiosError
    console.log(err.code)
    return null
  }
}
