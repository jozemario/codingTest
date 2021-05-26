import {createServer} from 'http';
import express, { Request, Response } from "express";
import { Socket } from "socket.io";

import * as bodyParser from "body-parser";

import next from "next";
import "./env"
import routes from "./routes";
import "./cron";

import { initws,getws } from './socket'

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const IOport = process.env.IOPORT || 3001;
const server = express();
server.set("port", port)
//create a server and pass our Express app to it.
const http = createServer(server);

const ws = initws(http,IOport)
//console.log('ws: ', ws)
//const io = getws()

ws.io.on("connection", (socket: Socket) => {  
  console.log('connection in server: ', socket.id)
})

import "./routes/socketroutes";


console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);
console.log(`ADMIN is ${process.env.ADMIN}`);



(async () => {
  try {
    await app.prepare();
    
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use("/api", routes);
    ws.io.on('connection', (socket: Socket) => {
        console.log('connection');
        socket.emit('status', 'Hello from Socket.io');

        socket.on('disconnect', () => {
            console.log('client disconnected');
        })
    });

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




