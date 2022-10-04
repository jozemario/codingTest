import { NextApiRequest, NextApiResponse } from "next";

import executeQuery from "../../../server/db";

import * as cheerio from "cheerio";

export function block(res) {
  res.send({
    error: "You must look for books isbn only on this page.",
  });
}

//const handler = (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const BASE_URL: string = "https://openlibrary.org/books/";
  //const BASE_URL: string = 'https://isbnsearch.org/isbn/'
  //'https://www.amazon.com/s?k=978-1617297748&i=stripbooks-intl-ship'
  //const BASE_URL: string = 'https://api.altmetric.com/v1/isbn/'
  //const BASE_URL: string = 'https://www.amazon.com/s?k='

  const { type } = req.query;
  const { method } = req;

  console.log(method, type, BASE_URL);

  switch (type.length) {
    case 3:
      switch (method) {
        case "GET":
          if (type[0] === "books") {
            // Get data from your database
            const resultGet = await fetch(BASE_URL + type[2] + ".json");

            //const resultGet = await fetch(BASE_URL+type[2]+'&i=stripbooks-intl-ship')//+'.json')
            const html = await resultGet.json();
            res.status(200).json(html);

            //const html = await resultGet.text()
            // Convert the HTML string into a document object
            //const $ = cheerio.load(html);

            /* $("a").each(function() {
                                        var old_src=$(this).attr("href");
                                        var new_src = "/api/external/books" + encodeURIComponent(old_src);
                                        console.log(new_src);
                                        $(this).attr("href", new_src);            
                                });*/
            // Get the image file
            //const book = $('#search > div.s-desktop-width-max.s-opposite-dir > div > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.sg-col-12-of-16 > div > span > div > div > div:nth-child(2) > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20 > div > div.a-section.a-spacing-none').html();
            //console.log(book);
            //findItem({searchString:'%'+type[2]+'%', type:type[0], field:type[1]})
            //res.status(200).send(html) ;
            //res.status(200).json({ id, name: `User ${id}` })
          } else {
            block(res);
          }

          break;

        default:
          res.setHeader("Allow", ["GET"]);
          res.status(405).end(`Method ${method} Not Allowed`);
          break;
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
//export default handler;
