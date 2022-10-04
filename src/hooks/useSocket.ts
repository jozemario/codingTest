import React from "react";

import { useEffect } from "react";
import io from "socket.io-client";
import * as jwt from "jsonwebtoken";

import { socket } from "../services/SocketService";

let token;
//let socket;

/* const fetchData = async () => {
  try {
    const res = await fetch('/api/examples/jwt')
      const json = await res.json()
      if (json) { 
        console.log('jwttoken:', json)
        token = json.token 
        React.useEffect(() => {
          // window is accessible here.
          console.log("window.innerHeight", window.innerHeight);
          sessionStorage.setItem('token', token);
        }, []);
          
      }
  } catch (error) {
    console.log('fechdata error:', error)
  }
} */

/* console.log('SocketURL: ', process.env.socketURL)
      const socket = io(process.env.socketURL, 
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
    
              } ) */

/* const InitConnSocket = async () => {
  console.log('InitConnSocket: ', new Date() )
  try {

    useEffect(() => {
      
    
    },[])
          

  } catch (error) {
    console.log('InitConnSocket error:', error)
  }
} */

/* fetchData().then(data => {
  console.log('fetchData: ', data)
  InitConnSocket()
}) */

export default function useSocket(eventName, cb) {
  useEffect(() => {
    //token = sessionStorage.getItem('token');
    socket.on(eventName, cb);

    // return function useSocketCleanup() {
    //   socket.off(eventName, cb)
    // }
    return () => {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);

  return socket;
}
