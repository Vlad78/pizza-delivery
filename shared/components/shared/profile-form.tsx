'use client'

import { signOut } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { updateUserInfo } from '@/app/actions'
import { FormRegister, formRegisterSchema } from '@/shared/components/shared/modal/auth-modal/forms/schemas'
import { Button } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'

import { Container } from './container'
import { FormInput } from './form'
import { Title } from './title'


interface Props {
  data: User
  className?: string
}

export const ProfileForm = ({ data, className }: Props) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: '',
      repeatPassword: '',
    },
  })

  const onSubmit = async (data: FormRegister) => {
    try {
      await updateUserInfo({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      toast.success('Data updated', {
        icon: '✅',
      })
    } catch (error) {
      toast.error('Something went wrong', { icon: '❌' })
      console.log(error)
    }
  }

  const onClickSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <Container className={cn(className, 'my-10')}>
      <Title text='Personal data' size='m' className='font-bold' />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-96 mt-10'
        >
          <FormInput name='email' label='Email' required />
          <FormInput name='name' label='Full name' required />
          <FormInput name='password' label='New password' type='password' />
          <FormInput
            name='repeatPassword'
            label='Repeat password'
            type='password'
          />

          <Button
            type='submit'
            className='mt-10'
            disabled={
              form.formState.isSubmitting || !form.formState.dirtyFields
            }
          >
            Save
          </Button>

          <Button
            type='button'
            variant='outline'
            className='mt-2'
            onClick={onClickSignOut}
            disabled={form.formState.isSubmitting}
          >
            Sign out
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}
