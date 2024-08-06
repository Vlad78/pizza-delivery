import { ArrowUpDown } from 'lucide-react'

import { cn } from '@/shared/lib/'

interface Props {
  className?: string
}

export const SortPopup = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-gray-100 px-5 h-[52px] rounded-2xl cursor-pointer',
        className
      )}
    >
      <ArrowUpDown size={16} />
      <b>Sort by</b>
      <b className='text-primary'>popularity</b>
    </div>
  )
}
