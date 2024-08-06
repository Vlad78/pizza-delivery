import toast from 'react-hot-toast'
import { StoreApi } from 'zustand'

import { CartState } from '@/shared/store/cart'

import { checkErrorType } from './check-error-type'

export const handleApiCallInCart = async (
  set: StoreApi<CartState>['setState'],
  func: () => Promise<undefined>,
  options: {
    addSuccessToasts?: boolean
    successText?: string
    errorText?: string
  } = {
    addSuccessToasts: false,
    successText: '',
    errorText: '',
  }
) => {
  try {
    set({ loading: true, error: false })
    await func()
    options.addSuccessToasts && toast.success('Done. ' + options.successText)
  } catch (error) {
    const errorForDev = checkErrorType(error)
    console.error(errorForDev)
    set({ error: true, errorText: errorForDev })
    toast.error(
      "It did't work! Something is going on... " + options.errorText + ' 😵'
    )
  } finally {
    set({ loading: false })
  }
}
