import { create } from 'zustand'

import { CategoryWithNestedFields } from '../../@types/prisma'

interface State {
  categories: CategoryWithNestedFields[]
  activeId: string
  setActiveId: (id: string) => void
  setCategories: (categories: CategoryWithNestedFields[]) => void
}

export const useCategoryStore = create<State>()(set => ({
  categories: [],
  activeId: '1',
  setActiveId: id => set({ activeId: id }),
  setCategories: categories => set({ categories }),
}))
