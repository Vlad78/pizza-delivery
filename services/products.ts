import { Product } from '@prisma/client'

import { instance } from './instance'


export const search = async (query: string): Promise<Product[]> => {
  return (await instance.get<Product[]>(`/products/search?query=${query}`)).data
}
