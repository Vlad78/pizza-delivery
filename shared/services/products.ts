import { AxiosResponse } from 'axios'

import { Product } from '@prisma/client'

import { ProductWithNestedFields } from '../../@types/prisma'
import { instance } from './instance'

export const search = (query: string): Promise<AxiosResponse<Product[]>> =>
  instance.get<Product[]>(`/products/search?query=${query}`)

export const getById = (
  id: string
): Promise<AxiosResponse<ProductWithNestedFields>> =>
  instance.get<ProductWithNestedFields>(`/products/${id}`)
