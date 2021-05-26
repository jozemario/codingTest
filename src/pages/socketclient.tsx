import { GetServerSideProps } from "next"
import Link from 'next/link'
import type { Session } from "next-auth"
import { useSession, getSession } from "next-auth/client"
import Layout from "../components/layout"
import useSocket from '../hooks/useSocket'
import { useState,useEffect } from 'react'

// importamos el client de socket.io
import io from'socket.io-client'

export default function Page() {


  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  const [session, loading] = useSession()
  
  const [field, setField] = useState('')
  const [newMessage, setNewMessage] = useState(0)
  const [messages, setMessages] = useState([])
  const socket = useSocket('message', message => {

    setMessages(messages => [...messages, message])
  })

  useSocket('message', () => {
    setNewMessage(newMessage => newMessage + 1)
  })

  const handleSubmit = event => {
    event.preventDefault()

    // create message object
     const message = {
      id: new Date().getTime(),
      value: field,
    }

    // send object to WS server
    socket.emit('message', message)
    setField('')
    setMessages(messages => [...messages, message])
  }

  return (
    <Layout>
      <h1>SSR SocketIO Client Echo</h1>
      <main>
      <div>
        <Link href="/socketclient">
          <a>{'Chat One'}</a>
        </Link>
        <br />
        
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.value}</li>
          ))}
        </ul>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            onChange={e => setField(e.target.value)}
            type="text"
            placeholder="Hello world!"
            value={field}
          />
          <button>Send</button>
        </form>
      </div>
    </main>
    </Layout>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}