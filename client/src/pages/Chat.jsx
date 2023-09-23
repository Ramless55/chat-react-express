import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import getDataToken from '../auth/getToken'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { postMessage, getAllMessages } from '../services/axiosServices-messages';

const socket = io("http://localhost:4000")

function Chat () {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token')
  const [userId] = useState(getDataToken(token).data.id)
  const navigate = useNavigate()

  const chargeDbMessages = async () => {
    const response = await getAllMessages()
    const dbMessages = response.response.message
    dbMessages.map(message => {
      if (userId === message.body.id) message.from = 'Me'
    })
    setMessages([...messages, ...dbMessages])
    console.log(messages)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (message.trim() === '')
      return setMessage("")

    const newMessage = {
      body: {
        message: message,
        id: userId
      },
      from: 'Me'
    }

    setMessages([...messages, newMessage])

    socket.emit('message', {
      message: message,
      id: userId
    }, getDataToken(token).data.username)

    setMessage("")

    await postMessage({ message })
  }

  useEffect(() => {
    chargeDbMessages()

    socket.on('messageFrontend', receiveMessage)

    return () => {
      socket.off('messageFrontend', receiveMessage)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    if (!getDataToken(token))
      navigate('/')
  }, [messages, navigate, token]);

  const receiveMessage = (message) => {
    if (userId === message.body.id) {
      message.from = "Me"
    }
    setMessages(state => [...state, message])
  }

  return (
    <>
      <main className=''>
        <Navbar />
        <div className='min-h-screen w-full flex items-end'>
          <div className='px-5 pb-24 pt-16 w-full h-full flex flex-col justify-end'>
            {messages.map((message, i) =>
              <div key={i} className={message.from === 'Me' ? "chat chat-end" : "chat chat-start"}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src="../../public/profile-icon.png" />
                  </div>
                </div>
                <div className='chat-header'>{message.from}</div>
                <div className="chat-bubble"><p className='whitespace-pre-line break-words'>{message.body.message}</p></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className=' flex w-full h-fit p-4 fixed bottom-0 bg-slate-900 justify-center'>
          <input className="w-full max-w-5xl input input-ghost bg-slate-800 text-slate-50 focus:text-slate-50 mr-4"
            type="text"
            placeholder='Write your message ...'
            onChange={(event) => setMessage(event.target.value)}
            value={message} />
          <button className='btn btn-ghost p-0 px-2'>
            <img className='h-full w-full' src="../../public/send.svg" alt="Enviar" />
          </button>
        </form>
      </main>
    </>
  )
}

export default Chat
