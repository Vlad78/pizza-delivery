'use client'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/categoryStore'


interface Props {
  className?: string
}

const categories = [
  { title: 'Pizza', categoryId: '1' },
  { title: 'Burgers', categoryId: '2' },
  { title: 'Sides', categoryId: '3' },
  { title: 'Desserts', categoryId: '4' },
  { title: 'Drinks', categoryId: '5' },
]

export const Categories = ({ className }: Props) => {
  const activeCategoryId = useCategoryStore(state => state.activeId)

  return (
    <div
      className={cn(
        'inline-flex gap-1 bg-gray-100 p-1 rounded-2xl ',
        className
      )}
    >
      {categories.map((category, index) => (
        <a
          href={`/#${category.categoryId}`}
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeCategoryId === category.categoryId &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{category.title}</button>
        </a>
      ))}
    </div>
  )
}
