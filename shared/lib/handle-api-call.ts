import toast from 'react-hot-toast'

import { checkErrorType } from './check-error-type'


type Options = {
  errorMessage?: string
}

export async function handleApiCall(
  func: () => Promise<undefined | void>,
  options?: Options
) {
  try {
    await func()
  } catch (error) {
    const errorText = checkErrorType(error)
    console.error(options?.errorMessage, errorText)
    toast.error(
      'Oh, no! ' +
        (errorText || options?.errorMessage || 'Something went wrong') +
        ' 😞'
    )
  }
}
