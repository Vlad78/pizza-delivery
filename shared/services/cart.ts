import { AxiosResponse } from 'axios'

import { CartWithNestedFields } from '@/@types/prisma'
import { addItemToCartProps } from '@/shared/store/cart'
import { CartItem } from '@prisma/client'

import { instance } from './instance'

export const get = (): Promise<AxiosResponse<CartWithNestedFields>> => {
  return instance.get('/cart')
}

export const updateItemQuantity = (
  id: number | string,
  field: string,
  value: number
): Promise<AxiosResponse<CartItem & { totalPrice: number }>> => {
  return instance.patch(`/cart/${id}`, { [field]: value })
}

export const deleteItem = (
  id: number | string
): Promise<AxiosResponse<CartItem & { totalPrice: number }>> => {
  return instance.delete(`/cart/${id}`)
}

export const addItemToCart = (
  item: addItemToCartProps
): Promise<AxiosResponse<CartWithNestedFields>> => {
  return instance.post('/cart', item)
}
