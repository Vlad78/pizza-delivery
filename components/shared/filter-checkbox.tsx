import { cn } from '@/lib/utils'
import { Checkbox } from '../ui'

export interface FilterCheckboxProps {
  text: string
  value: string
  endAdornment?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  name?: string
  className?: string
}

export const FilterCheckbox = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
  className,
}: FilterCheckboxProps) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className='rounded-[8px] w-6 h-6'
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className='leading-none cursor-pointer flex-1'
      >
        {text}
      </label>
      {endAdornment}
    </div>
  )
}
