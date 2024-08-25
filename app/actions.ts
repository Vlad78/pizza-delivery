'use server'

import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'
import { Stripe } from 'stripe'

import prisma from '@/prisma/prisma-client'
import { CheckoutSchema } from '@/shared/components/shared/checkout/schemas/checkout-schema'
import { getUserSession, sendEmail } from '@/shared/lib/back-end'
import { OrderStatus, Prisma } from '@prisma/client'


export async function createOrder(
  data: CheckoutSchema
): Promise<string | null> {
  try {
    const cookieStore = cookies()
    const cartToken = cookieStore.get('cartToken')?.value

    if (!cartToken) {
      throw new Error('Cart token not found')
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            additionIngredients: true,
            product: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    })

    if (!userCart) {
      throw new Error('Cart not found')
    }

    if (userCart?.totalPrice === 0) {
      throw new Error('Cart is empty')
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalPrice: userCart.totalPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    })

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        items: undefined,
        totalPrice: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {})
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: `Next Pizza Order # ${order.id}`,
            },
            unit_amount: Math.floor(order.totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url:
        'http://localhost:3000/success?order_id=' +
        order.id +
        '&payment_id={CHECKOUT_SESSION_ID}',
      cancel_url:
        'http://localhost:3000/cancel?order_id=' +
        order.id +
        '&payment_id={CHECKOUT_SESSION_ID}',
      customer_email: data.email,
      metadata: {
        orderId: order.id,
      },
    })

    return session.url
  } catch (error) {
    console.log(error)
    // TODO should throw error
    return 'Something went wrong. Please try again later.'
  }
}

export async function updateUserInfo(data: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession()
    if (!currentUser) {
      throw new Error('User not found')
    }

    const user = await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password ? hashSync(data.password, 10) : undefined,
      },
    })
    return user
  } catch (error) {
    console.log('Error while updating user: ', error)
    throw error
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error('User is not verified')
      }

      throw new Error('User is already exists')
    }

    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    })

    const token = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.verificationToken.create({
      data: {
        token,
        expires: new Date(Date.now() + 10 * 60 * 1000),
        userId: createdUser.id,
      },
    })

    // TODO: email sending
    // await sendEmail(
    //   createdUser.email,
    //   'Next Pizza / 📝 Verification code',
    //   VerificationUserTemplate({
    //     code,
    //   })
    // )
  } catch (err) {
    console.log('Error creating user:', err)
    throw err
  }
}
