'use client'

import { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

import { ProductCard, Title } from '@/shared/components/shared'
import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/categoryStore'
import { Ingredient, Product, ProductVariant } from '@prisma/client'


interface Props {
  categoryId: string
  title: string
  items: (Product & { variants: ProductVariant[]; ingredients: Ingredient[] })[]
  className?: string
  listClassName?: string
}

export const ProductListGroup = ({
  categoryId,
  title,
  items,
  className,
  listClassName,
}: Props) => {
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting, setActiveCategoryId])

  return (
    <div className={className} id={categoryId} ref={intersectionRef}>
      <Title text={title} size='l' className='font-extrabold mb-5' />
      <div className={cn('grid grid-cols-3 gap-12', listClassName)}>
        {items.map(item => (
          <ProductCard
            key={item.id}
            className='w-[33.33333%] min-w-[250px]'
            imageUrl={item.imageUrl}
            name={item.name}
            id={item.id.toString()}
            price={item.price}
            ingredients={item.ingredients}
            variants={item.variants}
          />
        ))}
      </div>
    </div>
  )
}
