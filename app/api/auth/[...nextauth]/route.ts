import { compareSync, hashSync } from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

import prisma from '@/prisma/prisma-client'
import { UserRole } from '@prisma/client'


export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        console.log(profile)
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null

        const values = {
          email: credentials.email,
        }

        const findUser = await prisma.user.findUnique({
          where: values,
        })

        if (!findUser) return null

        const isPasswordValid = compareSync(
          credentials.password,
          findUser.password
        )

        if (!isPasswordValid) return null

        if (!findUser.verified) return null

        return {
          id: findUser.id,
          email: findUser.email,
          fullName: findUser.name,
          role: findUser.role,
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_KEY,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') return true

        if (!user.email) return false

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerId },
              { email: user.email },
            ],
          },
        })
        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerId,
            },
          })
          return true
        }

        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || 'User #' + user.id,
            provider: account?.provider,
            providerId: account?.providerId,
            role: 'USER',
            verified: new Date(),
            // TODO that's bad behaivour
            password: hashSync(user.id.toString(), 10),
          },
        })

        return true
      } catch (error) {
        console.log('SignIn Error:' + error)
        return false
      }
    },
    async jwt({ token }) {
      if (!token.email) return token

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (findUser) {
        token.id = findUser.id.toString()
        token.email = findUser.email
        token.fullName = findUser.name
        token.role = findUser.role
      }

      return token
    },

    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
