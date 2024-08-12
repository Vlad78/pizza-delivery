import { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'


interface Props {
  className?: string
  title: ReactNode
  amount: number
}

export const TotalPriceDetails = ({ className, title, amount }: Props) => {
  return (
    <div className={cn('flex my-4', className)}>
      <span className='flex flex-1 text-lg text-neutral-500'>
        <div className='flex items-center'>{title}</div>
        <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'></div>
      </span>
      <span className='font-bold text-lg'>{amount} zł</span>
    </div>
  )
}
