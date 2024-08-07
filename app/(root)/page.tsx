import { Suspense } from 'react'

import { Container, Filters, Title, TopBar } from '@/shared/components/shared'
import { Skeleton } from '@/shared/components/ui'

import { Products } from '../../shared/components/shared/products'

export default function Home() {
  return (
    <>
      <Container className='mt-5'>
        <Title text='All pizzas' size='l' className='font-extrabold' />
      </Container>
      <TopBar />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[60px]'>
          <div className='w-[250px]'>
            <Suspense fallback={<Skeleton />}>
              <Filters />
            </Suspense>
          </div>

          <div className='flex-1'>
            <Products className='flex flex-col gap-16' />
          </div>
        </div>
      </Container>
    </>
  )
}
