'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createOrder } from '@/app/actions'
import { Container, Title } from '@/shared/components/shared'
import { CheckoutDelivery, CheckoutItemsList, CheckoutPersonData } from '@/shared/components/shared/checkout'
import { CheckoutSidebar } from '@/shared/components/shared/checkout-sidebar'
import { CheckoutSchema, checkoutSchema } from '@/shared/components/shared/checkout/schemas/checkout-schema'
import { handleApiCall } from '@/shared/lib'
import { Api } from '@/shared/services/api-clients'
import { useCart } from '@/shared/store/cart'
import { zodResolver } from '@hookform/resolvers/zod'


export default function CheckoutPage() {
  const delivery = 10
  // TODO local state that syncs with server
  const [submitting, setSubmitting] = useState(false)
  const {
    items,
    totalPrice,
    loading,
    removeCartItem,
    updateCartItemQuantity,
    fetchCartItems,
  } = useCart()
  const { data: session } = useSession()

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  useEffect(() => {
    fetchCartItems()

    if (session)
      handleApiCall(async () => {
        const { data } = await Api.auth.me()
        const [firstName, lastName] = data.name.split(' ')

        form.setValue('firstName', firstName)
        form.setValue('lastName', lastName)
        form.setValue('email', data.email)
      })
  }, [session])

  const handleOnCountChange = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    // TODO local state that syncs with server
    updateCartItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1)
  }

  const handleOnClickRemove = (id: number) => {
    // TODO local state that syncs with server
    removeCartItem(id)
  }

  const handleSubmit = async (data: CheckoutSchema) => {
    handleApiCall(async () => {
      setSubmitting(true)
      const url = await createOrder(data)
      if (!url) {
        throw new Error('Session is not active')
      }
      location.href = url
    }).finally(() => {
      setSubmitting(false)
    })
  }

  return (
    <Container className='mt-10'>
      <Title text='Checkout' size='xl' className='font-extrabold mb-8' />
      <FormProvider {...form}>
        <form
          className='flex gap-10'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {/* TODO skeletons */}

          {/* Left side */}
          <div className='flex flex-col gap-10 flex-1 mb-20'>
            <CheckoutItemsList
              title='1. Cart'
              items={items}
              loading={loading}
              handleOnCountChange={handleOnCountChange}
              onRemove={handleOnClickRemove}
            />
            <CheckoutPersonData title='2. Personal info' />

            <CheckoutDelivery title='3. Delivery' />
          </div>

          {/* Right side */}
          <CheckoutSidebar
            totalPrice={totalPrice}
            delivery={delivery}
            loading={submitting || loading}
            disabled={!totalPrice}
          />
        </form>
      </FormProvider>
    </Container>
  )
}
