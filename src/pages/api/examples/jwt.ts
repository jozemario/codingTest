// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.SECRET
const encryption = true

export default async function jwt(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret,encryption })
  
  console.log('jwt token: ', token)
  res.send(JSON.stringify(token, null, 2))
}