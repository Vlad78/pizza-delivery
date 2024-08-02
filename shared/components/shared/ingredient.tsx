import { CircleCheck } from 'lucide-react'
import Image from 'next/image'

import productMock from '@/public/assets/mocks/product-mock.svg'
import { cn } from '@/shared/lib/utils'


interface Props {
  imageUrl?: string | null
  name: string
  price?: number | null
  active?: boolean
  onClick?: VoidFunction
  className?: string
}

export const Ingredient = ({
  onClick,
  name,
  price,
  active,
  imageUrl,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative  cursor-pointer shadow-md bg-white border border-transparent',
        {
          'border-primary': active,
        }
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className='absolute top-2 right-2 text-primary' />
      )}
      <Image
        src={imageUrl || productMock}
        alt={name}
        width={110}
        height={110}
      />
      <span className='text-xs mb-1'>{name}</span>
      <span className='font-bold'>{price} zł</span>
    </div>
  )
}
