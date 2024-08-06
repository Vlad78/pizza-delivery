import { StoreApi } from 'zustand'

import { CartState } from '@/shared/store/cart'

import { checkErrorType } from './check-error-type'

export const handleApiCall = async (
  set: StoreApi<CartState>['setState'],
  func: () => Promise<undefined>
) => {
  try {
    set({ loading: true, error: false })
    await func()
  } catch (error) {
    console.log(error)
    const errorText = checkErrorType(error)
    set({ error: true, errorText })
  } finally {
    set({ loading: false })
  }
}
