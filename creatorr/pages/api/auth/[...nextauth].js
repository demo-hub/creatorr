import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Twitch({
            clientId: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET
        }),
        Providers.Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        })
        // ...add more providers here
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.NEXT_PUBLIC_DATABASE_URL,

    // Custom pages
    pages: {
        signIn: '/auth/signin',
        /* signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in */
    }
})