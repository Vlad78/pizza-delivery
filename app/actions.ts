'use server'

import { cookies } from 'next/headers'
import { Stripe } from 'stripe'

import prisma from '@/prisma/prisma-client'
import { CheckoutSchema } from '@/shared/components/shared/checkout/schemas/checkout-schema'
import { OrderStatus } from '@prisma/client'


export async function createOrder(data: CheckoutSchema): Promise<string | null> {

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

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
        })
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
            success_url: 'http://localhost:3000/success?order_id=' + order.id + '&payment_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel?order_id=' + order.id + '&payment_id={CHECKOUT_SESSION_ID}',
            customer_email: data.email,
            metadata: {
                orderId: order.id,
            }
        })


        return session.url
    } catch (error) {
        console.log(error)
        return 'Something went wrong. Please try again later.'
    }
}