import * as socketio from 'socket.io';

export class SocketService {

  io: socketio.Server;

  constructor() {
    this.io = new socketio.Server();
  }

}

let client;

export const initws = () => {
  client = new SocketService()
  return client
}

export const getws = () => {
  return client
}