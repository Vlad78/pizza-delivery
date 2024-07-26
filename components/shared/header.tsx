import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '../ui/'
import { Container } from './container'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'

interface Props {
  className?: string
}

export const Header = ({ className }: Props) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className='flex items-center justify-between py-4'>
        {/* Left side */}
        <div className='flex items-center gap-4'>
          <Image src={'/logo.svg'} alt='pizza logo' width={85} height={85} />

          <div>
            <h1 className='text-2xl uppercase font-black'>Next pizza</h1>
            <p className='text-sm text-gray-400 leading-3'>
              Best pizza on the east
            </p>
          </div>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-3'>
          <Button variant='outline' className='flex items-center gap-1'>
            <User size={16} />
            Войти
          </Button>
          <div>
            <Button variant='outline' className='group relative'>
              <p>120 zł</p>
              <span className='h-full w-[1px] bg-gray-800 mx-2' />
              <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
                <ShoppingCart size={16} className='relative' strokeWidth={2} />
                <b>3</b>
              </div>
              <ArrowRight
                size={20}
                className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
