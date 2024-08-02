import Image from 'next/image'

import productMock from '@/public/assets/mocks/product-mock.svg'
import { cn } from '@/shared/lib/utils'
import { ProductVariant } from '@prisma/client'


interface Props {
  alt: string
  pizzaSizeRimming: boolean
  size?: 's' | 'm' | 'l' | null
  type?: 'regular' | 'thin'
  imageUrl?: string | null
  variants?: ProductVariant[]
  className?: string
}

export const ProductImage = ({
  className,
  imageUrl,
  variants,
  alt,
  size = 'l',
  pizzaSizeRimming = false,
  type,
}: Props) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center relative flex-1 w-full'
      )}
    >
      <Image
        src={imageUrl || productMock}
        alt={alt}
        className={cn(
          'relative left-2 top-2 transition-all z-10 duration-300 object-cover',
          {
            'w-[300px] h-[300px]': size === 's',
            'w-[400px] h-[400px]': size === 'm',
            'w-[500px] h-[500px]': size === 'l',
          }
        )}
        width={size === 's' ? 290 : size === 'm' ? 370 : 450}
        height={size === 's' ? 290 : size === 'm' ? 370 : 450}
      />
      {pizzaSizeRimming && (
        <>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]'></div>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-100 w-[370px] h-[370px]'></div>
        </>
      )}
    </div>
  )
}
