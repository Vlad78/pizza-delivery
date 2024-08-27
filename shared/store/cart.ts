import { create } from 'zustand'

import { CartItemWithNestedFields } from '@/@types/prisma'
import { handleApiCallInCart } from '@/shared/lib/'
import { Api } from '@/shared/services/api-clients'


export type addItemToCartProps = Pick<
  CartItemWithNestedFields,
  'productId' | 'productVariantId' | 'additionIngredients'
>
export type CartState = {
  loading: boolean
  error: boolean
  errorText: string
  totalPrice: number
  items: CartItemWithNestedFields[]
  fetchCartItems: () => Promise<void>
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>
  addItemToCart: (item: addItemToCartProps) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
}

export const useCart = create<CartState>()((set, get) => ({
  loading: false,
  error: false,
  errorText: '',
  totalPrice: 0,
  items: [],
  fetchCartItems: async () => {
    handleApiCallInCart(set, async () => {
      const res = await Api.cart.get()
      set({ ...res.data })
    })
  },
  updateCartItemQuantity: async (id: number, quantity: number) => {
    handleApiCallInCart(set, async () => {
      const { totalPrice, ...data } = (
        await Api.cart.updateItemQuantity(id, 'quantity', quantity)
      ).data
      set({
        items: get().items.map(item =>
          item.id === id ? { ...item, quantity: data.quantity } : item
        ),
        totalPrice,
      })
    })
  },
  addItemToCart: async item => {
    handleApiCallInCart(
      set,
      async () => {
        const cart = (await Api.cart.addItemToCart(item)).data
        set({
          items: [...cart.items],
          totalPrice: cart.totalPrice,
        })
      },
      { addSuccessToasts: true, successText: 'Product is added to cart' }
    )
  },
  removeCartItem: async (id: number) => {
    handleApiCallInCart(set, async () => {
      const { totalPrice } = (await Api.cart.deleteItem(id)).data
      set({
        items: get().items.filter(item => item.id !== id),
        totalPrice,
      })
    })
  },
}))
