'use client'

import { Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { WhiteBlock } from '@/shared/components/shared'
import { CheckoutItemsList } from '@/shared/components/shared/checkout'
import { handleApiCall } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-clients'
import { Order } from '@prisma/client'


const ERROR_MESSAGE =
  'Error with payment. Please check your email and connect our support'

interface Props {
  className?: string
}

export const Success = ({ className }: Props) => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
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
        { errorMessage: "Can't find the order..." }
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

  if (order?.status === 'CANCELLED') {
    router.push('/cancel?order_id=' + orderId + '&payment_id=' + paymentId)
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
            Order {order.id} successfully paid!
          </h2>
          <p className='mb-6'>
            Order status: <span className='font-bold'>{order.status}</span>
          </p>
          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4'>Order Items:</h3>
            <CheckoutItemsList
              items={JSON.parse(order.items as string)}
              title=''
              className='bg-gray-100 p-4 rounded-lg'
              controls={false}
            />
          </div>
        </WhiteBlock>
      )}
    </>
  )
}
