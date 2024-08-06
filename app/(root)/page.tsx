'use client'

import { Suspense, useEffect, useState } from 'react'

import { CategoryWithNestedFields } from '@/@types/prisma'
import {
  Container,
  Filters,
  ProductListGroup,
  Title,
  TopBar,
} from '@/shared/components/shared'
import { Api } from '@/shared/services/api-clients'

import { Skeleton } from '../../shared/components/ui'
import { handleApiCall } from '../../shared/lib'

export default function Home() {
  const [categories, setCategories] = useState<CategoryWithNestedFields[]>([])

  useEffect(() => {
    handleApiCall(async () => {
      const res = await Api.categories.getAll()
      setCategories(res.data)
    }, "Can't get products...")

    // TODO state managment
  }, [])

  return (
    <>
      <Container className='mt-5'>
        <Title text='All pizzas' size='l' className='font-extrabold' />
      </Container>
      <TopBar categories={categories} />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[60px]'>
          <div className='w-[250px]'>
            <Suspense fallback={<Skeleton />}>
              <Filters />
            </Suspense>
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                category =>
                  category.products.length > 0 && (
                    <ProductListGroup
                      key={category.id}
                      title={category.name}
                      categoryId={category.id.toString()}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
