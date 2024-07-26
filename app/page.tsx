import { Container, Filters, Title, TopBar } from '@/components/shared'
import { ProductListGroup } from '../components/shared/product-list-group'

const pizzas = [
  {
    id: 1,
    name: 'Margherita',
    imgUrl:
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ingredients: 'Tomato sauce, mozzarella cheese, fresh basil',
    variants: [
      {
        id: 1,
        name: 'small',
        price: 25,
      },
    ],
  },
  {
    id: 2,
    name: 'Peperoni',
    imgUrl:
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ingredients: 'Pepperoni, tomato sauce, mozzarella cheese',
    variants: [
      {
        id: 1,
        name: 'small',
        price: 25,
      },
    ],
  },
  {
    id: 3,
    name: 'Hawaiian',
    imgUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ingredients: 'Tomato sauce, mozzarella cheese, ham, pineapple',
    variants: [
      {
        id: 1,
        name: 'small',
        price: 25,
      },
    ],
  },
  {
    id: 4,
    name: 'Veggie',
    imgUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ingredients: 'Tomato sauce, mozzarella cheese, onion, mushrooms',
    variants: [
      {
        id: 1,
        name: 'small',
        price: 25,
      },
    ],
  },
  {
    id: 5,
    name: 'Meat feast',
    imgUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ingredients: 'Tomato sauce, mozzarella cheese, bacon, chicken',
    variants: [
      {
        id: 1,
        name: 'small',
        price: 25,
      },
    ],
  },
]

export default function Home() {
  return (
    <>
      <Container className='mt-5'>
        <Title text='All pizzas' size='l' className='font-extrabold' />
      </Container>
      <TopBar />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[60px]'>
          {/* Filters */}
          <div className='w-[250px]'>
            <Filters />
          </div>

          {/* List of items */}
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductListGroup title='Pizzas' categoryId='1' items={pizzas} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
