import { cn } from '@/shared/lib/'

interface Props {
  value: number | string
  className?: string
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} zł</h2>
}
