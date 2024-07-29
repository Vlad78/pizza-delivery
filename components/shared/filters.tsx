'use client'

import { CheckboxFiltersGroup, RangeSlider, Title } from '@/components/shared/'
import { Input } from '@/components/ui'
import { useFilters, useIngredients, useQuery } from '@/hooks'
import { cn } from '@/lib/utils'


type Props = {
  className?: string
}

export const Filters = ({ className }: Props) => {
  const minMaxRange = {
    min: 0,
    max: 200,
  }

  const {
    selectedSizes,
    toggleSizes,
    selectedPizzaTypes,
    togglePizzaTypes,
    selectedIngredients,
    toggleIngredientId,
    priceRange,
    setPriceRange,
  } = useFilters()

  const { filterIngredients, loading } = useIngredients()

  useQuery({
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    sizes: Array.from(selectedSizes),
    pizzaTypes: Array.from(selectedPizzaTypes),
    ingredients: Array.from(selectedIngredients),
  })

  const handleInputPriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = +e.target.value
    if (value < minMaxRange.min || value > minMaxRange.max) return
    setPriceRange(p => ({ ...p, [type]: value }))
  }

  return (
    <div className={cn('', className)}>
      <Title text='Filters' size='s' className='font-bold' />

      <CheckboxFiltersGroup
        title='Sizes'
        items={[
          { name: 'Small', id: 1 },
          { name: 'Medium', id: 2 },
          { name: 'Large', id: 3 },
        ]}
        onCheckboxClick={toggleSizes}
        className='mt-8'
        checkedValues={selectedSizes}
      />

      <CheckboxFiltersGroup
        title='Dough types'
        items={[
          { name: 'Regular', id: 1 },
          { name: 'Thin', id: 2 },
        ]}
        onCheckboxClick={togglePizzaTypes}
        className='mt-8'
        checkedValues={selectedPizzaTypes}
      />

      {/* Price range */}
      <div className='mt-5 border-y border-y-neutral-100 pt-6 pb-7'>
        <p className='font-bold mb-3'>Price range</p>
        <div className='flex gap-4 mb-5'>
          <Input
            type='number'
            placeholder={minMaxRange.min.toString()}
            value={priceRange.min || minMaxRange.min}
            onChange={e => handleInputPriceRangeChange(e, 'min')}
          />
          <Input
            type='number'
            placeholder={minMaxRange.max.toString()}
            value={priceRange.max || minMaxRange.max}
            onChange={e => handleInputPriceRangeChange(e, 'max')}
          />
        </div>
        <RangeSlider
          min={minMaxRange.min}
          max={minMaxRange.max}
          step={1}
          value={[
            priceRange.min || minMaxRange.min,
            priceRange.max || minMaxRange.max,
          ]}
          onValueChange={([min, max]) => setPriceRange({ min, max })}
        />
      </div>

      {/* TODO checked values on top of the list */}
      <CheckboxFiltersGroup
        title='Ingredients'
        limit={6}
        items={filterIngredients}
        defaultItems={filterIngredients}
        onCheckboxClick={toggleIngredientId}
        className='mt-5'
        loading={loading}
        checkedValues={selectedIngredients}
      />
    </div>
  )
}
