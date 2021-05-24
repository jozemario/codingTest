import NextAuth from "next-auth"
import Providers from "next-auth/providers"
//import Adapters from "next-auth/adapters"



import axios from 'axios'





const sendPostRequest = async (creds) => {
    try {
        const resp = await axios.post(`${process.env.NEXT_URL}/api/login`, creds);
        //console.log(resp.data);
        return resp
    } catch (err) {
        // Handle Error Here
        console.error('Error: ',err);
    }
};

export type Theme = "auto" | "dark" | "light"

const providers = [
  Providers.Credentials({
    name: 'Email and Password',
    credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
          password: {  label: "Password", type: "password" }
        },
    authorize: async (credentials,req) => {

          const user:any = await sendPostRequest(credentials);
          // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          console.log('sendPostRequest: ', user.data)
          if (user) {
          return user.data
          } else {
            // If you return null or false then the credentials will be rejected
            return null
            // You can also Reject this callback with an Error or with a URL:
            // throw new Error('error message') // Redirect to error page
            // throw '/path/to/redirect'        // Redirect to a URL
          }
    

    }
  })
      /*Providers.Email({
          server: {
              host: process.env.EMAIL_SERVER_HOST,
              port: process.env.EMAIL_SERVER_PORT,
              auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
              }
        },
      from: process.env.EMAIL_FROM,
    }),
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    Providers.Auth0({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    })*/
]

const callbacks = {
  async jwt(token, user) {
    console.log('callbacks jwt',token, user);
    if (user) {
      token.accessToken = user.token
    }

    return token
  },

  async session(session, token) {
    console.log('callbacks session',session, token);
    session.accessToken = token.accessToken
    return session
  },

  /**
   * @param  {string} url      URL provided as callback URL by the client
   * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
   * @return {string}          URL the client will be redirect to
   */
  async redirect(url, baseUrl) {
    console.log('callbacks redirect',url, baseUrl);
    return url.startsWith(baseUrl)
      ? url
      : baseUrl
  }
  // async signIn(user, account, profile) { return true },
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile 
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    /*async signIn(user, account, profile) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },*/
    // async redirect(url, baseUrl) { return baseUrl },
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
  /*  async redirect(url, baseUrl) {
      return url.startsWith(baseUrl)
        ? url
        : baseUrl
    },*/
    // async session(session, user) { return session },
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client 
     */
  /*  async session(session, token) {
      // Add property to session, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },*/
    // async jwt(token, user, account, profile, isNewUser) { return token }
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
   /* async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    }*/

}

const options = {
  providers,
  callbacks,
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
     secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
     encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    error: '/api/auth/signin' // Changing the error redirect page to our custom login page
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  events: {
  async signIn(message) {console.log('event: ',message) /* on successful sign in */ },
  async signOut(message) {console.log('event: ',message) /* on signout */ },
  async createUser(message) {console.log('event: ',message) /* user created */ },
  async updateUser(message) {console.log('event: ',message) /* user updated - e.g. their email was verified */ },
  async linkAccount(message) {console.log('event: ',message) /* account (e.g. Twitter) linked to a user */ },
  async session(message) {console.log('event: ',message) /* session is active */ },
  async error(message) {console.log('event: ',message) /* error in authentication flow */ }
  },
 // theme: "light",
  // Enable debug messages in the console if you are having problems
  debug: false
}


export default (req, res) => NextAuth(req, res, options)