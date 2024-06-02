import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
//import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&prompt=consent',
      scope: 'https://www.googleapis.com/auth/calendar'
    }),
    // Passwordless / email sign in
    /*EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }),*/
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account) {
        // This is the first login, the account was just created
        // Therefore we add the accessToken to the token
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      // We add the accessToken to the session
      session.accessToken = token.accessToken;
      return session;
    }
  }
})