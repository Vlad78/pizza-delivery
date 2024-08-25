import toast from 'react-hot-toast'

import { checkErrorType } from './check-error-type'


export const handleApiCall = async (
  func: () => Promise<undefined | void>,
  message?: string
) => {
  try {
    await func()
  } catch (error) {
    const errorText = checkErrorType(error)
    console.error(message, errorText)
    toast.error('Oh, no! ' + (message || errorText) + ' 😞')
  }
}
