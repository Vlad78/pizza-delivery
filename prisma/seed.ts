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
