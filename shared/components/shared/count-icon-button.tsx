import { Minus, Plus } from 'lucide-react'

import { cn } from '@/shared/lib/'

import { Button } from '../ui/button'
import { CountButtonProps } from './count-block'

interface IconButtonProps {
  size?: CountButtonProps['size']
  disabled?: boolean
  type?: 'plus' | 'minus'
  onClick?: () => void
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  size = 's',
  disabled,
  type,
  onClick,
}) => {
  return (
    <Button
      variant='outline'
      disabled={disabled}
      onClick={onClick}
      type='button'
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 's'
          ? 'w-[30px] h-[30px] rounded-[10px]'
          : 'w-[38px] h-[38px] rounded-md'
      )}
    >
      {type === 'plus' ? (
        <Plus className={size === 's' ? 'h-4' : 'h-5'} />
      ) : (
        <Minus className={size === 's' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  )
}
