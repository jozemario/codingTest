import { NextApiRequest, NextApiResponse } from "next";

import executeQuery from "../../../server/db";

export async function findAllItemsLimit(typestr, limit) {
  try {
    const result = await executeQuery({
      query: `SELECT * FROM ${typestr} LIMIT ${limit}`,

      values: [],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    //res.status(200).json([]) ;
  }
}
export async function findAllItems(typestr) {
  try {
    const result = await executeQuery({
      query: `SELECT * FROM ${typestr}`,
      values: [],
    });
    console.log(result);
    return result;

    //res.status(200).json(result) ;
  } catch (error) {
    console.log(error);
    //res.status(200).json([]) ;
  }
}

export async function findItem({ searchString, type, field }) {
  try {
    const result = await executeQuery({
      query: `SELECT * FROM ${type} WHERE ${field} like ?`,
      values: [searchString],
    });
    console.log("findItem: ", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function block(res) {
  res.send({
    error: "You must be sign in to view the protected content on this page.",
  });
}

//const handler = (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;
  const { method } = req;

  console.log(method, type);

  switch (type.length) {
    case 1:
      switch (method) {
        case "GET":
          if (type[0] === "users") {
            block(res);
            break;
          }
          // Get data from your database
          const resultGet = await findAllItems(type);
          res.status(200).json(resultGet);
          //res.status(200).json({ id, name: `User ${id}` })
          break;
        default:
          res.setHeader("Allow", ["GET"]);
          res.status(405).end(`Method ${method} Not Allowed`);
          break;
      }
      break;
    case 2:
      switch (method) {
        case "GET":
          if (type[0] === "users") {
            block(res);
          }
          // Get data from your database
          const resultGet = await findAllItemsLimit(type[0], parseInt(type[1]));
          res.status(200).json(resultGet);
          //res.status(200).json({ id, name: `User ${id}` })
          break;
      }
      break;

    case 3:
      switch (method) {
        case "GET":
          if (type[0] === "users") {
            block(res);
          }
          // Get data from your database
          const resultGet = await findItem({
            searchString: "%" + type[2] + "%",
            type: type[0],
            field: type[1],
          });
          res.status(200).json(resultGet);
          //res.status(200).json({ id, name: `User ${id}` })
          break;

        default:
          res.setHeader("Allow", ["GET"]);
          res.status(405).end(`Method ${method} Not Allowed`);
          break;
      }

      break;
  }
}
//export default handler;
