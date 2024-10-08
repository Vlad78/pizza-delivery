import { Suspense } from 'react'

import { Container, Filters, Stories, Title, TopBar } from '@/shared/components/shared'
import { Products } from '@/shared/components/shared/products'
import { Skeleton } from '@/shared/components/ui'


export default function Home() {
  return (
    <>
      <Container className='mt-5'>
        <Title text='All pizzas' size='l' className='font-extrabold' />
      </Container>
      <TopBar />

      <Stories />

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
