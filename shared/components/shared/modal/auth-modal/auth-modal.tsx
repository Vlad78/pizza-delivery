import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

import { Button, Dialog, DialogContent } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'

import { LoginForm } from './forms/login-form'


interface Props {
  open: boolean
  onClose: () => void
  className?: string
}

export const AuthModal = ({ open, onClose, className }: Props) => {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }
  const handleClose = () => {
    onClose()
  }

  const handleOnClick = async (type: 'github' | 'google') => {
    setLoading(true)
    const res = await signIn(type, {
      redirect: false,
    })

    if (res?.error) {
      throw Error(res.error)
    }

    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={cn('w-[460px] bg-white p-10', className)}>
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <h1>Register</h1>
        )}

        <hr />
        <div className='flex gap-2 flex-col'>
          <Button
            variant='outline'
            onClick={() => handleOnClick('github')}
            type='button'
            className='gap-2 h-12 p-2 flex-1'
            loading={loading}
          >
            <Image
              alt='github logo'
              width={24}
              height={24}
              src='https://github.githubassets.com/favicons/favicon.svg'
            />
            GitHub
          </Button>

          <Button
            variant='outline'
            onClick={() => handleOnClick('google')}
            type='button'
            className='gap-2 h-12 p-2 flex-1'
            loading={loading}
          >
            <Image
              alt='google logo'
              width={24}
              height={24}
              src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
            />
            Google
          </Button>
        </div>
        <Button
          variant='link'
          onClick={onSwitchType}
          type='button'
          className='mt-4 outline outline-1 outline-offset-2 outline-primary'
        >
          Registration
        </Button>
      </DialogContent>
    </Dialog>
  )
}
