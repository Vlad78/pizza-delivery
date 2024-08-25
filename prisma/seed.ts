import { hashSync } from 'bcrypt'

import { categories, ingredients, pizzas, products } from './constants'
import prisma from './prisma-client'


async function up() {
  await prisma.user.createMany({
    data: [
      {
        name: 'John Test',
        email: 'j@j.com',
        role: 'USER',
        password: hashSync('12345678', 10),
        verified: new Date(),
      },
      {
        name: 'Jane Test',
        email: 'ja@j.com',
        role: 'ADMIN',
        password: hashSync('12345678', 10),
        verified: new Date(),
      },
    ],
  })

  await prisma.category.createMany({
    data: categories,
  })

  await prisma.ingredient.createMany({
    data: ingredients,
  })

  await prisma.product.createMany({
    data: products,
  })

  await prisma.product.create({
    data: pizzas.pizzaMargherita,
  })
  await prisma.product.create({
    data: pizzas.pizzaHawaiian,
  })
  await prisma.product.create({
    data: pizzas.pizzaMushrooms,
  })
  await prisma.product.create({
    data: pizzas.pizzaPeperoni,
  })

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        token: '123',
      },
      {
        userId: 2,
        token: '456',
      },
    ],
  })

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productVariantId: 1,
      quantity: 1,
      additionIngredients: {
        connect: ingredients.filter(ingredient =>
          ['Tomato Sauce', 'Mozzarella'].includes(ingredient.name)
        ),
      },
    },
  })

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productVariantId: null,
      productId: 1,
      quantity: 1,
    },
  })

  await prisma.cartItem.create({
    data: {
      cartId: 2,
      productVariantId: 12,
      quantity: 2,
      additionIngredients: {
        connect: ingredients.filter(ingredient =>
          ['Mushrooms', 'Oregano'].includes(ingredient.name)
        ),
      },
    },
  })

  await prisma.story.createMany({
    data: [
      {
        id: 1,
        previewImageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/9f43d72c33628d13c950444f7a7e3fe39c2c87ac-2160x2700.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        id: 2,
        previewImageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/329244787_156569387185120_2268975603992716425_nlow.jpg',
      },
      {
        id: 3,
        previewImageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/455259208_500245605748630_6421823352333808168_nlow.jpg',
      },
      {
        id: 4,
        previewImageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/1371f470efec6117acd366effc19f16b6d160c80-2160x2700.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        id: 5,
        previewImageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/3023ffcf2a55d41ac8b866e67f63130c703ca1b0-2160x2700.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        id: 6,
        previewImageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/a4a3b1ceaa59cbeecf19252f0f93e78e066132e1-814x1080.png?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
    ],
  })

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        imageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/82535c764557e1ec71fe0ab2d6392edb64c60ae9-814x1080.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        storyId: 1,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/327442184_1739802266414064_2697433711801907838_nlow.jpg',
      },
      {
        storyId: 1,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/328021061_842898483475553_6001544644955543695_nlow.jpg',
      },
      {
        storyId: 1,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/328291540_649825280232807_2674998834334755362_nlow.jpg',
      },
      {
        storyId: 2,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/329244787_156569387185120_2268975603992716425_nlow.jpg',
      },
      {
        storyId: 2,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/451389617_1170232190924328_7666382521535069319_nfull.jpg',
      },
      {
        storyId: 3,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/452369727_1475478786404393_3195084759383635522_nfull.jpg',
      },
      {
        storyId: 3,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/455259208_500245605748630_6421823352333808168_nlow.jpg',
      },
      {
        storyId: 4,
        imageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/1371f470efec6117acd366effc19f16b6d160c80-2160x2700.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        storyId: 4,
        imageUrl:
          'https://800degreespizza.com/wp-content/uploads/sb-instagram-feed-images/457018784_1064086062392162_175847526078348813_nfull.jpg',
      },

      {
        storyId: 5,
        imageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/3023ffcf2a55d41ac8b866e67f63130c703ca1b0-2160x2700.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        storyId: 5,
        imageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/4d1e0465701c3e29307acfd816762b9c95c7151e-2160x2700.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        storyId: 5,
        imageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/9f43d72c33628d13c950444f7a7e3fe39c2c87ac-2160x2700.jpg?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },

      {
        storyId: 6,
        imageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/a4a3b1ceaa59cbeecf19252f0f93e78e066132e1-814x1080.png?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
      {
        storyId: 6,
        imageUrl:
          'https://cdn.sanity.io/images/91ree6di/production/d99b18f89dcb6fbd7e15ca7493c39a405ddba9be-814x1080.png?w=413&q=60&fit=max&auto=format&dpr=1.25',
      },
    ],
  })
}

async function down() {
  await prisma.$queryRawUnsafe(
    `TRUNCATE TABLE "User", "Category", "Ingredient", "Product", "ProductVariant", "Cart", "CartItem" RESTART IDENTITY CASCADE;`
  )
}
async function main() {
  try {
    down()
    up()
  } catch (error) {
    console.error(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
