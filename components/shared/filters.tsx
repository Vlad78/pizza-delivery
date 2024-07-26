import { cn } from '@/lib/utils'
import {
  Title,
  FilterCheckbox,
  RangeSlider,
  CheckboxFiltersGroup,
} from '@/components/shared/'
import { Input } from '@/components/ui'

const defaultItems = [
  { text: 'Meat', value: 'meat' },
  { text: 'Vegetables', value: 'vegetables' },
  { text: 'Fruits', value: 'fruits' },
  { text: 'Cheese', value: 'cheese' },
  { text: 'Sauce', value: 'sauce' },
  { text: 'Pepper', value: 'pepper' },
  { text: 'Salad', value: 'salad' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Mushrooms', value: 'mushrooms' },
  { text: 'Olives', value: 'olives' },
  { text: 'Tomatoes', value: 'tomatoes' },
  { text: 'Jalapenos', value: 'jalapenos' },
  { text: 'Paprika', value: 'paprika' },
  { text: 'Onions', value: 'onions' },
  { text: 'Cucumbers', value: 'cucumbers' },
  { text: 'Mayonnaise', value: 'mayonnaise' },
  { text: 'Ketchup', value: 'ketchup' },
  { text: 'Mustard', value: 'mustard' },
]

interface Props {
  className?: string
}

export const Filters = ({ className }: Props) => {
  return (
    <div className={cn('', className)}>
      <Title text='Filters' size='s' className='font-bold' />

      <div className='mt-7 flex flex-col gap-4'>
        <FilterCheckbox text='New' value='1' />
        <FilterCheckbox text='Promo' value='2' />
      </div>

      {/* Price range */}
      <div className='mt-5 border-y border-y-neutral-100 pt-6 pb-7'>
        <p className='font-bold mb-3'>Price range</p>
        <div className='flex gap-4 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={200}
            defaultValue={0}
          />
          <Input
            type='number'
            placeholder='200'
            min={10}
            max={200}
            defaultValue={200}
          />
        </div>
        <RangeSlider min={0} max={200} step={1} />
      </div>

      <CheckboxFiltersGroup
        title='Ingredients'
        limit={6}
        items={defaultItems}
        defaultItems={defaultItems}
        className='mt-5'
      />
    </div>
  )
}
