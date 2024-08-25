import { AxiosResponse } from 'axios'

import { StoryWithNestedFields } from '@/@types/prisma'

import { instance } from './instance'


export const getAll = (): Promise<AxiosResponse<StoryWithNestedFields[]>> =>
  instance.get<StoryWithNestedFields[]>(`/stories`)
