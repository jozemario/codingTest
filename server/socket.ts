import { createServer } from "http";
import { Server, Socket } from "socket.io";

//import * as socketIo from 'socket.io';

//import { createServer } from "http";
//import { Server, Socket } from "socket.io";

//const httpServer = createServer();
//const io = new Server(httpServer, {
  // ...
//});

//io.on("connection", (socket: Socket) => {
  // ...
//});



export class SocketService {

  io: any;
  //http: any;

  constructor(http,port) {
    this.io = new Server(http,{
    	pingInterval: 2000,
      	pingTimeout: 5000
      });
    //this.io.attach(http)
    //this.io.set('origins', '*:*');
    this.io.on("connection in seed", socket => {
      console.log('an user connected');
      socket.on('disconnect', function () {
        console.log('user disconnected');
      });
    });

    http.listen(port, function () {
      console.log(`Socket.io listening on *:${port}`);
    });

  }

}

let client


export const initws = (http,port) => {
  client = new SocketService(http,port)
  return client
}

export const getws = () => {
  return client
}