'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { getOptionsFromSelectors } from '@/shared/lib/get-options-from-selectors'
import { validateOptions } from '@/shared/lib/validate-options'
import { ProductVariant } from '@prisma/client'

import { Option, OptionSelector } from './option-selector'


interface Props {
  variants: readonly ProductVariant[]
  setCurrentVariant: Dispatch<SetStateAction<ProductVariant | undefined>>
  classname?: string
}

export const ProductOptionsSelector = ({
  variants,
  setCurrentVariant,
  classname,
}: Props) => {
  const [allSizes, allTypes] = getOptionsFromSelectors(variants)

  const [size, setSize] = useState<string | null>(
    variants.find(variant => variant.isDefault)?.size || null
  )

  const [type, setType] = useState<string | null>(
    variants.find(variant => variant.isDefault)?.type || null
  )

  const [possibleTypes, setPossibleTypes] = useState<Option[]>(
    validateOptions(size, allTypes, 'size', variants)
  )

  const [possibleSizes, setPossibleSizes] = useState(
    validateOptions(type, allSizes, 'type', variants)
  )

  const handleOptionClick = (key: string, clickType?: string) => {
    if (clickType === 'size') {
      setCurrentVariant(
        variants.find(variant => variant.size === key && variant.type === type)
      )
      setSize(key)
      setPossibleTypes(validateOptions(key, allTypes, clickType, variants))
    }
    if (clickType === 'type') {
      setCurrentVariant(
        variants.find(variant => variant.type === key && variant.size === size)
      )
      setType(key)
      setPossibleSizes(validateOptions(key, allSizes, clickType, variants))
    }
  }

  return (
    <div className={classname}>
      {size && (
        <OptionSelector
          type='size'
          options={possibleSizes}
          selectedKey={size}
          onClick={handleOptionClick}
          className='mt-3'
        />
      )}
      {type && (
        <OptionSelector
          type='type'
          options={possibleTypes}
          selectedKey={type}
          onClick={handleOptionClick}
          className='mt-3'
        />
      )}
    </div>
  )
}
