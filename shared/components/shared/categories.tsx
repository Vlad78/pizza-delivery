'use client'

import { CategoryWithNestedFields } from '@/@types/prisma'
import { cn } from '@/shared/lib/'
import { useCategoryStore } from '@/shared/store/categoryStore'

interface Props {
  categories?: CategoryWithNestedFields[]
  className?: string
}

export const Categories = ({ className }: Props) => {
  const [activeCategoryId, categories] = useCategoryStore(state => [
    state.activeId,
    state.categories,
  ])

  return (
    <div
      className={cn(
        'inline-flex gap-1 bg-gray-100 p-1 rounded-2xl ',
        className
      )}
    >
      {categories.map(
        (category, index) =>
          category.products.length > 0 && (
            <a
              href={`/#${category.id}`}
              key={index}
              className={cn(
                'flex items-center font-bold h-11 rounded-2xl px-5',
                activeCategoryId === category.id.toString() &&
                  'bg-white shadow-md shadow-gray-200 text-primary'
              )}
            >
              <button>{category.name}</button>
            </a>
          )
      )}
    </div>
  )
}
