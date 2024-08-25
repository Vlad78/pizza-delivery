import { AxiosResponse } from 'axios'

import { instance } from './instance'


type Me = { name: string; email: string }

export const me = (): Promise<AxiosResponse<Me>> => instance.get<Me>(`/auth/me`)
