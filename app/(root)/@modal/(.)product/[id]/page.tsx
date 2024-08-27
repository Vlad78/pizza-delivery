'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ProductWithNestedFields } from '@/@types/prisma'
import { ChooseProductModal } from '@/shared/components/shared'
import { handleApiCall } from '@/shared/lib'
import { Api } from '@/shared/services/api-clients'


interface Props {
  params: {
    id: string
  }
}

export default function ProductModalPage({ params: { id } }: Props) {
  const [product, setProduct] = useState<ProductWithNestedFields | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    handleApiCall(
      async () => {
        setLoading(true)
        const res = await Api.products.getById(id)
        setProduct(res.data)
      },
      { errorMessage: "Can't get the product..." }
    ).finally(() => {
      setLoading(false)
    })
  }, [id])

  if (!product && !loading) return notFound()

  return <ChooseProductModal product={product} isLoading={loading} />

  // TODO better with children property ?
}
