import Image from 'next/image'

import productMock from '@/public/assets/mocks/product-mock.svg'
import { cn } from '@/shared/lib/'

interface Props {
  src?: string | null
  name?: string
  className?: string
}

export const CartItemDetailsImage: React.FC<Props> = ({
  src,
  name,
  className,
}) => {
  return (
    <Image
      className={cn('w-[60px] h-[60px]', className)}
      src={src || productMock}
      alt={name ? name : 'cart item'}
      width={60}
      height={60}
    />
  )
}
