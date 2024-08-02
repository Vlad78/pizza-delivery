'use client'

import { useRouter } from 'next/navigation'

import { ProductWithNestedFields } from '@/@types/prisma'
import { ChooseProductForm, Title } from '@/shared/components/shared'
import { Dialog, DialogContent } from '@/shared/components/ui'


type Props = {
  product?: ProductWithNestedFields | null
  isLoading?: boolean
}

export const ChooseProductModal = ({ product, isLoading = false }: Props) => {
  const router = useRouter()
  return (
    <div className={''}>
      <Dialog open={!!product || isLoading} onOpenChange={() => router.back()}>
        <DialogContent className='p-0 w-[1060px] min-h-[550px] bg-white overflow-hidden'>
          {isLoading || !product ? (
            <Title text={'Loading...'} size='l' />
          ) : (
            <>
              <ChooseProductForm
                name={product.name}
                ingredients={product.ingredients}
                variants={product.variants}
                imageUrl={product.imageUrl}
                description={product.description}
                loading={isLoading}
                price={product.price}
                onClickAddProduct={console.log}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
