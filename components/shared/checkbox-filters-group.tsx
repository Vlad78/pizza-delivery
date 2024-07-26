'use client'

import { cn } from '@/lib/utils'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input } from '../ui'
import { useState } from 'react'

type Items = FilterCheckboxProps

interface Props {
  title: string
  items: Items[]
  defaultItems?: Items[]
  limit?: number
  searchInputPlaceholder?: string
  onChange?: (items: string[]) => void
  defaultValue?: string[]
  className?: string
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  limit = 5,
  defaultItems = items.slice(0, limit || 5),
  searchInputPlaceholder = 'Search...',
  onChange,
  defaultValue,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const list = showAll
    ? items.filter(item =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit)

  const handleOnChanheInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={cn('', className)}>
      <p className='font-bold mb-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            className='bg-gray-100 border-none'
            placeholder={searchInputPlaceholder}
            onChange={handleOnChanheInput}
            value={searchValue}
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-col gap-4 max-h-80 pr-2 overflow-auto scrollbar',
          showAll && 'h-80'
        )}
      >
        {list.map((item, index) => (
          <FilterCheckbox
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            onCheckedChange={id => console.log(id)}
            checked={item.checked || false}
            key={index}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className='text-primary mt-3'
          >
            {showAll ? 'Show less' : '+ Show all'}
          </button>
        </div>
      )}
    </div>
  )
}
