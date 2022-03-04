// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import { sign, verify } from 'jsonwebtoken';


const secret = process.env.SECRET
const encryption = true

export default async function jwt(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret,encryption })
  if (token) {
    const encodedToken = sign(token, process.env.SECRET, { algorithm: 'HS256'});
    console.log('jwt fuction token api : ', token, encodedToken)
    let data = {payload:token, token:encodedToken}
    res.send(JSON.stringify(data, null, 2) )
    
  }else{
    res.send(JSON.stringify({success:false,data:'notLoggedIn'}, null, 2) )
  }
 
}