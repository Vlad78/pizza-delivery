import { NextResponse } from 'next/server'

import prisma from '@/prisma/prisma-client'
import { getUserSession } from '@/shared/lib/back-end'


export async function GET() {
  try {
    const session = await getUserSession()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
      select: { name: true, email: true, password: false },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
