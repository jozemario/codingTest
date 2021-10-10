
import io from "socket.io-client";


export const socket = io(process.env.socketURL, 
    //{ transports:['polling'], 
    { transports:['websocket'],
    auth: {
      token: 'token'//(window)? window.sessionStorage.getItem('token'):'notLoggedIn'
    },
      //autoConnect: false,
     //allowUpgrades: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      //timeout: 30000,

      secure: false 

    } )