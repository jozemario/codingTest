// This is an example of to protect an API route
import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"


export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {



  const session = await getSession({ req })

  console.log('getSession: ',session.user)

  if (session && session.user.email===process.env.ADMIN) {
      return res.send({ content: 'This is admin content. Welcome ' + session.user.email + '(admin)'})
  } else
  if (session) {
    return res.send({
      content:
        "This is protected content. You can access this content because you are signed in as normal user",
    })
  }

  res.send({
    error: "You must be sign in to view the protected content on this page.",
  })
}