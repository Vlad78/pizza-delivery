'use client'

import { cn } from '@/shared/lib/utils'


export type Option = {
  key: string
  name: string
  disabled?: boolean
}

type Props = {
  type?: string
  options: readonly Option[]
  selectedKey?: string | null
  onClick: (key: string, type?: string) => void
  selectedValue?: string
  className?: string
}

export const OptionSelector = ({
  type,
  options,
  onClick,
  selectedKey,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        className,
        'flex justify-between bg-gray-100 rounded-3xl p-1 select-none'
      )}
    >
      {options.map(option => (
        <button
          key={option.key}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': option.key === selectedKey,
              'text-gray-500 opacity-50 pointer-events-none': option.disabled,
            }
          )}
          disabled={option.disabled}
          onClick={() => onClick(option.key, type)}
        >
          {option.name}
        </button>
      ))}
    </div>
  )
}
