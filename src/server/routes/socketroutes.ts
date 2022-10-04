import { Socket } from "socket.io";

import { getws } from "../socket";

const ws = getws();

const messages = [];
// cuando un usuario se conecte al servidor de sockets
ws.io.on("connection", (socket) => {
  console.log("connection en Rutas", socket.id);
  // escuchamos el evento `message`
  socket.on("message", (data) => {
    console.log("Mensaje en Rutas", data);
    // guardamos el mensaje en nuestra "DB"
    let msj = { id: data.id + 1, value: data.value + " Echo" };
    socket.emit("message", msj);
    // enviamos el mensaje a todos los usuarios menos a quién los envió
    socket.broadcast.emit("message", data);
  });
});
