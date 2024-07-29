import { Checkbox } from '@/components/ui'
import { cn } from '@/lib/utils'


export type FilterCheckboxProps = {
  name: string
  value?: string
  id: number
  endAdornment?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  className?: string
}

export const FilterCheckbox = ({
  name,
  value,
  id,
  endAdornment,
  onCheckedChange,
  checked,
  className,
}: FilterCheckboxProps) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className='rounded-[8px] w-6 h-6'
        id={`checkbox-${String(name)}-${String(value)}-${String(id)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}-${String(id)}`}
        className='leading-none cursor-pointer flex-1'
      >
        {name}
      </label>
      {endAdornment}
    </div>
  )
}
