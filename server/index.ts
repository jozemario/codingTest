import express, { Express, Request, Response } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import { initws, getws } from "./socket";
import { authVerify } from "./middlewares/verify";

import redis from "redis";
import NextRedisCache from "next-redis-cache";

//import * as bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

import "./env";

import CustomNodeJsGlobal from "./models/Global";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

//Initialization of Next Redis Cache instance
console.log("process.env.REDIS_URL: ", process.env.REDIS_URL);
const client = redis.createClient(process.env.REDIS_URL);
const nextRedisCache = new NextRedisCache(client, nextApp, {
  includes: ["/api", "/blogs/(.*)"], // routes to include for caching
  excludes: ["/cart", "/(.*).js"], //Collection of specific routes which shouldn't be cache.
  defaultExpire: null, //Expiration time to expire you cache after a particular time. Note: null value of this key will set cache permanently.Number (Seconds) 3000 null
  expire: null, //To define different expiration time for different routes. Number (Seconds) 3000 null
  cache: true, //To disable caching permanently by setting it false.	Boolean	true	true
  prefix: "my-cache", //To identify your cache in store by unique prefix.	String	"my-cache"	"my-cache"
  log: false, //Log timing of get/set to monitor caching	Boolean	true	false
});

// Tell Typescript to use this type on the globally scoped `global` variable.
//import CustomNodeJsGlobal from './types/node';
declare const global: CustomNodeJsGlobal;
global.SocketUsers = [];
global.INQueue = [];
global.OUTQueue = [];
global.DONEQueue = [];
//

const app: Express = express();
const server: http.Server = http.createServer(app);
const io = initws().io; //new socketio.Server();

io.attach(server, {
  pingInterval: 2000,
  pingTimeout: 5000,
});

import "./routes/socketroutes";
import "./routes/cron";
import "./routes/scheduler";

console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);
console.log(`ADMIN is ${process.env.ADMIN}`);

import routes from "./routes";

(async () => {
  try {
    await nextApp.prepare();
    app
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      //.use(bodyParser.json())
      //.use(bodyParser.urlencoded({ extended: true }))
      .use("/api", routes);

    app.get("/hello", async (_: Request, res: Response) => {
      res.send("Hello World");
    });

    /*  io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (authVerify(token)) {
              console.log('verify socket token success', token);
              return next();
            }
            return next(new Error(`Authentication error! time =>${new Date().toLocaleString()}`));
          }); */

    io.on("connection", (socket: socketio.Socket) => {
      console.log("connection in server: ", socket.id);
      global.SocketUsers.push({ socketid: socket.id });
      console.log("SocketUsers: ", global.SocketUsers);
      socket.emit("status", "Hello from Socket.io");

      socket.on("disconnect", () => {
        console.log("client disconnected");
        for (var i = global.SocketUsers.length - 1; i >= 0; --i) {
          if (global.SocketUsers[i].socketid === socket.id) {
            global.SocketUsers.splice(i, 1);
          }
        }
        console.log("SocketUsers: ", global.SocketUsers);
      });
    });

    app.all(
      "*",
      (req, res, nxt) => nextRedisCache.middleware(req, res, nxt),
      (req: any, res: any) => nextHandler(req, res)
    );

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(
        `> Ready on http://localhost:${port} - env ${process.env.NODE_ENV}`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

process.on("uncaughtException", function (err) {
  console.log("uncaughtException: " + err);
});
