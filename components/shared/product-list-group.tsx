'use client'

import { cn } from '@/lib/utils'
import { Title } from './title'
import { ProductCard } from './product-card'
import { useRef } from 'react'
import { useIntersection } from 'react-use'

interface Props {
  categoryId: string
  title: string
  items: any[]
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
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  })

  return (
    <div className={className}>
      <Title text={title} size='l' className='font-extrabold mb-5' />
      <div className={cn('grid grid-cols-3 gap-12', listClassName)}>
        {items.map(item => (
          <ProductCard
            key={item.id}
            className='w-[33.33333%] min-w-[250px]'
            imgUrl={item.imgUrl}
            name={item.name}
            id={item.id}
            ingredients={item.ingredients}
            price={item.variants[0].price}
          />
        ))}
      </div>
    </div>
  )
}
