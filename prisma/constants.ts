type Size = 's' | 'l' | 'm'

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const createVariant = (
  productName: string,
  price: number,
  size?: Size,
  type?: string
) => {
  return {
    type,
    size,
    price: randomDecimalNumber(price, price * 1.2),
    imageUrl: `/public/assets/pizzas/${productName}${size && `-${size}`}${
      type && `-${type}`
    }.png`,
  }
}

export const categories = [
  { name: 'Pizza' },
  { name: 'Breakfast' },
  { name: 'Sides' },
  { name: 'Summer' },
  { name: 'Drinks' },
  { name: 'Burgers' },
  { name: 'Desserts' },
].map((category, index) => ({ ...category, id: index + 1 }))

export const ingredients = [
  {
    name: 'Tomato Sauce',
    price: 5.9,
  },
  {
    name: 'Cheesy Edge',
    price: 10,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Mozzarella',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Cheddar and Parmesan Cheese',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Spicy Jalapeno Pepper',
    price: 5.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Chicken',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Mushrooms',
    price: 5.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Ham',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Spicy Pepperoni',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Spicy Chorizo',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Marinated Cucumbers',
    price: 5.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Tomatoes',
    price: 5.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Red Onion',
    price: 5.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Pineapples',
    price: 5.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Oregano',
    price: 3.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Sweet Pepper',
    price: 5.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Feta Cheese',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Meatballs',
    price: 7.9,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
  {
    name: 'Alfredo sauce',
    price: 5.9,
  },
].map((ingredient, index) => ({ ...ingredient, id: index + 1 }))

export const products = [
  {
    name: 'Ham and mushroom omelet',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
    categoryId: 2,
    price: randomDecimalNumber(12, 40),
    description:
      "This is the best omelet you've ever had. It's so good, it's so good.",
  },
  {
    name: 'Pepperoni omelet',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
    categoryId: 2,
    price: randomDecimalNumber(12, 40),
    description:
      "This is the best omelet you've ever had. It's so good, it's so good.",
  },
  {
    name: 'Caffe latte',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 2,
    price: randomDecimalNumber(12, 40),
    description: '',
  },
  {
    name: 'Danwich ham and cheese',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
    categoryId: 3,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Chicken nuggets',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
    categoryId: 3,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Oven potatoes with gravy 🌱',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
    categoryId: 3,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Banana milkshake',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
    categoryId: 4,
    price: randomDecimalNumber(12, 40),
    description: '',
  },
  {
    name: 'Caramel apple milkshake',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
    categoryId: 4,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Milkshake with Oreo cookies',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
    categoryId: 4,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Classic milkshake 👶',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
    categoryId: 4,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Irish Cappuccino',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
    categoryId: 5,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Coffee Caramel Cappuccino',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
    categoryId: 5,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Coffee Coconut Latte',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
    categoryId: 5,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Caffe Americano',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
    categoryId: 5,
    price: randomDecimalNumber(12, 40),
  },
  {
    name: 'Caffe latte',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 5,
    price: randomDecimalNumber(12, 40),
  },
]

export const pizzas = {
  pizzaMargherita: {
    name: 'Margherita',
    categoryId: 1,
    ingredients: {
      connect: ingredients.filter(ingredient =>
        ['Tomato Sauce', 'Mozzarella', 'Oregano'].includes(ingredient.name)
      ),
    },
    variants: {
      createMany: {
        data: [
          ['s', 'regular'],
          ['m', 'regular'],
          ['l', 'regular'],
          ['m', 'thin'],
          ['l', 'thin'],
        ].map(variant => {
          return createVariant('Margherita', 30, variant[0] as Size, variant[1])
        }),
      },
    },
  },
  pizzaHawaiian: {
    name: 'Hawaiian',
    categoryId: 1,
    ingredients: {
      connect: ingredients.filter(ingredient =>
        ['Chicken', 'Alfredo sauce', 'Mozzarella', 'Pineapples'].includes(
          ingredient.name
        )
      ),
    },
    variants: {
      createMany: {
        data: [
          ['s', 'regular'],
          ['m', 'regular'],
          ['l', 'regular'],
          ['m', 'thin'],
          ['l', 'thin'],
        ].map(variant => {
          return createVariant('Hawaiian', 35, variant[0] as Size, variant[1])
        }),
      },
    },
  },
  pizzaMushrooms: {
    name: 'Mushrooms',
    categoryId: 1,
    ingredients: {
      connect: ingredients.filter(ingredient =>
        [
          'Chicken',
          'Tomatoes',
          'Sweet Pepper',
          'Red Onion',
          'Mozzarella',
          'Feta Cheese',
          'Mushrooms',
          'Tomato Sauce',
          'Oregano',
        ].includes(ingredient.name)
      ),
    },
    variants: {
      createMany: {
        data: [
          ['s', 'regular'],
          ['m', 'regular'],
          ['l', 'regular'],
          ['m', 'thin'],
          ['l', 'thin'],
        ].map(variant => {
          return createVariant('Mushrooms', 35, variant[0] as Size, variant[1])
        }),
      },
    },
  },
  pizzaPeperoni: {
    name: 'Peperoni',
    categoryId: 1,
    ingredients: {
      connect: ingredients.filter(ingredient =>
        ['Chicken', 'Sweet Pepper', 'Red Onion', 'Mozzarella'].includes(
          ingredient.name
        )
      ),
    },
    variants: {
      createMany: {
        data: [
          ['s', 'regular'],
          ['m', 'regular'],
          ['l', 'regular'],
          ['m', 'thin'],
          ['l', 'thin'],
        ].map(variant => {
          return createVariant('Peperoni', 35, variant[0] as Size, variant[1])
        }),
      },
    },
  },
}
