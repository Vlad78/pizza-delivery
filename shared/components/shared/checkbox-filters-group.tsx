'use client'

import { useState } from 'react'

import { FilterCheckbox, FilterCheckboxProps } from '@/shared/components/shared'
import { Input, Skeleton } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'


type Items = FilterCheckboxProps

interface Props {
  title?: string
  items: Items[]
  defaultItems?: Items[]
  limit?: number
  searchInputPlaceholder?: string
  loading?: boolean
  onCheckboxClick?: (id: string) => void
  checkedValues?: Set<string>
  defaultValues?: string[]
  className?: string
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  limit = 5,
  defaultItems = items.slice(0, limit || 5),
  searchInputPlaceholder = 'Search...',
  loading = false,
  onCheckboxClick,
  checkedValues: selectedIds,
  defaultValues,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const list = showAll
    ? items.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit)

  const handleOnChanheInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleChceckboxClick = (id: number) => {
    onCheckboxClick?.(id.toString())
  }

  if (loading)
    return (
      <div className={cn('', className)}>
        <p className='font-bold mb-3'>{title}</p>
        {new Array(limit).fill('').map((_, index) => (
          <Skeleton className='h-6 mb-4' key={index} />
        ))}
        <Skeleton className='h-6 mb-4 w-28' />
      </div>
    )

  return (
    <div className={cn('', className)}>
      {title && <p className='font-bold mb-3'>{title}</p>}

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
          'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar',
          showAll && 'h-96'
        )}
      >
        {list.map(item => (
          <FilterCheckbox
            name={item.name}
            id={item.id}
            endAdornment={item.endAdornment}
            onCheckedChange={() => {
              handleChceckboxClick(item.id)
            }}
            checked={selectedIds?.has(item.id.toString())}
            key={item.id}
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
