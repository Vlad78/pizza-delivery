import { isAxiosError } from 'axios'

export const checkErrorType = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
