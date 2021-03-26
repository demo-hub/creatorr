import NextAuth from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'
import User, { UserSchema } from '../../../models/User'

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
    },

    // custom models
    adapter: Adapters.TypeORM.Adapter(
        process.env.NEXT_PUBLIC_DATABASE_URL,
        {
            models: {
                User: {
                    model: User,
                    schema: UserSchema
                }
            }
        }
    ),

    // custom callbacks
    callbacks: {
        /**
         * @param  {object} session      Session object
         * @param  {object} token        User object    (if using database sessions)
         *                               JSON Web Token (if not using database sessions)
         * @return {object}              Session that will be returned to the client
         */
        async session(session, token) {
          // Add property to session, like an access_token from a provider.
          session.shortDesc = token.shortDesc
          session.longDesc = token.longDesc
          session.monthlyEarnings = token.monthlyEarnings
          session.ethWallet = token.ethWallet
          return session
        }
      }
})