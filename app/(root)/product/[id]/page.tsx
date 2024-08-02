'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ProductWithNestedFields } from '@/@types/prisma'
import { ChooseProductForm, Container, Title } from '@/shared/components/shared'
import { Api } from '@/shared/services/api-clients'


interface Props {
  params: {
    id: string
  }
}

export default function ProductPage({ params: { id } }: Props) {
  const [product, setProduct] = useState<ProductWithNestedFields | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await Api.products.getById(id)
      setProduct(res)
      setLoading(false)
    })()
  }, [id])

  if (!product && !loading) return notFound()

  if (loading)
    return (
      <Container className='flex flex-col my-10'>
        <Title text={'Loading...'} size='l' className='font-extrabold' />
      </Container>
    )

  return (
    product && (
      <Container>
        <ChooseProductForm
          name={product.name}
          ingredients={product.ingredients}
          variants={product.variants}
          imageUrl={product.imageUrl}
          description={product.description}
          loading={loading}
          price={product.price}
          onClickAddProduct={console.log}
        />
      </Container>
    )
  )
}
