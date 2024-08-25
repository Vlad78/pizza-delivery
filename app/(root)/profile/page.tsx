import { redirect } from 'next/navigation'

import prisma from '@/prisma/prisma-client'
import { ProfileForm } from '@/shared/components/shared/'
import { getUserSession } from '@/shared/lib/back-end'


export default async function Profile() {
  const session = await getUserSession()

  if (!session) redirect('/not-auth')

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
  })

  if (!user) redirect('/not-auth')

  return <ProfileForm data={user} />
}
