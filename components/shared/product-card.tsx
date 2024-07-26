import Image from 'next/image'
import Link from 'next/link'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

interface Props {
  id: string
  imgUrl: string
  name: string
  price: number
  ingredients: string
  className?: string
}

export const ProductCard = ({
  className,
  imgUrl,
  name,
  id,
  ingredients,
  price,
}: Props) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
          <Image
            className='object-cover'
            src={imgUrl}
            alt={name}
            width={215}
            height={215}
          />
        </div>

        <Title text={name} className='font-bold mt-3 mb-1' size='s' />

        <p className='text-sm text-gray-400 '>{ingredients}</p>

        <div className='flex justify-between items-center gap-4 mt-4'>
          <span className='text-[20px]'>from {price} zł</span>
          <Button variant='default'>
            <Plus size={20} className='mr-1' /> Add
          </Button>
        </div>
      </Link>
    </div>
  )
}
