'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Order } from '@prisma/client'

import { handleApiCall } from '../../lib'
import { Api } from '../../services/api-clients'
import { WhiteBlock } from './white-block'


interface Props {
  className?: string
  setLoading: (value: boolean) => void
}

const ERROR_MESSAGE =
  'Error with payment. Please check your email and connect our support'

export const CheckoutFinal = ({ className, setLoading }: Props) => {
  //   const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<Order | null>(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentId = searchParams.get('payment_id')

  useEffect(() => {
    if (orderId !== null && paymentId !== null) {
      handleApiCall(async () => {
        const res = await Api.checkout
          .updateOrder({
            orderId,
            paymentId,
          })
          .finally(() => {
            setLoading(false)
          })

        setOrder(res.data)
      }, "Couldn't find the order...")
    }
  }, [orderId, paymentId])

  if (orderId === null || paymentId === null || order === null)
    return (
      <WhiteBlock className={cn(className, 'text-center p-4 mt-6')}>
        <p className='text-red-500'>{ERROR_MESSAGE}</p>
      </WhiteBlock>
    )

  return (
    <WhiteBlock className={cn(className, 'text-center p-4 mt-6')}>
      <h2 className='text-2xl font-bold mb-4'>
        Order {order.id} payment failed!
      </h2>
      <p className='mb-6'>
        Order status: <span className='font-bold'>{order.status}</span>
      </p>
    </WhiteBlock>
  )
}
