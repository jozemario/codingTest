import { useEffect } from 'react'
import io from 'socket.io-client'


const socket = io(process.env.SOCKETIO_URL, 
          //{ transports:['polling'], 
          { transports:['websocket'],
          auth: {
				    token: "123"
				  },
            //autoConnect: false,
           //allowUpgrades: false,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            //timeout: 30000,

            secure: false 

          } )

export default function useSocket(eventName, cb) {
  useEffect(() => {
    socket.on(eventName, cb)

    return function useSocketCleanup() {
      socket.off(eventName, cb)
    }
  }, [eventName, cb])

  return socket
}