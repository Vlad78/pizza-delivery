import { cn } from '@/shared/lib/'

interface Props {
  ingredients: string | null
  description?: string | null
  name: string
  className?: string
}

export const CartItemInfo: React.FC<Props> = ({
  ingredients,
  description,
  name,
  className,
}) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className='text-lg font-bold flex-1 leading-6'>{name}</h2>
      </div>
      {description && (
        <p className='text-xs text-gray-400 w-[90%]'>{description}</p>
      )}
      {ingredients && (
        <p className='text-xs text-gray-400 w-[90%]'>{ingredients}</p>
      )}
    </div>
  )
}
