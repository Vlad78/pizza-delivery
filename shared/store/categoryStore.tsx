import { create } from 'zustand'
interface State {
  activeId: string
  setActiveId: (id: string) => void
}

export const useCategoryStore = create<State>()(set => ({
  activeId: '1',
  setActiveId: id => set({ activeId: id }),
}))
