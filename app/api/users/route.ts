import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/prisma-client'


export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

type postData = {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'USER'
}

export async function POST(req: NextRequest) {
  const data: postData = await req.json()

  const user = await prisma.user.create({
    data,
  })
  return NextResponse.json(user)
}
