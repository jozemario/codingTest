import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";

import next from "next";
import "./env"
import routes from "./routes";
import "./cron";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);
console.log(`ADMIN is ${process.env.ADMIN}`);



(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use("/api", routes);
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();