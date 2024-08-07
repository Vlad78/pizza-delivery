'use client'

import { useSearchParams } from 'next/navigation'
import { useDebounce } from 'react-use'

import { handleApiCall } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-clients'
import { useCategoryStore } from '@/shared/store/categoryStore'

import { ProductListGroup } from './product-list-group'

interface Props {
  className?: string
}

export const Products = ({ className }: Props) => {
  const searchParams = useSearchParams()

  const [categories, setCategories] = useCategoryStore(state => [
    state.categories,
    state.setCategories,
  ])

  useDebounce(
    () => {
      handleApiCall(async () => {
        const res = await Api.categories.getAll(searchParams.toString())
        setCategories(res.data)
      }, "Can't get products...")
    },
    200,
    [searchParams, setCategories]
  )
  // TODO state managment

  return (
    <div className={cn(className)}>
      {categories.map(
        category =>
          category.products.length > 0 && (
            <ProductListGroup
              key={category.id}
              title={category.name}
              categoryId={category.id.toString()}
              items={category.products}
            />
          )
      )}
    </div>
  )
}
