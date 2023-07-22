import { useState , useEffect } from 'react'
import './App.css'
import io from "socket.io-client"
import Chat from './Chat'

const socket = io.connect("http://localhost:3001")

function App() {

  const [username , setUsername] = useState("")
  const [room , setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <div className="main-container">
      {!showChat ? (
    <div className='chat-container'>
      <h3>Join A Chat</h3>
      <input 
        type="text" 
        placeholder='John...' 
        onChange={(e)=>{setUsername(e.target.value)}} />
      <br/>
      <input 
        type="text" 
        placeholder='Room ID' 
        onChange={(e)=>{setRoom(e.target.value)}} />
      
      <br/>

      <button onClick={joinRoom}>Join A Room</button>
      </div>
      ) : (
      <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  )
}

export default App
