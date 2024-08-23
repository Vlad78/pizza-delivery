import { z } from 'zod'


const passwordSchema = z.string().min(6, { message: 'Password must be at least 8 characters' })

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: passwordSchema
})

export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        name: z.string().min(2, { message: 'Field cannot be empty' }).max(20, { message: 'Field cannot be longer than 20 characters' }),
        repeatPassword: passwordSchema
    })
).refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
})


export type FormLogin = z.infer<typeof formLoginSchema>
export type FormRegister = z.infer<typeof formRegisterSchema>