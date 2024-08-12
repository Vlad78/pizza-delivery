import { z } from 'zod'


export const checkoutSchema = z.object({
    firstName: z
        .string()
        .min(1, 'Field cannot be empty')
        .max(50, 'Field cannot be longer than 50 characters'),
    lastName: z
        .string()
        .min(1, 'Field cannot be empty')
        .max(50, 'Field cannot be longer than 50 characters'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Field cannot be empty'),
    address: z.string().min(1, 'Field cannot be empty'),
    comment: z.optional(z.string().max(300, 'Field cannot be longer than 300 characters'))
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>