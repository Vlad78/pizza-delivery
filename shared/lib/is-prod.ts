export const isProdMode = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

export const isVercel = (): boolean => {
  return process.env.VERCEL === '1'
}
