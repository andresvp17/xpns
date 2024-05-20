import { type NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/utils/db'
import { compare } from 'bcrypt'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        if (credentials?.email == null || credentials.password == null) {
          return null
        }

        const existingUser = await db.user.findUnique({ where: { email: credentials.email } })
        if (existingUser == null) return null

        const passwordMatch = await compare(credentials.password, existingUser.password)
        if (!passwordMatch) return null

        return {
          email: existingUser.email,
          name: existingUser.username,
          userID: existingUser.id
        }
      }
    })
  ],
  callbacks: {
    async session ({ session, token }) {
      return {
        ...session,
        user: {
          ...token
        }
      }
    },
    async jwt ({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user
        }
      }
      return token
    }
  }
}

export async function auth (...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
  return await getServerSession(...args, options)
}
