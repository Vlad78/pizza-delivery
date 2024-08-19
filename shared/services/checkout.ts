import { AxiosResponse } from 'axios'

import { Order } from '@prisma/client'

import { instance } from './instance'


type PaymentCallbackData = {
    orderId: string
    paymentId: string
}

export const updateOrder = (
    data: PaymentCallbackData
): Promise<AxiosResponse<Order>> => {
    return instance.post('/checkout/callback', data)
}
