'use client'

import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import productMock from '@/public/assets/mocks/product-mock.svg'
import { Button } from '@/shared/components/ui'
import { Ingredient, ProductVariant } from '@prisma/client'

import { Title } from './title'

interface Props {
  id: string
  imageUrl: string | null
  name: string
  ingredients?: Ingredient[]
  variants: ProductVariant[]
  price?: number | null
  className?: string
}

export const ProductCard = ({
  className,
  imageUrl,
  name,
  id,
  ingredients,
  variants,
  price,
}: Props) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} scroll={false}>
        <div className='flex justify-center items-center p-6 bg-secondary rounded-lg h-[260px]'>
          <Image
            className='object-cover'
            src={imageUrl || productMock}
            alt={name}
            width={235}
            height={235}
          />
        </div>

        <Title text={name} className='font-bold mt-3 mb-1' size='s' />

        <p className='text-sm text-gray-400 '>
          {ingredients?.map(i => i.name).join(', ')}
        </p>

        <div className='flex justify-between items-center gap-4 mt-4'>
          <span className='text-[20px]'>
            from {price ? price : variants?.[0].price ? variants?.[0].price : 0}{' '}
            zł
          </span>
          <Button variant='default'>
            <Plus size={20} className='mr-1' /> Add
          </Button>
        </div>
      </Link>
    </div>
  )
}
