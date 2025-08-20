import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { userDb } from '../../../db/index.js'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await userDb.findByEmail(credentials.email)

          if (!user) {
            throw new Error('No user found with this email')
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) {
            throw new Error('Invalid password')
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            userType: user.userType,
          }
        } catch (error) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.userType = token.userType
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
})

export { handler as GET, handler as POST } 