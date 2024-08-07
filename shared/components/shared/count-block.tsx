import React from 'react'

import { cn } from '@/shared/lib/'

import { CountIconButton } from './count-icon-button'


export interface CountButtonProps {
  size?: 's' | 'l'
  quantity?: number
  onClick?: (type: 'plus' | 'minus') => void
  disabled?: boolean
  className?: string
}

export const CountBlock: React.FC<CountButtonProps> = ({
  className,
  onClick,
  size = 's',
  quantity = 1,
  disabled,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-between gap-3',
        className
      )}
    >
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={quantity < 2 || disabled}
        size={size}
        type='minus'
      />

      <b className={size === 's' ? 'text-sm' : 'text-md'}>{quantity}</b>

      <CountIconButton
        onClick={() => onClick?.('plus')}
        size={size}
        type='plus'
        disabled={disabled}
      />
    </div>
  )
}
