// This is an example of to protect an API route
import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

import excuteQuery from '../../../../server/db';

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export async function findAllItemsLimit(typestr,limit) {
    try {
          const result = await excuteQuery({
                  query:  `SELECT * FROM ${typestr} WHERE active=1 and deleted=0 LIMIT ${limit}`,
                
                values: [ ],
            });
            console.log(result);
            return result
   } catch (error) {
        console.log(error);
        //res.status(200).json([]) ;
    }
}
export async function findAllItems(typestr) {
    try {
        

          const result = await excuteQuery({
                query:  `SELECT * FROM ${typestr} WHERE active=1 and deleted=0`,
                values: [  ],
            });
          console.log(result);
            return result

        //res.status(200).json(result) ;
    } catch (error) {
        console.log(error);
        //res.status(200).json([]) ;
    }
}

export async function deleteItem({ id, type }) {
    try {
        const result = await excuteQuery({
            query: `Update ${type} set deleted=1, active=0 WHERE id = ?`,
            values: [ id ],
        });
        console.log('findItem: ',result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function findItem({ searchString, type, field }) {
    try {
        const result = await excuteQuery({
            query: `SELECT * FROM ${type} WHERE ${field} like ? and active=1 and deleted=0`,
            values: [ searchString ],
        });
        console.log('findItem: ',result);
        return result;
    } catch (error) {
        console.log(error);
    }
}


export async function createItem({ item, type }) {
    //const role = 'user';
    switch (type) {
      case "books":
                  const bookItem = {
                            id: uuidv4(),
                            createdAt: moment().format( 'YYYY-MM-DD HH:mm:ss'),
                            name:item.name,
                            category:item.category
                            
                        };  
                   try {
                        const result = await excuteQuery({
                            query: `INSERT INTO ${type} (id, created_at, name, category) VALUES(?, ?, ?, ?)`,
                            values: [bookItem.id, bookItem.createdAt.toString(), bookItem.name, bookItem.category],
                        });
                        console.log( result );
                        } 
                   catch ( error ) {
                        console.log( error );
                    }

                return bookItem;
        break;
      case "bookCategories":
                  const catItem = {
                            id: uuidv4(),
                            createdAt: moment().format( 'YYYY-MM-DD HH:mm:ss'),
                            name:item.name//,
                            //category:item.category
                            
                        };  
                   try {
                        const result = await excuteQuery({
                            query: `INSERT INTO ${type} (id, created_at, name) VALUES(?, ?, ?)`,
                            values: [catItem.id, catItem.createdAt.toString(), catItem.name],
                        });
                        console.log( result );
                        } 
                   catch ( error ) {
                        console.log( error );
                    }

                return catItem;
        break;
    }

    
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  const session = await getSession({ req })

  const { type } = req.query
  const { method } = req

  //const {
  //  query: { id, name },
  //  method,
  //} = req
  console.log(method,type)


  const secret = process.env.SECRET
  //const encryption = true

  //const token = await getToken({ req, secret,encryption })

  console.log('getSession: ',session.user)
  //console.log('getToken: ',token.user)



  if (session && session.user.email==process.env.ADMIN) {
    //await findAllItems(req,res);
      //return res.send({ content: 'This is admin content. Welcome ' + session.user.email + '(admin)'})
      switch (type.length) {
            case 2:
                  
                  switch (method) {
                      case 'GET':
                        // Get data from your database
                        const resultGet = await findAllItemsLimit(type[0],parseInt(type[1]))
                        res.status(200).json(resultGet) ;
                        //res.status(200).json({ id, name: `User ${id}` })
                        break;
                      }
                 break;
            case 1:
                  
                  switch (method) {
                      case 'GET':
                        // Get data from your database
                        const resultGet = await findAllItems(type)
                        res.status(200).json(resultGet) ;
                        //res.status(200).json({ id, name: `User ${id}` })
                        break
                      case 'POST':
                        // Create data in yourdatabase
                        const resultPost = await createItem({item:req.body,type:type})
                        res.status(200).json(resultPost) ;
                        break
                      case 'PUT':
                        // Update or create data in your database
                        const resultPut = await createItem({item:req.body,type:type})
                        res.status(200).json(resultPut) ;
                        break
                      case 'DELETE':
                        // Update or create data in your database
                        const resultDelete = await deleteItem({id:req.body.id,type:type})
                        res.status(200).json(resultDelete) ;
                        break
                      default:
                        res.setHeader('Allow', ['GET','POST','PUT','DELETE'])
                        res.status(405).end(`Method ${method} Not Allowed`)
                      break
                    }
              break;
            
            case 3:
                    switch (method) {
                      case 'GET':
                        // Get data from your database
                        const resultGet = await findItem({searchString:'%'+type[2]+'%', type:type[0], field:type[1]})
                        res.status(200).json(resultGet) ;
                        //res.status(200).json({ id, name: `User ${id}` })
                        break;

                      default:
                        res.setHeader('Allow', ['GET'])
                        res.status(405).end(`Method ${method} Not Allowed`)
                        break
                      }

              break;
          }
  } else
  if (session) {
    switch (type.length) {
              case 1:
                    
                    switch (method) {
                        case 'GET':
                          // Get data from your database
                          const resultGet = await findAllItems(type)
                          res.status(200).json(resultGet) ;
                          //res.status(200).json({ id, name: `User ${id}` })
                          break
                        default:
                          res.setHeader('Allow', ['GET'])
                          res.status(405).end(`Method ${method} Not Allowed`)
                        break
                      }
                break;
              case 2:
                  
                  switch (method) {
                      case 'GET':
                        // Get data from your database
                        const resultGet = await findAllItemsLimit(type[0],parseInt(type[1]))
                        res.status(200).json(resultGet) ;
                        //res.status(200).json({ id, name: `User ${id}` })
                        break;
                      }
                 break;
              
              case 3:
                      switch (method) {
                        case 'GET':
                          // Get data from your database
                          const resultGet = await findItem({searchString:'%'+type[2]+'%', type:type[0], field:type[1]})
                          res.status(200).json(resultGet) ;
                          //res.status(200).json({ id, name: `User ${id}` })
                          break;

                        default:
                          res.setHeader('Allow', ['GET'])
                          res.status(405).end(`Method ${method} Not Allowed`)

                          break
              
                        }

                break;
            }
    //await findAllItems(req,res);
    //return res.send({
    //  content:
    //    "This is protected content. You can access this content because you are signed in as normal user",
    //})
  }else{
    res.send({
        error: "You must be sign in to view the protected content on this page.",
      })

  }

  

  
}