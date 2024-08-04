'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useDebounce } from 'react-use'

import productMock from '@/public/assets/mocks/product-mock.svg'
import { Input } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-clients'
import { Product } from '@prisma/client'

interface Props {
  className?: string
}

export const SearchInput = ({ className }: Props) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  const [, cancel] = useDebounce(
    async () => {
      try {
        searchValue &&
          setProducts((await Api.products.search(searchValue)).data)
      } catch (error) {
        // TODO toasts
        console.log(error)
      }
    },
    300,
    [searchValue]
  )

  const handleSearchClick = () => {
    inputRef.current?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleLinkClick = () => {
    setSearchValue('')
    setFocused(false)
  }

  return (
    <>
      {focused && (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20 ' />
      )}
      <div
        className={cn(
          className,
          'flex rounded-2xl justify-between relative h-11 z-30'
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <Search
          className='absolute top-1/2 -translate-y-1/2 left-3 h-5 text-gray-400 '
          size={24}
          onClick={handleSearchClick}
        />
        <Input
          ref={inputRef}
          type='text'
          placeholder='Search...'
          className='rounded-2xl outline-none w-full bg-gray-50 pl-11'
          value={searchValue}
          onChange={handleChange}
        />
        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-gray-50 rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {products.map(product => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className='flex items-center px-3 hover:bg-primary/10 cursor-pointer'
                onClick={handleLinkClick}
              >
                <Image
                  src={product.imageUrl || productMock}
                  alt={product.name}
                  width={45}
                  height={45}
                />
                <span className='px-3 py-2 '>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
