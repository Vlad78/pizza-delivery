'use client'

import { useEffect, useState } from 'react'

import {
  Container,
  Filters,
  ProductListGroup,
  Title,
  TopBar,
} from '@/shared/components/shared'

import { Api } from '../../shared/services/api-clients'
import { CategoryWithNestedFields } from '../../shared/services/categories'

export default function Home() {
  const [categories, setCategories] = useState<CategoryWithNestedFields[]>([])

  useEffect(() => {
    Api.categories.getAll().then(res => setCategories(res))
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
            <Filters />
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
