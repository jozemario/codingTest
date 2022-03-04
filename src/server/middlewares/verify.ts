 import * as jwt from 'jsonwebtoken';
 import { sign, verify } from 'jsonwebtoken';

 
 export const authVerify = token => {
     console.log('authVerify: ', token)

   try {
    
     // 解码取出之前存在payload的user_id
     if (token === {}) {
         return false;
     }else{
        const payload = verify(token, process.env.SECRET);
        
        return payload;
     }
     
   } catch (err) {
     // ctx.throw(401, err);
     console.log('authVerify error: ', 'jwt must be a string');
     //console.log('authVerify error: ', err);
     //return false;
   }
 };