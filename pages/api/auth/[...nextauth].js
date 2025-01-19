import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Replace with your own logic
        if (credentials.username === 'user' && credentials.password === 'pass') {
          return { id: 1, name: 'User' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  }
}); 