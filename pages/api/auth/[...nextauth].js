import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Replace with your own logic
        if (credentials.username === 'user' && credentials.password === 'pass') {
          return { id: 1, name: 'User' }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin', // Optional, specify a custom sign-in page
  }
})
