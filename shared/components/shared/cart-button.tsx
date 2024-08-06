'use client'

import { ArrowRight, ShoppingCart } from 'lucide-react'

import { CartDrawer } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'
import { cn } from '@/shared/lib/'
import { useCart } from '@/shared/store/cart'

interface Props {
  className?: string
}

export const CartButton = ({ className }: Props) => {
  const { items, totalPrice } = useCart()
  return (
    <CartDrawer>
      <Button variant='outline' className={cn(className, 'group relative')}>
        <p>{totalPrice} zł</p>
        <span className='h-full w-[1px] bg-gray-800 mx-2' />
        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart size={16} className='relative' strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
        />
      </Button>
    </CartDrawer>
  )
}
