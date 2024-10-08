import { CategoryWithNestedFields } from '@/@types/prisma'
import {
  Categories,
  Container,
  TechnologiesUsed,
} from '@/shared/components/shared'
import { cn } from '@/shared/lib/'

interface Props {
  categories?: CategoryWithNestedFields[]
  className?: string
}

export const TopBar = ({ className, categories }: Props) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 mb-4',
        className
      )}
    >
      <Container className='flex items-center justify-between'>
        <Categories categories={categories} />
        <TechnologiesUsed />
      </Container>
    </div>
  )
}
