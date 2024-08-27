'use client'

import { Loader } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { WhiteBlock } from '@/shared/components/shared'
import { handleApiCall } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-clients'
import { Order } from '@prisma/client'


const ERROR_MESSAGE =
  'Error with payment. Please check your email and connect our support'

type Props = {
  className?: string
}

export const Rejected = ({ className }: Props) => {
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<Order | null>(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentId = searchParams.get('payment_id')

  useEffect(() => {
    if (orderId === null || paymentId === null) {
      setLoading(false)
    } else {
      handleApiCall(
        async () => {
          const res = await Api.checkout
            .updateOrder({
              orderId,
              paymentId,
            })
            .finally(() => {
              setLoading(false)
            })

          setOrder(res.data)
        },
        { errorMessage: "Couldn't find the order..." }
      )
    }
  }, [orderId, paymentId])

  if (orderId === null || paymentId === null) {
    return (
      <WhiteBlock
        className={cn(className, 'flex items-center justify-center h-80 mt-6')}
      >
        No payment details found
      </WhiteBlock>
    )
  }

  if (loading) {
    return (
      <WhiteBlock
        className={cn(className, 'flex items-center justify-center h-80 mt-6')}
      >
        <Loader className='w-15 h-15 animate-spin mb-6' />
      </WhiteBlock>
    )
  }

  return (
    <>
      {order === null ? (
        <WhiteBlock className={cn(className, 'text-center p-4 mt-6')}>
          <p className='text-red-500'>{ERROR_MESSAGE}</p>
        </WhiteBlock>
      ) : (
        <WhiteBlock className={cn(className, 'text-center p-4 mt-6')}>
          <h2 className='text-2xl font-bold mb-4'>
            Order {order.id} payment failed!
          </h2>
          <p className='mb-6'>
            Order status: <span className='font-bold'>{order.status}</span>
          </p>
        </WhiteBlock>
      )}
    </>
  )
}
