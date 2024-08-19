import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import prisma from '@/prisma/prisma-client'
import { NewOrder } from '@/shared/components/shared'
import { checkServerErrorType, sendEmail } from '@/shared/lib/back-end'
import { OrderStatus } from '@prisma/client'


type PaymentCallbackData = {
    orderId: string
    paymentId: string
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ message: 'Error with authorisation. Your token might be expired' })
        }

        const body = await req.json() as PaymentCallbackData

        if (!body) {
            return NextResponse.json({ message: 'Error with payload. There is no data.' }, { status: 401 })
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
        const payment = await stripe.checkout.sessions.retrieve(body.paymentId)

        const order = await prisma.order.update({
            where: {
                id: Number(body.orderId)
            },
            data: {
                status: payment.status === "complete" ? OrderStatus.CONFIRMED : OrderStatus.CANCELLED
            }
        })

        if (!order) {
            return NextResponse.json({ message: 'Error with order. There is no such order.' }, { status: 401 })
        }

        // TODO need to create my own domain
        // await sendEmail(order.email, `Order ${order.id} ${payment.status === "complete" ? "confirmed" : "cancelled"}`, NewOrder({
        //     orderId: order.id,
        //     totalPrice: order.totalPrice,
        //     paymentUrl: payment.url!,
        // }))

        return NextResponse.json(order)
    } catch (error) {
        return checkServerErrorType(error)
    }
}