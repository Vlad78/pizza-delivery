'use client'

import { Trash2Icon } from 'lucide-react'
import { MouseEventHandler, useState } from 'react'

import * as CartItem from '@/shared/components/shared/cart-item-details'
import { cn } from '@/shared/lib/utils'


interface Props {
  id: number
  imageUrl?: string | null
  description?: string | null
  ingredients: string
  name: string
  price: number | string
  quantity: number
  disabled?: boolean
  className?: string
  onClickCountHandle?: (type: 'plus' | 'minus') => void
  onClickRemove: (id: number) => void
}

export const CartDrawerItem = ({
  description,
  ingredients,
  id,
  imageUrl,
  name,
  price,
  quantity,
  disabled,
  className,
  onClickCountHandle,
  onClickRemove,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const handleOnClickRemove: MouseEventHandler<SVGSVGElement> = () => {
    onClickRemove(id)
    setLoading(true)
  }
  return (
    <div
      className={cn(className, 'flex bg-white p-5 gap-6', {
        'opacity-50': loading,
      })}
    >
      <CartItem.Image src={imageUrl} name={'Pizza'} />
      <div className='flex-1'>
        <CartItem.Info
          name={name}
          description={description}
          ingredients={ingredients}
        />
        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CartItem.CountBlock
            onClick={onClickCountHandle}
            quantity={quantity}
            disabled={loading}
          />

          <div className='flex items-center gap-3'>
            <CartItem.Price value={(Number(price) * quantity).toFixed(1)} />

            <Trash2Icon
              className={cn(
                'text-gray-400 cursor-pointer  hover:text-gray-600',
                {
                  'opacity-50': loading,
                  'cursor-not-allowed': loading,
                }
              )}
              size={16}
              onClick={loading ? undefined : handleOnClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
