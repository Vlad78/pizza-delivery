'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { registerUser } from '@/app/actions'
import { Title } from '@/shared/components/shared'
import { FormInput } from '@/shared/components/shared/form'
import { Button } from '@/shared/components/ui'
import { handleApiCall } from '@/shared/lib'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormRegister, formRegisterSchema } from './schemas'


interface Props {
  onClose?: VoidFunction
  onClickLogin?: VoidFunction
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const form = useForm<FormRegister>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
    },
  })

  const onSubmit = async (data: FormRegister) => {
    handleApiCall(async () => {
      await registerUser({
        email: data.email,
        name: data.name,
        password: data.password,
      })
      onClose?.()
    })
  }

  return (
    <FormProvider {...form}>
      <Title text='Register' />
      <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name='email' label='E-Mail' required />
        <FormInput name='name' label='Full name' required />
        <FormInput name='password' label='Password' type='password' required />
        <FormInput
          name='repeatPassword'
          label='Repeat Password'
          type='password'
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className='h-12 text-base'
          type='submit'
        >
          Register
        </Button>
      </form>
    </FormProvider>
  )
}
