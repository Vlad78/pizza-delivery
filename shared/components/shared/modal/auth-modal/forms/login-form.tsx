import { signIn } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'

import { Title } from '@/shared/components/shared'
import { FormInput } from '@/shared/components/shared/form'
import { Button } from '@/shared/components/ui'
import { handleApiCall } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormLogin, formLoginSchema } from './schemas'


interface Props {
  onClose?: VoidFunction
  className?: string
}

export const LoginForm = ({ className, onClose }: Props) => {
  const form = useForm<FormLogin>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, formState } = form

  const handleSubmitForm = async (data: FormLogin) => {
    handleApiCall(
      async () => {
        const res = await signIn('credentials', {
          ...data,
          redirect: false,
        })
        if (res?.error) {
          throw Error(res.error)
        }

        onClose?.()
      },
      { errorMessage: 'Login failed' }
    )
  }

  return (
    <FormProvider {...form}>
      <form
        className={cn(className, 'flex flex-col gap-5')}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Title text='Login' />
        <p>Enter your email to login</p>

        <FormInput name='email' type='text' required label='Email' />

        <FormInput name='password' type='password' required label='Password' />

        <Button
          type='submit'
          className='h-12 text-base'
          loading={formState.isSubmitting}
        >
          {formState.isSubmitting ? 'Signing in..' : 'Sign in'}
        </Button>
      </form>
    </FormProvider>
  )
}
