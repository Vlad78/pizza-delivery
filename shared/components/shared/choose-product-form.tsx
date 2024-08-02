'use client'

import { useState } from 'react'
import { useSet } from 'react-use'

import {
    Ingredient as ProductIngredient, ProductImage, ProductOptionsSelector, Title
} from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'
import { calcTotalProductPrice } from '@/shared/lib/calc-total-pizza-price'
import { getStringOfIngredients } from '@/shared/lib/get-string-of-ingredients'
import { cn } from '@/shared/lib/utils'
import { Ingredient, ProductVariant } from '@prisma/client'


interface Props {
  imageUrl?: string | null
  name: string
  ingredients?: Ingredient[]
  variants: ProductVariant[]
  description?: string | null
  loading?: boolean
  price?: number | null
  className?: string
  onClickAddProduct: VoidFunction
}

export const ChooseProductForm = ({
  imageUrl,
  name,
  ingredients,
  variants,
  description,
  loading,
  price,
  className,
  onClickAddProduct,
}: Props) => {
  const isPizza = variants.some(variant => variant.type === 'thin')

  const [currentVariant, setCurrentVariant] = useState<
    ProductVariant | undefined
  >(variants.find(variant => variant.isDefault))

  const [selectedIngredientsIds, { toggle: toggleIngredientId }] = useSet(
    new Set<number>([])
  )

  const pizzaDescription =
    description ||
    `Size ${
      currentVariant?.size === 's'
        ? '20 cm'
        : currentVariant?.size === 'm'
        ? '30 cm'
        : '40 cm'
    }, ${currentVariant?.type === 'thin' ? 'Thin' : 'Regular'} dough,`

  const ingredientsDescription = `Ingredients: ${getStringOfIngredients(
    ingredients
  )}`

  const selectedIngredientsPrice =
    ingredients?.reduce(
      (acc, ingredient) =>
        selectedIngredientsIds?.has(ingredient.id)
          ? acc + (ingredient.price || 0)
          : acc,
      0
    ) || 0

  const totalPrice = calcTotalProductPrice(
    selectedIngredientsPrice,
    currentVariant,
    price
  )

  const handleClickAddProduct = () => {
    onClickAddProduct()
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage
        imageUrl={currentVariant ? currentVariant.imageUrl : imageUrl}
        alt={name}
        size={currentVariant ? currentVariant.size : null}
        className='flex-1'
        pizzaSizeRimming={isPizza}
      />
      <div className='w-[490px] bg-gray-50 p-7'>
        <Title text={name} size='m' className='font-extrabold mb-1' />
        <p className='text-gray-400 mb-1'>
          {isPizza ? pizzaDescription : description}
        </p>
        {isPizza && (
          <p className='text-gray-400 text-sm mb-5'>{ingredientsDescription}</p>
        )}
        {variants.length > 0 && (
          <ProductOptionsSelector
            variants={variants}
            setCurrentVariant={setCurrentVariant}
          />
        )}

        <div className='bg-gray-50 p-5 rounded-md max-h-[210px] overflow-auto scrollbar mt-10'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients?.map(ingredient => (
              <ProductIngredient
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                active={selectedIngredientsIds.has(ingredient.id)}
                onClick={() => toggleIngredientId(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          disabled={loading}
          onClick={handleClickAddProduct}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
        >
          Add to cart {totalPrice} zł
        </Button>
      </div>
    </div>
  )
}
