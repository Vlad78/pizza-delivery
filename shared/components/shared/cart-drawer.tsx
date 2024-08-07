'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren, useEffect } from 'react'

import { Button, Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui'
import { calcTotalProductPrice, getStringOfIngredients } from '@/shared/lib/'
import { cn } from '@/shared/lib/utils'
import { useCart } from '@/shared/store/cart'

import { CartItemWithNestedFields } from '../../../@types/prisma'
import { CartDrawerItem } from './cart-drawer-item'


interface Props {
  className?: string
}

export const CartDrawer = ({
  className,
  children,
}: PropsWithChildren<Props>) => {
  const cart = useCart()
  const items = cart.items

  useEffect(() => {
    cart.fetchCartItems()
  }, [])

  const handleOnClickCount = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    // TODO local state that syncs with server
    cart.updateCartItemQuantity(
      id,
      type === 'plus' ? quantity + 1 : quantity - 1
    )
  }

  const handleOnClickRemove = (id: number) => {
    // TODO local state that syncs with server
    cart.removeCartItem(id)
  }

  const CartDrawerItemCreator = (item: CartItemWithNestedFields) => {
    const product = item.product
    const pVariant = item.productVariant
    const ingreds = item.additionIngredients
    const description =
      product?.description ||
      `${pVariant?.size ? `Size: ${pVariant.size}, ` : ''}${
        pVariant?.type ? `Type: ${pVariant.type}` : ''
      }`.trimEnd() ||
      ''
    const ingredientsString =
      ingreds.length !== 0 ? `+ ${getStringOfIngredients(ingreds)}` : ''
    const price = calcTotalProductPrice(
      ingreds.reduce((acc, item) => acc + (item.price || 0), 0),
      pVariant?.price,
      product?.price
    )

    return (
      <CartDrawerItem
        className='mb-2'
        key={item.id}
        id={item.id}
        quantity={item.quantity}
        name={pVariant?.product.name || product!.name}
        imageUrl={pVariant?.imageUrl || product!.imageUrl}
        description={description}
        ingredients={ingredientsString}
        price={price}
        onClickCountHandle={type =>
          handleOnClickCount(item.id, item.quantity, type)
        }
        onClickRemove={handleOnClickRemove}
      />
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={cn(className, 'flex flex-col  pb-0 bg-gray-50')}>
        <SheetHeader>
          <SheetTitle>
            <span className='font-bold'>{items.length} items</span> in Cart
          </SheetTitle>
          {/* <SheetClose /> */}
        </SheetHeader>

        <div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
          {items.map(item => CartDrawerItemCreator(item))}
        </div>

        <SheetFooter className='-mx-6 bg-white p-8 mt-auto'>
          <div className='w-full'>
            <div className='flex mb-4'>
              <span className='flex flex-1 text-lg text-neutral-500'>
                Total
                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
              </span>

              <span className='font-bold text-lg'>{cart.totalPrice} zł</span>
            </div>
            <Link href='/checkout'>
              <Button
                onClick={() => {}}
                disabled={false}
                type='submit'
                className='w-full h-12 text-base'
              >
                Create Order
                <ArrowRight className='w-5 ml-2' />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
