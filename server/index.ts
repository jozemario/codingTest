import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import next, { NextApiHandler } from 'next';
import * as socketio from 'socket.io';
import { initws,getws } from './socket'

import * as bodyParser from "body-parser";
import compress from "compression";
import cookieParser from 'cookie-parser';
import methodOverride from "method-override";

import "./env"

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

const app: Express = express();
const server: http.Server = http.createServer(app);
const io = initws().io;//new socketio.Server();

io.attach(server,{
    pingInterval: 2000,
      pingTimeout: 5000
  }); 
import "./routes/socketroutes";

console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);
console.log(`ADMIN is ${process.env.ADMIN}`);

import routes from "./routes";
import "./cron";

(async () => {
    try {
        await nextApp.prepare();
        app
        .use(cookieParser())
        .use(compress({}))
        .use(methodOverride())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use("/api", routes)

        app.get('/hello', async (_: Request, res: Response) => {
            res.send('Hello World')
        });

        io.on('connection', (socket: socketio.Socket) => {
            console.log('connection in server: ', socket.id)
            socket.emit('status', 'Hello from Socket.io');

            socket.on('disconnect', () => {
                console.log('client disconnected');
            })
        });

        app.all('*', (req: any, res: any) => nextHandler(req, res));

        server.listen(port, (err?: any) => {
                if (err) throw err;
                console.log(`> Ready on http://localhost:${port} - env ${process.env.NODE_ENV}`);
            });

    } catch (e) {
    console.error(e);
    process.exit(1);
    }
})();